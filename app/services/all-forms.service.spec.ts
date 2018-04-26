import * as angular from 'angular';
import '@uirouter/angularjs';
import 'angular-mocks';

import { AllFormsService, IFormResponse } from './all-forms.service';

import { IHttpResponse } from 'angular';
import { IFormObject } from '../interfaces/IFormObject';

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

    const isEqualArrays = (a: IFormObject[], b: IFormObject[]) => {
        const length = a.length;

        if (length !== b.length) {
            return false;
        }

        for (let i = 0; i < length; i++) {
            if (a[i].formName !== b[i].formName) {
                return false;
            }

            if (a[i].required !== b[i].required) {
                return false;
            }
        }

        return true;
    };

    beforeEach(angular.mock.module('ui.router'));

    beforeEach(angular.mock.module('app'));

    beforeEach(() => {
        angular.mock.inject((_$httpBackend_, allFormsService) => {
            $httpBackend = _$httpBackend_;
            service = allFormsService;
        });
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('service should exist', () => {
        expect(service).toBeDefined();
    });

    it('getAll() should get forms', (done: () => void) => {

        $httpBackend.expectGET('forms.json').respond(fakeData);

        service.getAll()
            .then((response: IHttpResponse<IFormResponse>): void => {
                const {forms} = response.data;

                expect(forms.length).toEqual(20);
                expect(isEqualArrays(fakeData.forms, forms)).toBe(true);

                done();
            });

        $httpBackend.flush();
    });

    it('initService() should download data from "forms.json" if isDownloaded = false',
        (done: () => void) => {

            service.isDownloaded = false;

            service.allForms = [];
            service.availableForms = [];

            spyOn(service, 'getAll').and.callThrough();

            $httpBackend.expectGET('forms.json').respond(fakeData);

            service.initService(() => {
                expect(service.allForms.length).toEqual(20);
                expect(isEqualArrays(fakeData.forms, service.allForms)).toBe(true);

                expect(service.availableForms.length).toEqual(20);
                expect(isEqualArrays(fakeData.forms, service.availableForms)).toBe(true);

                done();
            });

            $httpBackend.flush();

            expect(service.getAll).toHaveBeenCalled();
        }
    );

    it('initService() should NOT download data from "forms.json" if isDownloaded = true',
        (done: () => void) => {

            service.isDownloaded = true;

            service.allForms = [];
            service.availableForms = [];

            spyOn(service, 'getAll').and.callThrough();

            service.initService(() => {
                expect(service.allForms.length).toEqual(0);
                expect(service.availableForms.length).toEqual(0);

                done();
            });

            expect(service.getAll).not.toHaveBeenCalled();
        }
    );
});
