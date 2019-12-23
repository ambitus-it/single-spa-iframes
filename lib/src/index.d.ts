import LifeCycleOpts from '../types/LifeCycleOpts';
declare const singleSpaIframes: (opts: LifeCycleOpts) => {
    bootstrap: () => Promise<any>;
    mount: () => Promise<any>;
    unmount: () => Promise<any>;
};
export default singleSpaIframes;
