import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-apr-percent',
  templateUrl: './apr-percent.component.html',
  styleUrls: ['./apr-percent.component.scss']
})
export class AprPercentComponent {
  @Input() aprPercent: number =  0;
}
