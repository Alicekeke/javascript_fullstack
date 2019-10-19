// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '果味', id: 'guowei' },
    { name: '蔬菜', id: 'shucai' },
    { name: '炒货', id: 'chaohuo' },
    { name: '点心', id: 'dianxin' },
    { name: '粗茶', id: 'cucha' },
    { name: '淡饭', id: 'danfan' }
  ],
    curIndex: 1, //当前默认选中的索引
    toView: 'shucai',//类似a标签锚点,scroll-view 页面滚动到对应的dom结构中
    containerH: 0,
    heightArr:'',
    detail: [
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '果味',
        id: 'guowei',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      },
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '蔬菜',
        id: 'shucai',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      },
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '炒货',
        id: 'chaohuo',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      },
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '点心',
        id: 'dianxin',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      },
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '粗茶',
        id: 'cucha',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      },
      {
        banner: 'http://img.redocn.com/sheji/20151221/tangguobudingbannerlingshipaipsdfencengsucai_5626296.jpg',
        cate: '淡饭',
        id: 'danfan',
        detail: [
          {
            thumb: '../../image/c3.png',
            name: '坚果'
          },
          {
            thumb: '../../image/c1.png',
            name: '瓜子'
          },
          {
            thumb: '../../image/c2.png',
            name: '大米'
          },
          {
            thumb: '../../image/c4.png',
            name: '芹菜'
          }
        ]
      }
    ],

  },
   //左侧点击菜单，右侧自动滚动相应区域
  switchTab(e){
    console.log(e)
    this.setData({
      curIndex: e.currentTarget.dataset.index, //取到当前数组对象的index更新到curIndex中
      toView: e.currentTarget.dataset.id
    })
    },
  // 左右菜单联动
 
  scrollcontent(e){
    console.log(e.detail.scrollTop)
    let scrollTop = e.detail.scrollTop
    let scrollArr = this.data.heightArr
    if(scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH){
      return
    }else{
      for(let i = 0; i<scrollArr.length; i++){
        if(scrollTop >= 0 && scrollTop < scrollArr[0]){
          this.setData({
            curIndex: 0
          })
        }else if(scrollTop >= scrollArr[i-1] && scrollTop < scrollArr[i]){
          this.setData({
            curIndex: i
          })
        }
      }
    }
  },

    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function ready() {
      let query = wx.createSelectorQuery().in(this)
      let heightArr = []
      let s = 0
      query.selectAll('.cate-box-container').boundingClientRect((react) => {
        console.log(react)
        react.forEach((res) => {
          s += res.height
          heightArr.push(s)
        });
        console.log(heightArr)
        this.setData({
          heightArr: heightArr
        })
      });
      query.select('.content').boundingClientRect((res) => {
        console.log(res)
        //计算容器高度
        this.setData({
          containerH: res.height
        })
        console.log(res.height)
      }).exec()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})