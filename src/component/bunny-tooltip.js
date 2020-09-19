import {html, render} from '/node_modules/lit-html/lit-html.js';
import './bunny-box.js'

class BunnyTooltip extends HTMLElement {

    static get is() {
        return 'bunny-tooltip';
    }

    constructor() {
        super();
        this.location = this.getAttribute('location') || 'bottom';
        this.for = this.getAttribute("for");
        this.text = this.getAttribute('text');
        this.attachShadow({mode: 'open'})
    }

    position(tooltip, target) {
        let pos = target.getBoundingClientRect();
        let space = 10;
        let middle = target.clientWidth / 2;

        switch (this.location) {
            case 'bottom':
                return {
                    x: pos.left + middle - (tooltip.clientWidth / 2),
                    y: pos.bottom
                };
            case 'top':
                return {
                    x: pos.left + middle - (tooltip.clientWidth / 2),
                    y: pos.top - (space + tooltip.clientHeight)
                };
            case 'right':
                return {
                    x: pos.right + space,
                    y: pos.top + (target.clientHeight / 2) - (tooltip.clientHeight / 2)
                };
            case 'left':
                return {
                    x: pos.left - (tooltip.clientWidth + space),
                    y: pos.top + (target.clientHeight / 2) - (tooltip.clientHeight / 2)
                };
        }
    }

    get template() {
        return html`
            <style>
                 :host {
                    position: absolute;
                    z-index: 600;
                    transition: opacity 0.3s;
                    display: none;
                    opacity: 0;
                    top: 0;
                    left: 0;
                 }
                 .container {
                    overflow: hidden;
                 }
            </style>
                <bunny-box id="clone" border>
                    <slot style="display: block;
                        padding: 8px;
                        font-size: small;
                        font-family: 'Open Sans', sans-serif;
                        user-select: none;
                        color:#fff;"></slot>
                </bunny-box>
        `;
    }

    connectedCallback() {
        render(this.template, this.shadowRoot);

        let slot = this.shadowRoot.querySelector('slot')

        slot.addEventListener('slotchange', () => {
            let target = this.parentNode.querySelector(`#${this.for}`)
                || this.shadowRoot.host.previousElementSibling;

            target.addEventListener('mouseenter', (e) => {
                this.style.display = 'block';

                setTimeout(() => {
                    let position = this.position(this, target);
                    this.style.top = `${position.y}px`;
                    this.style.left = `${position.x}px`;
                    this.style.opacity = '1';
                }, 0);
            });

            let last = 0;
            target.addEventListener('mouseleave', () => {
                this.style.opacity = '0';

                clearTimeout(last);

                last = setTimeout((id) => {
                    this.style.display = 'none';
                }, 300);
            });
        });
    }
}

customElements.define(BunnyTooltip.is, BunnyTooltip);