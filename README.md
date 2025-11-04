# Todo List Frontend

🎓 **Academic Project** - A modern task management application built with Angular

## 📋 About

This is a comprehensive Todo List application developed as part of an academic project. The application demonstrates modern web development practices using Angular framework with a .NET backend.

## ✨ Features

- 🔐 **User Authentication** - Login and registration system
- 📝 **Task Management** - Create, read, update, and delete tasks
- 🏷️ **Categories** - Organize tasks with custom categories and colors
- ⚡ **Priority Levels** - Set task priorities (High, Medium, Low)
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Modern UI** - Clean and intuitive user interface

## 🛠️ Technologies Used

- **Frontend**: Angular 19.2.5
- **Styling**: CSS3 with custom design system
- **Authentication**: JWT tokens
- **HTTP Client**: Angular HttpClient
- **Routing**: Angular Router with guards
- **Forms**: Reactive Forms with validation

## 🏗️ Architecture

- **Components**: Modular, reusable UI components
- **Services**: Centralized business logic and API communication
- **Guards**: Route protection for authenticated users
- **Pipes**: Custom data transformation (category styling)
- **Directives**: Custom UI behavior (priority highlighting)
- **Models**: TypeScript interfaces for type safety

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saraKovner/todo-list-frontend.git
cd todo-list-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

### Backend Setup

This frontend requires a .NET backend API. Make sure to:
1. Start the backend server on `https://localhost:7087`
2. Update the API URL in `proxy.conf.json` if needed

## 📁 Project Structure

```
src/
├── app/
│   ├── Components/          # UI Components
│   │   ├── header/         # Navigation header
│   │   ├── footer/         # Footer with copyright
│   │   ├── login/          # Authentication
│   │   ├── task-list/      # Task listing
│   │   ├── task-detail/    # Task details
│   │   └── task-create/    # Task creation/editing
│   ├── Services/           # Business logic
│   │   ├── auth.service.ts # Authentication
│   │   └── task.service.ts # Task management
│   ├── Models/             # TypeScript interfaces
│   ├── guards/             # Route protection
│   ├── pipes/              # Custom pipes
│   └── directives/         # Custom directives
└── styles.css              # Global styles
```

## 🎨 Design System

- **Color Palette**: Neutral grays with accent colors
- **Typography**: Assistant font family
- **Components**: Consistent button styles and form elements
- **Responsive**: Mobile-first approach

## 🔧 Development

### Build for Production
```bash
ng build --prod
```

### Run Tests
```bash
ng test
```

### Code Linting
```bash
ng lint
```

## 📝 API Integration

The application integrates with a .NET Web API that provides:
- User authentication endpoints
- CRUD operations for tasks
- Category management
- JWT token validation

## 🎓 Academic Context

This project was developed as part of an academic curriculum to demonstrate:
- Modern web development practices
- Angular framework proficiency
- RESTful API integration
- User interface design
- Authentication and authorization
- Responsive web design

## 📄 License

© 2025 All rights reserved. This project is for educational purposes only.

## 🤝 Contributing

This is an academic project. For questions or suggestions, please contact the repository owner.

---

**Built with ❤️ using Angular & .NET**
