import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  @Input() text: string = '';
  isShowing: boolean = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.isShowing = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isShowing = false;
  }
}
