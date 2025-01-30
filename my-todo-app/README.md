# Chromia Todo App

A decentralized Todo application built on Chromia blockchain with Next.js and MetaMask integration.

## Demo

🎥 [Watch the demo video](https://www.loom.com/share/da119cb301494eebbcb8b130c58e97aa?sid=6df344dc-6ca5-4dfc-b075-f81d149383a9) to see the application in action!

## Overview

This Todo App demonstrates the power of blockchain technology in building decentralized applications. It features MetaMask authentication, real-time todo management, and a modern user interface built with Next.js and Tailwind CSS.

## Features

- 🔐 MetaMask Authentication
- ✏️ Create, Read, Update, and Delete Todos
- 🔄 Real-time Updates
- 📱 Responsive Design
- 🎨 Modern UI with Tailwind CSS
- ⛓️ Blockchain-based Data Storage

## Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/en) (v16 or higher)
- [PostgreSQL](https://docs.chromia.com/intro/installation/)
- [Chromia CLI](https://docs.chromia.com/intro/installation/)
- [MetaMask Browser Extension](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)
- [Next.js](https://nextjs.org/)

## Installation

### 1. Blockchain Setup

First, set up the Chromia blockchain:

In a new terminal

```bash
# Navigate to the blockchain directory
cd rell

# Install Chromia files
chr install

# Start the chain
chr node start

```

### 2. Frontend Setup

In a new terminal:

```bash
# Navigate to the frontend directory
cd my-todo-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click "Get Started" to connect with MetaMask or Connect with MetaMask button
3. Sign the authentication transaction when prompted
4. After successful authentication, you'll be redirected to the todo page
5. Start creating and managing your todos!

## Project Structure

```
.
├── my-todo-app/         # Frontend application
│   ├── src/
│   │   ├── app/        # Next.js pages
│   │   ├── components/ # React components
│   │   ├── hooks/      # Custom React hooks
│   │   └── lib/        # Utilities and helpers
│   └── public/         # Static assets
└── rell/               # Blockchain code
    └── src/            # Rell source files
```

## Technology Stack

- **Frontend**
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui

- **Blockchain**
  - Chromia
  - Rell Programming Language
  - PostgreSQL

- **Authentication**
  - MetaMask

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.