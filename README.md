# TalentFlow - Recruitment Platform

A modern, comprehensive recruitment platform built with React that streamlines the entire hiring process from job posting to final selection.

## Features

### For Candidates
- **Job Search & Application**: Browse and apply to jobs with advanced filtering
- **ATS Score Analysis**: Real-time resume analysis with improvement suggestions
- **Interactive Coding Challenges**: Complete coding tests in a live environment
- **Application Tracking**: Monitor application status through each stage
- **Dashboard**: Track applications, ATS scores, and coding challenge results

### For Clients/Employers
- **Job Posting**: Create detailed job listings with requirements and benefits
- **Application Management**: Review candidates and track their progress
- **ATS Integration**: Automated resume scoring and filtering
- **Coding Challenge Results**: View candidate performance on technical assessments
- **Analytics Dashboard**: Insights into job performance and candidate quality

### For Admins
- **Platform Overview**: System-wide statistics and trends
- **User Management**: Monitor all users, jobs, and applications
- **Analytics**: Comprehensive reporting and data visualization

## Technology Stack

- **Frontend**: React 18 with modern hooks
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Code Editor**: Monaco Editor (VS Code editor)
- **Build Tool**: Vite
- **State Management**: React Context API
- **Storage**: Local Storage (mock backend)

## Getting Started

### Installation

1. Install dependencies:
```bash
npm run install:all
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
recruitment-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── index.html          # Entry HTML file
├── server/                 # Empty (frontend-only)
└── package.json            # Root package.json
```

## Key Features Explained

### ATS Scoring System
- Analyzes resumes against job requirements
- Provides real-time feedback and improvement suggestions
- Candidates can resubmit improved resumes for better scores
- Automatic progression to coding challenges when ATS threshold is met

### Interactive Coding Challenges
- Real-time code editor with syntax highlighting
- Multiple programming language support
- Live code execution and testing
- Timed challenges with automatic submission
- Detailed scoring and pass/fail results

### Role-Based Access Control
- **Candidates**: Apply to jobs, track applications, improve ATS scores
- **Clients**: Post jobs, review applications, manage hiring pipeline
- **Admins**: Platform oversight, analytics, user management

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading times

## Mock Data & Simulation

The platform uses local storage to simulate a backend, including:
- User authentication and registration
- Job posting and management
- Application submission and tracking
- ATS score calculation
- Coding challenge execution
- Real-time status updates

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Clean and reinstall dependencies

### Code Style

- Modern React with functional components and hooks
- TypeScript-ready (can be migrated easily)
- Clean, readable code with proper commenting
- Consistent naming conventions
- Modular architecture

## Future Enhancements

- Real backend integration
- Email notifications
- Video interview scheduling
- Advanced analytics
- Integration with job boards
- Mobile app version
- AI-powered candidate matching

## License

This project is licensed under the MIT License.