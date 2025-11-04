import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../Models/task.model';
import { CategoryStylePipe } from '../../pipes/category-style.pipe';
import { HighlightPriorityDirective } from '../../directives/highlight-priority.directive';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, CategoryStylePipe, HighlightPriorityDirective],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskClick = new EventEmitter<number>();

  onTaskClick(): void {
    this.taskClick.emit(this.task.id);
  }
}