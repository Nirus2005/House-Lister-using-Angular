import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ RouterModule],
  template:  `
    <main>
        <header class="navbar" >
          <img class="brand-logo" src="Logo.png" alt="logo" aria-hidden="true" [routerLink]="['/']" />
          <div class="brand-text" [routerLink]="['/']">Oglo</div>
        </header>
        
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  ` ,
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'homes';
}
