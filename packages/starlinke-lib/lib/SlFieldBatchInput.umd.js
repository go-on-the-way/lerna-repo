/* * Copyright © 2020-2021 wlei * Released under the MIT License. */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SlFieldBatchInput = factory());
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
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-44adbeb0_0", { source: "\n\n/*# sourceMappingURL=skuBatchDialog.vue.map */", map: {"version":3,"sources":["skuBatchDialog.vue"],"names":[],"mappings":";;AAEA,6CAA6C","file":"skuBatchDialog.vue"}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-44adbeb0";
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

  //
  var script$1 = {
    name: 'SlFieldBatchInput',
    components: {
      SkuBatchDialog: __vue_component__
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
  var __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
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
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    var __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-324c277e_0", { source: ".sku-container[data-v-324c277e] {\n  display: inline-block;\n}\n\n/*# sourceMappingURL=main.vue.map */", map: {"version":3,"sources":["E:\\code\\font-code\\lerna-repo\\packages\\starlinke-lib\\packages\\SlFieldBatchInput\\src\\main.vue","main.vue"],"names":[],"mappings":"AAyGA;EACA,qBAAA;ACxGA;;AAEA,mCAAmC","file":"main.vue","sourcesContent":["<template>\r\n  <div\r\n    class=\"sku-container\"\r\n    :style=\"{ width: width ? width + 'px' : '100%' }\"\r\n  >\r\n    <el-input\r\n      ref=\"input\"\r\n      v-model=\"skuCodesCopy\"\r\n      :placeholder=\"`请输入${label}`\"\r\n      clearable\r\n      @input=\"handleInput\"\r\n    >\r\n      <el-button\r\n        v-if=\"showBatchButton\"\r\n        slot=\"append\"\r\n        type=\"primary\"\r\n        @click=\"multipleSku\"\r\n      >\r\n        批量\r\n      </el-button>\r\n    </el-input>\r\n    <SkuBatchDialog\r\n      ref=\"skuBatchDialog\"\r\n      :maxLen=\"maxLen\"\r\n      :label=\"label\"\r\n      v-bind=\"$attrs\"\r\n      @submit=\"onSubmit\"\r\n    />\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport SkuBatchDialog from './skuBatchDialog'\r\n\r\nexport default {\r\n  name: 'SlFieldBatchInput',\r\n  components: {\r\n    SkuBatchDialog\r\n  },\r\n  model: {\r\n    prop: 'skuCodes',\r\n    event: 'confirm'\r\n  },\r\n  props: {\r\n    skuCodes: {\r\n      type: String,\r\n      default: ''\r\n    },\r\n    maxLen: {\r\n      type: Number,\r\n      default: 200\r\n    },\r\n    label: {\r\n      type: String,\r\n      default: 'SKU'\r\n    },\r\n    width: {\r\n      type: Number,\r\n      default: 0\r\n    },\r\n    showBatchButton: {\r\n      type: Boolean,\r\n      default: true\r\n    }\r\n  },\r\n  data() {\r\n    return {\r\n      skuCodesCopy: '',\r\n      multipleSkuVisible: false\r\n    }\r\n  },\r\n  watch: {\r\n    skuCodes(val) {\r\n      this.skuCodesCopy = val\r\n    }\r\n  },\r\n  methods: {\r\n    handleInput(value) {\r\n      this.skuCodesCopy = this.formatLen(this.skuCodesCopy)\r\n      this.onEmit(this.skuCodesCopy)\r\n    },\r\n    multipleSku() {\r\n      if (this.disabled) return\r\n      this.$refs.skuBatchDialog.show(this.skuCodesCopy)\r\n    },\r\n    onSubmit(skucode) {\r\n      this.onEmit(skucode)\r\n    },\r\n    onEmit(skuCodes) {\r\n      this.$emit('confirm', skuCodes)\r\n    },\r\n    formatLen(skuCodes) {\r\n      let skuArr = skuCodes.split(',')\r\n      if (skuArr.length > this.maxLen) {\r\n        this.$message.warning(`超出允许输入最大数量${this.maxLen}个，已自动截取！`)\r\n        skuArr.length = this.maxLen\r\n        return skuArr.join(',')\r\n      }\r\n      return skuCodes\r\n    }\r\n  }\r\n}\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n.sku-container {\r\n  display: inline-block;\r\n}\r\n</style>\r\n",".sku-container {\n  display: inline-block;\n}\n\n/*# sourceMappingURL=main.vue.map */"]}, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__$1 = "data-v-324c277e";
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

  __vue_component__$1.install = function (Vue) {
    Vue.component(__vue_component__$1.name, __vue_component__$1);
  };

  return __vue_component__$1;

})));
