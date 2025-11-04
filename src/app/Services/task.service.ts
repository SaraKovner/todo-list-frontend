import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../Models/task.model';
import { AuthService } from './auth.service';

/**
 * שירות ניהול משימות
 * מטפל בכל הפעולות CRUD על משימות
 * מתקשר עם .NET API עם JWT authentication
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:7087/api/Task';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * יצירת headers עם JWT token לבקשות HTTP
   * @returns HttpHeaders עם Authorization header
   */
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token found!');
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // getAllTasks(): Observable<Task[]> {
  //   return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() });
  // }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, { headers: this.getHeaders() });
  }

  /**
   * עדכון משימה קיימת
   * ממיר את המשימה לפורמט שהשרת מצפה
   * @param task משימה מעודכנת
   * @returns Observable עם המשימה לאחר עדכון
   */
  updateTask(task: Task): Observable<Task> {
    // מבנה הבקשה כפי שהשרת מצפה - רק categoryId ולא אובייקט מלא
    const taskUpdate = {
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      categoryId: task.category.id,
      priority: task.priority.toUpperCase() // השרת מצפה לאותיות גדולות
    };
    
    console.log('Sending task update:', taskUpdate);
    
    const headers = this.getHeaders();
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, taskUpdate, { headers });
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}