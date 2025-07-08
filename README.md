# TeamNo- 👥 **Team Notes**: Shared notes visible to all team members with creator attributiones App

A secure, scalable team collaboration app built with AWS Amplify Gen 2, featuring role-based access control and modern UI.

## 🌟 Features

- 🔐 **Secure Authentication**: Users sign in with email using AWS Cognito
- 📝 **Personal Notes**: Each user can create and manage their own private notes
- � **Team Notes**: Shared notes visible to all team members with creator attribution
- 🎖️ **Role-based Access**: Guest, Employee, and Admin roles with different permissions
- 👤 **User Management**: Admin panel for managing users and their roles
- 🎨 **Modern UI**: Clean, responsive React interface with consistent design
- 📱 **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates**: Built with AWS Amplify Gen 2 GraphQL API

## 🏗️ Architecture

- **Frontend**: React with Vite
- **Authentication**: AWS Cognito (via Amplify Auth)
- **API**: AWS AppSync GraphQL (via Amplify Data)
- **Database**: DynamoDB with per-user access control
- **Deployment**: AWS Amplify Hosting

## 🔒 Security & Permissions

- **Guest**: Can only access personal notes
- **Employee**: Can access personal notes and team notes
- **Admin**: Full access to personal notes, team notes, and user management
- Notes are isolated per user using Amplify's `allow.owner()` authorization
- All API calls are authenticated and authorized automatically

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- AWS CLI configured with appropriate permissions
- An AWS account

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd teamnotes-app
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
teamnotes-app/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Main styling
│   ├── main.jsx             # React entry point
│   ├── TeamNotes.jsx        # Team notes component
│   ├── UserManagement.jsx   # User management (admin only)
│   ├── ProfileSetup.jsx     # Initial profile setup
│   ├── EditProfile.jsx      # Profile editing
│   └── EditUserProfile.jsx  # Admin user editing modal
├── amplify/
│   ├── backend.ts           # Amplify backend configuration
│   ├── auth/                # Authentication configuration
│   └── data/                # Data model and API configuration
├── public/                  # Static assets
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
└── README.md               # This file
```

## 🛠️ Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **AWS Amplify Gen 2** - Backend-as-a-Service
- **AWS Cognito** - Authentication
- **AWS AppSync** - GraphQL API
- **DynamoDB** - NoSQL database
- **TypeScript** - Type safety for backend
- **PropTypes** - Runtime type checking for React props

## 📝 Usage

### For All Users

1. **Sign Up/Sign In**: Create an account or sign in with your email
2. **Profile Setup**: Complete your profile on first login
3. **Personal Notes**: Create and manage your private notes
4. **Profile Management**: Edit your profile information

### For Employees

- Access to team notes for collaboration
- Can create team notes visible to all employees and admins

### For Admins

- Full user management capabilities
- Can edit other users' profiles and roles
- Access to all features and notes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- ESLint configured for React best practices
- PropTypes for runtime type checking
- Consistent code formatting and organization

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Modern Styling**: Clean, consistent design language
- **Modal Dialogs**: User-friendly popups for editing
- **Custom Dropdowns**: Styled select elements
- **Loading States**: Clear feedback during operations
- **Error Handling**: User-friendly error messages

## 📊 Data Models

- **User**: Profile information with roles and departments
- **Note**: Personal notes with owner isolation
- **TeamNote**: Shared notes with creator attribution
- **Announcement**: Admin-only announcements (ready for future use)

## 🔄 Development Workflow

1. All changes are linted and validated
2. PropTypes ensure component prop validation
3. Responsive design tested across devices
4. Security permissions verified for all roles
