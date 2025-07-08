# Personal Notes App

A secure, per-user notes application built with AWS Amplify Gen 2.

## 🌟 Features

- 🔐 **Secure Authentication**: Users sign in with email using AWS Cognito
- 📝 **Personal Notes**: Each user can only see and manage their own notes
- 🚀 **Real-time**: Built with AWS Amplify Gen 2 GraphQL API
- 🎨 **Modern UI**: Clean React interface with Amplify UI components

## 🏗️ Architecture

- **Frontend**: React with Vite
- **Authentication**: AWS Cognito (via Amplify Auth)
- **API**: AWS AppSync GraphQL (via Amplify Data)
- **Database**: DynamoDB with per-user access control
- **Deployment**: AWS Amplify Hosting

## 🔒 Security

- Notes are isolated per user using Amplify's `allow.owner()` authorization
- All API calls are authenticated and authorized automatically
- No user can access another user's notes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- AWS CLI configured with appropriate permissions
- An AWS account

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd personal-notes-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the Amplify sandbox**

   ```bash
   npx ampx sandbox --profile <your-aws-profile>
   ```

4. **Start the development server** (in a new terminal)

   ```bash
   npm run dev
   ```

5. **Open your browser** to `http://localhost:5173`

### Production Deployment

```bash
# Deploy to production
npx ampx deploy --profile <your-aws-profile>
```

## 📁 Project Structure

```
personal-notes-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── App.css          # Styling
├── amplify/
│   ├── backend.ts       # Amplify backend configuration
│   ├── auth/            # Authentication configuration
│   └── data/            # Data model and API configuration
├── public/              # Static assets
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **AWS Amplify Gen 2** - Backend-as-a-Service
- **AWS Cognito** - Authentication
- **AWS AppSync** - GraphQL API
- **DynamoDB** - NoSQL database
- **TypeScript** - Type safety for backend

## 📝 Usage

1. **Sign Up/Sign In**: Create an account or sign in with your email
2. **Create Notes**: Add personal notes using the input field
3. **View Notes**: See all your personal notes in a clean list
4. **Delete Notes**: Remove notes you no longer need
5. **Sign Out**: Securely sign out when done

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

The app uses Amplify's automatic configuration via `amplify_outputs.json`. No manual environment variables needed!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [AWS Amplify Gen 2](https://docs.amplify.aws/)
- UI components from [Amplify UI](https://ui.docs.amplify.aws/)
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)

- Notes are isolated per user using Amplify's `allow.owner()` authorization
- All API calls are authenticated and authorized automatically
- No user can access another user's notes

## Setup Instructions

### Prerequisites

- Node.js 18+
- AWS CLI configured with appropriate permissions
- AWS Amplify CLI

### Development

1. Clone this repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Start the Amplify sandbox: `npx ampx sandbox --profile <your-aws-profile>`
5. In another terminal, start the dev server: `npm run dev`

### Deployment

```bash
# Deploy to production
npx ampx deploy --profile <your-aws-profile>
```

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── App.css          # Styling
├── amplify/
│   ├── backend.ts       # Amplify backend configuration
│   ├── auth/            # Authentication configuration
│   └── data/            # Data model and API configuration
└── package.json
```
