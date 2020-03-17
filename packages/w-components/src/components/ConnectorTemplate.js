export function normal () {
  return {
    connector: ['Bezier', { curviness: 50 }],
    paintStyle: { stroke: '#CDC9C9', strokeWidth: 5 },
    hoverPaintStyle: { stroke: 'rgb(105, 169, 233)', strokeWidth: 5 },
    anchors: ['Right', 'Left'],
    endpointStyle: { fill: 'white', outlineStroke: 'darkgray', outlineWidth: 2 },
    overlays: [['PlainArrow', { width: 20, length: 20, location: 0.93, stroke: 'darkgray' }]]
  }
}

export function haslabel (vm) {
  return {
    connector: ['Bezier', { curviness: 50 }],
    paintStyle: { stroke: '#CDC9C9', strokeWidth: 5 },
    hoverPaintStyle: { stroke: 'rgb(105, 169, 233)', strokeWidth: 5 },
    anchors: ['Right', 'Left'],
    endpointStyle: { fill: 'white', outlineStroke: 'darkgray', outlineWidth: 2 },
    overlays: [
      ['Label', {
        label: '<button class="delete-node-btn">这是一个按钮</button>',
        labelStyle: {
          color: 'red'
        },
        events: {
          click: function (labelOverlay, originalEvent) {
            console.log('click on label overlay for :' + labelOverlay.component)
          }
        }
      }],
      ['Diamond', {
        location: 1,
        events: {
          dblclick: function (diamondOverlay, originalEvent) {
            console.log('double click on diamond overlay for : ' + diamondOverlay.component)
          }
        }
      }]
    ]
  }
}

export default {
  default: normal,
  haslabel: haslabel
}
