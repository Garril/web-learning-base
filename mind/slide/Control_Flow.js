const detail = {index: idx}
const event = new CustomEvent('slide', {bubbles:true, detail})
this.container.dispatchEvent(event)