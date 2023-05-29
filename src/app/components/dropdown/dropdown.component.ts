import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormControl } from "@angular/forms";

interface CarOption {
  name: string;
  apr: number;
}
type DropdownOption = CarOption | number;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() control: FormControl = new FormControl();
  @Input() showSearches: boolean = false;
  @Output() showSearchesChange = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler() {
    this.showSearchesChange.emit(false);
  }

  @HostListener('document:click', ['$event'])
  public onClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showSearchesChange.emit(false);
    }
  }

  constructor(private elRef: ElementRef) {}

  isCarOption(option: DropdownOption): option is CarOption {
    return (option as CarOption).name !== undefined;
  }

  toggle() {
    this.showSearchesChange.emit(!this.showSearches);

  }
}
