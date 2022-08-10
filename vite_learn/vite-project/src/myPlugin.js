const fileRegex = /\.(my-file-ext)$/
export default function myPlugin() {
  function compileFileToJS(src) {
    console.log(src);
  }
  return {
    name: 'transform-file',
    transform(src, id) {
      if(fileRegex.test(id)) {
        return {
          code: compileFileToJS(src),
          map: null 
        }
      }
    }
  }
}