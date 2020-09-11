import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from "./styles";
import './bunny-bar.js';

class BunnyToast extends HTMLElement {

    static get is() {
        return 'bunny-toast';
    }

    constructor() {
        super();
        this.duration = 1500;
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
    }

    open(text) {
        this.text = text;
        render(this.template, this.shadowRoot);
        let bar = this.shadowRoot.querySelector('bunny-bar');

        bar.classList.remove('hidden');
        setTimeout(() => bar.classList.add('hidden'), this.duration);
    }

    get template() {
        return html`
            <style>
                :host {
                    display: block;
                }                
                
                bunny-bar {
                    transition: height 1s cubic-bezier(0.16, 1, 0.3, 1); /* ease out expo */
                    z-index: 500;
                }
                
                .hidden {
                    height: 0 !important;
                }
                
                ${BunnyStyles.variables}
                
                .toast-text {
                    font-weight: 500;
                    color: var(--accent-color);
                }
            </style>
            <bunny-bar location="bottom" class="hidden" solid>
                <span class="toast-text">${this.text}</span>
            </bunny-bar>
        `;
    }
}

customElements.define(BunnyToast.is, BunnyToast);