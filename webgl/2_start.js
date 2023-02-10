/* 
  1、创建WebGL上下文
  2、创建WebGL Program
  （Program指什么：把数据送到GPU中，但是GPU中怎么运算，
    怎么处理数据，把他变成像素，透明度颜色等信息的过程---
    在Program内有渲染管线提供的处理的代码，就叫他 着色器shaders）
  3、将数据存入缓冲区
  4、将缓冲区数据读取到GPU
  5、GPU执行WebGL程序，输出结果
*/
// 1、创建上下文---现在估计没有兼容性问题了
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
/* 
  2、写 Shaders着色器
    有两种 
      Vertex Shader 顶点着色器 
              ---处理图形轮廓
      Fragment Shader 片元着色器 
              ---轮廓处理好后（光栅化之后），把点映射到片元着色器中，用片元着色器处理颜色
*/
// vertex 创建和编译
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);
// fragement 创建和编译
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);
// 创建program，关联vertex和fragment两个着色器
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
// 把program给link到gl的上下文
gl.linkProgram(program);
// 使用当前的webgl program去处理要渲染的图像
gl.useProgram(program);


// ========================================
// 画三角
const points = new Float32Array([
  -1, -1,
  0, 1,
  1, -1,
]); // js弱类型，webgl分整数和浮点
const bufferId = gl.createBuffer();
// buffer与上下文绑定
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
// 把points的数据放到缓冲区里
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
// 获取顶点着色器中 position变量的地址(指针)
const vPosition = gl.getAttribLocation(program, 'position');
// 给变量设置长度和类型 --- 2维向量，浮点型
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活变量
gl.enableVertexAttribArray(vPosition);
// 暂时略。。。。。