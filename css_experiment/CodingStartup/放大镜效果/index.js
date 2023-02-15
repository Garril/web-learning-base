document.querySelector('#image').addEventListener('mouseenter',enterHandler);
document.querySelector('#image').addEventListener('mouseleave',leaveHandler);
document.querySelector('#image').addEventListener('mousemove',moveHandler);

document.querySelector('#image').addEventListener('touchstart',enterHandler);
document.querySelector('#image').addEventListener('touchend',leaveHandler);
document.querySelector('#image').addEventListener('touchmove',moveHandler);

function enterHandler(e) {
    e.target.setAttribute('zoomed',1);
}
function leaveHandler(e) {
    e.target.removeAttribute('zoomed');
}
function moveHandler(e) {
    let rect = e.target.getBoundingClientRect();
    // 手机端兼容
    let offsetX,offsetY;
    if(['touchstart','touchmove','touchend'].includes(e.type)){
        offsetX=e.touches[0].pageX - rect.left;
        offsetY=e.touches[0].pageY - rect.top;
        e.preventDefault();
    }else{
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    }
    let x=offsetX/rect.width;
    let y=offsetY/rect.height;
    e.target.style.setProperty('--x',x);
    e.target.style.setProperty('--y',y);
}