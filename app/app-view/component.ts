import './index.scss';
import { StateService } from '@uirouter/angularjs';

class AppController implements ng.IController {
    static $inject = ['$state'];

    constructor(public $state: StateService) {
        $state.go('app.selectFormView');
    }
}

export class AppComponent implements ng.IComponentOptions {
    static NAME: string = 'appView';
    controller: any = AppController;
    template: string = `
        <section class="app-view">
            <menu-bar></menu-bar>
            <ui-view class="main-view"></ui-view>
            <footer></footer>
        </section>
    `;
}
