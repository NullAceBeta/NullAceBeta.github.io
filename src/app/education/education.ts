import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { EducationService } from '../services/education-service/education';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.html'
})
export class Education implements OnInit {
  educationList: any[] = [];

  constructor(private educationService: EducationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.educationService.getEducation().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any[]) => {
      this.educationList = data;
      this.cdr.detectChanges(); // Forzamos el renderizado con los datos de Firebase
    });
  }
}
