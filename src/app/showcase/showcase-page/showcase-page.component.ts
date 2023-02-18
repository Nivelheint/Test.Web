import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdvertisementService } from './../services/advertisement.service';
import { Advertisement } from './../models/advertisement.model';
import { Subscription } from 'rxjs';
import { mocks } from 'src/app/constants';

@Component({
  selector: 'app-showcase-page',
  templateUrl: './showcase-page.component.html',
  styleUrls: ['./showcase-page.component.scss'],
})
export class ShowcasePageComponent implements OnInit, OnDestroy {
  constructor(private advertisementService: AdvertisementService) {}

  advertisements: Advertisement[] = mocks;

  isCreate = false;

  isUpdate = false;

  isDisplayPopup = false;

  advertisementUpdate: Advertisement = {} as Advertisement;

  queryParams = {
    pageNumber: 1, pageSize: 20, title: 'null', isActualDate: false, totalPages: 1
  }

  private subscription = new Subscription();

  ngOnInit(): void {
    this.setAdvertisements();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCreate() {
    this.isCreate = true;
  }

  handleUpdate(advertisement: Advertisement) {
    this.advertisementUpdate = advertisement;
    this.isUpdate = true;
  }

  handlePopupAnswer = (answer: boolean) => {};

  handleDelete(id: number) {
    this.isDisplayPopup = true;
    this.handlePopupAnswer = (answer: boolean) => {
      if (answer) {
        const subAdDel = this.advertisementService
          .deleteAdvertisement(id)
          .subscribe(() => {
            this.setAdvertisements();
          });
        this.subscription.add(subAdDel);
        this.isDisplayPopup = false;
      } else {
        this.isDisplayPopup = false;
      }
    }
  }

  setAdvertisements() {
    const subAds = this.advertisementService
      .getAdvertisements(this.queryParams.pageNumber, this.queryParams.pageSize, this.queryParams.title, this.queryParams.isActualDate)
      .subscribe((data) => {
        this.advertisements = data.result;
        this.queryParams.totalPages = data.pageInfo.totalPages;
      });
    this.subscription.add(subAds);
  }

  reset() {
    this.isCreate = false;
    this.isUpdate = false;
    this.setAdvertisements();
  }

  handlePagination(page: number) {
    this.queryParams.pageNumber = page;
    this.setAdvertisements();
  }
}
