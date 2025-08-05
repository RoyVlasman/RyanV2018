#!/bin/bash

echo "🔄 Environment Switcher"
echo "---------------------"

case "$1" in
    "dev")
        echo "🛠️  Switching to DEVELOPMENT environment..."
        git checkout dev
        echo "✅ Now in DEVELOPMENT mode"
        ;;
    "prod")
        echo "🚀 Switching to PRODUCTION environment..."
        git checkout main
        echo "✅ Now in PRODUCTION mode"
        ;;
    *)
        echo "❓ Usage: ./switch-env.sh [dev|prod]"
        echo "   dev  - Switch to development environment"
        echo "   prod - Switch to production environment"
        ;;
esac
