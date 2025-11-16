#!/bin/bash

echo "🧠 Starting deployment for airisk.wiki..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Change to project directory
cd /root/sites/airisk-wiki || {
    print_error "Failed to change to airisk-wiki directory"
    exit 1
}

print_status "Pulling latest code from GitHub..."
git fetch origin
git reset --hard origin/main

print_status "Reloading Nginx..."
nginx -t && systemctl reload nginx

if [ $? -eq 0 ]; then
    print_status "✅ Deployment completed successfully!"
    print_status "🌐 Site: https://airisk.wiki"
    print_status "📁 Static site with Firebase backend"
else
    print_error "❌ Nginx reload failed!"
    exit 1
fi

echo "$(date): airisk.wiki deployed successfully" >> /var/log/auto-deploy.log
