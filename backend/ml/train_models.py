import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from faker import Faker
import os

# Ensure directory exists
os.makedirs('backend/ml_models', exist_ok=True)
fake = Faker()

print("🚀 Starting AI Model Generation Pipeline...")

# ==========================================
# 1. HEALTH RISK PREDICTION MODEL (Diabetes/Heart)
# ==========================================
print("🩺 Generating Health Data & Training Model...")

def generate_health_data(n=1000):
    data = []
    for _ in range(n):
        age = np.random.randint(18, 90)
        bmi = np.random.uniform(15, 40)
        sugar_intake = np.random.randint(0, 10) # scale 1-10
        exercise = np.random.randint(0, 10) # hours per week
        smoking = np.random.choice([0, 1])
        genetic = np.random.choice([0, 1])
        
        # Simple Logic for mock ground truth
        risk_score = (age/100) + (bmi/40) + (sugar_intake/10) - (exercise/10) + smoking + genetic
        # Condition: 0=Healthy, 1=Diabetes, 2=Heart, 3=Obesity
        if risk_score > 3.5: condition = 2 # Heart
        elif risk_score > 2.5: condition = 1 # Diabetes
        elif bmi > 30: condition = 3 # Obesity
        else: condition = 0 # Healthy
        
        data.append([age, bmi, sugar_intake, exercise, smoking, genetic, condition])
    
    return pd.DataFrame(data, columns=['age', 'bmi', 'sugar', 'exercise', 'smoking', 'genetic', 'condition'])

df_health = generate_health_data()
X_health = df_health.drop('condition', axis=1)
y_health = df_health['condition']

model_health = RandomForestClassifier(n_estimators=100)
model_health.fit(X_health, y_health)
joblib.dump(model_health, 'backend/ml_models/health_model.pkl')
print("✅ Health Model Saved.")


# ==========================================
# 2. FRAUD DETECTION MODEL
# ==========================================
print("💳 Generating Transaction Data & Training Fraud Model...")

def generate_fraud_data(n=1000):
    data = []
    for _ in range(n):
        amount = np.random.uniform(10, 50000)
        time_hour = np.random.randint(0, 24)
        is_new_device = np.random.choice([0, 1], p=[0.8, 0.2])
        location_mismatch = np.random.choice([0, 1], p=[0.9, 0.1])
        
        # Fraud Logic
        is_fraud = 0
        if amount > 20000 and time_hour < 4: is_fraud = 1
        if location_mismatch and is_new_device: is_fraud = 1
        
        data.append([amount, time_hour, is_new_device, location_mismatch, is_fraud])
    
    return pd.DataFrame(data, columns=['amount', 'time', 'new_device', 'loc_mismatch', 'is_fraud'])

df_fraud = generate_fraud_data()
X_fraud = df_fraud.drop('is_fraud', axis=1)
y_fraud = df_fraud['is_fraud']

model_fraud = LogisticRegression()
model_fraud.fit(X_fraud, y_fraud)
joblib.dump(model_fraud, 'backend/ml_models/fraud_model.pkl')
print("✅ Fraud Model Saved.")

# ==========================================
# 3. DIET RECOMMENDATION (Rule Based + Mock ML)
# ==========================================
# Since diet is complex, we will generally use rule-based logic in the API, 
# but we can save a dummy scaler or encoder if needed.
print("🥗 Diet Recommendation Engine initialized (Rule-based).")

print("\n🎉 ALL MODELS GENERATED SUCCESSFULLY!")
print("📂 Location: backend/ml_models/")
