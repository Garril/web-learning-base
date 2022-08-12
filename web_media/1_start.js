/* 
  web多媒体历史
    1、flash（移动端不支持flash）
    2、html5（浏览器自带的video和audio标签，功能有限，比如部分格式不支持，
      而且数据的请求、请求和错误的状态我们都拿不到，很多功能都浏览器接管了。）
    3、Media Source Extensions（媒体资源拓展API ---MSE）
    现在开发中：3为主，2为辅
    只有 Safari on iOS 不支持MSE

  ==================================================================
  基础知识
    --------------------------------------------------
    1、编码格式
      图像
        图像分辨率：图像水平和垂直方向所具有的像素个数
        图像深度：存储每个像素所需要的比特数，决定了每个像素可能的颜色数，可能的灰度级数。
          彩色：RGB，3个分量每个分量8位共24位，2的24次方，单色图像就8位，2的8次方。
        
      视频
        分辨率：每一帧图像的分辨率
        帧率：视频单位事件内包含的视频帧的数量
        码率：指视频单位时间内传输的数据量，一般kbps表示，千位每秒
      （图像大小由对应的分辨率和深度影响，视频由对应的分辨率，帧率，码率影响）
      
      关于帧一些补充，看图 frame.png
      
      为什么需要编码？
        彩色图片，1920*1080，求大小?
          1920 * 1080 * 24/8 = 6220800Byte(5.9M)
        假设视频帧率30FPS，（1s30张图片，估算每张6M）时长90分钟
          90 * 60 * 30 * 6 = 972,000（M）大概 949.2 GB
        (由上可以知道，我们需要视频编码，不然一手机存不下一部电影。)

      编码冗余的类别：
        1、空间冗余
          比如蓝天，某些块，都一个颜色，比方说有一万块像素，每个颜色都一样的存一万遍，
          很浪费，直接存一次，还有出现的次数等信息会好很多
        2、时间冗余
          第N帧 和 第N+1帧 的差别不大，把相同的地方又存储一遍，叫时间冗余
        3、编码冗余
          整个图片就两个颜色，直接1和0表示就行
        4、视觉冗余
          把人类看不到的、高频的颜色，去除
      
      编码数据处理流程
        1、预测（去除空间冗余、时间冗余）---帧内预测：I帧，帧间预测：两帧之差，存储共同的
        2、变换（去除空间冗余） ---3个颜色的苹果，一开始是按颜色排，现在可能按大小排，或其他
        3、量化（去除视觉冗余） ---把一定大小的苹果给淘汰掉。
        4、熵编码 （去除编码冗余） ---比如只剩下3个红苹果和一个绿苹果，就只用表示红色和绿色了。

      编码涉及到的一些格式
        H.262: 数字电视、VCD、DVD光盘
        H.264：PC端的视频编码（4k往上压缩效率不行）
        H.265：4k视频的编码（压缩效率比264高一倍），手机现在基本265编码 （收费）
        H.266：用于HVR，打游戏，穿戴设备，8K视频
        VP10：压缩效率不如265，后续组合其他公司，整了个AOM联盟，推出了AV1的编码
        AV1：略差于265，但差不多（免费）
        (H.系列均是 JVT的，VP系列是Google的)
        AVS系列：中国DVD不想给262交版权费整的。AVS3和AV1差不多

    --------------------------------------------------
    2、封装格式
      存储音视频、图片或者字幕信息的一种容器
      eg： 视频、音频、字幕 ----> 封装格式
      
      视频封装格式 和 对应视频文件格式，看图 format.jpg

    --------------------------------------------------
    3、多媒体元素和扩展API
      video标签：
      https://www.w3school.com.cn/tags/tag_video.asp
        https://www.w3school.com.cn/jsref/dom_obj_video.asp
      audio标签：
        https://www.w3school.com.cn/tags/tag_audio.asp
        https://www.w3school.com.cn/jsref/dom_obj_audio.asp

      两标签除了例子中的直接src，也可以内包裹多个source标签
      <source src="./xxx.mp4"></source>

      缺点：
        不支持 hls、flv等视频格式
        视频资源的请求和加载，无法通过代码控制，以下功能无法实现：
          分段加载（节省流量）
          清晰度无缝切换
          精确预加载
        （因为全给浏览器去控制了）

      MSE：
        1、创建mediaSource实例
        2、创建指向mediaSource的URL
        3、监听sourceopen事件
        4、创建sourceBuffer
        5、向sourceBuffer中加入数据
        6、监听updateend事件
      （demo 看最下面的js代码）
      播放流程看图： MSE_play_process.jpg
      (两种法子，一种把音视频同时放Sourcebuffer里面，到video标签里面再解封装。
        把音频视频放到不同的buffer，再解码，渲染同步播放。
        另一种  就是直接分离到不同的Sourcebuffer)
      
    --------------------------------------------------
    4、流媒体协议
      协议名称      传输协议    封装格式      HTML5
      HLS           HTTP       M3U8/TS      支持
      HTTP-FLV      HTTP       FLV          支持
      Dash          HTTP       FMP4         支持
      RTMP          TCP        FLV      不支持（flash时代的）

      HLS: Http Live Streaming，一个由Apple公司提出的基于HTTP的
      媒体流传输协议，用于实时音视频流的传输，目前HLS协议被广泛的
      应用于视频点播和直播领域。
      播放流程：看HLS.jpg

      应用场景：
        点播：视频上传服务器 ---> 服务器转码为1080p或720p这种不同码率的码流 ---> 分发到cdn
            ---> 客户端点开播放器，播放器到cdn进行拉流
        直播：和点播差不多，但是视频数据实时性较高。
        云游戏：相当于只是一个端，所有程序运行在一个远端的port上，打开云游戏，相当于
          给port发了个指令，表示开始，远端会生成对应的视频流，把视频流传回来， 相当于
          实现了一个循环，一般要求延迟在50ms之内。
        实时通信、视频编辑。。。

*/
let mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
let mediaSource = new MediaSource();
video.src = URL.createObjectURL(mediaSource);
mediaSource.addEventListener('sourceopen',() => {
  let mediaSource = this;
  let sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
  fetchAB('frag_bunny.mp4',function(buf) {
    // sourcebuff里面的数据是异步的，需要监听updateend（一个分片一个的加载）
    sourceBuffer.addEventListener('updateend',function() {
      mediaSource.endOfStream();
      video.play();
    });
    sourceBuffer.appendBuffer(buf);
  });
});

function fetchAB(url, cb) {
  let xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    cb(xhr.response);
  };
  xhr.send();
};