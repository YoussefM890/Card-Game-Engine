import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {enableProdMode} from "@angular/core";
import bootstrap from "./main.server";
import {environment} from "./environments/environment";
import {hmrBootstrap} from "../hmr";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
if (environment.production) {
  enableProdMode();
  bootstrap()
} else {
  if (module['hot']) {
    hmrBootstrap(module, bootstrap);
  } else {
    bootstrap();
  }
}
