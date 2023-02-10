import { patch } from "./patch.js"
import { watchEffect } from "./reactive.js"
/*
vnode:
  {
    tag,
    props,
    children
  }
*/
export function mount(vnode, container) {
  let el = vnode.el = document.createElement(vnode.tag)
  // props
  for(const key in vnode.props) {
    const val = vnode.props[key]
    if(key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), val)
    } else {
      el.setAttribute(key, val)
    }
  }
  // children
  if(vnode.children) {
    if(typeof vnode.children === "string") {
      el.textContent = vnode.children
    } else { // array
      vnode.children.forEach(child => {
        mount(child, el)
      })
    }
  }
  container.appendChild(el)
}

/*
mountApp(App, document.getElementById('app'))
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
*/
export function mountApp(cpn, container) {
  let isMounted = false
  let oldVnode
  watchEffect(() => {
    if( !isMounted ) { // first run
      oldVnode = cpn.render()
      mount(oldVnode, container)
      isMounted = true
    } else { // need patch
      const newVnode = cpn.render()
      patch(newVnode, oldVnode)
      oldVnode = newVnode
    }
  })
}