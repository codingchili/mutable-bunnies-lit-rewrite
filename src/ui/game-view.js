import {html, render} from '/node_modules/lit-html/lit-html.js';
import './game/player-status.js'

class GameView extends HTMLElement {

    static get is() {
        return 'game-view';
    }

    constructor() {
        super();
        this.target = false;

        application.onGameLoaded(() => {
            game.subscribe('character-update', character => {
                if (character === game.player) {
                    this.player = character;
                    this.render();
                }
            });

            game.subscribe('character-target', character => {
                this.target = character;
                this.render();
            });
            game.subscribe('creature-despawn', creature => {
                if (creature.id === this.target.id) {
                    this.target = false;
                    this.render();
                }
            })
        });

        application.onAuthentication(() => {
            this.ambient = new Audio('/sound/mutable_theme.mp3');
            this.ambient.loop = true;
            this.ambient.volume = 0.5;

            this.ambient.addEventListener('loadeddata', () => {
                this.ambient.play();
            });
        });

        application.onScriptShutdown(() => {
            if (this.ambient) {
                this.ambient.volume = 0.5;
                this.ambient.currentTime = 0;
                this.ambient.play();
            }
        });

        application.onScriptsLoaded(() => {
            if (this.ambient) {
                this.ambient.pause();
            }
        });

        application.onCompleteUpdate((event) => {
            this.loading = true;
            event.status('Initializing..');

            window.server = event.server;
            window.character = event.character;
            window.patch = event.patch;

            window.onScriptsLoaded = () => {};
            try {
                let index = 0;

                // serializes loading of scripts.
                let loader = (index) => {
                    if (index < event.patch.executable.length) {
                        let script = event.patch.executable[index];
                        event.status('init ' + script.split('.')[0]);

                        let reader = new FileReader();
                        reader.onload = () => {
                            try {
                                // indirect eval for global scope.
                                (1, eval)(reader.result);
                                index++;
                                loader(index);
                            } catch (err) {
                                this._handleError(err);
                            }
                        };
                        if (event.patch.files[script]) {
                            reader.readAsText(event.patch.files[script].data);
                        } else {
                            application.error('Bootstrap script not downloaded: "' + script + '".');
                        }
                    } else {
                        event.status('Joining server..');

                        application.scriptsLoaded();
                        window.game.onScriptsLoaded({
                            accepted: () => {
                                // use the patching UI for loading the game scripts.
                                application.showGame();
                                this.loaded();
                            },
                            error: (msg) => {
                                this._handleError(new Error(msg));
                            }
                        });
                    }
                };
                loader(index);
            } catch (err) {
                this._handleError(err);
            }
        });
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'})
    }

    get template() {
        return html`
            <style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
                margin-bottom: -3px;
                padding: 0;
            }

            @keyframes fadein {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            #interface {
                animation: fadein 0.72s ease 1;
                position: absolute;
                z-index: 100;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            #interface * {
                pointer-events: all;
            }

        </style>
        <div id="interface">
            <notification-toaster></notification-toaster>
            <!--<div ?hidden="${this.loading}">-->

                <quest-log></quest-log>
                <game-dialog></game-dialog>
                <loot-dialog></loot-dialog>
                <death-dialog></death-dialog>
                <player-inventory></player-inventory>
                <friend-view></friend-view>

                <player-status .target="${this.target}" style="right: 16px; left: unset;" ?hidden="${!this.target}"></player-status>

                <!-- player -->
                <player-status .target="${this.player}"></player-status>

                <party-view></party-view>

                <chat-box></chat-box>
                <spell-bar></spell-bar>
                <world-designer></world-designer>
                <game-menu></game-menu>
                <context-menu></context-menu>
            <!--</div>-->
        </div>
        `;
    }

    loaded() {
        this.loading = false;
        this.target = false;
        this.render();
    }

    _handleError(err) {
        application.error(err.message);
        throw err;
    }

    render() {
        render(this.template, this.shadowRoot);
    }
}

customElements.define(GameView.is, GameView);