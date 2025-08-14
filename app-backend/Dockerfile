# Use a supported Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update -y && \
    apt-get install -y python3-dev gcc && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python packages
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app

# Expose Flask port
EXPOSE 5000

# Run Flask app on all interfaces
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
