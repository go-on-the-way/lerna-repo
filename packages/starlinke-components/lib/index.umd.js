/* * Copyright © 2020-2021 wlei * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('starlinke-utils')) :
  typeof define === 'function' && define.amd ? define(['starlinke-utils'], factory) :
  (global = global || self, global.index = factory(global.starlinkeUtils));
}(this, (function (starlinkeUtils) { 'use strict';

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
      inject("data-v-54301b32_0", { source: ".sl-popper[data-v-54301b32] {\n  display: inline-block;\n}\n.sl-popper .pop[data-v-54301b32] {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  padding: 10px;\n  user-select: text;\n}\n.sl-popper .arrow[data-v-54301b32] {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  width: 8px;\n  height: 8px;\n  transform-origin: center center;\n}\n\n/*# sourceMappingURL=main.vue.map */", map: {"version":3,"sources":["E:\\code\\font-code\\lerna-repo\\packages\\starlinke-components\\packages\\poper\\src\\main.vue","main.vue"],"names":[],"mappings":"AA4QA;EACA,qBAAA;AC3QA;AD4QA;EACA,cAAA;EACA,eAAA;EACA,aAAA;EACA,aAAA;EACA,iBAAA;AC1QA;AD4QA;EACA,cAAA;EACA,eAAA;EACA,aAAA;EACA,UAAA;EACA,WAAA;EACA,+BAAA;AC1QA;;AAEA,mCAAmC","file":"main.vue","sourcesContent":["<template>\r\n  <div\r\n    ref=\"slpopper\"\r\n    class=\"sl-popper\"\r\n    @[trigger]=\"mouseOn($event)\"\r\n  >\r\n    <div\r\n      ref=\"pop\"\r\n      class=\"pop\"\r\n      :style=\"styleObj\"\r\n      @[trigger].stop=\"mouseOn\"\r\n    >\r\n      <slot name=\"pop\" />\r\n    </div>\r\n\r\n    <div\r\n      ref=\"arrow\"\r\n      class=\"arrow\"\r\n      :style=\"arrowStyleObj\"\r\n    />\r\n    <slot />\r\n  </div>\r\n</template>\r\n<script>\r\nexport default {\r\n  name: 'SlPoper',\r\n  props: {\r\n    position: {\r\n      type: String,\r\n      default: 'top' // top,left,bottom,right\r\n    },\r\n    styleSetting: {\r\n      // 样式设置，如：{ borderRadius = '6px', background = 'white' }\r\n      type: Object,\r\n      default: function() {\r\n        return {}\r\n      }\r\n    },\r\n    offset: {\r\n      // 气泡的偏移值\r\n      type: Number,\r\n      default: 10\r\n    },\r\n    trigger: {\r\n      type: String,\r\n      default: 'mouseover' // mouseover,click\r\n    },\r\n    showPoper: {\r\n      type: Boolean,\r\n      default: true\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      styleObj: { visibility: 'hidden' },\r\n      arrowStyleObj: { visibility: 'hidden' },\r\n      timer: null,\r\n      isMouseOnPoper: false\r\n    }\r\n  },\r\n  computed: {},\r\n  mounted() {\r\n    let popDom = this.$refs.pop\r\n    let slPoperDom = this.$refs.slpopper\r\n\r\n    let parentDoms = this.getParentDoms(slPoperDom)\r\n    parentDoms.forEach((p) => {\r\n      p.addEventListener('scroll', () => {\r\n        if (this.styleObj.visibility === 'visible' && this.isMouseOnPoper) {\r\n          this.setPopStyle()\r\n        }\r\n      })\r\n    })\r\n    if (this.trigger === 'click') {\r\n      document.addEventListener('click', (e) => {\r\n        let parents = this.getParentDoms(e.target)\r\n        parents.unshift(e.target)\r\n        let canRemove = true\r\n        for (let i = 0; i < parents.length; i++) {\r\n          if (parents[i] === slPoperDom) {\r\n            canRemove = false\r\n            break\r\n          }\r\n        }\r\n        if (canRemove) this.removeStyle()\r\n      })\r\n    }\r\n    if (this.trigger === 'mouseover') {\r\n      slPoperDom.addEventListener('mouseout', (e) => {\r\n        e.stopPropagation()\r\n        this.mouseOut()\r\n      })\r\n      popDom.addEventListener('mouseout', (e) => {\r\n        e.stopPropagation()\r\n        this.mouseOut()\r\n      })\r\n    }\r\n  },\r\n  methods: {\r\n    // 求取popper的位置\r\n    mouseOn() {\r\n      if (!this.showPoper) return\r\n      this.isMouseOnPoper = true\r\n      this.setPopStyle()\r\n    },\r\n    mouseOut() {\r\n      if (!this.showPoper) return\r\n      this.isMouseOnPoper = false\r\n      this.removeStyle()\r\n    },\r\n    setPopStyle() {\r\n      if (this.timer) clearTimeout(this.timer)\r\n      let position = this.position\r\n      let style = {}\r\n      let {\r\n        color = 'black',\r\n        border = 'none',\r\n        borderRadius = '6px',\r\n        boxShadow = '0 0 10px #d6d6d6',\r\n        background = 'white'\r\n      } = this.styleSetting\r\n\r\n      // 获取视窗宽、高\r\n      let ch = document.documentElement.clientHeight || document.body.clientHeight\r\n      let cw = document.documentElement.clientWidth || document.body.clientWidth\r\n      // 获取气泡的宽、高\r\n      let popDom = this.$refs.pop\r\n      let { height: popH, width: popW } = popDom.getBoundingClientRect()\r\n      // 获取content内容区的信息\r\n      let slPoperDom = this.$refs.slpopper\r\n      let slPoperDomRect = slPoperDom.getBoundingClientRect()\r\n      let {\r\n        left: rectL,\r\n        right: rectR,\r\n        top: rectT,\r\n        bottom: rectB,\r\n        height: rectH,\r\n        width: rectW\r\n      } = slPoperDomRect\r\n\r\n      // 设置气泡的显示方位\r\n      position = this.reSetPosition(position, popW, rectL, rectR, popH, rectB, rectT, ch, cw)\r\n\r\n      style.color = color\r\n      style.border = border\r\n      style.borderRadius = borderRadius\r\n      style.boxShadow = boxShadow\r\n      style.background = background\r\n      // 获取气泡的fixed定位的位置 top,left,right,bottom\r\n      let pObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, popH, popW)\r\n      this.styleObj = Object.assign({ visibility: 'visible' }, style, pObj)\r\n\r\n      // 获取箭头的宽、高\r\n      let arrowDom = this.$refs.arrow\r\n      let { height: arrowH, width: arrowW } = arrowDom.getBoundingClientRect()\r\n      // 获取气泡的fixed定位的位置 top,left,right,bottom\r\n      let aObj = this.getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, arrowH, arrowW)\r\n      switch (position) {\r\n        case 'left':\r\n          aObj.transform = 'translateX(50%) rotate(45deg)'\r\n          aObj.borderTop = `${border}`\r\n          aObj.borderRight = `${border}`\r\n          break\r\n        case 'right':\r\n          aObj.transform = 'translateX(-50%) rotate(45deg)'\r\n          aObj.borderLeft = `${border}`\r\n          aObj.borderBottom = `${border}`\r\n          break\r\n        case 'top':\r\n          aObj.transform = 'translateY(50%) rotate(45deg)'\r\n          aObj.borderBottom = `${border}`\r\n          aObj.borderRight = `${border}`\r\n          break\r\n        case 'bottom':\r\n          aObj.transform = 'translateY(-50%) rotate(45deg)'\r\n          aObj.borderTop = `${border}`\r\n          aObj.borderLeft = `${border}`\r\n          break\r\n        default:\r\n          break\r\n      }\r\n      aObj.background = background\r\n      this.arrowStyleObj = aObj\r\n    },\r\n\r\n    // 设置气泡的显示方位\r\n    reSetPosition(position, popW, rectL, rectR, popH, rectB, rectT, ch, cw) {\r\n      if (position === 'left' && popW + this.offset > rectL) {\r\n        position = 'right'\r\n      }\r\n      if (position === 'right' && rectR + popW + this.offset > cw) {\r\n        position = 'left'\r\n      }\r\n      if (position === 'top' && popH + this.offset > rectT) {\r\n        position = 'bottom'\r\n      }\r\n      if (position === 'bottom' && rectB + popH + this.offset > ch) {\r\n        position = 'top'\r\n      }\r\n      return position\r\n    },\r\n\r\n    // 获取气泡和箭头的fixed定位的位置，气泡必须始终显示在视窗内\r\n    getObjPosition(ch, cw, position, rectT, rectH, rectL, rectW, popH, popW) {\r\n      // Y轴偏移量\r\n      let ty = rectT - popH / 2 + rectH / 2\r\n      let py = ty <= 0 ? 0 : ty > ch - popH ? ch - popH : ty\r\n      // 在左侧显示\r\n      let or = cw - rectL + this.offset\r\n      let pLeft = { right: (or <= 0 ? 0 : or) + 'px', top: py + 'px' }\r\n      // 在右侧显示\r\n      let ol = rectL + rectW + this.offset\r\n      let pRight = { left: (ol <= 0 ? 0 : ol) + 'px', top: py + 'px' }\r\n\r\n      // X轴偏移量\r\n      let tx = rectL - popW / 2 + rectW / 2\r\n      let px = tx <= 0 ? 0 : tx > cw - popW ? cw - popW : tx\r\n      // 在上方显示\r\n      let ob = ch - rectT + this.offset\r\n      let pTop = { bottom: (ob <= 0 ? 0 : ob) + 'px', left: px + 'px' }\r\n      // 在下方显示\r\n      let ot = rectT + rectH + this.offset\r\n      let pBottom = { top: (ot <= 0 ? 0 : ot) + 'px', left: px + 'px' }\r\n\r\n      let pObj\r\n\r\n      switch (position) {\r\n        case 'left':\r\n          pObj = pLeft\r\n          break\r\n        case 'right':\r\n          pObj = pRight\r\n          break\r\n        case 'top':\r\n          pObj = pTop\r\n          break\r\n        case 'bottom':\r\n          pObj = pBottom\r\n          break\r\n        default:\r\n          pObj = {}\r\n          break\r\n      }\r\n\r\n      return pObj\r\n    },\r\n\r\n    // 鼠标移出后，隐藏气泡和箭\r\n    removeStyle() {\r\n      this.timer = setTimeout(() => {\r\n        this.styleObj = Object.assign({}, this.styleObj, { visibility: 'hidden' })\r\n        this.arrowStyleObj = Object.assign({}, this.arrowStyleObj, { visibility: 'hidden' })\r\n      }, 100)\r\n    },\r\n\r\n    getParentDoms(element) {\r\n      let current = element.parentNode\r\n      let parentDoms = []\r\n      while (current !== null) {\r\n        parentDoms.push(current)\r\n        current = current.parentNode\r\n      }\r\n      return parentDoms\r\n    }\r\n  }\r\n}\r\n</script>\r\n<style lang=\"scss\" scoped>\r\n.sl-popper {\r\n  display: inline-block;\r\n  .pop {\r\n    display: table;\r\n    position: fixed;\r\n    z-index: 9999;\r\n    padding: 10px;\r\n    user-select: text;\r\n  }\r\n  .arrow {\r\n    display: table;\r\n    position: fixed;\r\n    z-index: 9999;\r\n    width: 8px;\r\n    height: 8px;\r\n    transform-origin: center center;\r\n  }\r\n}\r\n</style>\r\n",".sl-popper {\n  display: inline-block;\n}\n.sl-popper .pop {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  padding: 10px;\n  user-select: text;\n}\n.sl-popper .arrow {\n  display: table;\n  position: fixed;\n  z-index: 9999;\n  width: 8px;\n  height: 8px;\n  transform-origin: center center;\n}\n\n/*# sourceMappingURL=main.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-54301b32";
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
  //
  //
  //
  var script$1 = {
    name: 'SkuBatchDialog',
    props: {
      maxLen: {
        type: Number,
        default: 200
      },
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: String,
        default: '80px'
      }
    },
    data: function data() {
      return {
        visible: false,
        skuCodes: ''
      };
    },
    methods: {
      show: function show(skuCodes) {
        this.visible = true;
        this.skuCodes = skuCodes;
      },
      onSubmitBtn: function onSubmitBtn() {
        var skuCodes = this.skuCodes;
        var returns = '';

        if (skuCodes && skuCodes.trim()) {
          var skuArr = skuCodes.split(/\r\n|[\r\n]/).join(',').split(',').filter(function (sku) {
            return sku && sku.trim();
          });
          skuArr.forEach(function (item, i) {
            skuArr[i] = item.trim();
          });

          if (skuArr.length > this.maxLen) {
            this.$message.warning("\u8D85\u51FA\u5141\u8BB8\u8F93\u5165\u6700\u5927\u6570\u91CF".concat(this.maxLen, "\u4E2A\uFF0C\u5DF2\u81EA\u52A8\u622A\u53D6\uFF01"));
            skuArr.length = this.maxLen;
          }

          returns = skuArr.join(',');
        }

        this.visible = false;
        this.$emit('submit', returns);
      }
    }
  };

  /* script */
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var this$1 = this;
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      [
        _c(
          "el-dialog",
          {
            attrs: {
              "lock-scroll": false,
              title: "批量查询" + _vm.label,
              visible: _vm.visible,
              "close-on-click-modal": false,
              "append-to-body": true,
              width: "800px"
            },
            on: {
              "update:visible": function($event) {
                _vm.visible = $event;
              }
            }
          },
          [
            _c(
              "el-form",
              { ref: "form", attrs: { "label-width": _vm.labelWidth } },
              [
                _c(
                  "el-form-item",
                  { attrs: { label: _vm.label } },
                  [
                    _c("el-input", {
                      attrs: {
                        placeholder: "请输入" + _vm.label,
                        autosize: { minRows: 10 },
                        clearable: "",
                        type: "textarea"
                      },
                      on: {
                        input: function() {
                          this$1.$forceUpdate();
                        }
                      },
                      model: {
                        value: _vm.skuCodes,
                        callback: function($$v) {
                          _vm.skuCodes = $$v;
                        },
                        expression: "skuCodes"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("el-form-item", [
                  _c(
                    "div",
                    { staticStyle: { "font-size": "14px", color: "#666" } },
                    [
                      _vm._v(
                        "\n          备注：一行一个，或英文逗号分隔，最多支持" +
                          _vm._s(_vm.maxLen) +
                          "个批量搜索\n        "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  { staticStyle: { "text-align": "right" } },
                  [
                    _c(
                      "el-button",
                      {
                        attrs: { type: "primary" },
                        on: { click: _vm.onSubmitBtn }
                      },
                      [_vm._v("\n          确定\n        ")]
                    ),
                    _vm._v(" "),
                    _c(
                      "el-button",
                      {
                        on: {
                          click: function($event) {
                            _vm.visible = false;
                          }
                        }
                      },
                      [_vm._v("\n          取消\n        ")]
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-e35d5d0c_0", { source: "\n\n/*# sourceMappingURL=skuBatchDialog.vue.map */", map: {"version":3,"sources":["skuBatchDialog.vue"],"names":[],"mappings":";;AAEA,6CAA6C","file":"skuBatchDialog.vue"}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$1 = "data-v-e35d5d0c";
    /* module identifier */
    var __vue_module_identifier__$1 = undefined;
    /* functional template */
    var __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  var script$2 = {
    name: 'SlFieldBatchInput',
    components: {
      SkuBatchDialog: __vue_component__$1
    },
    model: {
      prop: 'skuCodes',
      event: 'confirm'
    },
    props: {
      skuCodes: {
        type: String,
        default: ''
      },
      maxLen: {
        type: Number,
        default: 200
      },
      label: {
        type: String,
        default: 'SKU'
      },
      width: {
        type: Number,
        default: 0
      },
      showBatchButton: {
        type: Boolean,
        default: true
      }
    },
    data: function data() {
      return {
        skuCodesCopy: '',
        multipleSkuVisible: false
      };
    },
    watch: {
      skuCodes: function skuCodes(val) {
        this.skuCodesCopy = val;
      }
    },
    mounted: function mounted() {
      starlinkeUtils.http.get('/srm-common-service/data/name-value/list?dataCode=SUPPLY_TYPE').then(function (res) {
        console.log(res);
      });
    },
    methods: {
      handleInput: function handleInput(value) {
        this.skuCodesCopy = this.formatLen(this.skuCodesCopy);
        this.onEmit(this.skuCodesCopy);
      },
      multipleSku: function multipleSku() {
        if (this.disabled) return;
        this.$refs.skuBatchDialog.show(this.skuCodesCopy);
      },
      onSubmit: function onSubmit(skucode) {
        this.onEmit(skucode);
      },
      onEmit: function onEmit(skuCodes) {
        this.$emit('confirm', skuCodes);
      },
      formatLen: function formatLen(skuCodes) {
        var skuArr = skuCodes.split(',');

        if (skuArr.length > this.maxLen) {
          this.$message.warning("\u8D85\u51FA\u5141\u8BB8\u8F93\u5165\u6700\u5927\u6570\u91CF".concat(this.maxLen, "\u4E2A\uFF0C\u5DF2\u81EA\u52A8\u622A\u53D6\uFF01"));
          skuArr.length = this.maxLen;
          return skuArr.join(',');
        }

        return skuCodes;
      }
    }
  };

  /* script */
  var __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "sku-container",
        style: { width: _vm.width ? _vm.width + "px" : "100%" }
      },
      [
        _c(
          "el-input",
          {
            ref: "input",
            attrs: { placeholder: "请输入" + _vm.label, clearable: "" },
            on: { input: _vm.handleInput },
            model: {
              value: _vm.skuCodesCopy,
              callback: function($$v) {
                _vm.skuCodesCopy = $$v;
              },
              expression: "skuCodesCopy"
            }
          },
          [
            _vm.showBatchButton
              ? _c(
                  "el-button",
                  {
                    attrs: { slot: "append", type: "primary" },
                    on: { click: _vm.multipleSku },
                    slot: "append"
                  },
                  [_vm._v("\n      批量\n    ")]
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "SkuBatchDialog",
          _vm._b(
            {
              ref: "skuBatchDialog",
              attrs: { maxLen: _vm.maxLen, label: _vm.label },
              on: { submit: _vm.onSubmit }
            },
            "SkuBatchDialog",
            _vm.$attrs,
            false
          )
        )
      ],
      1
    )
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    var __vue_inject_styles__$2 = function (inject) {
      if (!inject) return
      inject("data-v-2560090a_0", { source: ".sku-container[data-v-2560090a] {\n  display: inline-block;\n}\n\n/*# sourceMappingURL=main.vue.map */", map: {"version":3,"sources":["E:\\code\\font-code\\lerna-repo\\packages\\starlinke-components\\packages\\SlFieldBatchInput\\src\\main.vue","main.vue"],"names":[],"mappings":"AA+GA;EACA,qBAAA;AC9GA;;AAEA,mCAAmC","file":"main.vue","sourcesContent":["<template>\r\n  <div\r\n    class=\"sku-container\"\r\n    :style=\"{ width: width ? width + 'px' : '100%' }\"\r\n  >\r\n    <el-input\r\n      ref=\"input\"\r\n      v-model=\"skuCodesCopy\"\r\n      :placeholder=\"`请输入${label}`\"\r\n      clearable\r\n      @input=\"handleInput\"\r\n    >\r\n      <el-button\r\n        v-if=\"showBatchButton\"\r\n        slot=\"append\"\r\n        type=\"primary\"\r\n        @click=\"multipleSku\"\r\n      >\r\n        批量\r\n      </el-button>\r\n    </el-input>\r\n    <SkuBatchDialog\r\n      ref=\"skuBatchDialog\"\r\n      :maxLen=\"maxLen\"\r\n      :label=\"label\"\r\n      v-bind=\"$attrs\"\r\n      @submit=\"onSubmit\"\r\n    />\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport SkuBatchDialog from './skuBatchDialog'\r\nimport { http } from 'starlinke-utils'\r\n\r\nexport default {\r\n  name: 'SlFieldBatchInput',\r\n  components: {\r\n    SkuBatchDialog\r\n  },\r\n  model: {\r\n    prop: 'skuCodes',\r\n    event: 'confirm'\r\n  },\r\n  props: {\r\n    skuCodes: {\r\n      type: String,\r\n      default: ''\r\n    },\r\n    maxLen: {\r\n      type: Number,\r\n      default: 200\r\n    },\r\n    label: {\r\n      type: String,\r\n      default: 'SKU'\r\n    },\r\n    width: {\r\n      type: Number,\r\n      default: 0\r\n    },\r\n    showBatchButton: {\r\n      type: Boolean,\r\n      default: true\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      skuCodesCopy: '',\r\n      multipleSkuVisible: false\r\n    }\r\n  },\r\n  watch: {\r\n    skuCodes(val) {\r\n      this.skuCodesCopy = val\r\n    }\r\n  },\r\n  mounted() {\r\n    http.get('/srm-common-service/data/name-value/list?dataCode=SUPPLY_TYPE').then(res => {\r\n      console.log(res)\r\n    })\r\n  },\r\n  methods: {\r\n    handleInput(value) {\r\n      this.skuCodesCopy = this.formatLen(this.skuCodesCopy)\r\n      this.onEmit(this.skuCodesCopy)\r\n    },\r\n    multipleSku() {\r\n      if (this.disabled) return\r\n      this.$refs.skuBatchDialog.show(this.skuCodesCopy)\r\n    },\r\n    onSubmit(skucode) {\r\n      this.onEmit(skucode)\r\n    },\r\n    onEmit(skuCodes) {\r\n      this.$emit('confirm', skuCodes)\r\n    },\r\n    formatLen(skuCodes) {\r\n      let skuArr = skuCodes.split(',')\r\n      if (skuArr.length > this.maxLen) {\r\n        this.$message.warning(`超出允许输入最大数量${this.maxLen}个，已自动截取！`)\r\n        skuArr.length = this.maxLen\r\n        return skuArr.join(',')\r\n      }\r\n      return skuCodes\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n.sku-container {\r\n  display: inline-block;\r\n}\r\n</style>\r\n",".sku-container {\n  display: inline-block;\n}\n\n/*# sourceMappingURL=main.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$2 = "data-v-2560090a";
    /* module identifier */
    var __vue_module_identifier__$2 = undefined;
    /* functional template */
    var __vue_is_functional_template__$2 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      createInjector,
      undefined,
      undefined
    );

  __vue_component__$2.install = function (Vue) {
    Vue.component(__vue_component__$2.name, __vue_component__$2);
  };

  var version = "1.0.2";

  var components = [__vue_component__, __vue_component__$2];

  var install = function install(Vue) {
    // 判断是否安装
    if (install.installed) {
      return;
    }

    components.forEach(function (component) {
      Vue.component(component.name, component);
    });
  };

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var index = {
    version: version,
    install: install,
    SlPoper: __vue_component__,
    SlFieldBatchInput: __vue_component__$2
  };

  return index;

})));
