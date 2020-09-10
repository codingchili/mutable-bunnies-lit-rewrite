import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from './styles.js';
import './bunny-box.js';

class BunnyBar extends HTMLElement {

    static get is() {
        return 'bunny-bar';
    }

    connectedCallback() {
        this.website = !(window.isPWA);
        this.banner = {};

        application.subscribe('installed', installed => {
            this.website = !installed;
        });

        application.onAuthentication(() => {
            this.loggedin = true;
        });

        application.onLogout(() => {
            this.loggedin = false;
        });

        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);
    }

    _banner() {
        return !!(this.banner.text);
    }

    _home() {
        application.view('start-page');
    }

    _logout() {
        if (window.isPWA) {
            document.exitFullscreen();
        }
        application.logout();
    }

    get template() {
        return html`
            <style>
            :host {
                display: block;
                width: 100%;
                position: fixed;
                ${this.getAttribute('location')}: 0;
                left: 0;
                right: 0;
                height: 36px;
            }
            
            
            .text {
                font-size: 12px;
                opacity: 0.76;
                margin: auto;
                display: block;
                color: #fff;
                width: 100%;
                text-align: center;
                padding-top: 12px;
                font-family: "Open Sans", sans-serif;
            }
            
            bunny-box {
                width: 100%;
                height: 100%;
            }
            

        </style>

            <bunny-box solid>
                <p class="text">
                    <slot></slot>
                </p>
            </bunny-box>
        `;
    }
}

customElements.define(BunnyBar.is, BunnyBar);