import { h } from './h.js'
import { mount, mountApp } from './mount.js'
import { reactive } from './reactive.js'
import { patch } from './patch.js'

const App = {
  data: reactive({
    count: 0
  }),
  render() {
    return h('div', {
      onClick: () => {
        this.data.count++
      },
      class: 'color_red'
    }, String(this.data.count))
  }
}
// html: <div id="app"></div>
mountApp(App, document.getElementById('app'))