import {html, render} from '/node_modules/lit-html/lit-html.js';
import './bunny-box.js'

class BunnyTooltip extends HTMLElement {

    static get is() {
        return 'bunny-tooltip';
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        render(BunnyTooltip.template, this.shadowRoot);

        this.text = "Foo the tooltip";
        let tip = this.shadowRoot.querySelector('bunny-box');
        let slotted = this.shadowRoot.querySelector('slot')
        console.log(slotted);
        console.log(slotted.parentNode);
        console.log(slotted.parentElement);
        slotted = slotted.assignedNodes()[0];
        slotted.parentElement.addEventListener('mouseenter', () => {
            tip.classList.remove('hidden');
        });
        slotted.parentElement.addEventListener('mouseleave', () => {
            tip.classList.add('hidden');
        });
    }

    get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
                bunny-box {
                    position: fixed;
                }
                .hidden {
                    display: none;
                }
            </style>
            <slot></slot>
            <bunny-box>${this.text}</bunny-box>
        `;
    }

}

customElements.define(BunnyTooltip.is, BunnyTooltip);