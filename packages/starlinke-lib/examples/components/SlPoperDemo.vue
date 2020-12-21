<template>
  <div class="sl-poper-demo">
    <SlPoper
      :offset="20"
      :styleSetting="{ border: '1px solid rgba(0, 0, 0, .2)' }"
    >
      <div slot="pop">
        pop block
      </div>
      noramal block
    </SlPoper>
  </div>
</template>

<script>
export default {
  name: 'SlPoperDemo',
  components: {},
  props: {},
  data() {
    return {}
  }
}
</script>
