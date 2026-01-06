from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import os
import random
import secrets
from datetime import datetime
from backend.database import db
from backend.models import User, Restaurant, MenuItem, HealthProfile
from backend.routes.auth import auth_bp
from backend.routes.dashboard import dash_bp

app = Flask(__name__, static_folder='../static', template_folder='../templates')
CORS(app)

# Database Configuration (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feast_formula.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = secrets.token_hex(16)

db.init_app(app)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(dash_bp)

# Create Tables
with app.app_context():
    db.create_all()
    print("✅ Database Tables Created Successfully!")

# Load Models
try:
    # Use absolute paths for models too
    model_path = os.path.abspath('backend/ml_models')
    health_model = joblib.load(os.path.join(model_path, 'health_model.pkl'))
    fraud_model = joblib.load(os.path.join(model_path, 'fraud_model.pkl'))
    print("✅ AI Models Loaded")
except Exception as e:
    print(f"⚠️ Models not found or error: {e}")
    health_model = None
    fraud_model = None

# Mock Database
mock_orders = []
mock_users = []

# Routes
@app.route('/')
def home():
    # Fetch all verified restaurants
    restaurants = Restaurant.query.filter_by(is_verified=True).all()
    
    
    # Check for personalization
    user_health = None
    health_warnings = {} # {item_id: "warning_message"}
    
    from flask import session
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        if user and user.health_profile:
            user_health = user.health_profile
            
            # Simple Rule-Based AI Logic (Can be replaced by ML model inference)
            for rest in restaurants:
                for item in rest.menu_items:
                    # Logic 1: Diabetes Warning
                    if 'Diabetes' in (user_health.conditions or ""):
                        if item.category in ['Dessert', 'Beverage'] or 'Sugar' in (item.health_tags or ""):
                            health_warnings[item.id] = "⚠️ High Sugar (Diabetic Risk)"
                    
                    # Logic 2: Weight Loss Warning
                    if user_health.diet_goal == 'Weight Loss':
                        if item.category in ['Burger', 'Pizza'] or 'Fried' in (item.description or ""):
                            health_warnings[item.id] = "⚠️ High Calorie (Weight Goal)"

    return render_template('index.html', restaurants=restaurants, user_health=user_health, health_warnings=health_warnings)

@app.route('/api/place-order', methods=['POST'])
def place_order():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized"}), 401
        
    data = request.json
    cart_items = data.get('items', [])
    total_amount = data.get('total', 0)
    
    if not cart_items:
        return jsonify({"error": "Cart is empty"}), 400

    # Group items by restaurant - Feast Formula supports multi-vendor, 
    # but for simplicity let's stick to first item's restaurant for this demo order
    # In a real app, we'd split orders.
    
    try:
        from backend.models import OrderItem, MenuItem
        first_item_id = cart_items[0]['id'] # Assuming passed from frontend
        # We need to lookup actual DB item to get restaurant_id
        db_item = MenuItem.query.get(first_item_id)
        if not db_item:
             return jsonify({"error": "Invalid Item"}), 400
             
        new_order = Order(
            user_id=session['user_id'],
            restaurant_id=db_item.restaurant_id,
            total_amount=total_amount,
            status='preparing',
            fraud_score=0.1 # Mock, or pass from fraud API
        )
        db.session.add(new_order)
        db.session.commit()
        
        # Add Items
        for item in cart_items:
            # item structure from frontend: {name: "...", price: ..., id: ...}
            # We need to ensure frontend passes ID.
            # If frontend only passes name, we lookup. Ideally frontend passes ID.
            # Let's assume frontend update to pass ID, or we lookup by name (risky if dupes)
            # For now, let's look up by name within the restaurant if ID missing, 
            # OR better, update frontend to include ID.
            # Let's assume user passes ID.
            
            if 'id' in item:
                o_item = OrderItem(order_id=new_order.id, menu_item_id=item['id'], quantity=1, price=item['price'])
                db.session.add(o_item)
        
        db.session.commit()
        return jsonify({"status": "Order Placed", "order_id": new_order.id})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/health-check')
def health_check():
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    print("🚀 Starting Feast Formula Server on http://localhost:5001")
    app.run(debug=True, port=5001)

# SPA Architecture - All Navigation handled in index.html

# ==========================
# AI API ENDPOINTS
# ==========================

@app.route('/api/predict-health', methods=['POST'])
def predict_health():
    data = request.json
    # Expected: age, bmi, sugar, exercise, smoking, genetic
    if health_model:
        features = np.array([[
            data.get('age', 30),
            data.get('bmi', 22),
            data.get('sugar', 5),
            data.get('exercise', 2),
            data.get('smoking', 0),
            data.get('genetic', 0)
        ]])
        prediction = health_model.predict(features)[0]
        diseases = {0: 'Healthy', 1: 'Diabetes Risk', 2: 'Heart Disease Risk', 3: 'Obesity Risk'}
        result = diseases.get(prediction, 'Unknown')
    else:
        result = "Model Unloaded (Demo Mode: Healthy)"
    
    return jsonify({"prediction": result, "timestamp": datetime.now().isoformat()})

@app.route('/api/detect-fraud', methods=['POST'])
def detect_fraud():
    data = request.json
    amount = data.get('amount', 0)
    # Mock logic if model missing
    if fraud_model:
        features = np.array([[amount, 14, 0, 0]]) # Simplified features
        prob = fraud_model.predict_proba(features)[0][1]
        is_fraud = prob > 0.7
    else:
        is_fraud = amount > 50000
    
    return jsonify({
        "is_fraud": bool(is_fraud), 
        "risk_score": float(random.random() if not fraud_model else prob),
        "status": "BLOCKED" if is_fraud else "APPROVED"
    })

if __name__ == '__main__':
    print("🚀 Starting Feast Formula Server on http://localhost:5001")
    app.run(debug=True, port=5001)
