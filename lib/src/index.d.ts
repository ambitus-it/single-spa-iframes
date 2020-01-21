import LifeCycleOpts from '../types/LifeCycleOpts';
declare const singleSpaIframes: (opts: LifeCycleOpts) => {
    bootstrap: () => Promise<void>;
    mount: () => Promise<void>;
    unmount: () => Promise<void>;
};
export default singleSpaIframes;
