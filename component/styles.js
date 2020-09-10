import {html} from '/node_modules/lit-html/lit-html.js';

export class BunnyStyles {

    static get variables() {
        return html`        
            * {
                --input-container-color: #888;
                --input-container-focus-color: #ddd;
                --accent: rgb(0, 176, 255);     
                --game-theme-opaque: #687f7d80;   
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
        }
        `;
    }
}