import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() text = '';

  @Output() answer = new EventEmitter<boolean>();

  handleYes() {
    this.answer.emit(true);
  }

  handleNo() {
    this.answer.emit(true);
  }
}
