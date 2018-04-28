import { IFormsScope } from '../../interfaces/IFormsScope';
import { AllFormsService } from '../../services/all-forms.service';

import './index.scss';

export class AllFormsViewController implements ng.IController {
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
}

export class AllFormsViewComponent implements ng.IComponentOptions {
    static NAME: string = 'allFormsView';
    controller: any = AllFormsViewController;
    templateUrl: string = require('./index.html');
}
