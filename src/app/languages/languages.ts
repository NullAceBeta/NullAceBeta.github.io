import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages';
import { Languages as LanguagesModel } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-languages',
  standalone: false,
  templateUrl: './languages.html',
  styleUrl: './languages.css',
})
export class Languages implements OnInit {

  languages: LanguagesModel[] = [];

  constructor(
    public languagesService: LanguagesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: LanguagesModel[]) => {
      this.languages = data;
      this.cdr.detectChanges();
    });
  }
}
