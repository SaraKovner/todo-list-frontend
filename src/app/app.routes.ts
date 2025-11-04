import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { TaskDetailComponent } from './Components/task-detail/task-detail.component';
import { TaskCreateComponent } from './Components/task-create/task-create.component';
import { AuthGuard } from './guards/auth.guard';

/**
 * הגדרות נתיבים של האפליקציה
 * 
 * נתיבים ציבוריים:
 * - /login - דף התחברות
 * - /register - דף הרשמה
 * 
 * נתיבים מוגנים (AuthGuard):
 * - /tasks - רשימת משימות
 * - /tasks/create - יצירת משימה חדשה
 * - /tasks/edit/:id - עריכת משימה
 * - /task/:id - פרטי משימה
 */
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'tasks/edit/:id', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];
