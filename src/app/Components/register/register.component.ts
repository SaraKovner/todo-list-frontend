import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      Username: ['', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
        Validators.pattern(/^[\p{L}\p{N}_]+$/u)
      ]],
      Email: ['', [
        Validators.required, 
        Validators.email, 
        Validators.maxLength(100)
      ]],
      Password: ['', [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(100)
      ]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      console.log('🚀 מנסה להירשם...', this.registerForm.value);
      
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('✅ הרשמה הצליחה!', response);
          this.authService.setToken(response.token);
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error('❌ שגיאה בהרשמה:', error);
          
          // אם השרת החזיר 200 אבל Angular חושב שזה שגיאה
          if (error.status === 200 && error.error?.text) {
            console.log('ℹ️ השרת החזיר 200 - מנסה לעבד את התגובה');
            try {
              const jsonText = error.error.text;
              const jsonEndIndex = jsonText.lastIndexOf('}') + 1;
              const cleanJson = jsonText.substring(0, jsonEndIndex);
              const response = JSON.parse(cleanJson);
              
              console.log('✅ הצלחתי לעבד את התגובה:', response);
              this.authService.setToken(response.token);
              this.router.navigate(['/tasks']);
              return;
            } catch (parseError) {
              console.error('שגיאה בעיבוד JSON:', parseError);
            }
          }
          
          if (error.status !== 200) {
            this.errorMessage = 'שגיאה בהרשמה - בדוק את הפרטים';
          }
          this.isLoading = false;
        }
      });
    }
  }

  get username() { return this.registerForm.get('Username'); }
  get email() { return this.registerForm.get('Email'); }
  get password() { return this.registerForm.get('Password'); }
}