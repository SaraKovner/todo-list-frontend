import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserLogin, UserRegister, LoginResponse } from '../Models/user.model';

/**
 * שירות אימות משתמשים
 * מטפל בהתחברות, הרשמה וניהול טוקנים
 * משתמש ב-JWT tokens ו-localStorage לשמירת מצב התחברות
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7087/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    // בדיקה ראשונית אם המשתמש כבר מחובר (רענון דף)
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      this.isLoggedInSubject.next(true);
    }
  }

  /**
   * התחברות משתמש
   * @param user נתוני התחברות (username, password)
   * @returns Observable עם תגובת השרת (token + פרטי משתמש)
   */
  login(user: UserLogin): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, user, { headers });
  }

  register(user: UserRegister): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/register`, user, { headers });
  }

  /**
   * שמירת טוקן ועדכון מצב התחברות
   * @param token JWT token מהשרת
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  setUserData(user: any): void {
    localStorage.setItem('username', user.username);
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * התנתקות - מנקה את כל הנתונים המקומיים
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}