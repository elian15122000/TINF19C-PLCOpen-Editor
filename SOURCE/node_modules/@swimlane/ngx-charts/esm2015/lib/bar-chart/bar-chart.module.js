import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { BarComponent } from './bar.component';
import { BarHorizontalComponent } from './bar-horizontal.component';
import { BarHorizontal2DComponent } from './bar-horizontal-2d.component';
import { BarHorizontalNormalizedComponent } from './bar-horizontal-normalized.component';
import { BarHorizontalStackedComponent } from './bar-horizontal-stacked.component';
import { BarVerticalComponent } from './bar-vertical.component';
import { BarVertical2DComponent } from './bar-vertical-2d.component';
import { BarVerticalNormalizedComponent } from './bar-vertical-normalized.component';
import { BarVerticalStackedComponent } from './bar-vertical-stacked.component';
import { SeriesHorizontal } from './series-horizontal.component';
import { SeriesVerticalComponent } from './series-vertical.component';
import { BarLabelComponent } from './bar-label.component';
export class BarChartModule {
}
BarChartModule.decorators = [
    { type: NgModule, args: [{
                imports: [ChartCommonModule],
                declarations: [
                    BarComponent,
                    BarHorizontalComponent,
                    BarHorizontal2DComponent,
                    BarHorizontalNormalizedComponent,
                    BarHorizontalStackedComponent,
                    BarVerticalComponent,
                    BarVertical2DComponent,
                    BarVerticalNormalizedComponent,
                    BarVerticalStackedComponent,
                    BarLabelComponent,
                    SeriesHorizontal,
                    SeriesVerticalComponent
                ],
                exports: [
                    BarComponent,
                    BarHorizontalComponent,
                    BarHorizontal2DComponent,
                    BarHorizontalNormalizedComponent,
                    BarHorizontalStackedComponent,
                    BarVerticalComponent,
                    BarVertical2DComponent,
                    BarVerticalNormalizedComponent,
                    BarVerticalStackedComponent,
                    BarLabelComponent,
                    SeriesHorizontal,
                    SeriesVerticalComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWNoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1jaGFydHMvc3JjL2xpYi9iYXItY2hhcnQvYmFyLWNoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN6RixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWlDMUQsTUFBTSxPQUFPLGNBQWM7OztZQS9CMUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUM1QixZQUFZLEVBQUU7b0JBQ1osWUFBWTtvQkFDWixzQkFBc0I7b0JBQ3RCLHdCQUF3QjtvQkFDeEIsZ0NBQWdDO29CQUNoQyw2QkFBNkI7b0JBQzdCLG9CQUFvQjtvQkFDcEIsc0JBQXNCO29CQUN0Qiw4QkFBOEI7b0JBQzlCLDJCQUEyQjtvQkFDM0IsaUJBQWlCO29CQUNqQixnQkFBZ0I7b0JBQ2hCLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osc0JBQXNCO29CQUN0Qix3QkFBd0I7b0JBQ3hCLGdDQUFnQztvQkFDaEMsNkJBQTZCO29CQUM3QixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsOEJBQThCO29CQUM5QiwyQkFBMkI7b0JBQzNCLGlCQUFpQjtvQkFDakIsZ0JBQWdCO29CQUNoQix1QkFBdUI7aUJBQ3hCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2hhcnRDb21tb25Nb2R1bGUgfSBmcm9tICcuLi9jb21tb24vY2hhcnQtY29tbW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBCYXJDb21wb25lbnQgfSBmcm9tICcuL2Jhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFySG9yaXpvbnRhbENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckhvcml6b250YWwyRENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwtMmQuY29tcG9uZW50JztcbmltcG9ydCB7IEJhckhvcml6b250YWxOb3JtYWxpemVkQ29tcG9uZW50IH0gZnJvbSAnLi9iYXItaG9yaXpvbnRhbC1ub3JtYWxpemVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJIb3Jpem9udGFsU3RhY2tlZENvbXBvbmVudCB9IGZyb20gJy4vYmFyLWhvcml6b250YWwtc3RhY2tlZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyVmVydGljYWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyVmVydGljYWwyRENvbXBvbmVudCB9IGZyb20gJy4vYmFyLXZlcnRpY2FsLTJkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC1ub3JtYWxpemVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQgfSBmcm9tICcuL2Jhci12ZXJ0aWNhbC1zdGFja2VkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZXJpZXNIb3Jpem9udGFsIH0gZnJvbSAnLi9zZXJpZXMtaG9yaXpvbnRhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VyaWVzVmVydGljYWxDb21wb25lbnQgfSBmcm9tICcuL3Nlcmllcy12ZXJ0aWNhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyTGFiZWxDb21wb25lbnQgfSBmcm9tICcuL2Jhci1sYWJlbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ2hhcnRDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBCYXJDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsMkRDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbE5vcm1hbGl6ZWRDb21wb25lbnQsXG4gICAgQmFySG9yaXpvbnRhbFN0YWNrZWRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWwyRENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbE5vcm1hbGl6ZWRDb21wb25lbnQsXG4gICAgQmFyVmVydGljYWxTdGFja2VkQ29tcG9uZW50LFxuICAgIEJhckxhYmVsQ29tcG9uZW50LFxuICAgIFNlcmllc0hvcml6b250YWwsXG4gICAgU2VyaWVzVmVydGljYWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEJhckNvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsQ29tcG9uZW50LFxuICAgIEJhckhvcml6b250YWwyRENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsTm9ybWFsaXplZENvbXBvbmVudCxcbiAgICBCYXJIb3Jpem9udGFsU3RhY2tlZENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbDJEQ29tcG9uZW50LFxuICAgIEJhclZlcnRpY2FsTm9ybWFsaXplZENvbXBvbmVudCxcbiAgICBCYXJWZXJ0aWNhbFN0YWNrZWRDb21wb25lbnQsXG4gICAgQmFyTGFiZWxDb21wb25lbnQsXG4gICAgU2VyaWVzSG9yaXpvbnRhbCxcbiAgICBTZXJpZXNWZXJ0aWNhbENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEJhckNoYXJ0TW9kdWxlIHt9XG4iXX0=