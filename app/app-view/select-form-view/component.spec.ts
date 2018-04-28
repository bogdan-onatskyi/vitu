import * as angular from 'angular';
import 'angular-mocks';

import { IFormsScope } from '../../interfaces/IFormsScope';
import { SelectFormViewComponent, SelectFormViewController } from './component';
import { AllFormsService, IFormResponse } from '../../services/all-forms.service';

describe('SelectFormViewController:', () => {

    let element: any;
    let controller: SelectFormViewController;
    let scope: IFormsScope;
    let httpBackend: ng.IHttpBackendService;
    let response: IFormResponse = {
        forms: [
            {'formName': 'form1', 'required': false},
            {'formName': 'form2', 'required': true},
            {'formName': 'form3', 'required': false},
        ]
    };

    beforeEach(angular.mock.module('app'));

    beforeEach(inject($rootScope => scope = $rootScope.$new()));

    it('component/controller members should exist', inject(($controller) => {
        controller = $controller(SelectFormViewController, {$scope: scope, allFormsService: AllFormsService});

        expect(controller).toBeDefined();

        scope = controller.scope;

        expect(SelectFormViewComponent.NAME).toBe('selectFormView');
        expect(SelectFormViewController.$inject).toEqual(['$scope', 'allFormsService']);

        expect(scope.allForms).toBeDefined();
        expect(scope.allForms).toEqual([]);

        expect(scope.availableForms).toBeDefined();
        expect(scope.availableForms).toEqual([]);

        expect(scope.selectedForms).toBeDefined();
        expect(scope.selectedForms).toEqual([]);

        expect(controller.$onInit).toBeDefined();
        expect(controller.$onDestroy).toBeDefined();
    }));

    it('component should get data from AllFormsService', inject(($httpBackend, $compile) => {
        httpBackend = $httpBackend;
        httpBackend.when('GET', url => url.indexOf('forms.json') === -1).respond('');
        httpBackend.expect('GET', 'forms.json').respond(response);

        element = angular.element('<select-form-view></select-form-view>');
        element = $compile(element)(scope);

        scope.$digest();
        httpBackend.flush();

        controller = element.isolateScope().$ctrl;

        expect(controller.allFormsService.isDownloaded).toBe(true);
        expect(controller.scope.allForms).toEqual(response.forms);
        expect(controller.scope.availableForms).toEqual(response.forms);
        expect(controller.scope.selectedForms).toEqual([]);
    }));
});