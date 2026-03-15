#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment for docs.aporto..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building the application..."
npm run build

# Start the application on port 3002
echo "🌐 Starting the server on port 3002..."
npm run serve
