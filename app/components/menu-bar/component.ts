import { IState } from 'angular-ui-router';

import './index.scss';

interface IMenuData {
    state: string;
    title: string;
}

interface IMenuBarScope extends ng.IScope {
    state: IState;
}

class MenuBarController implements ng.IController {
    static $inject: string[] = ['$scope', '$state'];

    menuData: IMenuData[] = [
        {state: 'app.selectFormView', title: 'Select-form'},
        {state: 'app.allFormsView', title: 'All forms'},
    ];

    constructor(private _scope: IMenuBarScope,
                private _state: ng.ui.IStateService) {
        _scope.state = _state;
    }
}

export class MenuBarComponent implements ng.IComponentOptions {
    static NAME: string = 'menuBar';
    controller: any = MenuBarController;
    templateUrl: any = require('./index.html');

    constructor() {
    }
}
