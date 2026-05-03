import { Component, OnInit, inject, signal } from '@angular/core';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private portfolioService = inject(PortfolioService) as PortfolioService;

  // Señales para almacenar los datos
  headerData = signal<any>({});
  educationList = signal<any[]>([]);
  experienceList = signal<any[]>([]);
  skillsList = signal<any[]>([]);
  certificatesList = signal<any[]>([]);
  languagesList = signal<any[]>([]);
  interestsList = signal<any[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Especificamos (data: any) para que TypeScript estricto no marque error
    this.portfolioService.getHeader().subscribe((data: any) => {
      this.headerData.set(data);
    });

    this.portfolioService.getEducation().subscribe((data: any[]) => {
      this.educationList.set(data);
    });

    this.portfolioService.getWorkExperience().subscribe((data: any[]) => {
      this.experienceList.set(data);
    });
    
    this.portfolioService.getSkills().subscribe((data: any[]) => {
      this.skillsList.set(data);
    });

    this.portfolioService.getCertificates().subscribe((data: any[]) => {
      this.certificatesList.set(data);
    });

    this.portfolioService.getLanguages().subscribe((data: any[]) => {
      this.languagesList.set(data);
    });

    this.portfolioService.getInterests().subscribe((data: any[]) => {
      this.interestsList.set(data);
    });
  }
}
