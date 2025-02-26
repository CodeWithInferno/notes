Below is an example **README.md** file you can include in your repo or share on your course’s LMS (like Canvas) to guide your teammates through installing and running your Next.js + Tailwind + Shadcn + Prisma + GraphQL project.

---

# Uni Anotes Setup

Welcome to the **Uni Anotes** project! This repository holds a Next.js application using Tailwind CSS, Shadcn UI components, Prisma, GraphQL, and PostgreSQL. If you’re brand new to the stack, don’t worry—this guide walks you through everything, from installing the necessary software to running the dev server.

## Overview

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma](https://www.prisma.io/)
- **API**: [GraphQL](https://graphql.org/)

## Prerequisites

1. **Git** – to clone this repository.  
2. **Node.js** (LTS) – for running Next.js, Prisma, and GraphQL.  
3. **PostgreSQL** – local database for development.  
4. **VS Code** (optional but recommended) – for editing and debugging.  

We’ve created convenient setup scripts for both macOS and Windows to automate installing these prerequisites (via Homebrew or Chocolatey) and get your environment ready.

## Quick Start

### 1. Clone the Repo

If you already have Git installed, clone the repository:

```bash
git clone https://github.com/CodeWithInferno/notes.git uni-anotes
cd uni-anotes
```

> **Note**: If you don’t have Git or Node installed yet, follow the setup script instructions below.

### 2. Install Dependencies

Inside the `uni-anotes` folder, run:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file (if it doesn’t exist) in the root directory of the project. Make sure to include a valid **PostgreSQL** connection string for `DATABASE_URL`. For example:

```
DATABASE_URL="postgresql://user:password@localhost:5432/uni_anotes_db"
```

> If you’re using the default local Postgres, it might look like `postgresql://postgres:password@localhost:5432/postgres`.

### 4. Migrate the Database (Optional)

If the project already includes Prisma migrations:

```bash
npx prisma migrate dev
```

This command initializes or updates your local database schema based on the Prisma schema.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## Setup Scripts

We’ve prepared two scripts for automated setup:

1. **macOS**: `setup-mac.sh`
2. **Windows**: `setup-windows.ps1`

These scripts will:
- Install Node.js, Git, PostgreSQL, and VS Code (via Homebrew on macOS or Chocolatey on Windows).
- Clone/update this repo.
- Run `npm install` to set up project dependencies.
- Attempt to start PostgreSQL.
- Open VS Code in the project folder.

> **Note**: You’ll still need to manually set up your `.env` with the correct `DATABASE_URL`.

### macOS Instructions

1. **Download** or **copy** `setup-mac.sh` to your local machine.
2. **Make it executable**:  
   ```bash
   chmod +x setup-mac.sh
   ```
3. **Run**:  
   ```bash
   ./setup-mac.sh
   ```
4. When prompted, follow on-screen instructions to install or update [Homebrew](https://brew.sh/).  
5. After script completion, open the newly cloned project folder, update your `.env` file as needed, and run:
   ```bash
   cd uni-anotes
   npm run dev
   ```

### Windows Instructions

1. **Download** or **copy** `setup-windows.ps1` to your local machine.
2. **Allow scripts** (if not already):  
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. **Right-click** the script → **Run with PowerShell**, or launch it from a PowerShell terminal.
4. Follow the on-screen prompts to install or update [Chocolatey](https://chocolatey.org/).  
5. After script completion, open the newly cloned project folder, update your `.env` file as needed, and run:
   ```powershell
   cd uni-anotes
   npm run dev
   ```

---

## Common Issues

1. **Permissions**: On macOS, you may need to run Homebrew commands with `sudo` if you didn’t install Homebrew in a user-writable location. On Windows, make sure you’re **Administrator** or have the right privileges to install software with Chocolatey.

2. **Port Conflicts**: If Postgres or Next.js can’t start, it may be because the default ports (5432 for Postgres, 3000 for Next.js) are already in use.

3. **Missing Dependencies**: If `npm install` fails, double-check that Node.js was installed correctly (e.g., `node --version`).

4. **Environment Variables**: Ensure your `.env` is properly set. If `DATABASE_URL` is invalid, Prisma migrations or the server startup may fail with database connection errors.

5. **VS Code Extensions**: For a smoother dev experience, you might want to install recommended extensions for Next.js, Tailwind, Prisma, and GraphQL. You can define them in a `.vscode/extensions.json` file.  

---

## Project Structure

Here’s a quick overview of the key files/folders in this repo:

```
uni-anotes
├─ pages/             # Next.js pages (routes)
├─ components/        # Shared React components
├─ styles/            # Tailwind base styles, custom CSS
├─ prisma/            # Prisma schema and migrations
├─ graphql/           # GraphQL schema/resolvers (or wherever you store them)
├─ .env.example       # Example environment variables
├─ package.json       # npm scripts and dependencies
├─ setup-mac.sh       # macOS setup script
├─ setup-windows.ps1  # Windows setup script
└─ README.md          # This file
```

---

## Contributing

1. **Create a new branch** for your feature/bugfix.  
2. **Open a pull request** to `main` (or your chosen default branch).  
3. **Wait for code review** and merge.

If you encounter any issues or have suggestions for improving the setup process, feel free to open an issue or contact the project maintainers.

---

## License

<details>
<summary>MIT License</summary>

```
Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy...
...
```
</details>

*(Or whichever license you choose.)*

---

**That’s it!** If you have any questions, reach out to the Tech Team lead or check our [Discussions](#) page on GitHub. Happy coding!