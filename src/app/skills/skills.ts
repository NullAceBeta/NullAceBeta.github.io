import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.html'
})
export class Skills implements OnInit {
  skillsList: any[] = [];

  constructor(private skillsService: SkillsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any[]) => {
      this.skillsList = data;
      this.cdr.detectChanges();
    });
  }
}
