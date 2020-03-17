import './demo.css'

new Vue({
  el: '#app',
  data: {
    canvasId: "canvasId",
    scale: 1,
    blocks: [{
        id: "source",
        type: "Source",
        pos: {
          left: "10px",
          top: "10px"
        },
        config: {}
      },
      {
        id: "target",
        type: "Processor",
        pos: {
          left: "100px",
          top: "100px"
        },
        config: {}
      },
      {
        id: "target1",
        type: "Target",
        pos: {
          left: "350px",
          top: "150px"
        },
        config: {}
      }
    ],
    connectors: [{
        source: "source",
        target: "target",
        template: "default",
        custom_applyAnimate: true
      },
      {
        source: "target",
        target: "target1",
        template: "default",
        // template: "haslabel",
        custom_applyAnimate: true
      }
    ]
  },
  methods: {
    addNode() {
      this.blocks.push({
        id: "processor_" + new Date().getTime(),
        type: "Processor",
        pos: {
          left: 100 + 100 * Math.random() + "px",
          top: 100 + 100 * Math.random() + "px"
        },
        config: {}
      });
    },
    delNode() {
      console.log("删除");
    },
    zoom(type) {
      const cvs = document.getElementById(this.canvasId);
      this.scale = this.scale + type;
      cvs.style.transform = `scale(${this.scale})`;
    }
  }
})
