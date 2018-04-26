import * as angular from 'angular';
import '@uirouter/angularjs';
import 'angular-mocks';
import { app } from '../app';

import { AllFormsService, IFormResponse } from './all-forms.service';

import { IHttpResponse } from 'angular';
import { IFormObject } from '../interfaces/IFormObject';

describe('AllFormsService', () => {
    let service: AllFormsService;

    beforeEach(angular.mock.module('ui.router'));

    beforeEach(angular.mock.module('app'));

    beforeEach(angular.mock.inject(allFormsService => {
        service = allFormsService;
    }));

    it('should exist', () => {
        expect(service).toBeDefined();
    });

    it('should get forms', () => {

        service
            .getAll()
            .then((result: IHttpResponse<IFormResponse>) => {
                expect(result.data.forms).toEqual(
                    [
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
                );

                // $rootScope.$digest();
            });
    });
});
