import { AfterViewInit, Directive, ElementRef, Input,OnChanges,OnDestroy, Renderer2 } from '@angular/core';
import TomSelect from 'tom-select';

@Directive({
  selector: '[appTomselect]'
})
export class TomselectDirective implements AfterViewInit,OnChanges,OnDestroy {

  @Input() config!: HTMLElement;
  
  private ngTomSelect: undefined | TomSelect;

  constructor(private readonly ngTomSelectRef: ElementRef,private readonly renderer: Renderer2) { }

  ngAfterViewInit():void{
    this.initializeTomSelect();
  }

  ngOnChanges():void{

  }

  ngOnDestroy(): void {
    
  }

  private initializeTomSelect(): void {
    if (this.ngTomSelect === undefined && this.ngTomSelectRef){
      this.ngTomSelect = new TomSelect(this.ngTomSelectRef.nativeElement,{create: false});
    }
  }

}
