import { IFormObject } from './IFormObject';

export interface IFormsScope extends ng.IScope {
    allForms: IFormObject[];
    availableForms: IFormObject[];
    selectedForms: string[];
}
