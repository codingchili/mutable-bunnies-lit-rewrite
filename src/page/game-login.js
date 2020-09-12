import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from '../component/styles.js';
import '/component/bunny-box.js';
import '/component/bunny-input.js';
import '/component/bunny-button.js';
import '/component/bunny-toast.js';

class GameLogin extends HTMLElement {

    static get is() {
        return 'game-login';
    }

    constructor() {
        super();
        application.subscribe('view', (view) => {
            if (view === GameLogin.is) {
                this.username.focus();
            }
        });
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        this.showlogin();
    }

    get template() {
        return html`
        <style>
            :host {
                /*position:relative;*/
                display: block;
                padding-top: 276px;
                padding-bottom: 20px;
            }
            
            ${BunnyStyles.noselect}
            ${BunnyStyles.headings}

            .title {
                text-align: center;
                padding-top: 16px;
                opacity: 0.76;
                margin-bottom: 24px;
            }

            .container {
                margin: auto;
                width: 525px;
                min-width: 326px;
                display: block;
            }

        #register {
            margin-top: 32px;
            margin-bottom: 4px;
        }
        
        bunny-input {
            margin-top: 12px;
        }

        h4 {
            text-align: center;
            color: white;
            font-family: "Open Sans", sans-serif;
            font-weight: 400;
            font-size: 20px;
        }

            @media (max-width: 728px), (max-height: 768px) {
                :host {
                    padding-top: 0;
                }

                .container {
                    width: 100%;
                    padding-top: 36px;
                }
            }

            .margintop {
                margin-top: 48px;
            }
        </style>
        
        <!-- keydown events? -->

        <bunny-box class="container">
            <div class="title">
                <h4 class="noselect">${this.title}</h4>
            </div>
            <bunny-input id="username" label="Username" @keydown="${this.submit.bind(this)}"></bunny-input>
            <bunny-input id="password" label="Password" type="password" @keydown="${this.submit.bind(this)}"></bunny-input>
            
            <div class="register" ?hidden="${this.islogin}">
                <bunny-input id="password-repeat" label="Password (repeat)" type="password" @keydown="${this.submit.bind(this)}"></bunny-input>
                <bunny-input id="email" label="Email (optional)" @keydown="${this.submit.bind(this)}"></bunny-input>
            
                <div class="buttons">
                    <bunny-button class="margintop flex" id="register" @click="${this.showlogin.bind(this)}">Back</bunny-button>
                    <bunny-button class="flex" primary @click="${this.register.bind(this)}">Register</bunny-button>
                </div>
            </div>
            
            <div class="buttons login" ?hidden="${!this.islogin}">
                <bunny-button class="margintop flex" @click="${this.showregister.bind(this)}">Register</bunny-button>
                <bunny-button class="flex" primary @click="${this.authenticate.bind(this)}">Login</bunny-button>
            </div>
        </bunny-box>
        
            <bunny-toast></bunny-toast>
        `;
    }

    submit(e) {
        if (e.keyCode === 13) {
            if (!this.islogin) this.register();
            if (this.islogin) this.authenticate();
        }
    }

    showToast(text) {
        this.toast.open(text);
    }

    submit(e) {
        if (e.keyCode === 13) {
            if (!this.islogin)
                this.register();

            if (this.islogin)
                this.authenticate();
        }
    }

    authenticate(e) {
        this.showToast('Authenticating..');

        this.authentication.login({
            accepted: (data) => {
                this.showToast('Loading..');
                this.resetForm();
                application.authenticated(data);
            },
            unauthorized: (data) => {
                this.showToast('Invalid user credentials');
                this.password.clear();
                this.password.focus();
            },
            missing: (data) => {
                this.showToast('The specified username does not exist');
                this.showregister();
                this.repeat.focus();
            },
            error: (e) => {
                this.showToast(e.message);
            },
            failed: () => {
                application.error('Failed to establish a connection to the authentication server.', true)
            }
        }, this.username.value, this.password.value);
    }

    register(e) {
        if (this.password === this.repeat.value) {
            this.showToast('Registering..');
            this.authentication.register({
                accepted: (data) => {
                    this.showToast('Loading..');
                    this.resetForm();
                    application.authenticated(data);
                },
                bad: (data) => {
                    this.showToast('Error: ' + e);
                },
                conflict: (data) => {
                    this.showToast('The username is not available.');
                    this.username.focus();
                },
                error: (e) => {
                    this.showToast(e.message);
                },
                failed: () => {
                    application.error("Failed to establish a connection to the authentication server.", true)
                }
            }, this.username.value, this.password.value, this.email.value);
        } else {
            this.showToast('Password (repeat) does not match the password.');
            this.repeat.focus();
        }
    }

    resetForm() {
        this.repeat.clear();
        this.password.clear();
        this.email.clear();
        this.showlogin();
    }

    showlogin() {
        this.title = 'Login';
        this.islogin = true;
        this.render();
        this.username.focus();
    }

    showregister() {
        this.title = 'Register';
        this.islogin = false;
        this.render();
        this.username.focus();
    }

    render() {
        render(this.template, this.shadowRoot);
        this.bind();
    }

    query(selector) {
        return this.shadowRoot.querySelector(selector);
    }

    bind() {
        if (this.username == null) {
            this.username = this.query('#username');
            this.password = this.query('#password');
            this.repeat = this.query('#password-repeat');
            this.email = this.query('#email');
            this.toast = this.query('bunny-toast');
        }

        if (this.authentication == null) {
            Promise.all(Array.of(
                import('../script/network.js'),
                import('../script/service/authentication.js')))
                .then(() => {
                    this.authentication = new Authentication();

                    if (application.development.autologin) {
                        this.username.value = 'admin';
                        this.password.value = 'admin';
                        this.submit({keyCode: 13})
                    }
                });
        }
    }
}

customElements.define(GameLogin.is, GameLogin);