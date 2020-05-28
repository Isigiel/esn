import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[esnIconSrc]',
})
export class IconSrcDirective implements OnChanges {
  @Input() esnIconSrc: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.esnIconSrc?.currentValue) {
      const iconString = changes.esnIconSrc.currentValue;
      const [icon, style] = iconString.split(':');
      const src = `https://api-img.icons8.com/${style ?? 'color'}/192/${
        icon ?? ''
      }.svg?token=9b757a847e9a44b7d84dc1c200a3b92ecf6274b2`;
      this.el.nativeElement.src = src;
    }
  }
}
