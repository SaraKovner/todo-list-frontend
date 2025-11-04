import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      console.log('🚀 מנסה להתחבר לשרת...', this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('✅ התחברות הצליחה!', response);
          this.authService.setToken(response.token);
          this.authService.setUserData(response.user);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('❌ שגיאה בהתחברות:', error);
          
          // אם השרת החזיר 200 אבל Angular חושב שזה שגיאה
          if (error.status === 200 && error.error?.text) {
            console.log('ℹ️ השרת החזיר 200 - מנסה לעבד את התגובה');
            try {
              // מנסה לחלץ את ה-JSON מהטקסט
              const jsonText = error.error.text;
              const jsonEndIndex = jsonText.lastIndexOf('}') + 1;
              const cleanJson = jsonText.substring(0, jsonEndIndex);
              const response = JSON.parse(cleanJson);
              
              console.log('✅ הצלחתי לעבד את התגובה:', response);
              this.authService.setToken(response.token);
              this.authService.setUserData(response.user);
              this.router.navigate(['/tasks']);
              return;
            } catch (parseError) {
              console.error('שגיאה בעיבוד JSON:', parseError);
            }
          }
          
          if (error.status !== 200) {
            this.errorMessage = 'שם משתמש או סיסמה שגויים';
          }
          this.isLoading = false;
        }
      });
    }
  }

  get username() { return this.loginForm.get('Username'); }
  get password() { return this.loginForm.get('Password'); }
}