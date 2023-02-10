import { mount } from "./mount.js"

export function patch(newVnode, oldVnode) {
  // Remember: the old.el won't pass the first mount.
  // it doesn't have el property.
  const el = newVnode.el = oldVnode.el
  // the same tag 
  if(newVnode.tag === oldVnode.tag) {
    // props
    const oldProps = oldVnode.props || {}
    const newProps = newVnode.props || {}
    for(const key in newProps) {
      const oldVal = oldProps[key]
      const newVal = newProps[key]
      if(oldVal !== newVal) {
        el.setAttribute(key, newVal)
      }
    }
    for(const key in oldProps) {
      if(!(key in newProps)) {
        el.removeAttribute(key)
      }
    }
    // children
    const oldChild = oldVnode.children
    const newChild = newVnode.children

    if(typeof oldChild === 'string') { // oldChild is a string
      if(typeof newChild === 'string') {
        if(newChild !== oldChild) {
          el.textContent = newChild
        }
      } else { // newChild is an array
        el.innerHTML = ""
        newChild.forEach(child => {
          mount(child, el)
        })
      }
    } else { // oldChild is an array
      if(typeof newChild === 'string') {
        el.textContent = newChild
      } else {
        // diff
        const commonMin = Math.min(newChild.length, oldChild.length)
        for(let i = 0; i < commonMin; i++) {
          patch(newChild[i], oldChild[i])
        }
        if(newChild.length > commonMin) {
          newChild.slice(oldChild.length).forEach(child => {
            mount(child, el)
          })
        } else if(oldChild.length > commonMin) {
          oldChild.slice(newChild.length).forEach(child => {
            el.removeChild(child.el)
          })
        }
      }
    }

  } else { // different tag, change directly
    el.innerHTML = ""
    newVnode?.children?.forEach(child => {
      mount(child, el)
    })
  }

}