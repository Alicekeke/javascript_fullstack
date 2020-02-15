// 处理提交

const http = require("http");
const path = require("path");
const multiparty = require("multiparty");
const fse = require("fs-extra");
const server = http.createServer();

const UPLOAD_DIR = path.resolve(__dirname, ".", "target"); //切分后chunk总目录

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //避免跨域,但不严谨
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.url == "/") {
    // chunk -> name tips:const常量不能冲突
    const multip = new multiparty.Form();
    // console.log(multip);
    multip.parse(req, async (err, fields, files) => {
      if (err) {
        return;
      }

      const [chunk] = files.chunk; //拿到分片后整个文件块
      const [filename] = fields.filename; //拿到文件名  fields参数保存了formdata中非文件的字段
      const dir_name = filename.split("-")[0];
      const chunkDir = path.resolve(UPLOAD_DIR, dir_name);
      if (!fse.existsSync(chunkDir)) {
        await fse.mkdirs(chunkDir);
      }
      // console.log(chunk.path);
      // fs-extra对node fs模块的封装api
      await fse.move(chunk.path, `${chunkDir}/${filename}`);
    });
  } else if (req.url == "/merge") {
    res.end("上传成功");
  }
});

server.listen(3000, () => {
  console.log("server us running at 3000");
});
