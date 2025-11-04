import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../Models/task.model';
import { TaskService } from '../../Services/task.service';
import { CategoryStylePipe } from '../../pipes/category-style.pipe';

/**
 * קומפוננט להצגת פרטי משימה וניהולה
 * כולל פעולות עריכה, סימון כהושלמה ומחיקה
 */
@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, CategoryStylePipe],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  // נתוני המשימה
  task: Task | null = null;
  
  // מצבי UI
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // קבלת ID המשימה מה-URL וטעינתה
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadTask(id);
    }
  }

  /**
   * טעינת פרטי משימה מהשרת
   */
  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.task = task;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'שגיאה בטעינת המשימה';
        this.isLoading = false;
      }
    });
  }

  /**
   * חזרה לרשימת המשימות
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  /**
   * עריכת משימה - ניווט לדף עריכה
   */
  editTask(): void {
    if (!this.task) return;
    console.log('Navigating to edit task:', this.task.id);
    this.router.navigate(['/tasks/edit', this.task.id]);
  }

  /**
   * שינוי סטטוס משימה - מושלמת/בתהליך
   */
  toggleComplete(): void {
    if (!this.task) return;
    
    // יצירת עותק של המשימה עם סטטוס מעודכן
    const updatedTask = { ...this.task, isCompleted: !this.task.isCompleted };
    console.log('Updating task:', updatedTask);
    
    this.taskService.updateTask(updatedTask).subscribe({
      next: (task) => {
        console.log('Task updated successfully:', task);
        this.task = task; // עדכון המשימה במצב המקומי
      },
      error: (error) => {
        console.error('Error updating task:', error);
        // במקרה של שגיאה, המשימה תישאר במצב הקודם
        alert('שגיאה בעדכון סטטוס המשימה: ' + (error.message || error));
      }
    });
  }

  /**
   * מחיקת משימה עם אישור מהמשתמש
   */
  deleteTask(): void {
    if (!this.task) return;
    
    // בקשת אישור מהמשתמש לפני מחיקה
    if (confirm('האם אתה בטוח שברצונך למחוק את המשימה?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          // חזרה לרשימת המשימות לאחר מחיקה מוצלחת
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          alert('שגיאה במחיקת המשימה');
        }
      });
    }
  }
}