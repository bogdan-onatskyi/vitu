import './index.scss';

export interface ITableWidgetSelectedScope extends ng.IScope {
    forms: string[];
    name: string;
}

interface ITableWidgetSelectedController extends ng.IController {
    name: string;
    forms: string[];
}

export class TableWidgetSelectedController implements ITableWidgetSelectedController {
    static $inject: string[] = ['$scope'];

    name: string = '';
    forms: string[] = [];

    constructor(public scope: ITableWidgetSelectedScope) {
        this.scope = scope;
    }

    $onInit(): void {
        this.scope.name = this.name;
        this.scope.forms = this.forms;
    }
}

export class TableWidgetSelectedComponent implements ng.IComponentOptions {
    static NAME: string = 'tableWidgetSelected';
    controller: any = TableWidgetSelectedController;
    templateUrl: string = require('./index.html');
    bindings: { [key: string]: string } = {
        name: '@',
        forms: '<',
    };
}
