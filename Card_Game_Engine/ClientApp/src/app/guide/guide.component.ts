import {Component} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {MatIconButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [MarkdownModule, MatDialogClose, MatToolbar, MatIconButton, MatIcon],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
}
