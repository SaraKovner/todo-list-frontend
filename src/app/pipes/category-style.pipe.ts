import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../Models/task.model';

/**
 * Pipe מותאם אישית לעיצוב קטגוריות
 * ממיר קטגוריה לאובייקט עם צבע רקע, איקון ושם
 * שימוש: {{ task.category | categoryStyle }}
 * 
 * מחזיר אובייקט עם:
 * - backgroundColor: צבע רקע מהקטגוריה
 * - icon: איקון אמוג'י לפי שם הקטגוריה
 * - name: שם הקטגוריה
 */
@Pipe({
  name: 'categoryStyle',
  standalone: true
})
export class CategoryStylePipe implements PipeTransform {
  
  /**
   * ממיר קטגוריה לעיצוב מתאים
   * @param category אובייקט קטגוריה עם name ו-color
   * @returns אובייקט עם עיצוב (צבע, איקון, שם)
   */
  transform(category: Category): { backgroundColor: string, icon: string, name: string } {
    // מיפוי איקונים לפי שם הקטגוריה
    const iconMap: { [key: string]: string } = {
      'עבודה': '💼',
      'אישי': '🏠',
      'לימודים': '📚',
      'בריאות': '🏥',
      'קניות': '🛒',
      'ספורט': '⚽'
    };

    return {
      backgroundColor: category.color,
      icon: iconMap[category.name] || '📝', // איקון ברירת מחדל
      name: category.name
    };
  }
}