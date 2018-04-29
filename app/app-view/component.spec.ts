import * as angular from 'angular';
import 'angular-mocks';

import { StateService } from '@uirouter/angularjs';

import { AppViewComponent, AppViewController } from './component';

describe('AppViewController:', () => {

    let controller: AppViewController;
    let scope: ng.IScope;
    let state: StateService;

    const services = $injector => {
        scope = $injector.get('$rootScope').$new();
        state = $injector.get('$state');
        controller = $injector.get('$controller')(AppViewController, {$state: state});
    };

    beforeEach(() => {
        angular.mock.module('app');
        inject(services);
    });

    it('component/controller members should exist', () => {
        expect(controller).toBeDefined();
        expect(AppViewComponent.NAME).toBe('appView');
        expect(AppViewController.$inject).toEqual(['$state']);
    });

    it('should set initial state to app.selectFormView', () => {
        scope.$digest();
        expect(state.$current.name).toBe('app.selectFormView');
    });
});
