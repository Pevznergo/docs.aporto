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

# Start the application on port 3002 using PM2
echo "🌐 Starting the server on port 3002 via PM2..."
if command -v pm2 > /dev/null; then
    pm2 startOrRestart ecosystem.config.js
else
    echo "⚠️ PM2 not found globally, falling back to npm run serve (process will block)..."
    npm run serve
fi
