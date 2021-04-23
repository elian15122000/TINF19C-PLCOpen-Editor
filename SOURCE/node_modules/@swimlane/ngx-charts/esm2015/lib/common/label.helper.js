/**
 * Formats a label given a date, number or string.
 *
 * @export
 */
export function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
/**
 * Escapes a label.
 *
 * @export
 */
export function escapeLabel(label) {
    return label.toLocaleString().replace(/[&'`"<>]/g, match => {
        return {
            '&': '&amp;',
            // tslint:disable-next-line: quotemark
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        }[match];
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3dpbWxhbmUvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9sYWJlbC5oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBVTtJQUNwQyxJQUFJLEtBQUssWUFBWSxJQUFJLEVBQUU7UUFDekIsS0FBSyxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQ3BDO1NBQU07UUFDTCxLQUFLLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ2hDO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBVTtJQUNwQyxPQUFPLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFO1FBQ3pELE9BQU87WUFDTCxHQUFHLEVBQUUsT0FBTztZQUNaLHNDQUFzQztZQUN0QyxHQUFHLEVBQUUsUUFBUTtZQUNiLEdBQUcsRUFBRSxRQUFRO1lBQ2IsR0FBRyxFQUFFLFFBQVE7WUFDYixHQUFHLEVBQUUsTUFBTTtZQUNYLEdBQUcsRUFBRSxNQUFNO1NBQ1osQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRm9ybWF0cyBhIGxhYmVsIGdpdmVuIGEgZGF0ZSwgbnVtYmVyIG9yIHN0cmluZy5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRMYWJlbChsYWJlbDogYW55KTogc3RyaW5nIHtcbiAgaWYgKGxhYmVsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIGxhYmVsID0gbGFiZWwudG9Mb2NhbGVEYXRlU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgbGFiZWwgPSBsYWJlbC50b0xvY2FsZVN0cmluZygpO1xuICB9XG5cbiAgcmV0dXJuIGxhYmVsO1xufVxuXG4vKipcbiAqIEVzY2FwZXMgYSBsYWJlbC5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlc2NhcGVMYWJlbChsYWJlbDogYW55KTogc3RyaW5nIHtcbiAgcmV0dXJuIGxhYmVsLnRvTG9jYWxlU3RyaW5nKCkucmVwbGFjZSgvWyYnYFwiPD5dL2csIG1hdGNoID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgJyYnOiAnJmFtcDsnLFxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBxdW90ZW1hcmtcbiAgICAgIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgICAgICdgJzogJyYjeDYwOycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OydcbiAgICB9W21hdGNoXTtcbiAgfSk7XG59XG4iXX0=