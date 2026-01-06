from flask import Blueprint, render_template, session, redirect, request, flash, jsonify
from backend.models import User, Restaurant, MenuItem, HealthProfile, db

dash_bp = Blueprint('dashboard', __name__)

def login_required(role=None):
    if 'user_id' not in session:
        return False
    if role and session.get('role') != role:
        return False
    return True

@dash_bp.route('/owner-dashboard')
def owner_dashboard():
    if not login_required('owner'): return redirect('/auth/login')
    
    user_id = session['user_id']
    restaurant = Restaurant.query.filter_by(owner_id=user_id).first()
    
    return render_template('dashboards/owner.html', restaurant=restaurant)

@dash_bp.route('/add-restaurant', methods=['POST'])
def add_restaurant():
    if not login_required('owner'): return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.form
    new_rest = Restaurant(
        owner_id=session['user_id'],
        name=data['name'],
        cuisine=data['cuisine'],
        image_url=data.get('image_url', ''),
        is_verified=False
    )
    db.session.add(new_rest)
    db.session.commit()
    return redirect('/owner-dashboard')

@dash_bp.route('/add-dish', methods=['POST'])
def add_dish():
    if not login_required('owner'): return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.form
    restaurant = Restaurant.query.filter_by(owner_id=session['user_id']).first()
    
    if not restaurant: return jsonify({'error': 'Create restaurant first'}), 400
    
    new_item = MenuItem(
        restaurant_id=restaurant.id,
        name=data['name'],
        price=float(data['price']),
        description=data.get('description', ''),
        category=data['category'],
        health_tags="Pending AI Analysis" # Placeholder until AI runs
    )
    db.session.add(new_item)
    db.session.commit()
    return redirect('/owner-dashboard')

@dash_bp.route('/user-dashboard')
def user_dashboard():
    if not login_required('user'): return redirect('/auth/login')
    user = User.query.get(session['user_id'])
    return render_template('dashboards/user.html', user=user)

@dash_bp.route('/update-health', methods=['POST'])
def update_health():
    if not login_required('user'): return redirect('/auth/login')
    
    data = request.form
    profile = HealthProfile.query.filter_by(user_id=session['user_id']).first()
    
    if not profile:
        profile = HealthProfile(user_id=session['user_id'])
        db.session.add(profile)
    
    profile.age = int(data['age'])
    profile.bmi = float(data['bmi'])
    profile.conditions = data.get('conditions', '')
    profile.diet_goal = data.get('diet_goal', 'Maintain')
    
    db.session.commit()
    return redirect('/user-dashboard')

@dash_bp.route('/admin-dashboard')
def admin_dashboard():
    if not login_required('admin'): return redirect('/auth/login')
    
    pending_restaurants = Restaurant.query.filter_by(is_verified=False).all()
    all_users = User.query.all()
    
    return render_template('dashboards/admin.html', 
                         pending=pending_restaurants, 
                         users=all_users)

@dash_bp.route('/verify-restaurant/<int:id>')
def verify_restaurant(id):
    if not login_required('admin'): return jsonify({'error': 'Unauthorized'}), 401
    
    rest = Restaurant.query.get(id)
    if rest:
        rest.is_verified = True
        db.session.commit()
    return redirect('/admin-dashboard')
