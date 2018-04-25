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
    templateUrl: any = require('./index.html');
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };

    constructor() {
    }
}
