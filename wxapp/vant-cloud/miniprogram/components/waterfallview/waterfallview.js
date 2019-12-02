// components/waterfallview/waterfallview.js

var leftList = new Array();//左侧集合
var rightList = new Array();//右侧集合
var leftHight = 0, rightHight = 0, itemWidth = 0, maxHeight = 0;

Component({
  properties: {},
  data: {
    leftList: [],//左侧集合
    rightList: [],//右侧集合
  },

  attached: function () {  //第一个生命周期方法
    wx.getSystemInfo({
      success: (res) => {
        let percentage = 750 / res.windowWidth;  //750rpx/屏幕宽度
        let margin = 20 / percentage;                    //计算瀑布流间距
        itemWidth = (res.windowWidth - margin) / 2;  //计算 瀑布流展示的宽度
        maxHeight = itemWidth / 0.8                   //计算瀑布流的最大高度，防止长图霸屏
      }
    });
  },

  methods: {
    /**
     * 填充数据
     */
    fillData: function (isPull, listData) {
      if (isPull) { //是否下拉刷新，是的话清除之前的数据
        leftList.length = 0;
        rightList.length = 0;
        leftHight = 0;
        rightHight = 0;
      }
      for (let i = 0, len = listData.length; i < len; i++) {
        let tmp = listData[i];    //单条数据
        tmp.width = parseInt(tmp.width);  //图片宽度
        tmp.height = parseInt(tmp.height); //图片高度
        tmp.itemWidth = itemWidth    //image 宽度
        let per = tmp.width / tmp.itemWidth;  //图片宽高比
        tmp.itemHeight = tmp.height / per;  //image 高度
        if (tmp.itemHeight > maxHeight) {
            tmp.itemHeight = maxHeight;   //image 高度，不超过最大高度
        }
        
        if (leftHight == rightHight) {
          leftList.push(tmp);
          leftHight = leftHight + tmp.itemHeight;
        } else if (leftHight < rightHight) {
          leftList.push(tmp);
          leftHight = leftHight + tmp.itemHeight;
        } else {
          rightList.push(tmp);
          rightHight = rightHight + tmp.itemHeight;
        }
      }

      this.setData({
        leftList: leftList,
        rightList: rightList,
      });
    },
  }
})
