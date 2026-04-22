import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { HeaderService } from '../services/header-service/header';
import { Header as HeaderModel } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css' // Ojo: mantén styleUrl si así estaba en tu archivo original
})
export class Header implements OnInit { 
  
  header: HeaderModel = new HeaderModel();

  constructor(public headerService: HeaderService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.headerService.getHeader().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe((data: any) => {
      // Como solo hay un CV, tomamos el documento en la posición 0
      if (data && data.length > 0) {
        this.header = data[0]; 
        console.log("¡Datos de Firebase conectados con éxito!", this.header);
        
        // Obligamos al HTML a pintarse de nuevo con los datos reales
        this.cdr.detectChanges(); 
      }
    });
  }
}
