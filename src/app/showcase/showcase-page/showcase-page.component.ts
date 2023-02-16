import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdvertisementService } from './../services/advertisement.service';
import { Advertisement } from './../models/advertisement.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
})
export class ShowcasePageComponent implements OnInit, OnDestroy {
  constructor(private advertisementService: AdvertisementService) {}

  advertisements: Advertisement[] = [];

  isCreate = false;

  isUpdate = false;

  advertisementUpdate: Advertisement = {} as Advertisement;

  private subscription = new Subscription();

  ngOnInit(): void {
    const subAds = this.advertisementService
      .getAdvertisements()
      .subscribe((data) => {
        this.advertisements = data;
      });
    this.subscription.add(subAds);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCreate() {
    this.isCreate = true;
  }

  handleUpdate(advertisement: Advertisement) {
    this.isUpdate = true;
    this.advertisementUpdate = advertisement;
  }

  handleDelete(id: number) {
    const subAdDel = this.advertisementService
      .deleteAdvertisement(id)
      .subscribe(() => {});
    this.subscription.add(subAdDel);
  }

  reset() {
    this.isCreate = false;
    this.isUpdate = false;
  }
}
