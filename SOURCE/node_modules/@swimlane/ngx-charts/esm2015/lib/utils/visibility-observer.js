import { Output, EventEmitter, NgZone, Directive, ElementRef } from '@angular/core';
/**
 * Visibility Observer
 */
export class VisibilityObserver {
    constructor(element, zone) {
        this.element = element;
        this.zone = zone;
        this.visible = new EventEmitter();
        this.isVisible = false;
        this.runCheck();
    }
    destroy() {
        clearTimeout(this.timeout);
    }
    onVisibilityChange() {
        // trigger zone recalc for columns
        this.zone.run(() => {
            this.isVisible = true;
            this.visible.emit(true);
        });
    }
    runCheck() {
        const check = () => {
            if (!this.element) {
                return;
            }
            // https://davidwalsh.name/offsetheight-visibility
            const { offsetHeight, offsetWidth } = this.element.nativeElement;
            if (offsetHeight && offsetWidth) {
                clearTimeout(this.timeout);
                this.onVisibilityChange();
            }
            else {
                clearTimeout(this.timeout);
                this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => check(), 100);
                });
            }
        };
        this.zone.runOutsideAngular(() => {
            this.timeout = setTimeout(() => check());
        });
    }
}
VisibilityObserver.decorators = [
    { type: Directive, args: [{
                selector: 'visibility-observer'
            },] }
];
VisibilityObserver.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
VisibilityObserver.propDecorators = {
    visible: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaWJpbGl0eS1vYnNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi91dGlscy92aXNpYmlsaXR5LW9ic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBGOztHQUVHO0FBSUgsTUFBTSxPQUFPLGtCQUFrQjtJQU03QixZQUFvQixPQUFtQixFQUFVLElBQVk7UUFBekMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUFMbkQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzFELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFHekIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxPQUFPO1FBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsT0FBTzthQUNSO1lBRUQsa0RBQWtEO1lBQ2xELE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFFakUsSUFBSSxZQUFZLElBQUksV0FBVyxFQUFFO2dCQUMvQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUMzQjtpQkFBTTtnQkFDTCxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUMvQixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2FBQ2hDOzs7WUFQaUQsVUFBVTtZQUE3QixNQUFNOzs7c0JBU2xDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdXRwdXQsIEV2ZW50RW1pdHRlciwgTmdab25lLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBWaXNpYmlsaXR5IE9ic2VydmVyXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3Zpc2liaWxpdHktb2JzZXJ2ZXInXG59KVxuZXhwb3J0IGNsYXNzIFZpc2liaWxpdHlPYnNlcnZlciB7XG4gIEBPdXRwdXQoKSB2aXNpYmxlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0aW1lb3V0OiBhbnk7XG4gIGlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLnJ1bkNoZWNrKCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICB9XG5cbiAgb25WaXNpYmlsaXR5Q2hhbmdlKCk6IHZvaWQge1xuICAgIC8vIHRyaWdnZXIgem9uZSByZWNhbGMgZm9yIGNvbHVtbnNcbiAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMudmlzaWJsZS5lbWl0KHRydWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcnVuQ2hlY2soKTogdm9pZCB7XG4gICAgY29uc3QgY2hlY2sgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL29mZnNldGhlaWdodC12aXNpYmlsaXR5XG4gICAgICBjb25zdCB7IG9mZnNldEhlaWdodCwgb2Zmc2V0V2lkdGggfSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICBpZiAob2Zmc2V0SGVpZ2h0ICYmIG9mZnNldFdpZHRoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiBjaGVjaygpLCAxMDApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gY2hlY2soKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==