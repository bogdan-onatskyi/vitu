import './index.scss';

class AppController implements ng.IController {
    static $inject = ['$state'];

    constructor(public $state: ng.ui.IStateService) {
        $state.go('app.selectFormView');
    }
}

export class AppComponent implements ng.IComponentOptions {
    static NAME: string = 'appView';
    controller: any = AppController;
    templateUrl: any = require('./index.html');

    constructor() {
    }
}
