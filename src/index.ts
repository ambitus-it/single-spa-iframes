import LifeCycleType from '../types/LifeCycles'
import LifeCycleOpts from '../types/LifeCycleOpts'

class Lifecycles implements LifeCycleType {
  constructor(opts: LifeCycleOpts) {
    this.node = opts.elGetter()

    Object.defineProperty(history, 'pushState', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this._wr('pushState')
    })
    Object.defineProperty(history, 'replaceState', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this._wr('replaceState')
    })
  }

  iframe: HTMLElement = document.createElement("iframe");
  node: HTMLElement;
  private _wr = (type): Function => {
    const orig = history[type];

    return function(...args): typeof orig {
        const rv = orig.apply(this, args);
        const e = new Event(type);
        // @ts-ignore
        e.arguments = args;
        window.dispatchEvent(e);

        return rv;
    };
  };

  private setIframeSrc(opts: LifeCycleOpts): void {
    this.iframe.setAttribute('src', `${opts.baseUrl}${window.location.pathname}`)
  }

  bootstrap(opts: LifeCycleOpts): Promise<void> {
    return Promise
      .resolve()
      .then(() => {
        this.setIframeSrc(opts)
        this.iframe.setAttribute('style', 'width: 100%; height: 100%;')
        this.iframe.setAttribute('frameborder', '0')

        window.addEventListener('pushState', (): void => {
          this.setIframeSrc(opts)
        });
      })
  }

  mount(opts?: LifeCycleOpts): Promise<void> {
    return Promise
      .resolve()
      .then(() => {
        const element = this.node
        element.appendChild(this.iframe)
      });
  }

  unmount(opts?: LifeCycleOpts): Promise<void> {
    return Promise
      .resolve()
      .then(() => {
        const element = this.node
        element.innerHTML = ``
      });
  }

  unload(opts?: LifeCycleOpts): Promise<void> {
    return Promise
      .resolve()
      .then(() => {
      });
  }
}

const singleSpaIframes = (opts: LifeCycleOpts) => {
  const lifecycles = new Lifecycles(opts);

  return {
    bootstrap: () => lifecycles.bootstrap(opts),
    mount: () => lifecycles.mount(opts),
    unmount: () => lifecycles.unmount(opts),
  }
}

export default singleSpaIframes
