import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {enableProdMode} from "@angular/core";
import bootstrap from "./main.server";
import {environment} from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

// Ensure `bootstrap` is not conflicting with `bootstrapApplication`
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if (environment.production) {
  console.log("Production mode");
  bootstrap();
}
//I am not sure what if this update is correct
