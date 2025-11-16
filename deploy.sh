#!/bin/bash

# Deploy script for airisk.wiki
# This script deploys the AI Risk Wiki to the production server

set -e  # Exit on error

echo "🚀 Starting deployment to airisk.wiki..."

# Configuration
SERVER_USER="root"
SERVER_IP="164.92.116.117"
REMOTE_PATH="~/sites/airisk-wiki"
LOCAL_PATH="."

# Files to deploy
FILES_TO_DEPLOY=(
    "wiki.html"
    "styles.css"
    "firebase-config.js"
)

echo "📦 Deploying files to $SERVER_USER@$SERVER_IP:$REMOTE_PATH"

# Deploy each file
for file in "${FILES_TO_DEPLOY[@]}"; do
    echo "  → Uploading $file..."
    scp "$LOCAL_PATH/$file" "$SERVER_USER@$SERVER_IP:$REMOTE_PATH/"
done

echo "✅ Deployment complete!"
echo "🌐 Visit https://airisk.wiki to see your changes"
