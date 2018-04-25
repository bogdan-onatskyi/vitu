import { IHttpResponse } from 'angular';
import { IFormObject } from '../interfaces/IFormObject';

interface IFormResponse {
    forms: IFormObject[];
}

export class AllFormsService {
    static NAME: string = 'allFormsService';
    static $inject: string[] = ['$http'];

    isDownloaded: boolean = false;

    allForms: IFormObject[] = [];
    availableForms: IFormObject[] = [];
    selectedForms: string[] = [];

    constructor(private _http: ng.IHttpService) {
    }

    getAll(): angular.IHttpPromise<any> {
        return this._http.get('forms.json');
    }

    initService(callback: () => void): void {
        if (this.isDownloaded) {
            return callback();
        }

        this.getAll().then(
            (response: IHttpResponse<IFormResponse>): void => {
                this.allForms = response.data.forms;
                this.availableForms = response.data.forms;
                this.isDownloaded = true;
                callback();
            },
            (error) => {
                console.log('HTTP error:', error);
                callback();
            });
    }
}
