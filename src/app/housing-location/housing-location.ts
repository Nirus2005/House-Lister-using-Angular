import { Component, Input, input } from '@angular/core';
import {HousingLocationInfo} from '../housinglocation';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-housing-location',
  imports: [RouterModule],
  template: `
    <section class="listing" [routerLink]="['/details', housingLocation().id]">
      <img
        class="listing-photo"
        [src]="housingLocation().photo"
        alt="Exterior photo of {{ housingLocation().name }}"
        crossorigin

      />
      <h2 class="listing-heading"> {{ housingLocation().name }} </h2>
      <section class="listing-bottom">
        <p class="listing-location"> <i class="fa-solid fa-location-dot"></i> {{ housingLocation().city }}, {{ housingLocation().state }} </p>
      </section>
    </section>
  `,
  styleUrl: './housing-location.css'
})
export class HousingLocation {
  housingLocation = input.required<HousingLocationInfo>();
}
