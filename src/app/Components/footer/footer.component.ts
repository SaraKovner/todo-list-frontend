import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * קומפוננט Footer עם זכויות יוצרים והדגשה שזה פרויקט לימודי
 * מופיע בתחתית כל העמודים
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}