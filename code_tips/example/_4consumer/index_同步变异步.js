function consumer(fn, time){
  let tasks = [],
      timer;
  
  return function(...args){
    tasks.push(fn.bind(this, ...args));
    if(timer == null){
      timer = setInterval(() => {
        tasks.shift().call(this)
        if(tasks.length <= 0){
          clearInterval(timer);
          timer = null;
        }
      }, time)
    }
  }
}

function add(ref, x){
  const v = ref.value + x;
  console.log(`${ref.value} + ${x} = ${v}`);
  ref.value = v;
  return ref;
}

let consumerAdd = consumer(add, 1000);

const ref = {value: 0};
for(let i = 0; i < 10; i++){
  consumerAdd(ref, i);
}
