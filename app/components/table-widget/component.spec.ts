import * as angular from 'angular';
import 'angular-mocks';

import { TableWidgetComponent, TableWidgetController } from './component';
import { IFormObject } from '../../interfaces/IFormObject';

describe('TableWidgetController:', () => {

    let controller: TableWidgetController;
    let element: any;
    let scope: any;
    let templateCache;

    let fakeForms: IFormObject[] = [
        {'formName': 'form1', 'required': false},
        {'formName': 'form2', 'required': true},
        {'formName': 'form3', 'required': false}
    ];

    const services = $injector => {
        scope = $injector.get('$rootScope').$new();
        controller = $injector.get('$controller')(TableWidgetController, {$scope: scope});

        templateCache = $injector.get('$templateCache');

        templateCache.put(require('./index.html'), `
            <div class="table-widget">
                <h4>{{name}}</h4>
                <div class="table-widget__row title">
                    <span class="counter">#</span>
                    <span class="name">name</span>
                    <span class="required">required</span>
                </div>
                <div class="table-widget__row" ng-repeat="form in forms track by $index">
                    <span class="counter">{{$index + 1}}</span>
                    <span class="name">{{form.formName}}</span>
                    <span class="required">{{form.required}}</span>
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
        expect(TableWidgetComponent.NAME).toBe('tableWidget');
        expect(TableWidgetController.$inject).toEqual(['$scope']);
    });

    it('test binding data', inject(($rootScope, $compile) => {
        scope.fakeForms = fakeForms;

        element = angular.element('<table-widget name="fake name" forms="fakeForms"></table-widget>');
        $compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        expect(controller.scope.name).toBe('fake name');
        expect(controller.scope.forms).toEqual(fakeForms);
    }));
});
