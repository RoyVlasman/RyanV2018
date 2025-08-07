#!/bin/bash

echo "🔄 Environment Switcher"
echo "---------------------"

create_dev_branch() {
    if ! git show-ref --quiet refs/heads/dev; then
        echo "Creating development branch..."
        git checkout -b dev
        git push -u origin dev
    fi
}

case "$1" in
    "dev")
        create_dev_branch
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
