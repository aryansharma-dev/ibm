🔐 Secure Notepad Web Application
Presented by: Aryan Sharma
Authentication Powered by: IBM Cloud App ID

📌 Project Overview
The Secure Notepad Web Application is a full-stack web app that enables users to write, edit, save, and delete personal notes securely. The core feature of this project is robust user authentication and authorization, implemented using IBM Cloud App ID to protect sensitive data and ensure that only authenticated users can access or manipulate their notes.

🎯 Objectives
Build a functional and intuitive notepad web app.

Secure user authentication using IBM Cloud App ID.

Use token-based session management with JWT.

Ensure smooth user experience and responsive UI.

🛠️ Tools & Technologies
Frontend: EJS (HTML + CSS + JavaScript)

Backend: Node.js, Express.js

Database: MongoDB

Authentication & Security:

IBM Cloud App ID

OAuth2, OpenID Connect, JWT

Built-in support for social login (Google, Facebook, GitHub)

Multi-Factor Authentication (MFA)

Development Tools: GitHub, Visual Studio Code

✅ Features
User registration and login using IBM Cloud App ID

JWT-based session handling for secure access

CRUD functionality for notes

Protected backend routes

Responsive and user-friendly UI

Social login options

Secure password-free authentication

Real-time note updates using React state management (if React is used for frontend enhancement)

🔁 Workflow
User opens the app and clicks Login

Redirected to IBM App ID login screen

User authenticates via email or social login

Upon success, receives JWT token

Token is used to access protected APIs

User performs note operations

Logging out clears the token/session

🌟 Future Enhancements
Real-time collaborative editing (like Google Docs)

Auto-save and version control

Smart suggestions (e.g., spell check, grammar)

Enhanced security (MFA, role-based access, OAuth scopes)

Cloud deployment (Render, Vercel)

CI/CD pipeline integration


