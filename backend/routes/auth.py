from flask import Blueprint, request, jsonify, render_template, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import User, db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Handle API or Form Data
        data = request.get_json() if request.is_json else request.form
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role', 'user')

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 400

        new_user = User(
            username=username, 
            email=email, 
            password_hash=generate_password_hash(password, method='pbkdf2:sha256'),
            role=role
        )
        db.session.add(new_user)
        db.session.commit()
        
        if request.is_json:
            return jsonify({'message': 'User registered successfully!'})
        return redirect(url_for('auth.login'))

    return render_template('auth/register.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            session['role'] = user.role
            session['username'] = user.username
            
            if request.is_json:
                return jsonify({'message': 'Login successful', 'role': user.role})
            
            # Redirect based on role
            if user.role == 'admin':
                return redirect('/admin-dashboard')
            elif user.role == 'owner':
                return redirect('/owner-dashboard')
            return redirect('/') 
            
        return jsonify({'error': 'Invalid credentials'}), 401

    return render_template('auth/login.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@auth_bp.route('/check-session')
def check_session():
    if 'user_id' in session:
        return jsonify({
            'logged_in': True, 
            'username': session['username'],
            'role': session['role']
        })
    return jsonify({'logged_in': False})
