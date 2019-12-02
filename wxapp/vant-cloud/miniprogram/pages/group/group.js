// pages/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 调用云函数，拉取数据
    const self = this //  强行保存this作用域
    wx.showNavigationBarLoading();  //展示头部loading
    wx.cloud.callFunction({
      name: 'getGroup',  //调用函数取名
      data: {},
      success(res) {
        console.log(res)
        self.setData({
          groupList: res.result
        })
      },
      fail(error){
        console.log(error)
      },
      complete(){     //complete执行完成，无论成功失败都要笑死头部loading
       wx.hideNavigationBarLoading();
      }
    })
      


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