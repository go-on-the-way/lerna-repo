<template>
  <div :id="id" class="sdc-canvas">
    <slot v-bind:canvas="instance"></slot>
  </div>
</template>

<script>
import { jsPlumb } from "jsplumb";
import ConnectorType from "./ConnectorTemplate";

export default {
  name: "sdc-canvas",
  props: {
    id: {
      type: String,
      default: Math.random() + "_" + new Date().getTime()
    },
    scale: {
      type: Number,
      default: 1
    },
    connectors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      connectorsConfig: {},
      instance: jsPlumb.getInstance({
        Container: this.id,
        ConnectionsDetachable: true,
        ReattachConnections: false,
        PaintStyle: { stroke: "#CDC9C9", strokeWidth: 5 },
        HoverPaintStyle: { stroke: "rgb(105, 169, 233)", strokeWidth: 5 },
        Overlays: [
          [
            "PlainArrow",
            { width: 20, length: 20, location: 0.93, stroke: "darkgray" }
          ]
        ],
        DragOptions: {
          start: info => {},
          drag: info => {},
          stop: info => {}
        }
      })
    };
  },
  watch: {
    scale: function(value, oldvaue) {
      if (this.instance && value !== oldvaue) {
        this.instance.setZoom(value);
      }
    }
  },
  methods: {
    initConnectors() {
      const _this = this;
      this.instance.batch(function() {
        for (let i = 0, j = _this.connectors.length; i < j; i++) {
          const connector = _this.connectors[i];

          _this.instance.connect({
            ...ConnectorType[connector.template](),
            source: connector.source,
            target: connector.target
          });
        }
      });
    }
  },
  created() {},
  mounted() {
    // 监听连接事件
    this.instance.bind("connection", info => {});

    // 监听连接线点击事件
    this.instance.bind("click", (connection, originalEvent) => {
      console.log("连接线点击事件");
      this.$emit("lineClick", { conn: connection, event: originalEvent });
    });

    // 缩放事件
    this.instance.bind("zoom", value => {
      // 重新计算动画
      this.$emit("zoom", { value });
    });

    // 连线断开事件
    this.instance.bind("connectionDetached", (info, originalEvent) => {
      this.$emit("connectionDetached", { info, originalEvent });
    });

    this.initConnectors();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.sdc-canvas {
  position: relative;
  height: 100%;
  width: 100%;
}

::v-deep {
  .jtk-overlay,
  .jtk-endpoint {
    z-index: 10;
  }
}
</style>
