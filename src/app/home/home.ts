import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.services';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocation],
  template: ` <section>
      <div class="hero">
        <div class="overlay"></div>
        <div class="content">
          <div class="top">
            <h1>YOUR DREAM HOME</h1>
            <p>IS ONE CLICK AWAY</p>
          </div>
          <div class="bottom">
            <form class="hero-content-search" (submit)="onSubmit($event)">
              <input type="text" placeholder="Filter by city"  #filter />
              <button
              class="primary"
              type="button"
              (click)="filterResults(filter.value)"
              >
              Search
            </button>
          </form>
        </div>
      </div>
      </div>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>`,
  styleUrl: './home.css',
})
export class Home {
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocationInfo[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    } 
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    // Scroll down exactly 1vh
    window.scrollBy({
      top: window.innerHeight, // 1vh
      behavior: 'smooth'
    });
  }
  onSubmit(event:any) {
    event.preventDefault();
    const filterText = (document.querySelector('input') as HTMLInputElement)?.value;
    this.filterResults(filterText);
  }
}
