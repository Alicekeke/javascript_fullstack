// pages/personal/personal.js
const app = getApp()
Page({
  data: {
    // 瀑布流
    scrollH: 0,
    imgWidth: 0,
    col1: [],
    col2: [],
    ListLeftHeight: 0,
    ListRightHeight: 0,
    // 给宽图片才不会变形
    imageList:
     [{
        imageUrl: "../../images/code-cloud-callback-config.png",
        imageWidth: 120,
        imageHeight: 60,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,
      },
      {
        imageUrl: "../../images/1c7a824cb8499f35.jpg",
        imageWidth: 120,
        imageHeight: 100,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/code-db-onQuery.png",
        imageWidth: 120,
        imageHeight: 33,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/code-db-onQuery.png",
        imageWidth: 120,
        imageHeight: 80,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/1e98f3a01182e3db.jpg",
        imageWidth: 120,
        imageHeight: 35,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/code-db-inc-dec.png",
        imageWidth: 120,
        imageHeight: 33,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/1c7a824cb8499f35.jpg",
        imageWidth: 120,
        imageHeight: 100,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,

      },
      {
        imageUrl: "../../images/code-db-onQuery.png",
        imageWidth: 120,
        imageHeight: 33,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,
      },
      {
        imageUrl: "../../images/1c7a824cb8499f35.jpg",
        imageWidth: 120,
        imageHeight: 100,
        title: "麻辣烫",
        peodid: 3,
        score: 7.6,
      },
      {
        imageUrl: "../../images/code-db-onQuery.png",
        imageWidth: 120,
        imageHeight: 33,
        title: "麻辣烫烫头烫烫烫烫烫烫烫烫烫",
        peodid: 3,
        score: 7.6,
      }
    ]
  },

  getImageList() {
    /*
      第一步计算出每个图片的高度
      第二步判断放置在哪边
    */
    let self = this;
    let imageList = this.data.imageList; //假装我们从后台拿到了列表

    for (let i = 0; i < imageList.length; i++) {

      let imgWidth = self.data.imgWidth;
      // 拿到后端给到的图片宽
      let oImgW = imageList[i].imageWidth;


      let col1 = self.data.col1;
      let col2 = self.data.col2;
      var ListLeftHeightTemp = self.data.ListLeftHeight;
      var ListRightHeightTemp = self.data.ListRightHeight;

      //比例计算
      let scale = imgWidth / oImgW;
      imageList[i].imageHeight = imageList[i].imageHeight * scale; //自适应高度
      imageList[i].imageHeight += 60;


      if (ListLeftHeightTemp <= ListRightHeightTemp) {
        ListLeftHeightTemp += imageList[i].imageHeight;
        col1.push(imageList[i])
      } else {
        ListRightHeightTemp += imageList[i].imageHeight;
        col2.push(imageList[i])
      }

      self.setData({
        ListLeftHeight: ListLeftHeightTemp,
        ListRightHeight: ListRightHeightTemp,
        col1: col1,
        col2: col2
      })
    }
  },

  onLoad: function () {
    // 瀑布流计算
    // 获取系统信息，拿到浏览器可使用窗口长宽
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        // 按浏览器宽给每列图片缩48%
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
      }
    })
    this.getImageList()
  },
  getUserInfo: function (e) {

  }
})