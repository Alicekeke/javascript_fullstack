// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 在数据源中注册
    address:{
      name: '',
      phone: '',
      detail: ''
    }

  },
  bindName(e){
    console.log(e)
    this.setData({
      // 数据源预先没有的数据，setData会自动新增一个数据，并放进数据源中
      // 包裹对象key值用''
      'address.name': e.detail.value
    })
  },
  bindPhone(e){
    console.log(e)
    this.setData({
      'address.phone': e.detail.value
    })
  },
  bindDetail(e){
    console.log(e)
    this.setData({
      'address.detail': e.detail.value
    })
  },
  // 表单提交事件
  formSubmit(){
    if(this.data.address.name && this.data.address.phone && this.data.address.detail){
      // 本地存储
      wx.setStorage({
        key: 'address',
        data: this.data.address,
        success:() => {
          // 保存后自动跳回原页面
         wx.navigateBack({
         });
        },
        fail:() =>{},
        complete:() =>{}
      })
    }else{
      // 提示对话框
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false,
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if (result.confirm) {
            
          }
        },
        fail: () => {},
        complete: () => {}
      });
        
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
  onReady: function () {

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