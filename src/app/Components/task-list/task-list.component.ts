import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Task } from '../../Models/task.model';
import { TaskService } from '../../Services/task.service';
import { AuthService } from '../../Services/auth.service';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getMyTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('שגיאה בטעינת משימות:', error);
        console.log('Response text:', error.error);
        this.errorMessage = error.status === 200 ? 'API מחזיר HTML במקום JSON' : 'שגיאה בטעינת המשימות';
        this.isLoading = false;
      }
    });
  }

  viewTask(taskId: number): void {
    this.router.navigate(['/task', taskId]);
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }
}