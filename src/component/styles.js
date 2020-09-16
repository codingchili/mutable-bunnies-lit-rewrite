import {html} from '/node_modules/lit-html/lit-html.js';

export class BunnyStyles {

    static get icons() {
        return html`
            .icon {
                fill: var(--icon-color);
                width: 24px;
                height: 24px;
                margin-top: 0px;
            }
        
            .icon:hover {
                fill: var(--accent-color);
                cursor: pointer;
            }`;
    }

    static get ripple() {
        return html`
            ink-ripple {
                --ink-ripple-opacity: 0.6;
                --ink-ripple-duration: 0.3s;
                --ink-ripple-accent-color: #969696;
              }
        `;
    }

    static get variables() {
        return html`        
            * {
                --input-container-color: #888;
                --input-container-focus-color: #ddd;
                --accent-color: rgb(0, 176, 255);     
                --game-theme-opaque: #687f7d80;   
                --accent-ripple-tab: #00b0ff;
                --icon-color: #ddd;
                --primary-text-color: #ffffff;
            }    
        `;
    }

    static get elevation() {
        return html`
        .elevation {
              box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
              0 1px 18px 0 rgba(0, 0, 0, 0.12),
              0 3px 5px -1px rgba(0, 0, 0, 0.4);
           }
        `;
    }

    static get noselect() {
        return `
        .noselect {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: default;
        }`
    }

    static get headings() {
        return `
            h1, h2, h3, h4, h5, h6 {
            overflow: visible;
            padding: 0 1em;
            text-align: center;
            font-weight: 400;
            margin: 0px;    
            padding: 0px;
            line-height: 1em;
            user-select: none;
        }
        `;
    }

    static get links() {
        return `
        a, a:active, a:visited, a:focus {
            color: #ffffff;
            text-decoration: none;
        }

        a:hover {
            color: #ffffff;
            text-decoration: underline;
        }
        `;
    }

    static get scrollbars() {
        return `
            /* check out index.html */
        `;
    }
}