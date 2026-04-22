import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 1. Importaciones para Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

// 2. Importación de tus componentes
import { App } from './app'; 
import { Header } from './header/header';
import { Skills } from './skills/skills';
import { WorkExperience } from './work-experience/work-experience';
import { Certificates } from './certificates/certificates';
import { Education } from './education/education';
import { Languages } from './languages/languages';
import { Interests } from './interests/interests';

@NgModule({
  declarations: [
    App,
    Header,
    Skills,
    WorkExperience,
    Certificates,
    Education,
    Languages,
    Interests
  ],
  imports: [
    BrowserModule,
    // Inicialización de Firebase con las credenciales de tu environment
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
