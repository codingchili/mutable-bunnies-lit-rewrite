import {html, render} from '/node_modules/lit-html/lit-html.js';
import '/node_modules/ink-ripple/ink-ripple.js'
import '../component/bunny-spinner.js'
import '../component/bunny-box.js'

class CharacterCreate extends HTMLElement {

    static get is() {
        return 'game-create';
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'})

        this.showSelect();
        this.selected = false;//{name: 'Hunter'};

        application.onRealmLoaded((realm) => {
            this.realm = realm;
            this.spells = {};
            realm.spells.forEach(spell => {
                this.spells[spell.id] = spell;
            })
        });
    }

    select(e) {
        this.showNaming(e.model.playerclass);
    }

    _classInfo(classes, selected) {
        if (this.realm) {
            return this.realm.classes.get(selected);
        }
    }

    _available(playerclass) {
        for (let aClass of this.realm.availableClasses) {
            if (aClass === playerclass.id) {
                return true;
            }
        }
        return false;
    }

    _getSpellDescription(spellId, stats) {
        let spell = this.spells[spellId];
        if (spell) {
            this.character = {stats: stats};
            return eval('`' + this.spells[spellId].description + '`');
        } else {
            return "No description, possible overpowered.";
        }
    }

    _getSpellName(spellId) {
        let spell = this.spells[spellId];

        if (spell) {
            return spell.name;
        } else {
            return spellId;
        }
    }

    showSelect() {
        this.selection = true;
        this.naming = false;
    }

    showNaming(playerClass) {
        this.selection = false;
        this.naming = true;
        this.selected = playerClass;
        this.querySelector('#name').focus();
    }

    createCharacter(e) {
        if (e.type === "tap" || e.keyCode === 13) {

            if (this.characterName.length === 0)
                this.showToast('Character name must be longer than that.');
            else if (this.hasCharacter(this.characterName))
                this.showToast('You already have a character with that name');
            else {
                this.showToast('Creating character ' + this.characterName + " ..");

                this.server.create({
                    accepted: () => {
                        application.publish("character-create", {});
                        this.characterName = "";
                        this.showSelect();
                    },
                    error: (msg) => {
                        if (msg.status === 'CONFLICT') {
                            this.showToast('There is already a character with that name');
                        } else {
                            application.error("Failed to connect to the authentication server for character creation.");
                        }
                    }
                }, this.selected.id, this.characterName);
            }
        }
    }

    showToast(text) {
        this.toaster(text);
    }

    setServer(server) {
        this.server = server;
    }

    hasCharacter(name) {
        for (let i = 0; i < this.realm.characters.length; i++)
            if (this.realm.characters[i].name === name)
                return true;

        return false;
    }

    characterlist() {
        this.characterName = "";
        application.publish("cancel-create", {});
    }

    setToaster(toaster) {
        this.toaster = toaster;
    }

