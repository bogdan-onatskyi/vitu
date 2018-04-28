import * as angular from 'angular';
import 'angular-mocks';

import { AllFormsService, IFormResponse } from './all-forms.service';

describe('AllFormsService:', () => {

    let $httpBackend: ng.IHttpBackendService;
    let service: AllFormsService;

    const fakeData = {
        'forms': [
            {'formName': 'form1', 'required': false},
            {'formName': 'form2', 'required': false},
            {'formName': 'form3', 'required': true},
            {'formName': 'form4', 'required': false},
            {'formName': 'form5', 'required': true},
            {'formName': 'form6', 'required': false},
            {'formName': 'form7', 'required': true},
            {'formName': 'form8', 'required': false},
            {'formName': 'form9', 'required': false},
            {'formName': 'form10', 'required': false},
            {'formName': 'form11', 'required': true},
            {'formName': 'form12', 'required': false},
            {'formName': 'form13', 'required': false},
            {'formName': 'form14', 'required': true},
            {'formName': 'form15', 'required': false},
            {'formName': 'form16', 'required': true},
            {'formName': 'form17', 'required': false},
            {'formName': 'form18', 'required': false},
            {'formName': 'form19', 'required': false},
            {'formName': 'form20', 'required': false}
        ]
    };

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.inject((_$httpBackend_, allFormsService) => {
        $httpBackend = _$httpBackend_;
        service = allFormsService;
    }));

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('service should exist', () => {
        expect(service).toBeDefined();
    });

    it('service members should exist', () => {
        expect(AllFormsService.NAME).toBe('allFormsService');
        expect(AllFormsService.$inject).toEqual(['$http']);

        expect(service.isDownloaded).toBeDefined();
        expect(service.isDownloaded).toBe(false);

        expect(service.allForms).toBeDefined();
        expect(service.allForms).toEqual([]);

        expect(service.availableForms).toBeDefined();
        expect(service.availableForms).toEqual([]);

        expect(service.selectedForms).toBeDefined();
        expect(service.selectedForms).toEqual([]);

        expect(service.getAll).toBeDefined();
        expect(service.initService).toBeDefined();
    });

    it('service.getAll() should get all forms', () => {

        $httpBackend.expectGET('forms.json').respond(fakeData);

        service.getAll()
            .then((response: angular.IHttpResponse<IFormResponse>): void => {
                expect(response.data).toEqual(fakeData);
            });

        $httpBackend.flush();
    });

    it('service.initService() should download data from "forms.json" if service.isDownloaded === false',
        () => {
            service.isDownloaded = false;

            spyOn(service, 'getAll').and.callThrough();

            $httpBackend.expectGET('forms.json').respond(fakeData);

            service.initService(() => {
                expect(service.allForms).toEqual(fakeData.forms);
                expect(service.availableForms).toEqual(fakeData.forms);
                expect(service.selectedForms).toEqual([]);
            });

            $httpBackend.flush();

            expect(service.getAll).toHaveBeenCalled();
        }
    );

    it('service.initService() should NOT download data from "forms.json" if service.isDownloaded === true',
        () => {
            service.isDownloaded = true;

            spyOn(service, 'getAll').and.callThrough();

            service.initService(() => {
                expect(service.allForms).toEqual([]);
                expect(service.availableForms).toEqual([]);
                expect(service.selectedForms).toEqual([]);
            });

            expect(service.getAll).not.toHaveBeenCalled();
        }
    );
});
