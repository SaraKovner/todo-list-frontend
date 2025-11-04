import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * דירקטיבה מותאמת אישית להדגשת עדיפות משימות
 * מוסיפה קלאס CSS בהתאם לרמת העדיפות
 * שימוש: [appHighlightPriority]="task.priority"
 * 
 * תומכת בעדיפויות:
 * - גבוהה/high -> border-left אדום
 * - בינונית/medium -> border-left צהוב
 * - נמוכה/low -> border-left ירוק
 */
@Directive({
  selector: '[appHighlightPriority]',
  standalone: true
})
export class HighlightPriorityDirective implements OnInit {
  @Input() appHighlightPriority: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.applyHighlight();
  }

  /**
   * החלת סגנון בהתאם לרמת העדיפות
   * מנקה קלאסים קודמים ומוסיף קלאס חדש
   */
  private applyHighlight(): void {
    const priority = this.appHighlightPriority.toLowerCase();
    
    // הסרת כל הקלאסים הקודמים
    this.renderer.removeClass(this.el.nativeElement, 'priority-high');
    this.renderer.removeClass(this.el.nativeElement, 'priority-medium');
    this.renderer.removeClass(this.el.nativeElement, 'priority-low');

    // הוספת קלאס לפי עדיפות - תומך גם בעברית וגם באנגלית
    switch (priority) {
      case 'גבוהה':
      case 'high':
        this.renderer.addClass(this.el.nativeElement, 'priority-high');
        break;
      case 'בינונית':
      case 'medium':
        this.renderer.addClass(this.el.nativeElement, 'priority-medium');
        break;
      case 'נמוכה':
      case 'low':
      default:
        this.renderer.addClass(this.el.nativeElement, 'priority-low');
        break;
    }
  }


}