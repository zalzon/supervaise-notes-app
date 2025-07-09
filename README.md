# 🎯 Supervaise Notes App

A secure, scalable team collaboration application built with **AWS Amplify Gen 2**, featuring role-based access control, real-time synchronization, and enterprise-grade security.

## 🌟 Key Features

- 🔐 **Secure Authentication**: AWS Cognito with email verification and JWT tokens
- 📝 **Personal Notes**: Private notes with automatic owner-level isolation
- 👥 **Team Notes**: Collaborative shared notes with real-time updates
- 🎖️ **Role-Based Access**: Employee and Admin roles with field-level permissions
- 👤 **Admin Dashboard**: Complete user lifecycle management
- 🎨 **Modern UI**: Clean, responsive React interface
- ⚡ **Real-time Data**: GraphQL subscriptions with automatic synchronization
- 🛡️ **Enterprise Security**: Built-in authorization rules and data isolation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- AWS CLI configured with appropriate permissions
- Git

### Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd supervaise-notes-app

# Install dependencies
npm install

# Start AWS backend (creates all cloud infrastructure)
npx ampx sandbox --profile <your-aws-profile>

# Start development server (in a new terminal)
npm run dev
```

### First Time Setup

1. **Register**: Create your account with email verification
2. **Complete Profile**: Fill out the profile setup form
3. **Admin Setup**: The first user defaults to Employee role
   - To become admin: Update role in AWS Console or have existing admin promote you
4. **Test Features**: Create notes, manage users (if admin), collaborate with team

## 🏗️ Technical Architecture

### AWS Cloud Infrastructure

```
React App (Vite) → AWS Cognito (Auth) → AWS AppSync (GraphQL API)
       ↓                    ↓                        ↓
AWS Amplify (Hosting) → JWT Tokens → Lambda Resolvers → DynamoDB
```

**Core AWS Services:**

- **Amazon Cognito**: User authentication and authorization
- **AWS AppSync**: GraphQL API with real-time subscriptions
- **Amazon DynamoDB**: Serverless NoSQL database with auto-scaling
- **AWS Lambda**: Serverless compute for business logic
- **AWS Amplify**: Static web hosting with global CDN

### Security Model

- **Authentication**: JWT tokens from AWS Cognito
- **Authorization**: Field-level GraphQL authorization rules
- **Data Isolation**: Automatic owner-based record filtering
- **Real-time Security**: All subscriptions respect authorization rules

## 📁 Project Structure

```
src/
├── App.jsx              # Main application and personal notes
├── App.css              # Global styles and responsive design
├── main.jsx             # React entry point and Amplify configuration
├── ProfileSetup.jsx     # New user onboarding
├── EditProfile.jsx      # User profile management
├── UserManagement.jsx   # Admin dashboard for user management
├── EditUserProfile.jsx  # Admin user editing modal
└── TeamNotes.jsx        # Collaborative team notes

amplify/
├── backend.ts           # Backend infrastructure entry point
├── data/resource.ts     # GraphQL schema and authorization rules
└── auth/resource.ts     # Cognito authentication configuration

amplify_outputs.json     # Auto-generated AWS service configuration
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint code quality checks
```

### Backend Development

```bash
# Deploy backend changes
npx ampx sandbox

# Generate types (automatic when schema changes)
# Types are auto-generated in amplify/data/resource.ts

# Reset sandbox (clean environment)
npx ampx sandbox delete
npx ampx sandbox
```

### Code Quality

- **ESLint**: Configured with React and modern JavaScript rules
- **Modern React**: Hooks, functional components, and latest patterns
- **Type Safety**: GraphQL schema generates TypeScript types
- **Clean Code**: No console.log statements, unused variables, or debug code

## 🚀 Deployment

### Production Deployment

1. **Backend**: `npx ampx deploy` (creates production environment)
2. **Frontend**: Automatic deployment via AWS Amplify hosting
3. **Environment**: Each environment gets isolated AWS resources

### Environment Management

- **Development**: `npx ampx sandbox` (personal dev environment)
- **Staging**: `npx ampx deploy --branch staging`
- **Production**: `npx ampx deploy --branch main`

## 🎯 Key Features Explained

### Personal Notes

- **Security**: Each note automatically tagged with owner's Cognito ID
- **Isolation**: Users can only see/edit their own personal notes
- **Real-time**: Instant updates when creating/editing/deleting

### Team Notes

- **Collaboration**: All authenticated users can view team notes
- **Attribution**: Creator information preserved for accountability
- **Departments**: Notes can be organized by department/team

### Admin Dashboard

- **User Management**: View, edit, and delete user accounts
- **Role Management**: Assign Employee/Admin roles
- **Data Safety**: Admins cannot access personal notes (privacy protection)
- **Audit Trail**: Track user creation and management actions

## 🛡️ Security Features

- **Zero Custom Auth Code**: Leverages AWS Cognito completely
- **Field-Level Authorization**: GraphQL schema enforces permissions
- **Owner-Based Isolation**: Personal data automatically filtered by user
- **JWT Token Validation**: All API calls secured with Cognito tokens
- **Real-time Security**: WebSocket subscriptions respect auth rules

## 📚 Learning Resources

- [AWS Amplify Gen 2 Documentation](https://docs.amplify.aws/)
- [GraphQL Authorization Patterns](https://docs.amplify.aws/react/build-a-backend/data/customize-authz/)
- [React 18+ Best Practices](https://react.dev/)
- [Modern JavaScript (ES2022+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📝 Notes

- **Development Focus**: This project emphasizes modern cloud-native development patterns
- **Security First**: Enterprise-grade security with minimal custom code
- **Developer Experience**: Fast development cycles with real AWS services
- **Production Ready**: Built with scalability and maintenance in mind

For questions about implementation details or AWS best practices, refer to the comprehensive demo documentation or AWS Amplify official guides.

- **Authentication**: Amazon Cognito User Pools
- **API**: AWS AppSync (GraphQL)
- **Database**: Amazon DynamoDB
- **Authorization**: Cognito-based field-level rules
- **Hosting**: AWS Amplify Hosting
- **Infrastructure as Code**: AWS CDK

### Frontend Stack

- **Framework**: React 18 with Vite
- **UI Library**: AWS Amplify UI React
- **Styling**: CSS Modules
- **State Management**: React Hooks
- **Type Safety**: PropTypes validation

## 📊 Data Models

### Core Models

- **User**: Profile information with roles and departments
- **Note**: Personal notes with automatic owner isolation
- **TeamNote**: Shared collaborative notes with creator attribution

### Security Model

```javascript
// Personal Notes - Owner only access
Note: {
  authorization: [allow.owner()];
}

// Team Notes - Collaborative with role restrictions
TeamNote: {
  authorization: [
    allow.authenticated().to(["read"]),
    allow.owner().to(["create", "update", "delete"]),
    allow.group("admins").to(["create", "read", "update", "delete"]),
  ];
}

// Users - Authenticated access for profiles
User: {
  authorization: [
    allow.authenticated().to(["create", "read", "update", "delete"]),
  ];
}
```

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
   cd supervaise-notes-app
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
supervaise-notes-app/
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
