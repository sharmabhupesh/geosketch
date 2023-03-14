import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  Renderer2,
  SimpleChanges
} from "@angular/core";
import {createPopper,Modifier,Options, Placement, PositioningStrategy, State } from '@popperjs/core';
import { fromEvent, merge, Subject } from "rxjs";
import { filter, pluck, takeUntil } from "rxjs/operators";

export class PopperOptions {
  placement!: Placement;
  modifiers?: Partial<Modifier<any, any>>[];
  strategy?: PositioningStrategy;
  onFirstUpdate?: ((arg0: Partial<State>) => void) | undefined;
  offset?:number;
}

@Directive({
  selector: "[appPopper]"
})
export class PopperDirective implements OnInit, OnDestroy,OnChanges {
  // The hint to display
  @Input() target!: HTMLElement;
  // Its positioning (check docs for available options)
  @Input() options?: PopperOptions;
  // On Show Popper
  @Input() isShowPopper:boolean = false;

  // The popper instance
  private popperInstance: any;
  private config!: Options;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isShowPopper']){
      if(this.popperInstance) this.popperInstance.update();
    }
  }

  ngOnInit(): void {
    
    this.config = {
      placement: this.options?.placement ?? "auto",
      strategy: this.options?.strategy ?? 'fixed',
      onFirstUpdate:this.options?.onFirstUpdate ?? function(){},
      modifiers: [
        {
          name:"offset",
          options: {
            offset: [0, this.options?.offset ?? 0],
          },
        }
      ]
    };
    
    if(this.options && this.options.modifiers){
      this.config.modifiers.push(...this.options.modifiers);
    }
    
    // An element to position the hint relative to
    const reference = this.el.nativeElement;
    this.popperInstance = createPopper(reference, this.target, this.config);

  }

  ngOnDestroy(): void {
    if (!this.popperInstance) {
      return;
    }
    this.popperInstance.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }
}