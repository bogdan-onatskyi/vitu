import './index.scss';
import { StateService } from '@uirouter/angularjs';

export class AppViewController implements ng.IController {
    static $inject = ['$state'];

    constructor(public $state: StateService) {
        $state.go('app.selectFormView');
    }
}

export class AppViewComponent implements ng.IComponentOptions {
    static NAME: string = 'appView';
    controller: any = AppViewController;
    templateUrl: string = require('./index.html');
}
