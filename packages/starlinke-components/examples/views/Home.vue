<template>
  <div class="home">
    <h1>SlPoper组件</h1>
    <SlPoperDemo />
    <hr>
    <h1>SlFieldBatchInput组件</h1>
    <SlFieldBatchInputDemo />
    <hr>
  </div>
</template>

<script>
import SlPoperDemo from '@e/components/SlPoperDemo.vue'
import SlFieldBatchInputDemo from '@e/components/SlFieldBatchInputDemo.vue'

export default {
  name: 'Home',
  components: {
    SlPoperDemo,
    SlFieldBatchInputDemo
  }
}
</script>
