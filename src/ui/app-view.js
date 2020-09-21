import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from "../component/styles";
import '/component/bunny-pages.js'
import '/component/bunny-bar.js'
import '/component/bunny-icon.js'
import './page-start.js'
import './page-login.js'
import './game-realms.js'
import './game-characters.js'
import './patch-download.js'

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
                
                ${BunnyStyles.icons}
            </style>

            <bunny-bar id="toolbar" location="top">
                <div slot="left" class="icon" ?hidden="${this.authenticated}">
                    <bunny-icon @mousedown="${this._home.bind(this)}" icon="home">
                </div>
                <div id="banner" slot="text"></div>
                <div ?hidden="${!this.authenticated}" slot="right" class="icon" @mousedown="${this._logout.bind(this)}">
                    <bunny-icon icon="close">
                </div>
            </bunny-bar>

            <div id="container">
                <bunny-pages>
                    <div slot="tabs"></div>
                    <div slot="pages">
                        <page-start class="layout horizontal center-justified"></page-start>
                        <page-login class="layout horizontal center-justified"></page-login>
                        <game-realms class="layout horizontal center-justified"></game-realms>
                        <game-characters class="layout horizontal center-justified"></game-characters>
                        <patch-download class="layout horizontal center-justified"></patch-download>
                        <game-view></game-view>
                        <offline-view class="layout horizontal center-justified"></offline-view>
                    </div>
                <bunny-pages>
            </div>

            <div id="error-dialog">
                <error-dialog></error-dialog>
            </div>

            <bunny-bar id="footer" location="bottom">${this.version}</bunny-bar>
        `;
    }

    connectedCallback() {
        let start = (application.development.skipStart) ? 'page-login' : 'page-start';
        this.view = (window.isPWA) ? 'page-login' : start;

        application.onError((e) => {
            import('./error-dialog.js').then(() => {
                customElements.whenDefined('error-dialog').then(() => {
                    this.render();
                    this.shadowRoot.querySelector('error-dialog').open(e);
                });
            });
        });

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

        customElements.whenDefined('bunny-pages').then(() => application.publish('view', start));
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
        application.view('page-start');
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