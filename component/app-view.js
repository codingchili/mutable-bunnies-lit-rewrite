import {html, render} from '/node_modules/lit-html/lit-html.js';
import './start-page.js'
import './bunny-bar.js'

class AppView extends HTMLElement {

    static get is() {
        return 'app-view';
    }

    get template() {
        return html`
            <style>
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
            </style>

            <bunny-bar id="toolbar" location="top">Mutable bunnies, beware.</bunny-bar>

            <div id="container">
                <div id="start-page">
                    <start-page class="layout horizontal center-justified"/>
                </div>

                <div id="game-login">
                    <game-login class="layout horizontal center-justified"/>
                </div>

                <div id="realm-list">
                    <realm-list class="layout horizontal center-justified"/>
                </div>

                <div id="character-list">
                    <character-list class="layout horizontal center-justified"/>
                </div>

                <div id="patch-download">
                    <patch-download class="layout horizontal center-justified"/>
                </div>

                <div id="game-view" style="width: 100%; height: 100%;">
                    <game-view/>
                </div>

                <div id="offline-view">
                    <offline-view class="layout horizontal center-justified"/>
                </div>
            </div>

            <div id="error-dialog">
                <error-dialog/>
            </div>

            <bunny-bar id="footer" location="bottom">Unstable Wesen 1.4.0</bunny-bar>
        `;
    }

    connectedCallback() {
        let start = (application.development.skipStart) ? 'game-login' : 'start-page';
        this.view = (window.isPWA) ? 'game-login' : start;

        application.subscribe('view', (view) => {
            window.scrollTo(0, 0);
            this.view = view;
        });

        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);
    }

    _gameVisible() {
        return this.view === 'game-view';
    }
}

window.customElements.define(AppView.is, AppView);