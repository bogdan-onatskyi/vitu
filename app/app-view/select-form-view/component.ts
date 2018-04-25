import { IFormsScope } from '../../interfaces/IFormsScope';
import { AllFormsService } from '../../services/all-forms.service';

import './index.scss';

class SelectFormViewController implements ng.IController {
    static $inject: string[] = ['$scope', 'allFormsService'];

    constructor(public scope: IFormsScope,
                public allFormsService: AllFormsService) {
        scope.allForms = [];
        scope.availableForms = [];
        scope.selectedForms = [];
    }

    $onInit(): void {
        this.allFormsService.initService(() => {
            this.scope.allForms = this.allFormsService.allForms;
            this.scope.availableForms = this.allFormsService.availableForms;
            this.scope.selectedForms = this.allFormsService.selectedForms;
        });
    }

    $onDestroy(): void {
        this.allFormsService.allForms = this.scope.allForms;
        this.allFormsService.availableForms = this.scope.availableForms;
        this.allFormsService.selectedForms = this.scope.selectedForms;

        console.log('$onDestroy: ', this.scope.selectedForms);
        console.log('$onDestroy: ', this.scope.availableForms);
        console.log('$onDestroy: ', this.scope.selectedForms);
    }
}

export class SelectFormViewComponent implements ng.IComponentOptions {
    static NAME: string = 'selectFormView';
    controller: any = SelectFormViewController;
    templateUrl: any = require('./index.html');

    constructor() {
    }
}
