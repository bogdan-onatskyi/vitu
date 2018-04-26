import './index.scss';
import {StateService} from '@uirouter/angularjs';

interface IMenuData {
    state: string;
    title: string;
}

interface IMenuBarScope extends ng.IScope {
    state: StateService;
}

class MenuBarController implements ng.IController {
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
    template: string = `
        <div class="menu-bar">
            <a ng-repeat="item in $ctrl.menuData track by $index"
               ui-sref={{item.state}}
               ng-class="{ active: state.includes(item.state) }">
                {{item.title}}
            </a>
        </div>
    `;
}
