import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from './styles.js';

class BunnyBox extends HTMLElement {

    static get is() {
        return 'bunny-box';
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);

        let container = this.shadowRoot.querySelector('.container');

        if (this.hasAttribute('border')) {
            container.classList.add('border');
        }
        if (this.hasAttribute('solid')) {
            container.classList.add('solid');
        }
    }

    get template() {
        return html`
            <style>
                ${BunnyStyles.variables}
                ${BunnyStyles.elevation}
                
                :host {
                    display: block;
                }
                
                .border {
                    border: 1px solid var(--game-theme-opaque);
                    border-radius: 2px;
                }
                
                .container {
                    background-color: #161616;
                    opacity: 0.92;
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                
                .solid {
                    opacity: 1 !important;
                }
            </style>
            
            <div class="container elevation">
                <slot></slot>
            </div>
        `;
    }
}

customElements.define(BunnyBox.is, BunnyBox);