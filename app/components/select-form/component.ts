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
    templateUrl: any = require('./index.html');

    bindings: { [key: string]: string } = {
        forms: '<',
        ngModel: '=',
    };

    constructor() {
    }
}
