import { module, element, bootstrap } from 'angular';
import '@uirouter/angularjs';
import {StateProvider, UrlRouterProvider} from '@uirouter/angularjs';

import { AppComponent } from './app-view/component';
import { MenuBarComponent } from './components/menu-bar/component';
import { SelectFormViewComponent } from './app-view/select-form-view/component';
import { AllFormsViewComponent } from './app-view/all-forms-view/component';
import { FooterComponent } from './components/footer/component';
import { SelectFormComponent } from './components/select-form/component';
import { TableWidgetComponent } from './components/table-widget/component';
import { TableWidgetSelectedComponent } from './components/table-widget-selected/component';

import { AllFormsService } from './services/all-forms.service';

export const app = module('app', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        ($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) => {
            $stateProvider
                .state({
                    name: 'app',
                    url: '/app',
                    component: AppComponent.NAME
                })
                .state({
                    name: 'app.selectFormView',
                    url: '/select-form-view',
                    component: SelectFormViewComponent.NAME
                })
                .state({
                    name: 'app.allFormsView',
                    url: '/all-forms-view',
                    component: AllFormsViewComponent.NAME,
                });
            $urlRouterProvider.otherwise('/app');
        }])
    .component(AppComponent.NAME, new AppComponent())
    .component(MenuBarComponent.NAME, new MenuBarComponent())
    .component(SelectFormViewComponent.NAME, new SelectFormViewComponent())
    .component(AllFormsViewComponent.NAME, new AllFormsViewComponent())
    .component(FooterComponent.NAME, new FooterComponent())

    .component(SelectFormComponent.NAME, new SelectFormComponent())
    .component(TableWidgetComponent.NAME, new TableWidgetComponent())
    .component(TableWidgetSelectedComponent.NAME, new TableWidgetSelectedComponent())

    .service(AllFormsService.NAME, AllFormsService);

element(() => bootstrap(document, ['app']));
