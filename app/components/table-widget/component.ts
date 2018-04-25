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
    templateUrl: any = require('./index.html');
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };

    constructor() {
    }
}
