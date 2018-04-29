import './index.scss';
import { StateService } from '@uirouter/angularjs';

interface IMenuData {
    state: string;
    title: string;
}

interface IMenuBarController extends ng.IController {
    menuData: IMenuData[];
}

export class MenuBarController implements IMenuBarController {
    static $inject: string[] = ['$state'];

    menuData: IMenuData[] = [
        {state: 'app.selectFormView', title: 'Select-form'},
        {state: 'app.allFormsView', title: 'All forms'},
    ];

    constructor(public state: StateService) {
    }
}

export class MenuBarComponent implements ng.IComponentOptions {
    static NAME: string = 'menuBar';
    controller: any = MenuBarController;
    templateUrl: string = require('./index.html');
}
