/* 
  Subresource Integrity(SRI)
    前端工程开发的静态资源--CSS/JS等，放到静态托管cdn
    但是cdn被劫持、被篡改。怎么办？
    script标签内的integrity属性
      <script src="..." 
          integrity="sha384-{some-hash-value}"
          crossorigin="anonymous"></script>
      浏览器发出请求，拿到资源，下载完毕后，
      会对真实的资源进行hash计算（根据integrity的算法）
      通过hash值对比，知道资源是否被篡改。
*/