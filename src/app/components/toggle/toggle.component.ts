import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent {
  isActive: boolean = false;
  toggleCheckbox() {
    this.isActive = !this.isActive;
  }
}
