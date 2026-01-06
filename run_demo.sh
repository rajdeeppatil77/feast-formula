#!/bin/bash

echo "🚀 Starting Feast Formula Setup..."

# Function to check command existence
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Determine Python command
if command_exists python3; then
    PY_CMD="python3"
    PIP_CMD="pip3"
elif command_exists python; then
    PY_CMD="python"
    PIP_CMD="pip"
else
    echo "❌ Python not found! Please install Python."
    exit 1
fi

echo "✅ Using Python: $PY_CMD"

# Install Dependencies
echo "📦 Installing Dependencies..."
$PIP_CMD install -r requirements.txt

# Train Models
echo "🧠 Training AI Models..."
$PY_CMD backend/ml/train_models.py

# Wait for server to start
echo "🌐 Starting Web Server..."
sleep 2
echo "👉 Open http://localhost:5001 in your browser"
# Run the Flask server as a module
python3 -m backend.app
