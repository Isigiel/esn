import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Section } from '@esn/client/core/models';

@Component({
  selector: 'esn-section-info',
  template: `
    <h1>{{ section.name }}</h1>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionInfoComponent {
  @Input() section: Section;
  constructor() {}
}
