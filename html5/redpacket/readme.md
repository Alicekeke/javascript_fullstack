# 一个标准的红包


### plan1：绝对定位 + margin（需要指定子元素的宽高，不推荐）
不足之处：要求指定子元素的宽高(height别写死，球球了)，才能写出 margin-top 和 margin-left 的属性值。

### paln2：绝对定位 + translate（无需指定子元素的宽高，推荐）
这种写法，在没有指定子元素宽高的情况下，也能让其在父容器中垂直居中。因为 translate() 函数中使用百分比值时，是以这个元素自身的宽度和高度为基准进行换算和移动的（动态计算宽高）。

### plan3：flex 布局（待改进）
将父容器设置为 Flex 布局，再给父容器加个属性justify-content: center，这样的话，子元素就能水平居中了；再给父容器加个属性 align-items: center，这样的话，子元素就能垂直居中了。

不足之处：给父容器设置属性justify-content: center和align-items: center之后，导致父容器里的所有子元素们都垂直居中了（如果父容器里有多个子元素的话）。可我明明只想让指定的某个子元素居中，要怎么改进呢？

### plan4： flex 布局 + margin: auto（推荐）
我们只需写两行声明即可：先给父容器设置 `display: flex`，再给指定的子元素设置我们再熟悉不过的 `margin: auto`，即可让这个指定的子元素在剩余空间里，水平垂直居中。大功告成。
请注意，当我们给父容器使用 Flex 布局 时，子元素的margin: auto不仅能让其在水平方向上居中，垂直方向上也是居中的。

[来自本来是将垂直居中但我觉得好骚的](https://wecteam.io/2019/11/24/%E8%80%81%E6%9D%BF%E7%9A%84%E6%89%8B%E6%9C%BA%E6%94%B6%E5%88%B0%E4%B8%80%E4%B8%AA%E7%BA%A2%E5%8C%85%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E7%BA%A2%E5%8C%85%E6%B2%A1%E5%B1%85%E4%B8%AD%EF%BC%9F/)