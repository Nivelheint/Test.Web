import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Advertisement, AdvertisementResponse} from './../models/advertisement.model';
import {HTTP_OPTIONS, URL_API} from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  getAdvertisements(pageNumber: number, pageSize: number, title: string, isActualDate: boolean) {
    return this.http.get<AdvertisementResponse>(`${URL_API}/Advertisements`,
      { params: { pageNumber, pageSize, title, isActualDate } }
    );
  }

  getAdvertisement(id: number) {
    return this.http.get<Advertisement>(`${URL_API}/Advertisements/${id}`);
  }

  createAdvertisement(entity: Advertisement) {
    return this.http.post<Advertisement>(`${URL_API}/Advertisements`, entity, { ...HTTP_OPTIONS });
  }

  updateAdvertisement(id: number, entity: Advertisement) {
    return this.http.put<Advertisement>(`${URL_API}/Advertisements/${id}`, entity, {
      ...HTTP_OPTIONS,
    });
  }

  deleteAdvertisement(id: number) {
    return this.http.delete(`${URL_API}/Advertisements/${id}`);
  }
}
