import './index.scss';

export class FooterComponent implements ng.IComponentOptions {
    static NAME: string = 'footer';
    public template: string = `
        <div class="footer">
            <span>+38&nbsp;(097)&nbsp;499&#8209;73&#8209;82.</span>
            <span><a href="mailto:gentoo.user@ukr.net">gentoo.user@ukr.net</a></span>
        </div>
    `;
}
