import {html, render} from '/node_modules/lit-html/lit-html.js';
import {BunnyStyles} from '/component/styles.js';
import './bunny-box.js';
import './bunny-input.js';
import './bunny-button.js';

class GameLogin extends HTMLElement {

    static get is() {
        return 'game-login';
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});
        render(this.template, this.shadowRoot);
        this.username = this.shadowRoot.querySelector('#username');
        this.password = this.shadowRoot.querySelector('#password');
        this.showlogin();
    }

    get template() {
        return html`
        <style>
            :host {
                position:relative;
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
            <bunny-input id="username" label="Username"></bunny-input>
            <bunny-input id="password" label="Password" type="password"></bunny-input>
            
            <div class="register">
                <bunny-input id="password-repeat" label="Password (repeat)" type="password"></bunny-input>
                <bunny-input id="email" label="Email (optional)"></bunny-input>
            
                <div class="buttons">
                    <bunny-button class="margintop flex" id="register" onclick="this.getRootNode().host.showlogin()">Back</bunny-button>
                    <bunny-button class="flex" primary onclick="this.getRootNode().host.register()">Register</bunny-button>
                </div>
            </div>
            
            
            <div class="buttons login">
                <bunny-button class="margintop flex" onclick="this.getRootNode().host.showregister()">Register</bunny-button>
                <bunny-button class="flex" primary onclick="this.getRootNode().host.login()">Login</bunny-button>
            </div>
        </bunny-box>
        
        <!--<bunny-toast class="fit-bottom"></bunny-toast>-->
        `;
    }

    query(selector) {
        return this.shadowRoot.querySelectorAll(selector);
    }

    login() {
        console.log('login');
    }

    register() {
        console.log('register');
    }

    submit(e) {
        if (e.keyCode === 13) {
            if (!this.hideregisterform)
                this.register();

            if (!this.hideloginform)
                this.authenticate();
        }
    }

    showlogin() {
        this.title = 'Login';
        this.query('.login').forEach(element => element.style.display = 'block');
        this.query('.register').forEach(element => element.style.display = 'none');
        render(this.template, this.shadowRoot);
        this.username.focus();
    }

    showregister() {
        this.title = 'Register';
        this.query('.login').forEach(element => element.style.display = 'none');
        this.query('.register').forEach(element => element.style.display = 'block');
        render(this.template, this.shadowRoot);
        this.username.focus();
    }
}

customElements.define(GameLogin.is, GameLogin);