import {Routes} from '@angular/router';
import {CreateGameComponent} from "./create-game/create-game.component";
import {PlayGameComponent} from "./play-game/play-game.component";
import {HomeComponent} from "./home/home.component";
import {homeGuard} from "./shared/guards/home.guard";
import {createGameGuard} from "./shared/guards/create-game.guard";
import {playGameGuard} from "./shared/guards/play-game.guard";

export const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [homeGuard]},
  {path: 'create', component: CreateGameComponent, canActivate: [createGameGuard]},
  {path: 'play', component: PlayGameComponent, canActivate: [playGameGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

