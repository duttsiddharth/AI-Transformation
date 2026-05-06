#!/bin/bash

# AIOps Transition Suite - Quick Deployment Script
# Usage: ./deploy.sh [port]
# Make executable: chmod +x deploy.sh

PORT=${1:-8080}

echo "🚀 AIOps Transition Suite - Quick Deploy"
echo "========================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Starting server with Python 3 on port $PORT..."
    echo "🌐 Open: http://localhost:$PORT"
    echo ""
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "✅ Starting server with Python 2 on port $PORT..."
    echo "🌐 Open: http://localhost:$PORT"
    echo ""
    python -m SimpleHTTPServer $PORT
elif command -v npx &> /dev/null; then
    echo "✅ Starting server with npx serve on port $PORT..."
    echo "🌐 Open: http://localhost:$PORT"
    echo ""
    npx serve -l $PORT
elif command -v php &> /dev/null; then
    echo "✅ Starting server with PHP on port $PORT..."
    echo "🌐 Open: http://localhost:$PORT"
    echo ""
    php -S localhost:$PORT
else
    echo "❌ No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3 (python3)"
    echo "  - Python 2 (python)"
    echo "  - Node.js with npx"
    echo "  - PHP"
    echo ""
    echo "Or open index.html directly in your browser."
    exit 1
fi