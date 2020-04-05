import React, { useEffect, Component, useState } from 'react';
import { createContext, useContext, useReducer, memo, useRef,
 forwardRef, useImperativeHandle
} from 'react';
// import { CustomHook } from './custom-Hooks';
// import RefDemo from './RefDemo';
// import Interval from './InterVal';

// hooks: useContext + useReducer 约等于 redux (Dan设计)
// react-router, react-redux 源码 用了 Context（跨组件传递 数据）
// react-router 当前页面的 url 放到 Context，我们在 各个 <Route path="/url" /> 获取的当前的 url 来决定组件要不要显示
// react-redux 把我们 Store 放到 Context，我们的 mapDispatch mapState 


// 独立的  操作它内部的 dom
// <MyInput ref={inputNode} />
function Input(props, ref) {
  // ref用来获取DOM元素节点和获取组件实例
  // ref 是特殊的属性，它不会穿透
  // ref={} 传给 input
  // useImperativeHandle 定义 父组件 通过 ref 可以拿到什么东西
  const [val, setVal] = useState('');

  // 在这里定义useImperativeHandle，决定父组件通过ref可以拿到组件暴露出去的东西
  useImperativeHandle(ref, () => {
    return {
      reset: () => {
        setVal('')
      }
    }
  })
  const handleChange = () => {}
  return (
    <input placeholder="type ..." ref={ref} {...props} value={val} onChange={(e) => {
      setVal(e.target.value);
    }}/>
  )
}
// 公共组件, 要用forwardRef再包一层，才能拿到下一层的节点实例。
const MyInput = forwardRef(Input);

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_HEADER_COLOR':
      return {
        ...state,
        headerColor: 'yellow'
      };
    case 'UPDATE_CONTENT_COLOR':
      return {
        ...state,
        contentColor: 'green'
      };
    default:
      break;
  }
}

// 创建一个context
const Store = createContext(null);
{/* <Store.Provider value={{a: 1}}>
 <Store.Consumer>
   {({ a }) => {
    //  
   }}
  </Store.Consumer>
  // useContext === Store.Consumer
</Store.Provider> */}

// 作为全局state
const initState = {
  headerColor: 'red',
  contentColor: 'blue'
};

const App = () => {
  // 由 reducer 生成：当前的 state 以及与其配套的 dispatch 方法
  // 在根结点注入全局state和dispatch方法
  // useReducer === useState
  // const [count, setCount] = useState(1);
  // setCount(100);
  const [state, dispatch] = useReducer(reducer, initState);
  const refDemo = useRef();
  const inputNode = useRef();
  useEffect(() => {
    // refDemo.current.focus();
    // setTimeout(() => {
    //   refDemo.current.setValue('from parent');
    // }, 3000);
    console.log(inputNode)
  }, [])
  
  return (
    <Store.Provider value={{ state, dispatch }}>
      {/* <CustomHook /> */}
      {/* <Interval />
      <RefDemo ref={refDemo}/> */}
      {/* ref 拿到 dom 结构 
      实际不是
      */}
      <MyInput ref={inputNode} style={{ color: 'red' }}/>
      <span onClick={() => {
        inputNode.current.reset();
      }}>reset</span>
      <Header />
      <Content />
    </Store.Provider>
  );
};

const Header = memo(() => {
  // 该 context 的当前值
  // Consumer 数据（用 useReducer， 符合 redux单向数据流）
  const { state, dispatch } = useContext(Store);
  return (
    <header
      style={{ backgroundColor: state.headerColor }}
      onClick={() => dispatch({
        type: 'UPDATE_HEADER_COLOR'
      })}
    >
      header
      </header>
  );
});

const Content = memo(() => {
  const { state, dispatch } = useContext(Store);
  return (
    <div
      style={{ backgroundColor: state.contentColor }}
      onClick={() => dispatch({
        type: 'UPDATE_CONTENT_COLOR'
      })}
    >
      Content
    </div>
  );
});
export default App;