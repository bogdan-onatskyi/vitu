import './index.scss';

interface ITableWidgetSelectedScope extends ng.IScope {
    handleAction: () => void;
}

class TableWidgetSelectedController {
    static $inject: string[] = ['$scope'];

    constructor(private _scope: ITableWidgetSelectedScope) {
        _scope.handleAction = () => console.log('handleAction');
    }
}

export class TableWidgetSelectedComponent implements ng.IComponentOptions {
    static NAME: string = 'tableWidgetSelected';
    controller: any = TableWidgetSelectedController;
    template: string = `
        <div class="table-widget" ng-click="handleAction()">
            <h4>{{$ctrl.name}}</h4>

            <div class="table-widget__row title">
                <span class="counter">#</span>
                <span class="name">name</span>
            </div>

            <div class="table-widget__row" ng-repeat="form in $ctrl.forms track by $index">
                <span class="counter">{{$index + 1}}</span>
                <span class="name">{{form}}</span>
            </div>
        </div>
    `;
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };
}
