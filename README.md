# single-spa-iframes
A Workaround to use microfrontends with single-spa

Use example

```js
  const iframeLifeCycles = singleSpaIframes({
    baseUrl: 'http://localhost:2910/#',
    elGetter() {
      return document.getElementById('easyApp')
    }
  })

  export const bootstrap = iframeLifeCycles.bootstrap
  export const mount = iframeLifeCycles.mount
  export const unmount = iframeLifeCycles.unmount
```
