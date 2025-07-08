# TeamNotes App - Setup Guide

## Prerequisites

- [ ] Install Node.js 18+
- [ ] Install AWS CLI and configure with your AWS credentials
- [ ] Install Git

## Setup Instructions

### Day 1: Environment Setup

- [ ] Clone this repository
- [ ] Install dependencies: `npm install`
- [ ] Configure AWS CLI with your profile: `aws configure --profile <your-profile>`

### Day 2: Understanding the Architecture

- [ ] Review the AWS Amplify Gen 2 documentation
- [ ] Understand the authentication flow with Cognito
- [ ] Review the GraphQL schema in `amplify/data/resource.ts`
- [ ] Understand per-user access control with `allow.owner()`

### Day 3: Development Environment

- [ ] Start the Amplify sandbox: `npx ampx sandbox --profile <your-profile>`
- [ ] Start the development server: `npm run dev`
- [ ] Create a test user account and verify authentication works
- [ ] Test creating, viewing, and deleting notes

### Day 4: Testing Security

- [ ] Create two different user accounts
- [ ] Verify that each user can only see their own notes
- [ ] Test that users cannot access each other's notes
- [ ] Review the DynamoDB table structure in AWS Console

### Day 5: Deployment

- [ ] Deploy to production: `npx ampx deploy --profile <your-profile>`
- [ ] Test the production deployment
- [ ] Verify all functionality works in production

## Architecture Overview

**Frontend**: React app with Amplify UI components
**Backend**: AWS Amplify Gen 2 with GraphQL API
**Database**: DynamoDB with automatic user isolation
**Authentication**: AWS Cognito user pools

## Key Features

- ✅ Secure per-user authentication
- ✅ Automatic data isolation (users can only see their own notes)
- ✅ Real-time GraphQL API
- ✅ Modern React UI
- ✅ Serverless architecture
