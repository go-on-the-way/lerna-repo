<template>
  <div class="sl-field-batch-input-demo">
    <SlFieldBatchInput
      v-model="spuCodes"
      :maxLen="200"
      label="SPU"
    />
  </div>
</template>

<script>
export default {
  name: 'SlFieldBatchInputDemo',
  components: {},
  props: {},
  data() {
    return {
      spuCodes: null
    }
  }
}
</script>
