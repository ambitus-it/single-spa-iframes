import singleSpaIframes from './index'

const iframeLifeCycles = singleSpaIframes({
  baseUrl: 'http://localhost:2910/#',
  elGetter: () => document.getElementById('easyApp')
})

export const bootstrap = iframeLifeCycles.bootstrap
export const mount = iframeLifeCycles.mount
export const unmount = iframeLifeCycles.unmount
