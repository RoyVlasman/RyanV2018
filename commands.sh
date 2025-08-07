# Create and switch to development branch
git checkout -b dev

# Push the development branch to GitHub
git push -u origin dev

# First, add your changes
git add switch-env.sh

# Commit the changes
git commit -m "Update environment switcher script"

# Now switch to production
./switch-env.sh prod
