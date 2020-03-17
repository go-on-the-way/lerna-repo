<template>
  <div :id="part.id" class="sdc-canvas-block" :style="{left:part.pos.left,top:part.pos.top}">
      {{part.type}}
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sdc-canvas-block',
  props: {
    part: {
      type: Object,
      default: () => ({})
    },
    canvas: null
  },
  data () {
    return {

    }
  },
  methods: {
    init () {
      if (this.canvas !== null) {
        this.addEndpointToCanvas(this.canvas)
      }
    },
    addEndpointToCanvas (canvas) {
      switch (this.part.type) {
        case 'Source':
          canvas.addEndpoint(this.part.id, {
            isSource: true,
            anchor: 'Right',
            ...this.part.config
          })

          break
        case 'Target':
          canvas.addEndpoint(this.part.id, {
            isTarget: true,
            anchor: 'Left',
            ...this.part.config
          })
          break
        case 'Processor':
          canvas.addEndpoint(this.part.id, {
            isTarget: true,
            isSource: true,
            anchor: 'Left',
            ...this.part.config
          })
          canvas.addEndpoint(this.part.id, {
            isTarget: true,
            isSource: true,
            anchor: 'Right',
            ...this.part.config
          })
          break
        default:
      }
      canvas.draggable(this.part.id)
    }
  },
  updated: function () {
    this.$nextTick(function () {

    })
  },
  mounted () {
    console.log('子组件挂载完成')
    this.$nextTick(function () {
      this.init()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .sdc-canvas-block{
    position: absolute;
    width: 4rem;
    height: 4rem;
    background: #ccc;
    border-radius: 0.2em;
    cursor: move;
  }
</style>
