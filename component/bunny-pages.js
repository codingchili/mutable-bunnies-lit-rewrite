import {html, render} from '/node_modules/lit-html/lit-html.js';

class BunnyPages extends HTMLElement {

    constructor() {
        super();
        this.page = this.getAttribute("page");
        this.listener = () => {
        };
    }

    onclicked() {
        this.listener();
        this.shadowRoot.querySelector('.tab')
            .classList.add('active');
    }

    set clicked(callback) {
        this.listener = callback;
    }

    static get is() {
        return 'bunny-pages';
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);

        let query = (selector) => this.shadowRoot.querySelector(selector);

        this.tabs = Array.from(query('slot[name="tabs"]').assignedNodes()[0].children)
        this.pages = Array.from(query('slot[name="pages"]').assignedNodes()[0].children)

        customElements.whenDefined('bunny-tab').then(() => {
            for (let i = 0; i < this.tabs.length; i++) {
                let tab = this.tabs[i];

                tab.clicked = () => this.update(i);

                if (tab.hasAttribute('active')) {
                    this.update(i);
                }
            }
        });
    }

    update(index) {
        for (let i = 0; i < this.pages.length; i++) {
            this.pages[i].style.display = (i === index) ? 'block' : 'none';

            if (i < this.tabs.length) {
                let tab = this.tabs[i];
                (i === index) ? tab.activate() : tab.inactivate();
            }
        }
    }

    get template() {
        return html`
        <style>
            :host {
                display:block;
                width:100%;
            }
        </style>
        
        <div id="container">
            <!-- map tabs to pages in here. -->
            <slot name="tabs"></slot>
            <slot name="pages"></slot>
        </div>
        `;
    }
}

customElements.define(BunnyPages.is, BunnyPages);