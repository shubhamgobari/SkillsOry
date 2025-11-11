# TalentFlow - Recruitment Platform

    A modern, comprehensive recruitment platform built with React frontend and Spring Boot backend that streamlines the entire hiring process from job posting to final selection.

    ## Architecture

    - **Frontend**: React 18 with Vite, Tailwind CSS
    - **Backend**: Spring Boot 3.2, Spring Security, Spring Data JPA
    - **Database**: H2 (development), PostgreSQL (production)
    - **Authentication**: JWT tokens

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

    ### Frontend
    - React 18 with modern hooks
    - Vite for fast development and building
    - Tailwind CSS for styling
    - React Router v6 for navigation
    - Recharts for data visualization
    - Lucide React for icons
    - Monaco Editor for code editing
    - React Hot Toast for notifications

    ### Backend
    - Spring Boot 3.2
    - Spring Security for authentication
    - Spring Data JPA for database operations
    - JWT for token-based authentication
    - H2 Database (development)
    - PostgreSQL (production)
    - Maven for dependency management

    ## Getting Started

    ### Prerequisites
    - Node.js 18+ and npm
    - Java 17+
    - Maven 3.6+

    ### Installation

    1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd talentflow-recruitment-platform
    ```

    2. Install all dependencies:
    ```bash
    npm run install:all
    ```

    3. Start both frontend and backend:
    ```bash
    npm run dev
    ```

    This will start:
    - Backend server on http://localhost:8080
    - Frontend development server on http://localhost:3000

    ### Individual Services

    **Frontend only:**
    ```bash
    npm run client:dev
    ```

    **Backend only:**
    ```bash
    npm run server:dev
    ```

    ## API Endpoints

    ### Authentication
    - `POST /api/auth/login` - User login
    - `POST /api/auth/register` - User registration
    - `POST /api/auth/logout` - User logout

    ### Jobs
    - `GET /api/jobs` - Get all jobs
    - `GET /api/jobs/{id}` - Get job by ID
    - `POST /api/jobs` - Create new job
    - `PUT /api/jobs/{id}` - Update job
    - `DELETE /api/jobs/{id}` - Delete job

    ### Applications
    - `GET /api/applications` - Get all applications
    - `GET /api/applications/user/{userId}` - Get applications by user
    - `GET /api/applications/job/{jobId}` - Get applications by job
    - `POST /api/applications` - Create new application
    - `PUT /api/applications/{id}` - Update application

    ## Development

    ### Environment Variables

    **Frontend (.env.development):**
    ```
    REACT_APP_API_URL=http://localhost:8080/api
    REACT_APP_ENV=development
    ```

    **Backend (application.yml):**
    ```yaml
    server:
      port: 8080
    spring:
      datasource:
        url: jdbc:h2:mem:talentflow
        username: sa
        password: password
    ```

    ### Database

    **Development**: H2 in-memory database
    - Console: http://localhost:8080/h2-console
    - JDBC URL: `jdbc:h2:mem:talentflow`
    - Username: `sa`
    - Password: `password`

    **Production**: PostgreSQL
    - Configure via environment variables or application-prod.yml

    ### Building for Production

    ```bash
    # Build both frontend and backend
    npm run build

    # Start production server
    npm start
    ```

    ## Project Structure

    ```
    talentflow-recruitment-platform/
    ├── client/                          # React frontend
    │   ├── src/
    │   │   ├── components/              # Reusable UI components
    │   │   ├── pages/                   # Page components
    │   │   ├── contexts/                # React Context providers
    │   │   ├── hooks/                   # Custom React hooks
    │   │   ├── services/                # API service layer
    │   │   └── utils/                   # Utility functions
    │   ├── public/                      # Static assets
    │   └── index.html                   # Entry HTML file
    ├── server/                          # Spring Boot backend
    │   ├── src/main/java/com/talentflow/
    │   │   ├── config/                  # Configuration classes
    │   │   ├── controller/              # REST controllers
    │   │   ├── service/                 # Business logic
    │   │   ├── repository/              # Data access layer
    │   │   └── model/                   # Entity classes
    │   ├── src/main/resources/          # Configuration files
    │   └── pom.xml                      # Maven dependencies
    └── package.json                     # Root package.json
    ```

    ## API Integration

    The frontend uses a centralized API service layer (`client/src/services/api.js`) that handles:
    - HTTP requests with proper error handling
    - JWT token management
    - Request/response interceptors
    - CORS configuration

    ## Security

    - JWT-based authentication
    - CORS configuration for cross-origin requests
    - Password encryption with BCrypt
    - Role-based access control
    - Secure API endpoints

    ## Testing

    ```bash
    # Run all tests
    npm test

    # Backend tests only
    cd server && mvn test

    # Frontend tests only
    cd client && npm test
    ```

    ## Deployment

    ### Docker (Coming Soon)
    ```bash
    docker-compose up
    ```

    ### Manual Deployment
    1. Build the application: `npm run build`
    2. Deploy the Spring Boot JAR to your server
    3. Serve the React build files from a web server
    4. Configure environment variables for production

    ## Contributing

    1. Fork the repository
    2. Create a feature branch
    3. Make your changes
    4. Add tests if applicable
    5. Submit a pull request

    ## License

    This project is licensed under the MIT License.