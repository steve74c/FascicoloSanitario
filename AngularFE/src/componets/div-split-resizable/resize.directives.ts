import { Directive, Input, HostListener, ElementRef } from '@angular/core';
@Directive({
  selector: '[appResize]'
})
export class ResizeDirective {
  @Input('leftResize')
    leftElement!: HTMLElement;
  @Input('rightResize')
    rightElement!: HTMLElement;
  grabber: boolean = false; // false;
  width!: number;
  constructor(private el: ElementRef<HTMLElement>) { }
  @HostListener('window:resize', ['$event']) onResize(event :any) {
    this.width = event.target.outerWidth;
  }
  @HostListener('mousedown') onMouseDown() {
    this.grabber = true // true;
    this.el.nativeElement.classList.add('side-panel');
    document.body.style.cursor = 'e-resize';
    console.log( this.leftElement);
  }

  @HostListener('window:mouseup') onMouseUp() {
    this.grabber = false // false;
    this.el.nativeElement.classList.remove('side-panel');
    document.body.style.cursor = 'default';
  }

  
  @HostListener('window:mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (this.grabber==true) {
      event.preventDefault();
      this.leftElement.style.flex = `0 0 ${event.clientX}px`;
    }
  }
}
 