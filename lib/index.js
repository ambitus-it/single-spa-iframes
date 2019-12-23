'use strict';

class LifeCycles {
    constructor() {
        this.iframe = document.createElement("iframe");
    }
    bootstrap(opts) {
        return Promise
            .resolve();
    }
    mount(opts) {
        return Promise
            .resolve()
            .then(() => {
            const element = opts.elGetter();
            this.iframe.setAttribute('src', `${opts.baseUrl}${window.location.pathname}`);
            this.iframe.setAttribute('style', 'width: 100%; height: 100%;');
            element.appendChild(this.iframe);
            console.log('mounted!');
        });
    }
    unmount(opts) {
        return Promise
            .resolve()
            .then(() => {
            const element = opts.elGetter();
            element.innerHTML = ``;
            console.log('unmounted!');
        });
    }
    unload(opts) {
        return Promise
            .resolve()
            .then(() => {
            console.log('unloaded!');
        });
    }
}
const singleSpaIframes = (opts) => {
    const lifeCycles = new LifeCycles();
    return {
        bootstrap: () => lifeCycles.bootstrap(opts),
        mount: () => lifeCycles.mount(opts),
        unmount: () => lifeCycles.unmount(opts),
    };
};

module.exports = singleSpaIframes;
