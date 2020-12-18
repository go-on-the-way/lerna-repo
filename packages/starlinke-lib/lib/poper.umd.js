/* * Copyright © 2020-2020 wlei * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.poper = factory());
}(this, (function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: 'SlPoper',
    props: {
      position: {
        type: String,
        default: 'top' // top,left,bottom,right

      },
      styleSetting: {
        // 样式设置，如：{ borderRadius = '6px', background = 'white' }
        type: Object,
        default: function _default() {
          return {};
        }
      },
      offset: {
        // 气泡的偏移值
        type: Number,
        default: 10
      },
      trigger: {
        type: String,
        default: 'mouseover' // mouseover,click

      },
      showPoper: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        styleObj: {
          visibility: 'hidden'
        },
        arrowStyleObj: {
          visibility: 'hidden'
        },
        timer: null,
        isMouseOnPoper: false
      };
    },
    computed: {},
    mounted: function mounted() {
      var _this = this;

      var popDom = this.$refs.pop;
      var slPoperDom = this.$refs.slpopper;
      var parentDoms = this.getParentDoms(slPoperDom);
      parentDoms.forEach(function (p) {
        p.addEventListener('scroll', function () {
          if (_this.styleObj.visibility === 'visible' && _this.isMouseOnPoper) {
            _this.setPopStyle();
          }
        });
      });

      if (this.trigger === 'click') {
        document.addEventListener('click', function (e) {
          var parents = _this.getParentDoms(e.target);

          parents.unshift(e.target);
          var canRemove = true;

          for (var i = 0; i < parents.length; i++) {
            if (parents[i] === slPoperDom) {
              canRemove = false;
              break;
            }
          }

          if (canRemove) _this.removeStyle();
        });
      }

      if (this.trigger === 'mouseover') {
        slPoperDom.addEventListener('mouseout', function (e) {
          e.stopPropagation();

          _this.mouseOut();
        });
        popDom.addEventListener('mouseout', function (e) {
          e.stopPropagation();

          _this.mouseOut();
        });
      }
    },
    methods: {
      // 求取popper的位置
      mouseOn: function mouseOn() {
        if (!this.showPoper) return;
        this.isMouseOnPoper = true;
        this.setPopStyle();
      },
      mouseOut: function mouseOut() {
        if (!this.showPoper) return;
        this.isMouseOnPoper = false;
        this.removeStyle();
      },
      setPopStyle: function setPopStyle() {
        if (this.timer) clearTimeout(this.timer);
        var position = this.position;
        var style = {};
        var _this$styleSetting = this.styleSetting,
            _this$styleSetting$co = _this$styleSetting.color,
            color = _this$styleSetting$co === void 0 ? 'black' : _this$styleSetting$co,
            _this$styleSetting$bo = _this$styleSetting.border,
            border = _this$styleSetting$bo === void 0 ? 'none' : _this$styleSetting$bo,
            _this$styleSetting$bo2 = _this$styleSetting.borderRadius,
            borderRadius = _this$styleSetting$bo2 === void 0 ? '6px' : _this$styleSetting$bo2,
            _this$styleSetting$bo3 = _this$styleSetting.boxShadow,
            boxShadow = _this$styleSetting$bo3 === void 0 ? '0 0 10px #d6d6d6' : _this$styleSetting$bo3,
            _this$styleSetting$ba = _this$styleSetting.background,
            background = _this$styleSetting$ba === void 0 ? 'white' : _this$styleSetting$ba; // 获取视窗宽、高

        var ch = document.documentElement.clientHeight || document.body.clientHeight;
        var cw = document.documentElement.clientWidth || document.body.clientWidth; // 获取气泡的宽、高

        var popDom = this.$refs.pop;

        var _popDom$getBoundingCl = popDom.getBoundingClientRect(),
            popH = _popDom$getBoundingCl.height,
            popW = _popDom$getBoundingCl.width; // 获取content内容区的信息


        var slPoperDom = this.$refs.slpopper;
        var slPoperDomRect = slPoperDom.getBoundingClientRect();
        var rectL = slPoperDomRect.left,
            rectR = slPoperDomRect.right,
            rectT = slPoperDomRect.top,
            rectB = slPoperDomRect.bottom,
            rectH = slPoperDomRect.height,
            rectW = slPoperDomRect.width; // 设置气泡的显示方位

        position = this.reSetPosition(position, popW, rectL, rectR, popH, rectB, rectT, ch, cw);
        style.color = color;
        style.border = border;
        style.borderRadius = borderRadius;
        style.boxShadow = boxShadow;
        style.background = background; // 获取气泡的fixed定位的位置 top,left,right,bottom

        var pObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, popH, popW);
        this.styleObj = Object.assign({
          visibility: 'visible'
        }, style, pObj); // 获取箭头的宽、高

        var arrowDom = this.$refs.arrow;

        var _arrowDom$getBounding = arrowDom.getBoundingClientRect(),
            arrowH = _arrowDom$getBounding.height,
            arrowW = _arrowDom$getBounding.width; // 获取气泡的fixed定位的位置 top,left,right,bottom


        var aObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, arrowH, arrowW);

        switch (position) {
          case 'left':
            aObj.transform = 'translateX(50%) rotate(45deg)';
            aObj.borderTop = "".concat(border);
            aObj.borderRight = "".concat(border);
            break;

          case 'right':
            aObj.transform = 'translateX(-50%) rotate(45deg)';
            aObj.borderLeft = "".concat(border);
            aObj.borderBottom = "".concat(border);
            break;

          case 'top':
            aObj.transform = 'translateY(50%) rotate(45deg)';
            aObj.borderBottom = "".concat(border);
            aObj.borderRight = "".concat(border);
            break;

          case 'bottom':
            aObj.transform = 'translateY(-50%) rotate(45deg)';
            aObj.borderTop = "".concat(border);
            aObj.borderLeft = "".concat(border);
            break;
        }

        aObj.background = background;
        this.arrowStyleObj = aObj;
      },
      // 设置气泡的显示方位
      reSetPosition: function reSetPosition(position, popW, rectL, rectR, popH, rectB, rectT, ch, cw) {
        if (position === 'left' && popW + this.offset > rectL) {
          position = 'right';
        }

        if (position === 'right' && rectR + popW + this.offset > cw) {
          position = 'left';
        }

        if (position === 'top' && popH + this.offset > rectT) {
          position = 'bottom';
        }

        if (position === 'bottom' && rectB + popH + this.offset > ch) {
          position = 'top';
        }

        return position;
      },
      // 获取气泡和箭头的fixed定位的位置，气泡必须始终显示在视窗内
      getObjPosition: function getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, popH, popW) {
        // Y轴偏移量
        var ty = rectT - popH / 2 + rectH / 2;
        var py = ty <= 0 ? 0 : ty > ch - popH ? ch - popH : ty; // 在左侧显示

        var or = cw - rectL + this.offset;
        var pLeft = {
          right: (or <= 0 ? 0 : or) + 'px',
          top: py + 'px'
        }; // 在右侧显示

        var ol = rectL + rectW + this.offset;
        var pRight = {
          left: (ol <= 0 ? 0 : ol) + 'px',
          top: py + 'px'
        }; // X轴偏移量

        var tx = rectL - popW / 2 + rectW / 2;
        var px = tx <= 0 ? 0 : tx > cw - popW ? cw - popW : tx; // 在上方显示

        var ob = ch - rectT + this.offset;
        var pTop = {
          bottom: (ob <= 0 ? 0 : ob) + 'px',
          left: px + 'px'
        }; // 在下方显示

        var ot = rectT + rectH + this.offset;
        var pBottom = {
          top: (ot <= 0 ? 0 : ot) + 'px',
          left: px + 'px'
        };
        var pObj;

        switch (position) {
          case 'left':
            pObj = pLeft;
            break;

          case 'right':
            pObj = pRight;
            break;

          case 'top':
            pObj = pTop;
            break;

          case 'bottom':
            pObj = pBottom;
            break;

          default:
            pObj = {};
            break;
        }

        return pObj;
      },
      // 鼠标移出后，隐藏气泡和箭
      removeStyle: function removeStyle() {
        var _this2 = this;

        this.timer = setTimeout(function () {
          _this2.styleObj = Object.assign({}, _this2.styleObj, {
            visibility: 'hidden'
          });
          _this2.arrowStyleObj = Object.assign({}, _this2.arrowStyleObj, {
            visibility: 'hidden'
          });
        }, 100);
      },
      getParentDoms: function getParentDoms(element) {
        var current = element.parentNode;
        var parentDoms = [];

        while (current !== null) {
          parentDoms.push(current);
          current = current.parentNode;
        }

        return parentDoms;
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        ref: "slpopper",
        staticClass: "sl-popper",
        on: _vm._d({}, [
          _vm.trigger,
          function($event) {
            return _vm.mouseOn($event)
          }
        ])
      },
      [
        _c(
          "div",
          {
            ref: "pop",
            staticClass: "pop",
            style: _vm.styleObj,
            on: _vm._d({}, [
              _vm.trigger,
              function($event) {
                $event.stopPropagation();
                return _vm.mouseOn($event)
              }
            ])
          },
          [_vm._t("pop")],
          2
        ),
        _vm._v(" "),
        _c("div", {
          ref: "arrow",
          staticClass: "arrow",
          style: _vm.arrowStyleObj
        }),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-e9acc422_0", { source: ".sl-popper[data-v-e9acc422] {\n  display: inline-block;\n}\n.sl-popper .pop[data-v-e9acc422] {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  padding: 10px;\n  user-select: text;\n}\n.sl-popper .arrow[data-v-e9acc422] {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  width: 8px;\n  height: 8px;\n  transform-origin: center center;\n}\n\n/*# sourceMappingURL=main.vue.map */", map: {"version":3,"sources":["E:\\code\\font-code\\starlinke-lib\\packages\\poper\\src\\main.vue","main.vue"],"names":[],"mappings":"AAyOA;EACA,qBAAA;ACxOA;ADyOA;EACA,cAAA;EACA,eAAA;EACA,aAAA;EACA,aAAA;EACA,iBAAA;ACvOA;ADyOA;EACA,cAAA;EACA,eAAA;EACA,aAAA;EACA,UAAA;EACA,WAAA;EACA,+BAAA;ACvOA;;AAEA,mCAAmC","file":"main.vue","sourcesContent":["<template>\r\n  <div\r\n    ref=\"slpopper\"\r\n    class=\"sl-popper\"\r\n    @[trigger]=\"mouseOn($event)\"\r\n  >\r\n    <div\r\n      ref=\"pop\"\r\n      class=\"pop\"\r\n      :style=\"styleObj\"\r\n      @[trigger].stop=\"mouseOn\"\r\n    >\r\n      <slot name=\"pop\" />\r\n    </div>\r\n\r\n    <div\r\n      ref=\"arrow\"\r\n      class=\"arrow\"\r\n      :style=\"arrowStyleObj\"\r\n    />\r\n    <slot />\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'SlPoper',\r\n  props: {\r\n    position: {\r\n      type: String,\r\n      default: 'top' // top,left,bottom,right\r\n    },\r\n    styleSetting: { // 样式设置，如：{ borderRadius = '6px', background = 'white' }\r\n      type: Object,\r\n      default: function () {\r\n        return {}\r\n      }\r\n    },\r\n    offset: { // 气泡的偏移值\r\n      type: Number,\r\n      default: 10\r\n    },\r\n    trigger: {\r\n      type: String,\r\n      default: 'mouseover' // mouseover,click\r\n    },\r\n    showPoper: {\r\n      type: Boolean,\r\n      default: true\r\n    }\r\n  },\r\n  data () {\r\n    return {\r\n      styleObj: { visibility: 'hidden' },\r\n      arrowStyleObj: { visibility: 'hidden' },\r\n      timer: null,\r\n      isMouseOnPoper: false\r\n    }\r\n  },\r\n  computed: {\r\n\r\n  },\r\n  mounted () {\r\n    let popDom = this.$refs.pop\r\n    let slPoperDom = this.$refs.slpopper\r\n\r\n    let parentDoms = this.getParentDoms(slPoperDom)\r\n    parentDoms.forEach(p => {\r\n      p.addEventListener('scroll', () => {\r\n        if (this.styleObj.visibility === 'visible' && this.isMouseOnPoper) {\r\n          this.setPopStyle()\r\n        }\r\n      })\r\n    })\r\n    if (this.trigger === 'click') {\r\n      document.addEventListener('click', e => {\r\n        let parents = this.getParentDoms(e.target)\r\n        parents.unshift(e.target)\r\n        let canRemove = true\r\n        for (let i = 0; i < parents.length; i++) {\r\n          if (parents[i] === slPoperDom) {\r\n            canRemove = false\r\n            break\r\n          }\r\n        }\r\n        if (canRemove) this.removeStyle()\r\n      })\r\n    }\r\n    if (this.trigger === 'mouseover') {\r\n      slPoperDom.addEventListener('mouseout', e => {\r\n        e.stopPropagation()\r\n        this.mouseOut()\r\n      })\r\n      popDom.addEventListener('mouseout', e => {\r\n        e.stopPropagation()\r\n        this.mouseOut()\r\n      })\r\n    }\r\n  },\r\n  methods: {\r\n    // 求取popper的位置\r\n    mouseOn () {\r\n      if (!this.showPoper) return\r\n      this.isMouseOnPoper = true\r\n      this.setPopStyle()\r\n    },\r\n    mouseOut () {\r\n      if (!this.showPoper) return\r\n      this.isMouseOnPoper = false\r\n      this.removeStyle()\r\n    },\r\n    setPopStyle () {\r\n      if (this.timer) clearTimeout(this.timer)\r\n      let position = this.position\r\n      let style = {}\r\n      let { color = 'black',\r\n        border = 'none',\r\n        borderRadius = '6px',\r\n        boxShadow = '0 0 10px #d6d6d6',\r\n        background = 'white'\r\n      } = this.styleSetting\r\n\r\n      // 获取视窗宽、高\r\n      let ch = document.documentElement.clientHeight || document.body.clientHeight\r\n      let cw = document.documentElement.clientWidth || document.body.clientWidth\r\n      // 获取气泡的宽、高\r\n      let popDom = this.$refs.pop\r\n      let { height: popH, width: popW } = popDom.getBoundingClientRect()\r\n      // 获取content内容区的信息\r\n      let slPoperDom = this.$refs.slpopper\r\n      let slPoperDomRect = slPoperDom.getBoundingClientRect()\r\n      let { left: rectL, right: rectR, top: rectT, bottom: rectB, height: rectH, width: rectW } = slPoperDomRect\r\n\r\n      // 设置气泡的显示方位\r\n      position = this.reSetPosition(position, popW, rectL, rectR, popH, rectB, rectT, ch, cw)\r\n\r\n      style.color = color\r\n      style.border = border\r\n      style.borderRadius = borderRadius\r\n      style.boxShadow = boxShadow\r\n      style.background = background\r\n      // 获取气泡的fixed定位的位置 top,left,right,bottom\r\n      let pObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, popH, popW)\r\n      this.styleObj = Object.assign({ visibility: 'visible' }, style, pObj)\r\n\r\n      // 获取箭头的宽、高\r\n      let arrowDom = this.$refs.arrow\r\n      let { height: arrowH, width: arrowW } = arrowDom.getBoundingClientRect()\r\n      // 获取气泡的fixed定位的位置 top,left,right,bottom\r\n      let aObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, arrowH, arrowW)\r\n      switch (position) {\r\n        case 'left': aObj.transform = 'translateX(50%) rotate(45deg)'; aObj.borderTop = `${border}`; aObj.borderRight = `${border}`; break\r\n        case 'right': aObj.transform = 'translateX(-50%) rotate(45deg)'; aObj.borderLeft = `${border}`; aObj.borderBottom = `${border}`; break\r\n        case 'top': aObj.transform = 'translateY(50%) rotate(45deg)'; aObj.borderBottom = `${border}`; aObj.borderRight = `${border}`; break\r\n        case 'bottom': aObj.transform = 'translateY(-50%) rotate(45deg)'; aObj.borderTop = `${border}`; aObj.borderLeft = `${border}`; break\r\n        default: ; break\r\n      }\r\n      aObj.background = background\r\n      this.arrowStyleObj = aObj\r\n    },\r\n\r\n    // 设置气泡的显示方位\r\n    reSetPosition (position, popW, rectL, rectR, popH, rectB, rectT, ch, cw) {\r\n      if (position === 'left' && popW + this.offset > rectL) {\r\n        position = 'right'\r\n      }\r\n      if (position === 'right' && rectR + popW + this.offset > cw) {\r\n        position = 'left'\r\n      }\r\n      if (position === 'top' && popH + this.offset > rectT) {\r\n        position = 'bottom'\r\n      }\r\n      if (position === 'bottom' && rectB + popH + this.offset > ch) {\r\n        position = 'top'\r\n      }\r\n      return position\r\n    },\r\n\r\n    // 获取气泡和箭头的fixed定位的位置，气泡必须始终显示在视窗内\r\n    getObjPosition (ch, cw, position, rectT, rectH, rectL, rectW, popH, popW) {\r\n      // Y轴偏移量\r\n      let ty = rectT - popH / 2 + rectH / 2\r\n      let py = ty <= 0 ? 0 : (ty > ch - popH ? ch - popH : ty)\r\n      // 在左侧显示\r\n      let or = cw - rectL + this.offset\r\n      let pLeft = { right: (or <= 0 ? 0 : or) + 'px', top: py + 'px' }\r\n      // 在右侧显示\r\n      let ol = rectL + rectW + this.offset\r\n      let pRight = { left: (ol <= 0 ? 0 : ol) + 'px', top: py + 'px' }\r\n\r\n      // X轴偏移量\r\n      let tx = rectL - popW / 2 + rectW / 2\r\n      let px = tx <= 0 ? 0 : (tx > cw - popW ? cw - popW : tx)\r\n      // 在上方显示\r\n      let ob = ch - rectT + this.offset\r\n      let pTop = { bottom: (ob <= 0 ? 0 : ob) + 'px', left: px + 'px' }\r\n      // 在下方显示\r\n      let ot = rectT + rectH + this.offset\r\n      let pBottom = { top: (ot <= 0 ? 0 : ot) + 'px', left: px + 'px' }\r\n\r\n      let pObj\r\n\r\n      switch (position) {\r\n        case 'left': pObj = pLeft; break\r\n        case 'right': pObj = pRight; break\r\n        case 'top': pObj = pTop; break\r\n        case 'bottom': pObj = pBottom; break\r\n        default: pObj = {}; break\r\n      }\r\n\r\n      return pObj\r\n    },\r\n\r\n    // 鼠标移出后，隐藏气泡和箭\r\n    removeStyle () {\r\n      this.timer = setTimeout(() => {\r\n        this.styleObj = Object.assign({}, this.styleObj, { visibility: 'hidden' })\r\n        this.arrowStyleObj = Object.assign({}, this.arrowStyleObj, { visibility: 'hidden' })\r\n      }, 100)\r\n    },\r\n\r\n    getParentDoms (element) {\r\n      let current = element.parentNode\r\n      let parentDoms = []\r\n      while (current !== null) {\r\n        parentDoms.push(current)\r\n        current = current.parentNode\r\n      }\r\n      return parentDoms\r\n    }\r\n  }\r\n}\r\n</script>\r\n<style lang=\"scss\" scoped>\r\n.sl-popper {\r\n  display: inline-block;\r\n  .pop {\r\n    display: table;\r\n    position: fixed;\r\n    z-index: 9999;\r\n    padding: 10px;\r\n    user-select: text;\r\n  }\r\n  .arrow {\r\n    display: table;\r\n    position: fixed;\r\n    z-index: 9999;\r\n    width: 8px;\r\n    height: 8px;\r\n    transform-origin: center center;\r\n  }\r\n}\r\n</style>\r\n",".sl-popper {\n  display: inline-block;\n}\n.sl-popper .pop {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  padding: 10px;\n  user-select: text;\n}\n.sl-popper .arrow {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  width: 8px;\n  height: 8px;\n  transform-origin: center center;\n}\n\n/*# sourceMappingURL=main.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-e9acc422";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__.install = function (Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  };

  return __vue_component__;

})));
