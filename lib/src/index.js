class Lifecycles {
    constructor(opts) {
        this.iframe = document.createElement("iframe");
        this._wr = (type) => {
            const orig = history[type];
            return function (...args) {
                const rv = orig.apply(this, args);
                const e = new Event(type);
                // @ts-ignore
                e.arguments = args;
                window.dispatchEvent(e);
                return rv;
            };
        };
        this.node = opts.elGetter();
        Object.defineProperty(history, 'pushState', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this._wr('pushState')
        });
        Object.defineProperty(history, 'replaceState', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this._wr('replaceState')
        });
    }
    setIframeSrc(opts) {
        this.iframe.setAttribute('src', `${opts.baseUrl}${window.location.pathname}`);
    }
    bootstrap(opts) {
        return Promise
            .resolve()
            .then(() => {
            this.setIframeSrc(opts);
            this.iframe.setAttribute('style', 'width: 100%; height: 100%;');
            this.iframe.setAttribute('frameborder', '0');
            window.addEventListener('pushState', () => {
                this.setIframeSrc(opts);
            });
        });
    }
    mount(opts) {
        return Promise
            .resolve()
            .then(() => {
            const element = this.node;
            element.appendChild(this.iframe);
        });
    }
    unmount(opts) {
        return Promise
            .resolve()
            .then(() => {
            const element = this.node;
            element.innerHTML = ``;
        });
    }
    unload(opts) {
        return Promise
            .resolve()
            .then(() => {
        });
    }
}
const singleSpaIframes = (opts) => {
    const lifecycles = new Lifecycles(opts);
    return {
        bootstrap: () => lifecycles.bootstrap(opts),
        mount: () => lifecycles.mount(opts),
        unmount: () => lifecycles.unmount(opts),
    };
};
export default singleSpaIframes;
//# sourceMappingURL=index.js.map