import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
/**
 * Mousewheel directive
 * https://github.com/SodhanaLibrary/angular2-examples/blob/master/app/mouseWheelDirective/mousewheel.directive.ts
 *
 * @export
 */
// tslint:disable-next-line: directive-selector
export class MouseWheelDirective {
    constructor() {
        this.mouseWheelUp = new EventEmitter();
        this.mouseWheelDown = new EventEmitter();
    }
    onMouseWheelChrome(event) {
        this.mouseWheelFunc(event);
    }
    onMouseWheelFirefox(event) {
        this.mouseWheelFunc(event);
    }
    onWheel(event) {
        this.mouseWheelFunc(event);
    }
    onMouseWheelIE(event) {
        this.mouseWheelFunc(event);
    }
    mouseWheelFunc(event) {
        if (window.event) {
            event = window.event;
        }
        const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail || event.deltaY || event.deltaX));
        // Firefox don't have native support for wheel event, as a result delta values are reverse
        const isWheelMouseUp = event.wheelDelta ? delta > 0 : delta < 0;
        const isWheelMouseDown = event.wheelDelta ? delta < 0 : delta > 0;
        if (isWheelMouseUp) {
            this.mouseWheelUp.emit(event);
        }
        else if (isWheelMouseDown) {
            this.mouseWheelDown.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    }
}
MouseWheelDirective.decorators = [
    { type: Directive, args: [{ selector: '[mouseWheel]' },] }
];
MouseWheelDirective.propDecorators = {
    mouseWheelUp: [{ type: Output }],
    mouseWheelDown: [{ type: Output }],
    onMouseWheelChrome: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
    onMouseWheelFirefox: [{ type: HostListener, args: ['DOMMouseScroll', ['$event'],] }],
    onWheel: [{ type: HostListener, args: ['wheel', ['$event'],] }],
    onMouseWheelIE: [{ type: HostListener, args: ['onmousewheel', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW91c2Utd2hlZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3dpbWxhbmUvbmd4LWdyYXBoL3NyYy9saWIvZ3JhcGgvbW91c2Utd2hlZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUU7Ozs7O0dBS0c7QUFDSCwrQ0FBK0M7QUFFL0MsTUFBTSxPQUFPLG1CQUFtQjtJQURoQztRQUdFLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUE2Q3RDLENBQUM7SUExQ0Msa0JBQWtCLENBQUMsS0FBVTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFHRCxtQkFBbUIsQ0FBQyxLQUFVO1FBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUdELE9BQU8sQ0FBQyxLQUFVO1FBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUdELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFVO1FBQ3ZCLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QjtRQUVELE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuSCwwRkFBMEY7UUFDMUYsTUFBTSxjQUFjLEdBQVksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN6RSxNQUFNLGdCQUFnQixHQUFZLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDM0UsSUFBSSxjQUFjLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLGdCQUFnQixFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsU0FBUztRQUNULEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRTFCLHlCQUF5QjtRQUN6QixJQUFJLEtBQUssQ0FBQyxjQUFjLEVBQUU7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7O1lBakRGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7OzsyQkFFcEMsTUFBTTs2QkFFTixNQUFNO2lDQUdOLFlBQVksU0FBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0NBS3JDLFlBQVksU0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFLekMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs2QkFLaEMsWUFBWSxTQUFDLGNBQWMsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIE1vdXNld2hlZWwgZGlyZWN0aXZlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU29kaGFuYUxpYnJhcnkvYW5ndWxhcjItZXhhbXBsZXMvYmxvYi9tYXN0ZXIvYXBwL21vdXNlV2hlZWxEaXJlY3RpdmUvbW91c2V3aGVlbC5kaXJlY3RpdmUudHNcbiAqXG4gKiBAZXhwb3J0XG4gKi9cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbW91c2VXaGVlbF0nIH0pXG5leHBvcnQgY2xhc3MgTW91c2VXaGVlbERpcmVjdGl2ZSB7XG4gIEBPdXRwdXQoKVxuICBtb3VzZVdoZWVsVXAgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKVxuICBtb3VzZVdoZWVsRG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASG9zdExpc3RlbmVyKCdtb3VzZXdoZWVsJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZVdoZWVsQ2hyb21lKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm1vdXNlV2hlZWxGdW5jKGV2ZW50KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZVdoZWVsRmlyZWZveChldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5tb3VzZVdoZWVsRnVuYyhldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aGVlbCcsIFsnJGV2ZW50J10pXG4gIG9uV2hlZWwoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW91c2VXaGVlbEZ1bmMoZXZlbnQpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignb25tb3VzZXdoZWVsJywgWyckZXZlbnQnXSlcbiAgb25Nb3VzZVdoZWVsSUUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMubW91c2VXaGVlbEZ1bmMoZXZlbnQpO1xuICB9XG5cbiAgbW91c2VXaGVlbEZ1bmMoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICh3aW5kb3cuZXZlbnQpIHtcbiAgICAgIGV2ZW50ID0gd2luZG93LmV2ZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGRlbHRhOiBudW1iZXIgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZXZlbnQud2hlZWxEZWx0YSB8fCAtZXZlbnQuZGV0YWlsIHx8IGV2ZW50LmRlbHRhWSB8fCBldmVudC5kZWx0YVgpKTtcbiAgICAvLyBGaXJlZm94IGRvbid0IGhhdmUgbmF0aXZlIHN1cHBvcnQgZm9yIHdoZWVsIGV2ZW50LCBhcyBhIHJlc3VsdCBkZWx0YSB2YWx1ZXMgYXJlIHJldmVyc2VcbiAgICBjb25zdCBpc1doZWVsTW91c2VVcDogYm9vbGVhbiA9IGV2ZW50LndoZWVsRGVsdGEgPyBkZWx0YSA+IDAgOiBkZWx0YSA8IDA7XG4gICAgY29uc3QgaXNXaGVlbE1vdXNlRG93bjogYm9vbGVhbiA9IGV2ZW50LndoZWVsRGVsdGEgPyBkZWx0YSA8IDAgOiBkZWx0YSA+IDA7XG4gICAgaWYgKGlzV2hlZWxNb3VzZVVwKSB7XG4gICAgICB0aGlzLm1vdXNlV2hlZWxVcC5lbWl0KGV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzV2hlZWxNb3VzZURvd24pIHtcbiAgICAgIHRoaXMubW91c2VXaGVlbERvd24uZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgLy8gZm9yIElFXG4gICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgIC8vIGZvciBDaHJvbWUgYW5kIEZpcmVmb3hcbiAgICBpZiAoZXZlbnQucHJldmVudERlZmF1bHQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=