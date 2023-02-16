import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Advertisement } from './../models/advertisement.model';
import { URL_API } from 'src/app/constants';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AdvertisementService {
  constructor(private http: HttpClient) {}

  getAdvertisements() {
    return this.http.get<Advertisement[]>(URL_API);
  }

  getAdvertisement(id: number) {
    return this.http.get<Advertisement>(`${URL_API}/${id}`);
  }

  createAdvertisement(entity: Advertisement) {
    return this.http.post<Advertisement>(URL_API, entity, { ...HTTP_OPTIONS });
  }

  updateAdvertisement(id: number, entity: Advertisement) {
    return this.http.put<Advertisement>(`${URL_API}/${id}`, entity, {
      ...HTTP_OPTIONS,
    });
  }

  deleteAdvertisement(id: number) {
    return this.http.delete(`${URL_API}/${id}`);
  }
}
