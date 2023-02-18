import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page = 1;
  @Input() totalPages = 3;

  @Output() currentPage = new EventEmitter<number>();

  handleUp() {
    this.page += 1;
    this.currentPage.emit(this.page);
  }

  handleDown() {
    this.page -= 1;
    this.currentPage.emit(this.page);
  }
}
