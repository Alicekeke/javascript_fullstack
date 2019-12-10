<template>
  <div class="parent">
    <Child1></Child1>
    parent
    <Child2></Child2>
  </div>
</template>

<script>
import Child1 from './child1'
import Child2 from './child2'
export default {
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Child1,
    Child2
  },
  mounted () {
    this.$on('test', (text) => {
      console.log(text)
    })
  }
}
</script>

<style>

</style>