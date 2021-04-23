import { Component, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef } from '@angular/core';
import { count, decimalChecker } from './count.helper';
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 */
export class CountUpDirective {
    constructor(cd, element) {
        this.cd = cd;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new EventEmitter();
        this.countFinish = new EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    set countDecimals(val) {
        this._countDecimals = val;
    }
    get countDecimals() {
        if (this._countDecimals)
            return this._countDecimals;
        return decimalChecker(this.countTo);
    }
    set countTo(val) {
        this._countTo = parseFloat(val);
        this.start();
    }
    get countTo() {
        return this._countTo;
    }
    set countFrom(val) {
        this._countFrom = parseFloat(val);
        this.start();
    }
    get countFrom() {
        return this._countFrom;
    }
    ngOnDestroy() {
        cancelAnimationFrame(this.animationReq);
    }
    start() {
        cancelAnimationFrame(this.animationReq);
        const valueFormatting = this.valueFormatting || (value => `${this.countPrefix}${value.toLocaleString()}${this.countSuffix}`);
        const callback = ({ value, progress, finished }) => {
            this.value = valueFormatting(value);
            this.cd.markForCheck();
            if (!finished)
                this.countChange.emit({ value: this.value, progress });
            if (finished)
                this.countFinish.emit({ value: this.value, progress });
        };
        this.animationReq = count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    }
}
CountUpDirective.decorators = [
    { type: Component, args: [{
                selector: '[ngx-charts-count-up]',
                template: ` {{ value }} `
            },] }
];
CountUpDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef }
];
CountUpDirective.propDecorators = {
    countDuration: [{ type: Input }],
    countPrefix: [{ type: Input }],
    countSuffix: [{ type: Input }],
    valueFormatting: [{ type: Input }],
    countDecimals: [{ type: Input }],
    countTo: [{ type: Input }],
    countFrom: [{ type: Input }],
    countChange: [{ type: Output }],
    countFinish: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9jb3VudC9jb3VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBYSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RDs7Ozs7Ozs7R0FRRztBQUtILE1BQU0sT0FBTyxnQkFBZ0I7SUFrRDNCLFlBQW9CLEVBQXFCLEVBQUUsT0FBbUI7UUFBMUMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFqRGhDLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBaUN4QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTNDLFVBQUssR0FBUSxFQUFFLENBQUM7UUFLUixtQkFBYyxHQUFXLENBQUMsQ0FBQztRQUMzQixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFHN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBQzdDLENBQUM7SUE5Q0QsSUFDSSxhQUFhLENBQUMsR0FBVztRQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsSUFBSSxJQUFJLENBQUMsY0FBYztZQUFFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNwRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLEdBQUc7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUNJLFNBQVMsQ0FBQyxHQUFHO1FBQ2YsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBb0JELFdBQVc7UUFDVCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELEtBQUs7UUFDSCxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFeEMsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFFdkcsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxRQUFRO2dCQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN0RSxJQUFJLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUcsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUsZUFBZTthQUMxQjs7O1lBZmdELGlCQUFpQjtZQUFhLFVBQVU7Ozs0QkFpQnRGLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBRUwsS0FBSztzQkFVTCxLQUFLO3dCQVVMLEtBQUs7MEJBVUwsTUFBTTswQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvdW50LCBkZWNpbWFsQ2hlY2tlciB9IGZyb20gJy4vY291bnQuaGVscGVyJztcblxuLyoqXG4gKiBDb3VudCB1cCBjb21wb25lbnRcbiAqXG4gKiBMb29zZWx5IGluc3BpcmVkIGJ5OlxuICogIC0gaHR0cHM6Ly9naXRodWIuY29tL2l6dXBldC9hbmd1bGFyMi1jb3VudG9cbiAqICAtIGh0dHBzOi8vaW5vcmdhbmlrLmdpdGh1Yi5pby9jb3VudFVwLmpzL1xuICpcbiAqIEBleHBvcnRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25neC1jaGFydHMtY291bnQtdXBdJyxcbiAgdGVtcGxhdGU6IGAge3sgdmFsdWUgfX0gYFxufSlcbmV4cG9ydCBjbGFzcyBDb3VudFVwRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgY291bnREdXJhdGlvbjogbnVtYmVyID0gMTtcbiAgQElucHV0KCkgY291bnRQcmVmaXg6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSBjb3VudFN1ZmZpeDogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBjb3VudERlY2ltYWxzKHZhbDogbnVtYmVyKSB7XG4gICAgdGhpcy5fY291bnREZWNpbWFscyA9IHZhbDtcbiAgfVxuXG4gIGdldCBjb3VudERlY2ltYWxzKCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMuX2NvdW50RGVjaW1hbHMpIHJldHVybiB0aGlzLl9jb3VudERlY2ltYWxzO1xuICAgIHJldHVybiBkZWNpbWFsQ2hlY2tlcih0aGlzLmNvdW50VG8pO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvdW50VG8odmFsKSB7XG4gICAgdGhpcy5fY291bnRUbyA9IHBhcnNlRmxvYXQodmFsKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBnZXQgY291bnRUbygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudFRvO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGNvdW50RnJvbSh2YWwpIHtcbiAgICB0aGlzLl9jb3VudEZyb20gPSBwYXJzZUZsb2F0KHZhbCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgZ2V0IGNvdW50RnJvbSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9jb3VudEZyb207XG4gIH1cblxuICBAT3V0cHV0KCkgY291bnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb3VudEZpbmlzaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBuYXRpdmVFbGVtZW50OiBhbnk7XG5cbiAgdmFsdWU6IGFueSA9ICcnO1xuICBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgYW5pbWF0aW9uUmVxOiBhbnk7XG5cbiAgcHJpdmF0ZSBfY291bnREZWNpbWFsczogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfY291bnRUbzogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfY291bnRGcm9tOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuICB9XG5cbiAgc3RhcnQoKTogdm9pZCB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25SZXEpO1xuXG4gICAgY29uc3QgdmFsdWVGb3JtYXR0aW5nID1cbiAgICAgIHRoaXMudmFsdWVGb3JtYXR0aW5nIHx8ICh2YWx1ZSA9PiBgJHt0aGlzLmNvdW50UHJlZml4fSR7dmFsdWUudG9Mb2NhbGVTdHJpbmcoKX0ke3RoaXMuY291bnRTdWZmaXh9YCk7XG5cbiAgICBjb25zdCBjYWxsYmFjayA9ICh7IHZhbHVlLCBwcm9ncmVzcywgZmluaXNoZWQgfSkgPT4ge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlRm9ybWF0dGluZyh2YWx1ZSk7XG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgaWYgKCFmaW5pc2hlZCkgdGhpcy5jb3VudENoYW5nZS5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWUsIHByb2dyZXNzIH0pO1xuICAgICAgaWYgKGZpbmlzaGVkKSB0aGlzLmNvdW50RmluaXNoLmVtaXQoeyB2YWx1ZTogdGhpcy52YWx1ZSwgcHJvZ3Jlc3MgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuYW5pbWF0aW9uUmVxID0gY291bnQodGhpcy5jb3VudEZyb20sIHRoaXMuY291bnRUbywgdGhpcy5jb3VudERlY2ltYWxzLCB0aGlzLmNvdW50RHVyYXRpb24sIGNhbGxiYWNrKTtcbiAgfVxufVxuIl19