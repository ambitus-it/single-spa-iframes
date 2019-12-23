import LifeCyclesType from '../types/LifeCycles'
import LifeCycleOpts from '../types/LifeCycleOpts'

class LifeCycles implements LifeCyclesType {
  iframe: HTMLElement = document.createElement("iframe");

  bootstrap(opts: LifeCycleOpts): Promise<any> {
    return Promise
      .resolve()
  }
  mount(opts: LifeCycleOpts): Promise<any> {
    return Promise
      .resolve()
      .then(() => {
        const element = opts.elGetter()
        this.iframe.setAttribute('src', `${opts.baseUrl}${window.location.pathname}`)
        this.iframe.setAttribute('style', 'width: 100%; height: 100%;')
        element.appendChild(this.iframe)

        console.log('mounted!')
      });
  }
  unmount(opts: LifeCycleOpts): Promise<any> {
    return Promise
      .resolve()
      .then(() => {
        const element = opts.elGetter()
        element.innerHTML = ``

        console.log('unmounted!');
      });
  }
  unload(opts: LifeCycleOpts): Promise<any> {
    return Promise
      .resolve()
      .then(() => {
        console.log('unloaded!');
      });
  }
}

const singleSpaIframes = (opts: LifeCycleOpts) => {
  const lifeCycles = new LifeCycles();

  return {
    bootstrap: () => lifeCycles.bootstrap(opts),
    mount: () => lifeCycles.mount(opts),
    unmount: () => lifeCycles.unmount(opts),
  }
}

export default singleSpaIframes
