import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../Services/task.service';
import { CategoryService } from '../../Services/category.service';
import { Category, Task } from '../../Models/task.model';

/**
 * קומפוננט ליצירת משימה חדשה
 * כולל טופס עם validation ואפשרות ליצור קטגוריות חדשות
 */
@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css'
})
export class TaskCreateComponent implements OnInit {
  // טופס יצירת המשימה עם validation
  taskForm: FormGroup;
  
  // מצבי UI
  isLoading = false;
  errorMessage = '';
  
  // קטגוריות זמינות
  categories: Category[] = [];
  
  // מצב הוספת קטגוריה חדשה
  showAddCategory = false;
  newCategoryName = '';
  newCategoryColor = '#ff5722';
  
  // מצב עריכה
  isEditMode = false;
  taskId: number | null = null;
  currentTask: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // יצירת טופס עם שדות וvalidation rules
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]], // כותרת - חובה, 1-50 תווים
      description: ['', [Validators.maxLength(500)]], // תיאור - אופציונלי, מקסימום 500 תווים
      categoryId: [1, [Validators.required, Validators.min(1)]], // קטגוריה - חובה, מספר חיובי
      priority: ['Low', [Validators.required, Validators.maxLength(6)]] // עדיפות - חובה, מקסימום 6 תווים
    });
  }

  ngOnInit(): void {
    // בדיקה אם זה מצב עריכה
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.taskId;
    
    // טעינת קטגוריות מהשרת
    this.loadCategories();
    
    // אם זה מצב עריכה, טען את המשימה
    if (this.isEditMode && this.taskId) {
      this.loadTaskForEdit(this.taskId);
    }
  }

  /**
   * טעינת קטגוריות מהשרת
   * במקרה של שגיאה, משתמש בקטגוריות ברירת מחדל
   */
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        // בחירת הקטגוריה הראשונה כברירת מחדל
        if (categories.length > 0) {
          this.taskForm.patchValue({ categoryId: categories[0].id });
        }
      },
      error: (error) => {
        // קטגוריות ברירת מחדל כשהשרת לא זמין
        this.categories = [
          { id: 1, name: 'עבודה', color: '#ff5722' },
          { id: 2, name: 'אישי', color: '#2196f3' },
          { id: 3, name: 'לימודים', color: '#4caf50' }
        ];
        this.taskForm.patchValue({ categoryId: 1 });
      }
    });
  }

  /**
   * טעינת משימה לעריכה
   */
  loadTaskForEdit(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.currentTask = task;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          categoryId: task.category.id,
          priority: task.priority
        });
      },
      error: (error) => {
        this.errorMessage = 'שגיאה בטעינת המשימה לעריכה';
      }
    });
  }

  /**
   * שליחת טופס יצירת/עריכת משימה
   */
  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      if (this.isEditMode && this.currentTask) {
        // עריכת משימה קיימת
        const selectedCategory = this.categories.find(c => c.id == this.taskForm.value.categoryId);
        const updatedTask = {
          ...this.currentTask,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          priority: this.taskForm.value.priority,
          category: selectedCategory || this.currentTask.category
        };

        this.taskService.updateTask(updatedTask).subscribe({
          next: (task) => {
            this.router.navigate(['/task', task.id]);
          },
          error: (error) => {
            this.errorMessage = 'שגיאה בעדכון המשימה';
            this.isLoading = false;
          }
        });
      } else {
        // יצירת משימה חדשה
        const newTask = {
          ...this.taskForm.value,
          isCompleted: false
        };

        this.taskService.createTask(newTask).subscribe({
          next: (task) => {
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            this.errorMessage = 'שגיאה ביצירת המשימה';
            this.isLoading = false;
          }
        });
      }
    }
  }

  /**
   * הוספת קטגוריה חדשה
   * שולח לשרת ומוסיף לרשימה המקומית
   */
  addCategory(): void {
    if (this.newCategoryName.trim()) {
      const newCategory = {
        name: this.newCategoryName.trim(),
        color: this.newCategoryColor
      };

      this.categoryService.createCategory(newCategory).subscribe({
        next: (category) => {
          // הוספה לרשימת הקטגוריות ובחירה אוטומטית
          this.categories.push(category);
          this.taskForm.patchValue({ categoryId: category.id });
          
          // איפוס הטופס וניקוי השדות
          this.showAddCategory = false;
          this.newCategoryName = '';
          this.newCategoryColor = '#ff5722';
        },
        error: (error) => {
          alert('שגיאה ביצירת קטגוריה');
        }
      });
    } else {
      alert('אנא הכנס שם לקטגוריה');
    }
  }

  /**
   * חזרה לרשימת המשימות
   */
  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  // Getters לגישה נוחה לשדות הטופס ב-template
  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get categoryId() { return this.taskForm.get('categoryId'); }
  get priority() { return this.taskForm.get('priority'); }
}