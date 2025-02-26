



# Set-ExecutionPolicy RemoteSigned -Scope CurrentUser



# Requires running as Administrator or with correct permissions to install software

# --- Check/Install Chocolatey ---
if (!(Get-Command choco.exe -ErrorAction SilentlyContinue)) {
    Write-Host "Chocolatey not found. Installing Chocolatey..."
    Set-ExecutionPolicy Bypass -Scope Process -Force;
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
} else {
    Write-Host "Chocolatey is already installed."
}

# --- Install Node.js (LTS), Git, PostgreSQL, and VSCode ---
Write-Host "Installing Node.js, Git, PostgreSQL, and VS Code via Chocolatey..."
choco install nodejs-lts git postgresql vscode -y

# Optionally, ensure PostgreSQL service is running
Write-Host "Starting PostgreSQL service..."
Start-Service postgresql

# --- Clone the GitHub repo ---
# Replace <YOUR_GITHUB_REPO> with the actual repo URL
$repoURL = "https://github.com/CodeWithInferno/notes.git"
$projectDir = "uni-anotes"

if (!(Test-Path $projectDir)) {
    Write-Host "Cloning project from $repoURL"
    git clone $repoURL $projectDir
} else {
    Write-Host "Project folder already exists. Pulling latest changes..."
    Set-Location $projectDir
    git pull
    Set-Location ..
}

# --- Install dependencies & run setup commands ---
Set-Location $projectDir

Write-Host "Installing project dependencies with npm..."
npm install

# If you have Prisma migrations or similar:
# npx prisma migrate dev

Write-Host "All set! You can now run the development server with:"
Write-Host "cd $projectDir && npm run dev"

Write-Host "Opening project in VS Code..."
code .
