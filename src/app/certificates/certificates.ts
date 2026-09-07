import { Component } from '@angular/core';

interface Certificate {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class Certificates {
  certificates: Certificate[] = [
    {
      name: 'Python',
      imageUrl: 'https://res.cloudinary.com/dzjnywhya/image/upload/v1788795055/Carlos_Jes%C3%BAs_M%C3%A9ndez_Coria_-_Python_urmy60.png'
    },
    {
      name: 'Pandas',
      imageUrl: 'https://res.cloudinary.com/dzjnywhya/image/upload/v1788795030/Carlos_Jes%C3%BAs_M%C3%A9ndez_Coria_-_Pandas_r6jmah.png'
    }
  ];
}