    get template() {
        return html`
           <template>
        <style>
            :host {
                display: block;
            }

            .container {
                display: block;
                width: 582px;
                margin-bottom: 32px;
                /* super important property that fixes a 1px jump on hover. */
                backface-visibility: hidden;
            }

            .list {
                margin: auto;
                max-width: 625px;
            }

            .class-name {
                font-size: medium;
                display: inline;
                position: absolute;
                top: 8px;
                margin-left: 132px;
            }

            .realm-title {
                padding-top: 20px;
                display: block;
                text-align: center;
                width: 100%;
                height: 32px;
            }

            .class-description {
                font-size: 14px;
                display: inline;
                position: absolute;
                top: 46px;
                margin-left: 146px;
                margin-right: 24px;
            }

            .class-image {
                max-width: 128px;
                max-height: 128px;
            }

            .container {
            }

            .character-class {
                min-height: 128px;
                margin-top: 16px;
                display: block;
                position: relative;
            }

            .spell-container {
                float: right;
                display: block;
                position: absolute;
                right: 8px;
                top: 0px;
            }

            .spell {
                width: 32px;
                height: 32px;
                float: left;
            }

            .spell-image {
                width: 32px;
                height: 32px;
            }

            .spell-name {
                font-size: medium;
                text-transform: uppercase;
            }

            .spell-description {
                margin-top: 4px;
                font-size: 14px;
            }

            .tooltip {
                width: 225px;
            }

            .tags {
                bottom: 8px;
                display: inline;
                position: absolute;
                margin-left: 145px;
                text-align: center;
                font-size: smaller;
                text-transform: uppercase;
            }

            .keywords {
                display: inline;
                right: 86px;
                bottom: 8px;
                position: absolute;
                float: none;
                font-size: smaller;
            }

            .create-button {
                position: absolute;
                top: 32px;
                right: 64px;
                width: 64px;
                height: 64px;
            }

            .character-name {
                position: absolute;
                top: 16px;
                left: 160px;
                width: 225px;
            }

            .class-stats {
                font-size: 14px;
                width: 176px;
            }

            .selected-class-image {
                width: 80%;
                margin-left: auto;
                margin-right: auto;
                display: block;
                opacity: 0.22;
            }

            .create-box {
                max-width: 625px;
                padding-bottom: 32px;
            }

            @media (max-width: 728px) {

                .create-box {
                    height: 296px;
                }

                .class-image {
                    width: 96px;
                    top: 28px;
                    left: 4px;
                    position: absolute;
                }

                .character-name {
                    position: relative;
                    width: auto;
                    left: unset;
                    top: unset;
                }

                .create-button {
                    height: 64px;
                    margin-left: auto;
                    margin-top: 96px;
                    margin-right: auto;
                    width: 100%;
                    top: unset;
                    right: unset;
                }

                .selected-class-image {
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                    display: block;
                    height: 96px;
                }

                .class-name {
                    width: 100%;
                    text-align: center;
                    margin-left: 0px;
                }

                .spell-image {
                    width: 16px;
                }

                .spell {
                    height: 16px;
                    float: none;
                }

                .class-description {
                    top: 43px;
                    left: 116px;
                    right: 34px;
                    width: 60%;
                    margin: auto;
                }

                .tags {
                    left: 0px;
                    right: 0px;
                    margin-left: 0px;
                }

                .character-class {
                    margin-top: 8px;
                    height: 158px;
                }
            }

        </style>

        <div class="container center-box noselect" elevation="3" ?hidden="${this.create}">
            <div hidden="[[naming]]">
                <div class="realm-title">
                    <h4 style="display: inline-block">Select class</h4>
                    <iron-icon on-down="characterlist"
                               icon="icons:reply"></iron-icon>
                </div>

                <div class="list select">
                    ${this.playerClasses()}
                </div>
            </div>

            <div hidden$="[[selection]]">
                <div class="realm-title">
                    <h4 style="display: inline-block">Name your {{selected.name}}&nbsp;</h4>
                    <iron-icon on-down="showSelect"
                               icon="icons:reply"></iron-icon>
                </div>

                <div class="create-box">
                    <paper-material elevation="0" class="character-class">

                        <template is="dom-if" if="[[selected]]">
                            <img src="{{realm.resources}}/gui/class/{{selected.id}}.svg"
                                 class="selected-class-image">
                        </template>

                        <paper-input id="name" class="character-name" value="{{characterName}}"
                                     label="Name"
                                     on-keydown="createCharacter"></paper-input>

                        <iron-icon on-tap="createCharacter" class="create-button"
                                   icon="icons:send"></iron-icon>

                        <stats-view selected="[[_classInfo(classes, selected.id)]]"></stats-view>
                    </paper-material>
                </div>
            </div>
        </div>

        <!--<paper-toast class="fit-bottom" id="toast" text="[[toastText]]"></paper-toast>-->
    </template>
        `;
    }

    playerClasses() {
        let classes = [];

        for (let playerClass of this.realm.classes) {
            let item = html`
                            <bunny-box elevation="3" class="character-class" on-tap="select" ?hidden="${!this._available(playerClass)}">
                                <ink-ripple></ink-ripple>

                                <div class="class-image">
                                    <img src="${this.realm.resources}/gui/class/${playerclass.id}.svg" id="playerclass-container">
                                    <bunny-tooltip location="left" for="playerclass-container">
                                        <div class="class-stats">
                                            Stats
                                            <stats-view compact="true"
                                                        selected="${this._classInfo(classes, playerClass.id)}">
                                            </stats-view>
                                        </div>
                                    </bunny-tooltip>
                                </div>

                                <div class="class-name">${playerClass.name}</div>
                                <div class="class-description">${playerClass.description}</div>

                                <div class="spell-container">
                                    ${this._spells(playerClass.spells)}
                                </div>

                                <div class="tags">
                                    ${playerClass.weapons}&nbsp;${playerClass.armors}
                                </div>

                                <div class="keywords">
                                    ${playerClass.keywords}
                                </div>
                            </bunny-box>
            `;

            classes.push(item);
        }

        return classes;
    }

    _spells(playerClass) {
        let spells = [];

        for (let spell of playerClass.spells) {
            let item = html`
                <div class="spell">
                    <img src="${this.realm.resources}/gui/spell/${spell}.svg"
                         class="spell-image">

                    <paper-tooltip animation-delay="0" class="tooltip">
                        <div class="spell-name">${this._getSpellName(spell)}</div>
                        <div class="spell-description">${this._getSpellDescription(spell, playerClass.stats)}</div>
                    </paper-tooltip>
                </div>
            `;

            spells.push(item);
        }
        return spells;
    }

    render() {
        render(this.template, this.shadowRoot);
        this.bind();
    }

    query(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    bind() {
    }
}

customElements.define(CharacterCreate.is, CharacterCreate);