const path = require("path");
const fse = require("fs-extra"); //fs文件模块拓展包

const UPLOAD_DIR = path.resolve(__dirname, ".", "target"); //拼接路径
// console.log(UPLOAD_DIR);
const fileName = "me";
const filePath = path.resolve(UPLOAD_DIR, "..", `${fileName}.jpg`);

const pipeStream = (path, writeStream) => {
  new Promise(resolve => {
    const readStream = fse.createReadStream(path); //创建可读流
    readStream.on("end", () => {
      // 读取完成，删除原先切割好的blob文件
      // fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream); //流入可写流
  });
};
const mergeFileChunk = async (filePath, fileName, size) => {
  // console.log(filePath, fileName, size);
  // 大文件上传时，后端：每个要上传的文件，先建target目录，把切好的blob，放进这个目录再合并 node 文件 stream ！
  const chunkDir = path.resolve(UPLOAD_DIR, fileName);
  // console.log(chunkDir);
  const chunkPaths = await fse.readdir(chunkDir);
  // console.log(chunkPaths);
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]); //对文件后缀排序 a-b 即升序排序
  // 每个文件的内容写入最后的文件
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {
          start: index * size, //写入的开始位置
          end: (index + 1) * size //写入的结束位置
        })
      )
    )
  );
  console.log("文件合并成功");
  // 合并成功删去原来的blob目录
  // fse.rmdirSync(chunkDir)
};

mergeFileChunk(filePath, fileName, 0.5 * 1024 * 1024);
