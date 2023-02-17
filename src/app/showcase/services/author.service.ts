import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Advertisement} from "../models/advertisement.model";
import {URL_API} from "../../constants";
import {Author} from "../models/author.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http.get<Author[]>(`${URL_API}/Authors`);
  }
}
