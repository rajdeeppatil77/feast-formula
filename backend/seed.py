from backend.app import app
from backend.database import db
from backend.models import User, Restaurant, MenuItem
from werkzeug.security import generate_password_hash

with app.app_context():
    # 1. Create Admin
    if not User.query.filter_by(role='admin').first():
        admin = User(username='Admin', email='admin@feast.com', password_hash=generate_password_hash('admin123', method='pbkdf2:sha256'), role='admin')
        db.session.add(admin)

    # 2. Create Owner
    owner = User.query.filter_by(email='owner@feast.com').first()
    if not owner:
        owner = User(username='Restaurant Owner', email='owner@feast.com', password_hash=generate_password_hash('owner123', method='pbkdf2:sha256'), role='owner')
        db.session.add(owner)
        db.session.commit() # Commit to get ID
    
    # 3. Create Restaurant
    rest = Restaurant.query.filter_by(name='Mehfil Biryani').first()
    if not rest:
        rest = Restaurant(owner_id=owner.id, name='Mehfil Biryani', cuisine='Hyderabadi', is_verified=True, image_url='')
        db.session.add(rest)
        db.session.commit()
        
        # Add Items
        items = [
            MenuItem(restaurant_id=rest.id, name='Chicken Biryani', price=250, category='Main', health_tags='High Protein, Calorie Dense'),
            MenuItem(restaurant_id=rest.id, name='Double Ka Meetha', price=120, category='Dessert', health_tags='High Sugar'),
        ]
        db.session.add_all(items)

    # 4. Create Another Restaurant
    rest2 = Restaurant.query.filter_by(name='Healthy Eats').first()
    if not rest2:
        rest2 = Restaurant(owner_id=owner.id, name='Healthy Eats', cuisine='Salads', is_verified=True, image_url='')
        db.session.add(rest2)
        db.session.commit()
        
        items2 = [
            MenuItem(restaurant_id=rest2.id, name='Keto Salad', price=300, category='Main', health_tags='Low Carb, Healthy'),
            MenuItem(restaurant_id=rest2.id, name='Green Juice', price=100, category='Beverage', health_tags='Detox, Sugar Free'),
        ]
        db.session.add_all(items2)

    db.session.commit()
    print("✅ Database Seeded Successfully!")
