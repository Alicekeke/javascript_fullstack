// 无头浏览器 headless
// 软件自动化测试 可以在浏览器中手动完成的大部分事情都可以使用Puppteer
// 谷歌开源的自动化浏览器     
// 下载 cnpm i puppeteer -s
const puppeteer = require('puppeteer')
async function run() {
// 模拟人为打开一个窗口，网页 puppeteer.launch :启动puppeteer
const browser = await puppeteer.launch({
  headless: false
})
const page = await browser.newPage()
// 去到url
// networkidle0：没有网络请求，即网页全部打开
await page.goto('https://juejin.im/books',{
  waitUntil: 'networkidle0'
})
await page.screenshot({
  // 启动截图命名books.png
  path: './books.png'
})
}
run()