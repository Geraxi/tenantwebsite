#!/bin/bash

# Push to GitHub using Personal Access Token
# Usage: ./push-with-token.sh YOUR_TOKEN

if [ -z "$1" ]; then
  echo "Usage: ./push-with-token.sh YOUR_GITHUB_TOKEN"
  echo ""
  echo "To get a token:"
  echo "1. Go to: https://github.com/settings/tokens"
  echo "2. Click 'Generate new token (classic)'"
  echo "3. Select 'repo' scope"
  echo "4. Copy the token and run: ./push-with-token.sh YOUR_TOKEN"
  exit 1
fi

TOKEN=$1
GIT_USERNAME="Geraxi"

# Set up credential helper to use token
git config --global credential.helper store
echo "https://${GIT_USERNAME}:${TOKEN}@github.com" > ~/.git-credentials

# Push
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo "✅ Successfully pushed to GitHub!"
  echo "Repository: https://github.com/Geraxi/tenantwebsite"
else
  echo "❌ Push failed. Check your token and try again."
fi

