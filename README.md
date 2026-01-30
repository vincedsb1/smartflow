<div align="center">
  <img src="public/smartflow_cover.jpg" alt="SmartFlow Cover" width="100%" style="border-radius: 10px;" />

  <h3>SmartFlow</h3>
  <p>An intelligent spaced-repetition platform designed to optimize learning and memory retention through a modern, fluid user experience.</p>
</div>

<br />

<div align="center">
  <img src="public/smartflow_screenshot.png" alt="SmartFlow Interface" width="100%" style="border-radius: 10px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);" />
</div>

<br />

## ✨ Core Features

- **🧠 Spaced Repetition Engine**: Automatically schedules reviews based on performance to maximize long-term retention.
- **🗂️ Smart Organization**: Manage knowledge with intuitive decks, color-coded categories, and visual tags.
- **📊 Progress Tracking**: Visual insights into mastery levels with detailed statistics and daily review queues.
- **🎨 Modern UI/UX**: A responsive, dark-mode ready interface built with NextUI and Framer Motion for smooth interactions.
- **🔐 Secure Authentication**: Robust custom JWT authentication system including email verification and password recovery flows.

<br />

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Pages API)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [NextUI](https://nextui.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Email**: [Resend](https://resend.com/) & [React Email](https://react.email/)

<br />

## 🚀 Getting Started

Follow these steps to get a local development environment up and running in minutes.

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (Local instance or cloud provider like Supabase/Neon)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/smartflow.git
cd smartflow
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory.

> **⚠️ Important**: Never commit your `.env` file to version control.

```bash
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/smartflow?schema=public"

# Authentication Secrets
APP_SECRET="your-super-secure-jwt-secret-key"

# Application Settings
BASE_URL="http://localhost:3000"
NEXT_PUBLIC_ENV="local" # Use 'prod' for production

# Email Services (Resend)
RESEND_API_KEY="re_123456789"
```

### 3. Run the Development Server

Start the application locally:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

<br />

## ⚙️ Configuration

### Database Setup

This project uses Prisma for database management. Before running the app, ensure your database schema is pushed and seeded with initial data.

1.  **Push Schema to DB**:
    ```bash
    npx prisma db push
    ```

2.  **Seed Initial Data**:
    Populates the database with default languages, colors, and test users.
    ```bash
    npm run seed
    ```

<br />

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.