import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Sonnet } from '../../models/sonnet';



@Component( {
  selector: 'app-list-item',
  styleUrls: [ './list-item.component.scss' ],
  template: `
   <div class="list-item">
     <label for="">{{ sonnet.number}}</label>
     <div class="" *ngFor="let line of sonnet.lines">{{ line }}</div>

   </div>
  `,
} )
export class ListItemComponent implements OnInit {
  @Input() sonnet: Sonnet;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
