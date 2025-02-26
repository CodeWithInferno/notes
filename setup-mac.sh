#!/usr/bin/env bash

# --- Check for Homebrew and install if missing ---
if ! command -v brew &> /dev/null
then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # After installing, you might need to add Homebrew to PATH:
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# --- Install Node.js (LTS), Git, PostgreSQL, and VS Code ---
echo "Installing Node.js, Git, PostgreSQL, and VS Code..."
brew install node git postgresql
brew install --cask visual-studio-code

# Start PostgreSQL (or prompt user to configure it manually)
brew services start postgresql

# --- Clone the GitHub repo ---
# Make sure you replace <YOUR_GITHUB_REPO> with your actual repo URL
REPO_URL="https://github.com/CodeWithInferno/notes.git"
PROJECT_DIR="uni-anotes"
if [ ! -d "$PROJECT_DIR" ]; then
    echo "Cloning project from $REPO_URL"
    git clone "$REPO_URL" "$PROJECT_DIR"
else
    echo "Project folder already exists. Pulling latest changes..."
    cd "$PROJECT_DIR"
    git pull
    cd ..
fi

# --- Install dependencies & run setup commands ---
cd "$PROJECT_DIR" || exit

echo "Installing project dependencies with npm..."
npm install

# If you have Prisma migrations or similar:
# npx prisma migrate dev

echo "All set! You can now run the development server with:"
echo "cd $PROJECT_DIR && npm run dev"

echo "Opening project in VS Code..."
code .
