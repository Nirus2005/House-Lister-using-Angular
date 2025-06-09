import { Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.services';
import {HousingLocationInfo} from '../housinglocation';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <article>
      <section class="image-container" [ngStyle]="{
            'background-image': 'url(' + housingLocation?.photo + ')'
          }">
        <section class="listing-features">
            <li>
              <section class="big">
                {{ housingLocation?.availableUnits }}
              </section>
              <section class="section-heading">Available Units</section>
            </li>
            <li>
              <section class="big">
                <i *ngIf="housingLocation?.wifi; else noWifi" class="fa-solid fa-check" style="color: green;"></i>
                <ng-template #noWifi>
                  <i style="color: red;" class="fa-solid fa-xmark"></i>
                </ng-template>
              </section>
              <section class="section-heading">Wifi Availability</section>
            </li>
            <li>
              <section class="big">
                <i *ngIf="housingLocation?.laundry; else noLaundry" class="fa-solid fa-check" style="color: green;"></i>
                <ng-template #noLaundry>
                  <i style="color: red;" class="fa-solid fa-xmark"></i>
                </ng-template>
              </section>
              <section class="section-heading">Laundry Service</section>
            </li>
        </section>
      </section>

      <section class="heading-form">

        <section class="listing-description">
          <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
          <p class="listing-location"><i class="fa-solid fa-location-dot"></i>  {{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
        </section>
        
        <section class="listing-apply">
          <form [formGroup]="applyForm" (submit)="submitApplication()">
            <h2 class="section-heading">Apply now to live here</h2>
            <label for="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="First Name" formControlName="firstName" />
            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" placeholder="Last Name" formControlName="lastName" />
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="email@example.com" formControlName="email" />
            <button type="submit" class="btn">Book now</button>
          </form>
        </section>

      </section>

    </article>
  `,
  styleUrls: ['./details.css'],
})

export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation:  HousingLocationInfo|undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'],10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation)=>{
      this.housingLocation = housingLocation;
    });   
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}
