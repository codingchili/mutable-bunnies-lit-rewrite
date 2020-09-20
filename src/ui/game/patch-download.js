import {html, render} from '/node_modules/lit-html/lit-html.js';
import '../components/bunny-progress.js'
import '../components/bunny-spinner.js'

class PatchDownload extends HTMLElement {

    static get is() {
        return 'patch-download';
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'})
    }

    get template() {
        return html``;
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

customElements.define(PatchDownload.is, PatchDownload);