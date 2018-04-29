import * as angular from 'angular';
import 'angular-mocks';

import { TableWidgetSelectedComponent, TableWidgetSelectedController } from './component';

describe('TableWidgetSelectedController:', () => {

    let controller: TableWidgetSelectedController;
    let element: any;
    let scope: any;
    let templateCache;

    let fakeForms: string[] = ['form1', 'form2', 'form3'];

    const services = $injector => {
        scope = $injector.get('$rootScope').$new();
        controller = $injector.get('$controller')(TableWidgetSelectedController, {$scope: scope});

        templateCache = $injector.get('$templateCache');

        templateCache.put(require('./index.html'), `
            <div class="table-widget">
                <h4>{{name}}</h4>

                <div class="table-widget__row title">
                    <span class="counter">#</span>
                    <span class="name">name</span>
                </div>

                <div class="table-widget__row" ng-repeat="form in forms track by $index">
                    <span class="counter">{{$index + 1}}</span>
                    <span class="name">{{form}}</span>
                </div>
            </div>`
        );
    };

    beforeEach(() => {
        angular.mock.module('app');
        inject(services);
    });

    it('component/controller members should exist', () => {
        expect(controller).toBeDefined();
        expect(TableWidgetSelectedComponent.NAME).toBe('tableWidgetSelected');
        expect(TableWidgetSelectedController.$inject).toEqual(['$scope']);
    });

    it('test binding data', inject(($rootScope, $compile) => {
        scope.fakeForms = fakeForms;

        element = angular.element('<table-widget-selected name="fake name" forms="fakeForms"></table-widget-selected>');
        $compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        expect(controller.scope.name).toBe('fake name');
        expect(controller.scope.forms).toEqual(fakeForms);
    }));
});
