import {Directive, Renderer, ElementRef} from "@angular/core";

@Directive({
  selector: '[vuFocus]'
})
export class FocusDirective {
  constructor(private renderer: Renderer, private elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
  }
}
