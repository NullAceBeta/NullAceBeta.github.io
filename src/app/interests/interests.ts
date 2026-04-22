import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interests',
  standalone: false,
  templateUrl: './interests.html'
})
export class Interests implements OnInit {
  interestsList: any[] = [];

  constructor(private interestsService: InterestsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe((data: any[]) => {
      this.interestsList = data;
      this.cdr.detectChanges();
    });
  }
}
