import {html, render} from '/node_modules/lit-html/lit-html.js';

const icons = {
    info: html`
            <svg class="icon icon-info" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
            </svg>
    `,
    favorite: html`
        <svg class="icon icon-favorite" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
        </svg>        
    `,
    secure: html`
            <svg class="icon icon-secure" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"/>
            </svg>        
    `,
    logout: html`
        <svg class="icon icon-logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
    `,
    home: html`
            <svg class="icon icon-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>    
    `,
    send: html`
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
    `,
    back: html`
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
        </svg>
    `
}

class BunnyIcon extends HTMLElement {

    static get is() {
        return 'bunny-icon';
    }

    constructor() {
        super();
        this.icon = this.getAttribute('icon');
    }

    connectedCallback() {
        if (icons[this.icon]) {
            render(icons[this.icon], this);
        } else {
            console.warn(`bunny-icon: icon not found '${this.icon}'`);
        }

    }
}
customElements.define(BunnyIcon.is, BunnyIcon);