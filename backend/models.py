from .database import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), default='user') # user, owner, admin
    
    # Relationships
    health_profile = db.relationship('HealthProfile', backref='user', uselist=False)
    orders = db.relationship('Order', backref='user', lazy=True)
    restaurant = db.relationship('Restaurant', backref='owner', uselist=False)

class HealthProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    age = db.Column(db.Integer)
    bmi = db.Column(db.Float)
    conditions = db.Column(db.String(200)) # e.g., "Diabetes, Hypertension"
    diet_goal = db.Column(db.String(50)) # e.g., "Weight Loss"

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    cuisine = db.Column(db.String(50))
    image_url = db.Column(db.String(200))
    is_verified = db.Column(db.Boolean, default=False)
    
    menu_items = db.relationship('MenuItem', backref='restaurant', lazy=True)

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    image_url = db.Column(db.String(200))
    health_tags = db.Column(db.String(200)) # e.g., "Low Sugar, High Protein"
    category = db.Column(db.String(50)) # Main, Dessert, etc.
    
    # Nutrition Data
    calories = db.Column(db.Integer, default=0)
    protein = db.Column(db.Float, default=0.0) # grams
    carbs = db.Column(db.Float, default=0.0) # grams
    fats = db.Column(db.Float, default=0.0) # grams

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending') # pending, preparing, delivered
    fraud_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    items = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_item.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False) # Snapshot price
