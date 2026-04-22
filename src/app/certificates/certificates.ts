import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.html'
})
export class Certificates implements OnInit {
  certificates: any[] = [];

  constructor(private certificatesService: CertificatesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes => changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })))
    ).subscribe(data => {
      this.certificates = data;
      this.cdr.detectChanges();
    });
  }
}
