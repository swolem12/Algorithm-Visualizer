#!/bin/bash

# Quick Deploy Script for Algorithm Atlas
# This script helps you commit and push your changes to GitHub

echo "🧠 Algorithm Atlas - Quick Deploy"
echo "=================================="
echo ""

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git branch -M main
    echo "✅ Git repository initialized"
fi

# Check for remote
if ! git remote | grep -q origin; then
    echo "⚠️  No remote 'origin' found."
    echo "Please set up your GitHub repository first:"
    echo ""
    echo "  git remote add origin https://github.com/swolem12/Algorithm-Visualizer.git"
    echo ""
    exit 1
fi

echo "📦 Staging all files..."
git add .

echo ""
echo "📝 Commit message (press Enter for default):"
read -p "   " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update Algorithm Atlas"
fi

echo "💾 Committing with message: '$commit_msg'"
git commit -m "$commit_msg"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Your changes are pushed."
echo ""
echo "📡 Deployment Status:"
echo "   1. Go to: https://github.com/swolem12/Algorithm-Visualizer/actions"
echo "   2. Watch the 'Deploy to GitHub Pages' workflow"
echo "   3. When complete, visit: https://swolem12.github.io/Algorithm-Visualizer/"
echo ""
echo "🎉 Happy visualizing!"
