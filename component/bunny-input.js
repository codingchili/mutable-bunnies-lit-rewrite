import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from '/component/styles.js';

class BunnyInput extends HTMLElement {

    constructor() {
        super();

        this.placeholder = this.getAttribute('placeholder') || '';
        this.value = this.getAttribute('text') || '';
        this.label = this.getAttribute('label') || 'Label';
        this.type = this.getAttribute('type') || 'text';

        if (this.hasAttribute('autofocus')) {
            this.focus();
        }
    }

    get text() {
        return this.value;
    }

    static get is() {
        return 'bunny-input';
    }

    query(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);

        let input = this.query('#input');
        let underline = this.query('#underline');
        let label = this.query('#label');

        this.addEventListener('click', () => {
            input.focus();
        });

        input.addEventListener('blur', () => {
            underline.classList.remove('underline-focus');
            label.classList.remove('label-focus');
        });

        input.addEventListener('focus', () => {
            underline.classList.add('underline-focus');
            label.classList.add('label-focus');
        });
    }

    focus() {
        this.shadowRoot.querySelector('input').focus();
    }

    get template() {
        return html`
            <style>
            ${BunnyStyles.variables}
            ${BunnyStyles.noselect}
            
            :host {
                margin-left: 24px;
                margin-right: 24px;
                margin-top: 8px;
                margin-bottom:8px;
                display:block;
            }
            
            input:focus, textarea:focus, select:focus{
                outline: none;
            }
            
            ::selection {
                background: rgb(0, 176, 255);
                color: white; 
            }
            
            input {
                border: none;
                background-color: transparent;
                color: var(--input-container-color);
                font-size: 1em;
                padding-bottom: 2px;;
                font-family: "Roboto Bold";
                font-weight: 800;
            }
            
            #container {
                display: flex;
                flex-direction: column;
            }
            
            #underline-default {
                background-color: var(--input-container-color);
                height: 1px;
                z-index: 0;            
            }
            
            #underline {
                transition: width 0.25s;       
                height: 2px;     
                background-color: var(--input-container-focus-color);
                z-index: 1;
                width: 0;
                margin: auto;
                margin-top:-1px;
            }
            
            .underline {
                margin-left: 2px;
                margin-right: 2px;
            }
            
            .label {
                color: var(--input-container-color);
                font-size: 12px;
                font-family: 'Roboto', 'Noto', sans-serif;
                margin-left: 2px;
                margin-bottom: 4px;
            }
            
            .label-focus {
                color: var(--input-container-focus-color);
            }
            
            .underline-focus {
                width: 100% !important;       
            }
            
            </style>
            
          <div id="container">
            <label id="label" class="label noselect">${this.label}</label>
            <input spellcheck="false" auto type="${this.type}" id="input" class="bunny-input noselect" value="${this.value}" placeholder="${this.placeholder}"/>
            <div class="underline">
                <div id="underline-default"></div>
                <div id="underline"></div>
            </div>
          </div>
        `;
    }
}
customElements.define(BunnyInput.is, BunnyInput);