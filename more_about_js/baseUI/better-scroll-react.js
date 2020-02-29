// scroll组件
import React, { forwardRef, useState, useEffect, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import styled from "styled-components";


// 给最外层的scroll组件宽高样式 保证能撑开
const ScrollContaniner = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

// ref自动转发到子组件，常用于复用度高的组件中
const Scroll = forwardRef((props, ref) => {
  // start build components

  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState();

  // 初始化bs实例需要的DOM元素
  const scrollContaninerRef = useRef();

  const {
    direction,
    click,
    refresh,
    bounceTop,
    bounceBottom
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  // 创建better-scroll useEffectDOM渲染后调用执行
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      propTypes: 3, //不仅屏幕滑动，滚动动画也派发 scroll 事件
      click: click,
      bounce: {
        //回弹动画
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
  }, []);

  // 给实例绑定scroll事件 ,[]中数据变化effect有效
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", scroll => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [onScroll, bScroll]);

  //上拉到底判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("scrollEnd", () => {
      // 判断是否滑动到底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });
    return () => {
      bScroll.off("scrollEnd");
    };
  }, [pullUp, bScroll]);

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on("touchEnd", (pos) => {
      // 判断用户下拉动作
      if (pos.y > 50) {
        pullDown();
      }
      if(pos.X > 3) {
        pullDown()
      }
    });
    return () => {
      bScroll.off("touchEnd");
    };
  }, [pullDown, bScroll]);

  // useEffect在每次渲染后刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 暴露scroll组件方法 -> refresh刷新, getBScroll提供bs实例
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  // 
  return (
    <ScrollContaniner ref={scrollContaninerRef}>
      {props.children}
    </ScrollContaniner>
  );
});

// 给子组件默认值
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};
// 子组件proTypes校验传递值
Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]), // 滚动的方向
  click: true, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool // 是否支持向下吸底
};

export default Scroll;
