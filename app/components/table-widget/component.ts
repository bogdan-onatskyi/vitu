import './index.scss';

interface ITableWidgetScope extends ng.IScope {
    handleAction: () => void;
}

class TableWidgetController {
    static $inject: string[] = ['$scope'];

    constructor(private _scope: ITableWidgetScope) {
        _scope.handleAction = () => console.log('handleAction');
    }
}

export class TableWidgetComponent implements ng.IComponentOptions {
    static NAME: string = 'tableWidget';
    controller: any = TableWidgetController;
    template: string = `
        <div class="table-widget" ng-click="handleAction()">
            <h4>{{$ctrl.name}}</h4>

            <div class="table-widget__row title">
                <span class="counter">#</span>
                <span class="name">name</span>
                <span class="required">required</span>
            </div>

            <div class="table-widget__row" ng-repeat="form in $ctrl.forms track by $index">
                <span class="counter">{{$index + 1}}</span>
                <span class="name">{{form.formName}}</span>
                <span class="required">{{form.required}}</span>
            </div>
        </div>
    `;
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };
}
