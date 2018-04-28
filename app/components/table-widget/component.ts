import './index.scss';

interface ITableWidgetScope extends ng.IScope {
    handleAction: () => void;
}

export class TableWidgetController {
    static $inject: string[] = ['$scope'];

    constructor(private _scope: ITableWidgetScope) {
        _scope.handleAction = () => console.log('handleAction');
    }
}

export class TableWidgetComponent implements ng.IComponentOptions {
    static NAME: string = 'tableWidget';
    controller: any = TableWidgetController;
    templateUrl: string = require('./index.html');
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };
}
