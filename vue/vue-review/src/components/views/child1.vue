<template>
  <div class="child1">
    child1
    <button @click="send">派发事件</button>
  </div>
</template>

<script>
import bus from '@/bus/bus'
export default {
  data () {
    return {
      message: '我是child1里面的数据'
    }
  },
  methods: {
    send () {
      // bus是vue里new出来的实例，有$emit方法
      bus.$emit('test', this.message)
      // this.$dispatch('test', this.message)  vue1.0语法，看不到效果
      // this.$broadcast('test', this.message)
    }
  }
}
</script>

<style>

</style>