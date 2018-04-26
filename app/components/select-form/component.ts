import { IFormObject } from '../../interfaces/IFormObject';

import './index.scss';

interface ISelectedFormObject extends IFormObject {
    isEditing: boolean;
    editModel: IFormObject;
}

interface ISelectFormScope extends ng.IScope {
    forms: IFormObject[];
    selectedForms: ISelectedFormObject[];

    selectModel: IFormObject;
    editModel: IFormObject;
    editForm: IFormObject;
    onChangeSelect: () => void;

    isEditing: boolean;

    showDebugInfo: boolean;
}

class SelectFormController implements ng.IController {
    static $inject: string[] = ['$scope'];

    // component's props
    forms: IFormObject[] = [];
    ngModel: string[] = [];

    constructor(public $scope: ISelectFormScope) {
        $scope.forms = this.forms;
        $scope.selectedForms = [];

        $scope.selectModel = null;

        $scope.isEditing = false;

        $scope.showDebugInfo = true;

        $scope.onChangeSelect = function (): void {
            if (this.selectModel) {
                const {formName, required} = this.selectModel;

                this.selectedForms.push({
                    ...this.selectModel,
                    isEditing: false,
                    editModel: {formName, required}
                });
                this.forms = this.forms.filter(
                    (f: IFormObject) => f.formName !== this.selectModel.formName
                );
            }
        };
    }

    $onChanges(changes): void {
        if (changes.forms) {
            const scope = this.$scope;

            scope.forms = [...changes.forms.currentValue];
            scope.selectModel = scope.forms[0];

            const available: IFormObject[] = [];
            const selected: ISelectedFormObject[] = scope.selectedForms;

            scope.forms.forEach((form: IFormObject) => {
                if (form.required) {
                    const {formName, required} = form;

                    selected.push({
                        ...form,
                        isEditing: false,
                        editModel: {formName, required}
                    });

                } else {
                    available.push(form);
                }
            });

            scope.forms = available;
            scope.selectedForms = selected;
        }
    }

    onAddForm(form: IFormObject): void {
        const scope = this.$scope;

        if (form) {
            console.log('Add form:', form);

            const {formName, required} = form;

            scope.selectedForms.push({
                ...form,
                isEditing: false,
                editModel: {formName, required}
            });
            scope.forms = scope.forms.filter(
                (f: IFormObject) => f.formName !== form.formName
            );
        }
    }

    onDeleteForm(form: IFormObject): void {
        const scope = this.$scope;

        if (form) {
            console.log('Delete form:', form);

            const {formName, required} = form;

            scope.forms.push({formName, required});

            scope.selectedForms = scope.selectedForms.filter(
                (f: ISelectedFormObject) => f.formName !== form.formName
            );
        }
    }

    onEditForm(form: ISelectedFormObject): void {

        console.log(form);

        const scope = this.$scope;
        const {isEditing} = form;

        console.log(isEditing);

        if (isEditing &&
            (form.editModel !== null) &&
            (form.formName !== form.editModel.formName)) {

            const {formName, required} = form;

            scope.forms.push({formName, required});

            scope.forms = scope.forms.filter(
                (f: IFormObject) => f.formName !== form.editModel.formName
            );

            scope.selectedForms = scope.selectedForms.filter(
                (f: ISelectedFormObject) => f.formName !== form.formName
            );

            scope.selectedForms.push({
                ...form.editModel,
                isEditing: false,
                editModel: {
                    formName: form.formName, required: form.required
                }
            });
        }

        form.isEditing = !form.isEditing;
        scope.isEditing = form.isEditing;
    }

    onSaveList(): void {
        const scope = this.$scope;

        this.ngModel = [];
        scope.selectedForms.forEach(
            (f: ISelectedFormObject) => this.ngModel.push(f.formName)
        );

        console.log('SaveList', this.ngModel);
    }
}

export class SelectFormComponent implements ng.IComponentOptions {
    static NAME: string = 'selectForm';
    controller: any = SelectFormController;
    template: string = `
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
        </div>
    `;

    bindings: { [key: string]: string } = {
        forms: '<',
        ngModel: '=',
    };
}
