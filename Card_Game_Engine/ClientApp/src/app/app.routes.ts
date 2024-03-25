import {Routes} from '@angular/router';
import {CreateGameComponent} from "./create-game/create-game.component";
import {PlayGameComponent} from "./play-game/play-game.component";

export const routes: Routes = [
  {path: 'create', component: CreateGameComponent},
  {path: 'play', component: PlayGameComponent},
  {path: '', redirectTo: '/play', pathMatch: 'full'},
  {path: '**', redirectTo: '/play'}
];

