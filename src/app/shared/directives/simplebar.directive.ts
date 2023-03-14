import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import SimpleBar from 'simplebar';
 
@Directive({
  selector: '[appSimplebar]'
})
export class SimplebarDirective implements AfterViewInit {

  private ngSimpleBar: undefined | SimpleBar;

  constructor(private readonly ngSimpleBarRef: ElementRef) { }
  
  ngAfterViewInit():void{
    this.initializeSimplebar();
  }

  private initializeSimplebar(): void {
    if (this.ngSimpleBar === undefined && this.ngSimpleBarRef){
      this.ngSimpleBar = new SimpleBar(this.ngSimpleBarRef.nativeElement,{autoHide:true});
    }
  }

}
