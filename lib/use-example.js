import singleSpaIframes from './src/index';
const iframeLifeCycles = singleSpaIframes({
    baseUrl: 'http://localhost:2910/#',
    elGetter() {
        return document.getElementById('easyApp');
    }
});
export const bootstrap = iframeLifeCycles.bootstrap;
export const mount = iframeLifeCycles.mount;
export const unmount = iframeLifeCycles.unmount;
//# sourceMappingURL=use-example.js.map