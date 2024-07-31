import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  get baseUrl(): string {
    return `${this.document.location.protocol}//${this.document.location.host}`;
  }
}
