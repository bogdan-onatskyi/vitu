import * as angular from 'angular';
import 'angular-mocks';

import { ISelectedFormObject, SelectFormComponent, SelectFormController } from './component';
import { IFormObject } from '../../interfaces/IFormObject';

describe('TableWidgetController:', () => {

    let controller: SelectFormController;
    let element: any;
    let scope: any;
    let templateCache;
    let compile;

    let fakeAvailableForms: IFormObject[] = [
        {'formName': 'form1', 'required': false},
        {'formName': 'form2', 'required': false},
        {'formName': 'form3', 'required': true},
        {'formName': 'form4', 'required': false},
        {'formName': 'form5', 'required': true},
        {'formName': 'form6', 'required': false},
        {'formName': 'form7', 'required': true},
        {'formName': 'form8', 'required': false},
        {'formName': 'form9', 'required': false},
        {'formName': 'form10', 'required': false}
    ];

    let requiredForms = 0;
    let len = fakeAvailableForms.length;

    for (let i = 0; i < len; i++) {
        if (fakeAvailableForms[i].required) {
            requiredForms++;
        }
    }

    let notRequiredForms = len - requiredForms;

    let fakeSelectedForms: string[] = [];

    const services = $injector => {
        scope = $injector.get('$rootScope').$new();
        controller = $injector.get('$controller')(SelectFormController, {$scope: scope});

        compile = $injector.get('$compile');

        templateCache = $injector.get('$templateCache');

        templateCache.put(require('./index.html'), `
            <div class="select-form">
                <div class="select-form__title">
                    FORMS
                </div>

                <hr>

                <div class="select-form__row" ng-repeat="form in selectedForms track by $index">
                    <span ng-if="form.required">
                        <select class="select-form__row--select"
                                disabled>
                            <option>{{form.formName}}</option>
                        </select>
                    </span>

                    <span ng-if="!form.required">
                        <select class="select-form__row--select"
                                ng-if="!form.isEditing"
                                disabled>
                            <option>{{form.formName}}</option>
                        </select>

                        <select class="select-form__row--select"
                                ng-if="form.isEditing"
                                ng-model="form.editModel"
                                ng-options="form.formName for form in forms"
                                ng-init="form.editModel={formName: form.formName, required: form.required}"
                                ng-disabled="!form.isEditing && isEditing">
                        </select>

                        <button class="select-form__row--button"
                                ng-click="$ctrl.onDeleteForm(form)"
                                ng-disabled="isEditing">
                            &#215;
                        </button>

                        <button class="select-form__row--button"
                                ng-click="$ctrl.onEditForm(form)"
                                ng-disabled="!form.isEditing && isEditing && !forms.length">
                            {{form.isEditing ? '&#10003;' : '&#9998;'}}
                        </button>
                    </span>
                </div>

                <div class="select-form__row">
                    <select class="select-form__row--select"
                            ng-model="selectModel"
                            ng-options="form.formName for form in forms"
                            ng-change="onChangeSelect()"
                            ng-disabled="isEditing">
                    </select>

                    <button class="select-form__row--button"
                            ng-click="$ctrl.onDeleteForm(selectModel)"
                            ng-disabled="isEditing || selectModel === null">
                        &#215;
                    </button>
                    <button class="select-form__row--button"
                            ng-if="forms.length"
                            ng-click="$ctrl.onAddForm(selectModel)"
                            ng-disabled="isEditing || selectModel === null">
                        &#43;
                    </button>
                </div>

                <hr>

                <div class="select-form__row">
                    <button class="select-form__row--button bold"
                            ng-click="$ctrl.onSaveList()"
                            ng-disabled="isEditing">
                        SAVE SELECTED FORMS
                    </button>
                </div>

                <div class="select-form__row debug-info" ng-if="showDebugInfo">
                    <p><strong>debug info:</strong> (to hide it, set $scope.showDebugInfo = false)</p>
                    <p>selectModel: {{selectModel | json}}</p>
                    <p>{{selectedForms}} <br><br></p>
                    <p>
                        ngModel will be:<br>
                        [<span ng-repeat="selected in selectedForms track by $index">{{selected.formName | json}}, </span>]
                    </p>

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
        expect(SelectFormComponent.NAME).toBe('selectForm');
        expect(SelectFormController.$inject).toEqual(['$scope']);

        expect(controller.forms).toEqual([]);
        expect(controller.ngModel).toEqual([]);

        expect(controller.scope.forms).toEqual([]);
        expect(controller.scope.selectedForms).toEqual([]);
        expect(controller.scope.selectModel).toBe(null);
        expect(controller.scope.isEditing).toBe(false);
        expect(controller.scope.showDebugInfo).toBe(true);
        expect(controller.scope.onChangeSelect).toBeDefined();

        expect(controller.$onChanges).toBeDefined();
        expect(controller.onAddForm).toBeDefined();
        expect(controller.onDeleteForm).toBeDefined();
        expect(controller.onEditForm).toBeDefined();
        expect(controller.onSaveList).toBeDefined();
    });

    it('initially should divide available forms into required and not required', () => {
        scope.fakeSelectedForms = fakeSelectedForms;
        scope.fakeAvailableForms = fakeAvailableForms;

        element = angular.element(`
            <select-form
                ng-model="fakeSelectedForms"
                forms="fakeAvailableForms">
            </select-form>
            `);
        compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        expect(controller.scope.forms.length).toBe(notRequiredForms);
        expect(controller.scope.selectedForms.length).toBe(requiredForms);
    });

    it('onAddForm: should add new form into selected form list', () => {
        scope.fakeSelectedForms = fakeSelectedForms;
        scope.fakeAvailableForms = fakeAvailableForms;

        element = angular.element(`
            <select-form
                ng-model="fakeSelectedForms"
                forms="fakeAvailableForms">
            </select-form>
            `);
        compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        const fakeFormObject: IFormObject = {formName: 'fake form', required: false};
        controller.onAddForm(fakeFormObject);

        expect(controller.scope.selectedForms.length).toBe(requiredForms + 1);
    });

    it('onDeleteForm: should delete form from selected form list', () => {
        const fakeFormObject: IFormObject = {formName: 'fake form1', required: false};
        scope.fakeSelectedForms = [...fakeSelectedForms, fakeFormObject];
        scope.fakeAvailableForms = fakeAvailableForms;

        element = angular.element(`
            <select-form
                ng-model="fakeSelectedForms"
                forms="fakeAvailableForms">
            </select-form>
            `);
        compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        const selectedFormsAmount = requiredForms;

        controller.onAddForm(fakeFormObject);
        expect(controller.scope.selectedForms.length).toBe(selectedFormsAmount + 1);

        controller.onDeleteForm(fakeFormObject);
        expect(controller.scope.selectedForms.length).toBe(selectedFormsAmount);
    });

    it('onEditForm: should change selected form in selected form list', () => {
        const fakeFormObject1: IFormObject = {formName: 'fake form1', required: false};
        const fakeFormObject2: IFormObject = {formName: 'fake form2', required: false};

        const fakeSelectedFormObject: ISelectedFormObject = {
            formName: 'fake form1', required: false, isEditing: true,
            editModel: fakeFormObject2
        };

        scope.fakeSelectedForms = [...fakeSelectedForms, fakeFormObject1, fakeFormObject2];
        scope.fakeAvailableForms = fakeAvailableForms;

        element = angular.element(`
            <select-form
                ng-model="fakeSelectedForms"
                forms="fakeAvailableForms">
            </select-form>
            `);
        compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        const selectedFormsAmount = requiredForms;

        controller.onAddForm(fakeFormObject1);
        expect(controller.scope.selectedForms.length).toBe(selectedFormsAmount + 1);

        controller.onEditForm(fakeSelectedFormObject);
        expect(controller.scope.selectedForms.length).toBe(selectedFormsAmount + 1);
    });

    it('onSaveList: should save selected form into ngModel', () => {
        scope.fakeSelectedForms = fakeSelectedForms;
        scope.fakeAvailableForms = fakeAvailableForms;

        element = angular.element(`
            <select-form
                ng-model="fakeSelectedForms"
                forms="fakeAvailableForms">
            </select-form>
            `);
        compile(element)(scope);

        scope.$digest();

        controller = element.isolateScope().$ctrl;

        controller.onSaveList();

        expect(controller.ngModel).toEqual(['form3', 'form5', 'form7']);
    });

    it('scope.onChangeSelect', () => {
        // todo: add test for scope.onChangeSelect
    });
});
