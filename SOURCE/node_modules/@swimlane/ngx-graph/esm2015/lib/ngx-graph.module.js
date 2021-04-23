import { NgModule } from '@angular/core';
import { GraphModule } from './graph/graph.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
export class NgxGraphModule {
}
NgxGraphModule.decorators = [
    { type: NgModule, args: [{
                imports: [NgxChartsModule],
                exports: [GraphModule]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWdyYXBoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3N3aW1sYW5lL25neC1ncmFwaC9zcmMvbGliL25neC1ncmFwaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBTXZELE1BQU0sT0FBTyxjQUFjOzs7WUFKMUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO2FBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyYXBoTW9kdWxlIH0gZnJvbSAnLi9ncmFwaC9ncmFwaC5tb2R1bGUnO1xuaW1wb3J0IHsgTmd4Q2hhcnRzTW9kdWxlIH0gZnJvbSAnQHN3aW1sYW5lL25neC1jaGFydHMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmd4Q2hhcnRzTW9kdWxlXSxcbiAgZXhwb3J0czogW0dyYXBoTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hHcmFwaE1vZHVsZSB7fVxuIl19