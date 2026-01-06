FROM python:3.9-slim

WORKDIR /app

# Copy Requirements
COPY requirements.txt .

# Install Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy Project
COPY . .

# Expose Port
EXPOSE 5001

# Run Server
CMD ["python", "-m", "backend.app"]
