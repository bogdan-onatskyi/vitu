import { IFormObject } from '../../interfaces/IFormObject';

import './index.scss';

export interface ITableWidgetScope extends ng.IScope {
    forms: IFormObject[];
    name: string;
}

interface ITableWidgetController extends ng.IController {
    name: string;
    forms: IFormObject[];
}

export class TableWidgetController implements ITableWidgetController {
    static $inject: string[] = ['$scope'];

    name: string = '';
    forms: IFormObject[] = [];

    constructor(public scope: ITableWidgetScope) {
        this.scope = scope;
    }

    $onInit(): void {
        this.scope.name = this.name;
        this.scope.forms = this.forms;
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
