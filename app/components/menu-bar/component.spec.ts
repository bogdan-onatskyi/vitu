import * as angular from 'angular';
import 'angular-mocks';

import { StateService } from '@uirouter/angularjs';

import { MenuBarComponent, MenuBarController } from './component';

describe('MenuBarController:', () => {

    let controller: MenuBarController;
    let scope: ng.IScope;
    let state: StateService;

    const services = $injector => {
        scope = $injector.get('$rootScope').$new();
        state = $injector.get('$state');
        controller = $injector.get('$controller')(MenuBarController, {$state: state});
    };

    beforeEach(() => {
        angular.mock.module('app');
        inject(services);
    });

    it('component/controller members should exist', () => {
        expect(controller).toBeDefined();
        expect(MenuBarComponent.NAME).toBe('menuBar');
        expect(MenuBarController.$inject).toEqual(['$state']);
        expect(controller.menuData).toEqual([
            {state: 'app.selectFormView', title: 'Select-form'},
            {state: 'app.allFormsView', title: 'All forms'},
        ]);
    });
});
