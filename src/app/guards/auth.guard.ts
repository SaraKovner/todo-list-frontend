import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

/**
 * Guard להגנה על נתיבים הדורשים אימות
 * בודק אם המשתמש מחובר לפני אישור גישה לנתיב
 * אם לא מחובר - מנתב לדף התחברות
 * שימוש: canActivate: [AuthGuard] ב-routing
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * בדיקת אישור גישה לנתיב
   * @returns true אם מחובר, false וניתוב ל-login אם לא
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}