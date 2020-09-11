import {html, render} from '/node_modules/lit-html/lit-html.js';
import '/component/bunny-pages.js'
import '/component/bunny-bar.js'
import '/component/styles.js'
import './start-page.js'
import './game-login.js'
import {BunnyStyles} from "../component/styles";

class AppView extends HTMLElement {

    static get is() {
        return 'app-view';
    }

    constructor() {
        super();
        this.authenticated = false;
    }

    get template() {
        return html`
            <style>
                ${BunnyStyles.variables}
            
                :host {
                    display: block;
                    background-image: url("images/background.webp");
                    background-repeat: repeat-x;
                    background-attachment: fixed;
                    width: 100%;
                    min-height: 100vh;
                }

                #toolbar {
                    z-index: 100;
                }

                #footer {
                    z-index: 100;
                }
                
                .icon {
                    fill: var(--icon-color);
                    width: 24px;
                    height: 24px;
                    margin-top: 0px;
                }
                
                .icon:hover {
                    fill: var(--accent-color);
                    cursor: pointer;
                }
            </style>

            <bunny-bar id="toolbar" location="top">
                <div slot="left" class="icon" ?hidden="${this.authenticated}">
                    <!-- start.svg -->
                    <svg class="icon" @mousedown="${this._home.bind(this)}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                </div>
                <div id="banner" slot="text"></div>
                <div ?hidden="${!this.authenticated}" slot="right" class="icon" @mousedown="${this._logout.bind(this)}">
                    <!-- close.svg -->
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </div>
            </bunny-bar>

            <div id="container">
                <bunny-pages>
                    <div slot="tabs"></div>
                    <div slot="pages">
                        <start-page class="layout horizontal center-justified"></start-page>
                        <game-login class="layout horizontal center-justified"></game-login>
                        <realm-list class="layout horizontal center-justified"></realm-list>
                        <character-list class="layout horizontal center-justified"></character-list>
                        <patch-download class="layout horizontal center-justified"></patch-download>
                        <game-view></game-view>
                        <offline-view class="layout horizontal center-justified"></offline-view>
                    </div>
                <bunny-pages>
            </div>

            <div id="error-dialog">
                <error-dialog/>
            </div>

            <bunny-bar id="footer" location="bottom">${this.version}</bunny-bar>
        `;
    }

    connectedCallback() {
        let start = (application.development.skipStart) ? 'game-login' : 'start-page';
        this.view = (window.isPWA) ? 'game-login' : start;

        application.onVersion(patch => {
            this.version = `${patch.name} ${patch.version}`
            this.render();
        });

        application.onLogout(() => {
            this.authenticated = false;
            this.render();
        });

        application.onAuthentication(() => {
            this.authenticated = true;
            this.render();
        });

        application.subscribe('view', (view) => {
            window.scrollTo(0, 0);
            this.setView(view);
        });

        this.banner();
        this.attachShadow({mode: 'open'});
        this.render();

        customElements.whenDefined('bunny-pages').then(() => this.setView(this.view));
    }

    banner() {
        fetch('/data/banner.json')
            .then(response => response.json())
            .then(json => {
                this.shadowRoot.querySelector('#banner').textContent = json.text;
            })
    }

    render() {
        render(this.template, this.shadowRoot);
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

    setView(view) {
        let pages = this.shadowRoot.querySelector('bunny-pages');
        view = this.shadowRoot.querySelector(view);
        pages.update(view.getAttribute('index'));
    }

    _gameVisible() {
        return this.view === 'game-view';
    }
}

window.customElements.define(AppView.is, AppView);