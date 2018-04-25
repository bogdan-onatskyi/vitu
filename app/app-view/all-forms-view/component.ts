import { IFormsScope } from '../../interfaces/IFormsScope';
import { AllFormsService } from '../../services/all-forms.service';

import './index.scss';

class AllFormsController implements ng.IController {
    static $inject: string[] = ['$scope', 'allFormsService'];

    constructor(private _scope: IFormsScope,
                private _allFormsService: AllFormsService) {
    }

    $onInit(): void {
        this._allFormsService.initService(() => {
            this._scope.allForms = this._allFormsService.allForms;
            this._scope.availableForms = this._allFormsService.availableForms;
            this._scope.selectedForms = this._allFormsService.selectedForms;
        });
    }
}

export class AllFormsComponent implements ng.IComponentOptions {
    static NAME: string = 'formView';
    controller: any = AllFormsController;
    templateUrl: any = require('./index.html');

    constructor() {
    }
}
