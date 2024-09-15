import {Component} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';
import {MatButton} from "@angular/material/button";
import {MatDialogClose} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [MarkdownModule, MatButton, MatDialogClose, MatToolbar],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
}
