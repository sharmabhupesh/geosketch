import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output } from '@angular/core';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'button-primary',
  template: `
    <button
      [type]="type"
      [disabled]="loading$ | async"
      class="btn mt-5 w-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
      [ngClass]="class"
      matRipple
      matRippleColor="primary">
      <span *ngIf="loading$ | async">
        <svg
          class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </span>
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() loading$!: Observable<boolean>;
  @Input() class!: string;
  
  constructor(private ngZone: NgZone,private elementRef: ElementRef){}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true });
    });
  }
}
