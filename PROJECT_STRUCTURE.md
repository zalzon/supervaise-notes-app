# Project Structure

```
teamnotes-app/
├── .amplify/                 # Amplify generated files (auto-generated)
├── .git/                     # Git repository
├── amplify/                  # Amplify configuration
│   ├── auth/                 # Authentication configuration
│   │   └── resource.ts       # Auth resource definition
│   ├── data/                 # Data/API configuration
│   │   └── resource.ts       # GraphQL schema and data models
│   ├── backend.ts            # Amplify backend configuration
│   ├── package.json          # Amplify backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── public/                   # Static assets
│   └── favicon.ico           # App icon
├── src/                      # React application source
│   ├── App.jsx               # Main application component
│   ├── App.css               # Global styles and theme
│   ├── main.jsx              # React application entry point
│   ├── EditProfile.jsx       # User profile editing component
│   ├── EditUserProfile.jsx   # Admin user editing modal
│   ├── ProfileSetup.jsx      # First-time user onboarding
│   ├── TeamNotes.jsx         # Team notes management
│   └── UserManagement.jsx    # Admin user management panel
├── .eslintignore             # ESLint ignored files
├── .gitignore                # Git ignored files
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Node.js dependencies and scripts
├── README.md                 # Project documentation
├── onboarding-checklist.md   # Setup checklist
└── vite.config.js            # Vite build configuration
```

## Key Components

### Frontend Components

- **App.jsx**: Main application with routing and authentication
- **ProfileSetup.jsx**: First-time user profile creation
- **EditProfile.jsx**: User profile editing form
- **TeamNotes.jsx**: Team notes creation and management
- **UserManagement.jsx**: Admin panel for user management
- **EditUserProfile.jsx**: Admin modal for editing other users

### Backend Configuration

- **amplify/auth/resource.ts**: AWS Cognito authentication setup
- **amplify/data/resource.ts**: GraphQL schema with User, Note, TeamNote, and Announcement models
- **amplify/backend.ts**: Main Amplify backend configuration

### Data Models

- **User**: User profiles with roles and permissions
- **Note**: Personal notes (private to each user)
- **TeamNote**: Shared team notes with creator attribution
- **Announcement**: Admin-only announcements (future feature)

## Styling

- **App.css**: Contains all styling including:
  - Global theme and variables
  - Component-specific styles
  - Responsive design breakpoints
  - Button and form styling
  - Modal and navigation styling
