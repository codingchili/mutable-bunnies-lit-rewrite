import {html, render} from '/node_modules/lit-html/lit-html.js';

/* this is teh mmega loader */
class BunnySpinner extends HTMLElement {

    static get is() {
        return 'bunny-spinner';
    }

    constructor() {
        super();
        this.enabled = this.hasAttribute('enabled') || false;
        this.message = this.getAttribute('text');

        this.observer = new MutationObserver((events) => {
            for (let mutation of events) {
                this.message = this.getAttribute("text");

                if (this.hasAttribute('enabled')) {
                    this.enable();
                } else {
                    this.disable();
                }
            }
        });
        this.observer.observe(this, {attributes: true});
    }

    enable() {
        this.enabled = true;
        this.render();
    }

    disable() {
        this.enabled = false;
        this.render();
    }

    text(message) {
        this.message = message;
        this.render();
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'})
        this.render();
    }

    render() {
        render(this.template, this.shadowRoot);
    }

    get template() {
        return html`
        <style>
            :host {
                display: block;
            }

            .loading-text {
                text-align: center;
                font-size: smaller;
                width: 100%;
                margin-bottom: -88px;
                user-select: none;
            }

            .spinner {
                width: 164px;
                height: 164px;
                margin: auto;
                display: block;
            }

            .loading-box {
                height: 174px;
                margin-left: auto;
                margin-right: auto;
                width: 364px;
                display: block;
            }

            @media (max-width: 728px){
                .loading-box {
                    width: unset;
                }
            }
            
            /* spinner code from loading.io */
            .lds-facebook {
              display: block;
              margin: auto;
              position: relative;
              width: 80px;
              height: 80px;
            }
            .lds-facebook div {
              display: inline-block;
              position: absolute;
              left: 8px;
              width: 16px;
              background: #fff;
              animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
            }
            .lds-facebook div:nth-child(1) {
              left: 8px;
              animation-delay: -0.24s;
            }
            .lds-facebook div:nth-child(2) {
              left: 32px;
              animation-delay: -0.12s;
            }
            .lds-facebook div:nth-child(3) {
              left: 56px;
              animation-delay: 0;
            }
            @keyframes lds-facebook {
              0% {
                top: 8px;
                height: 64px;
              }
              50%, 100% {
                top: 24px;
                height: 32px;
              }
            }  
            
            .container {
                padding-top: 32px;
            }
        </style>

        <div ?hidden="${!this.enabled}">
            <div class="loading-box">
                <div class="container">                
                    <div class="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="loading-text">${this.message}</div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define(BunnySpinner.is, BunnySpinner);