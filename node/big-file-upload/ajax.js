// 封装基本的ajax
function $ajax() {
  options = Object.assign({ //assign(target, source) 复制对象
    url: "",
    methods: "POST",
    data: null,
    headers: {}
  }, options);

  // axios就是基于Promise管理的ajax库
  return new Promise((resolve, reject) => {
    // step1: 新建xhr对象
    let xhr = new XMLHttpRequest;
    // step2：open打开
    xhr.open(options.methods, options.url);
    // step3：监听事件变化
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (/^(2|3)\d{2}$/.test(xhr.status)) {
          resolve(JSON.parse(xhr.responseText));
          return
        }
        reject(xhr)
      }
    };
    // step4: 发送请求
    xhr.send(options.data);
  })

}

// 格式化文件名
function $formatFileName(filename) {
  // 哈希值之前的文件名
  let dotIndex = filename.lastIndexOf('.'),
    name = filename.subString(0, dotIndex),
    suffix = filename.subString(dotIndex + 1);
  // 加时间戳
  name = md5(name) + new Data().getTime();
  return {
    hash: name,
    suffix,
    filename: `${name}.${suffix}`
  }
}