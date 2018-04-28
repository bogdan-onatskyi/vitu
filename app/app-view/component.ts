import './index.scss';
import { StateService } from '@uirouter/angularjs';

class AppController implements ng.IController {
    static $inject = ['$state'];

    constructor(public $state: StateService) {
        $state.go('app.selectFormView');
    }
}

export class AppComponent implements ng.IComponentOptions {
    static NAME: string = 'appView';
    controller: any = AppController;
    templateUrl: string = require('./index.html');
}
