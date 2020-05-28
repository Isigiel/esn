import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Section } from '@esn/client/core/models';

@Component({
  selector: 'esn-section-list',
  template: `
    <esn-section-list-item
      *ngFor="let section of sections; trackBy: trackById"
      [section]="section"
      (delete)="delete.emit($event)"
    ></esn-section-list-item>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionListComponent {
  @Input() sections: Section[];
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  trackById(index, item) {
    return item.id;
  }
}
