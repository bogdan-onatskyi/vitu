import './index.scss';
import {StateService} from '@uirouter/angularjs';

interface IMenuData {
    state: string;
    title: string;
}

interface IMenuBarScope extends ng.IScope {
    state: StateService;
}

export class MenuBarController implements ng.IController {
    static $inject: string[] = ['$scope', '$state'];

    menuData: IMenuData[] = [
        {state: 'app.selectFormView', title: 'Select-form'},
        {state: 'app.allFormsView', title: 'All forms'},
    ];

    constructor(private _scope: IMenuBarScope,
                private _state: StateService) {
        _scope.state = _state;
    }
}

export class MenuBarComponent implements ng.IComponentOptions {
    static NAME: string = 'menuBar';
    controller: any = MenuBarController;
    templateUrl: string = require('./index.html');
}
