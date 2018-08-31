/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(27);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router) {
    router.addRoutes([{
        name: 'nova-installed-packages',
        path: '/nova-installed-packages',
        component: __webpack_require__(5)
    }, {
        name: 'nova-installed-packages-browse',
        path: '/nova-installed-packages/browse',
        component: __webpack_require__(11)
    }, {
        name: 'nova-installed-packages-detail',
        path: '/nova-installed-packages/:packageName',
        component: __webpack_require__(22)
    }]);
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(9)
/* template */
var __vue_template__ = __webpack_require__(10)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb962f12", Component.options)
  } else {
    hotAPI.reload("data-v-bb962f12", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("283f0064", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bb962f12\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bb962f12\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        this.getPackages();
    },
    data: function data() {
        return {
            fields: [{
                label: 'Name',
                attribute: 'name'
            }, {
                label: 'Description',
                attribute: 'description'
            }, {
                label: 'Version',
                attribute: 'version'
            }, {
                label: 'Author(s)',
                attribute: 'authors'
            }],
            packages: '',
            search: ''
        };
    },


    methods: {
        getPackages: function getPackages() {
            var _this = this;

            axios.get('/nova-vendor/sidis405/nova-installed-packages').then(function (response) {
                _this.packages = Array.from(Object.keys(response.data), function (k) {
                    return response.data[k];
                });
            });
        }
    },

    computed: {
        filteredPackages: function filteredPackages() {
            if (!this.search.length) {
                return this.packages;
            }
            var regex = this.searchRegex;
            // User input is not a valid regular expression, show no results
            if (!regex) {
                return {};
            }
            return this.packages.filter(function (novaPackage) {
                var matchesSearch = false;
                for (var key in novaPackage) {
                    if (Array.isArray(novaPackage[key])) {
                        novaPackage[key].forEach(function (property) {
                            if (regex.test(property)) {
                                matchesSearch = true;
                            }
                        });
                    } else if (regex.test(novaPackage[key])) {
                        matchesSearch = true;
                    }
                }
                return matchesSearch;
            });
        },
        searchRegex: function searchRegex() {
            try {
                return new RegExp('(' + this.search + ')', 'i');
            } catch (e) {
                return false;
            }
        }
    }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "flex justify-between" },
        [
          _c("heading", { staticClass: "mb-6" }, [
            _vm._v("Installed Packages (" + _vm._s(this.packages.length) + ")")
          ]),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "no-underline",
              attrs: { to: { name: "nova-installed-packages-browse" } }
            },
            [
              _c("button", { staticClass: "btn btn-default btn-primary" }, [
                _c(
                  "svg",
                  {
                    staticClass: "fill-current w-4 h-4 mr-2",
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20"
                    }
                  },
                  [
                    _c("path", {
                      attrs: { d: "M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", [_vm._v("Browse Packages")])
              ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "flex justify-between" }, [
        _c(
          "div",
          { staticClass: "relative h-9 flex items-center mb-6" },
          [
            _c("icon", {
              staticClass: "absolute ml-3 text-70",
              attrs: { type: "search" }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.search,
                  expression: "search"
                }
              ],
              staticClass:
                "appearance-none form-control form-input w-search pl-search",
              attrs: { placeholder: "Filter", type: "search" },
              domProps: { value: _vm.search },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.search = $event.target.value
                }
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("card", [
        _c("div", { staticClass: "overflow-hidden overflow-x-auto relative" }, [
          _c(
            "table",
            {
              staticClass: "table w-full",
              attrs: { cellpadding: "0", cellspacing: "0" }
            },
            [
              _c("thead", [
                _c(
                  "tr",
                  [
                    _vm._l(_vm.fields, function(field) {
                      return _c("th", { staticClass: "text-left" }, [
                        _vm._v(
                          "\n                            " +
                            _vm._s(field.label) +
                            "\n                    "
                        )
                      ])
                    }),
                    _vm._v(" "),
                    _c("th", [
                      _vm._v(
                        "\n                         \n                    "
                      )
                    ])
                  ],
                  2
                )
              ]),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.filteredPackages, function(package, index) {
                  return _c(
                    "tr",
                    { key: index },
                    [
                      _vm._l(_vm.fields, function(field) {
                        return _c("td", [
                          _c(
                            "span",
                            { staticClass: "whitespace-no-wrap text-left" },
                            [
                              _vm._v(
                                "\n                            " +
                                  _vm._s(package[field.attribute]) +
                                  "\n                        "
                              )
                            ]
                          )
                        ])
                      }),
                      _vm._v(" "),
                      _c(
                        "td",
                        [
                          _c(
                            "router-link",
                            {
                              attrs: {
                                to: {
                                  name: "nova-installed-packages-detail",
                                  params: { packageName: package.name }
                                }
                              }
                            },
                            [
                              _c("icon", {
                                attrs: {
                                  type: "view",
                                  "view-box": "0 0 24 24",
                                  width: "20",
                                  height: "20"
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    2
                  )
                })
              )
            ]
          )
        ])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-bb962f12", module.exports)
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(12)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(14)
/* template */
var __vue_template__ = __webpack_require__(21)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Browse.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70b2ffb5", Component.options)
  } else {
    hotAPI.reload("data-v-70b2ffb5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("dff6e790", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70b2ffb5\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Browse.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-70b2ffb5\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Browse.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PackageList_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PackageList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PackageList_vue__);
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
//
//




/* harmony default export */ __webpack_exports__["default"] = ({

    components: {
        PackageList: __WEBPACK_IMPORTED_MODULE_0__PackageList_vue___default.a
    },

    mounted: function mounted() {
        this.getPopularPackages();
        this.getRecentPackages();
        this.getInstalledPackages();
    },
    data: function data() {
        return {
            popularPackages: '',
            recentPackages: '',
            foundPackages: '',
            installedPackages: '',
            term: ''
        };
    },


    methods: {
        getInstalledPackages: function getInstalledPackages() {
            var _this = this;

            axios.get('/nova-vendor/sidis405/nova-installed-packages').then(function (response) {
                _this.installedPackages = Array.from(Object.keys(response.data), function (k) {
                    return response.data[k];
                });
            });
        },
        getPopularPackages: function getPopularPackages() {
            var _this2 = this;

            axios.get('https://novapackages.com/api/popular').then(function (response) {
                _this2.popularPackages = response.data.data;
            });
        },
        getRecentPackages: function getRecentPackages() {
            var _this3 = this;

            axios.get('https://novapackages.com/api/recent').then(function (response) {
                _this3.recentPackages = response.data.data;
            });
        },
        searchPackages: function searchPackages() {
            var _this4 = this;

            if (this.term.length > 2) {
                axios.get('https://novapackages.com/api/search?q=' + this.term).then(function (response) {
                    _this4.foundPackages = response.data.data;
                    console.log(_this4.foundPackages);
                });
            } else {
                this.foundPackages = [];
            }
        }
    }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(16)
/* template */
var __vue_template__ = __webpack_require__(20)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/PackageList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a5bc22e", Component.options)
  } else {
    hotAPI.reload("data-v-6a5bc22e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Package_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Package_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Package_vue__);
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({

    components: {
        Package: __WEBPACK_IMPORTED_MODULE_0__Package_vue___default.a
    },

    props: ['packages', 'installedPackages']
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(18)
/* template */
var __vue_template__ = __webpack_require__(19)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Package.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0daacaab", Component.options)
  } else {
    hotAPI.reload("data-v-0daacaab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['package', 'installedPackages'],

    data: function data() {
        return {
            installed: this.isInstalled()
        };
    },


    methods: {
        isInstalled: function isInstalled() {

            var isPackageInstalled = this.installedPackages.map(function (i) {
                return i.name;
            }).includes(this.package.composer_name);

            return isPackageInstalled;
        },
        install: function install() {
            this.$toasted.show('Installing \'' + this.package.composer_name + '\'...', { type: 'info', duration: 100000 });

            // axios.post('/nova-vendor/sidis405/nova-installed-packages', {package: this.package.composer_name}).then((response) => {
            //     console.log(response.data)
            // })
            var request = new XMLHttpRequest();
            request.open('POST', '/nova-vendor/sidis405/nova-installed-packages', true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.setRequestHeader('X-CSRF-TOKEN', document.querySelector('meta[name="csrf-token"]').content);

            request.onprogress = function (e) {
                var response = e.currentTarget.response;
                var lastResponseLength = null;
                var output = (typeof lastResponseLength === 'undefined' ? 'undefined' : _typeof(lastResponseLength)) === ( true ? 'undefined' : _typeof(undefined)) ? response : response.substring(lastResponseLength);

                lastResponseLength = response.length;
                console.log(output);
            };

            var vm = this;

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    vm.installed = true;
                    setTimeout(function () {
                        vm.$toasted.clear();
                        vm.$toasted.show('\'' + vm.package.composer_name + '\' was installed successfully', { type: 'success' });
                    }, 2000);
                    console.log('Complete');
                }
            };

            request.send('package=' + this.package.composer_name);
        }
    },

    computed: {
        tags: function tags() {
            return this.package.tags.map(function (value) {
                return '#' + value.name;
            }).join(" ");
        }
    }
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "flex m-2 mb-4 shadow hover:shadow-md h-128 w-full",
      staticStyle: { "max-width": "400px" }
    },
    [
      _c(
        "div",
        {
          staticClass: "flex-1 bg-white text-sm rounded-sm",
          staticStyle: {
            "border-width": "4px 1px 1px",
            "border-style": "solid",
            "border-color":
              "rgb(101, 116, 205) rgb(221, 221, 221) rgb(221, 221, 221)",
            "border-image": "initial"
          }
        },
        [
          _c(
            "div",
            {
              staticClass: "flex flex-row mt-4 px-4 pb-4",
              staticStyle: { height: "14em" }
            },
            [
              _c("div", { staticClass: "pb-2 w-full relative" }, [
                _c(
                  "div",
                  { staticClass: "flex justify-between" },
                  [
                    _c(
                      "router-link",
                      {
                        staticClass: "block mb-2 no-underline",
                        attrs: {
                          to: {
                            name: "nova-installed-packages-detail",
                            params: { packageName: _vm.package.composer_name }
                          }
                        }
                      },
                      [
                        _c(
                          "h2",
                          {
                            staticClass:
                              "text-xl text-grey-darkest flex flex-row items-center text-black"
                          },
                          [
                            _vm._v(
                              "\n                                    " +
                                _vm._s(_vm.package.name) +
                                "\n                                "
                            )
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _vm.installed
                      ? _c(
                          "span",
                          { staticClass: "text-success mt-1 font-bold" },
                          [_vm._v("Installed")]
                        )
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "text-grey-darkest leading-normal mb-4 markdown leading-tight w-full"
                  },
                  [_vm._v(_vm._s(_vm.package.abstract))]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "py-4" }, [_vm._v(_vm._s(_vm.tags))]),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass:
                      "absolute block text-indigo font-bold no-underline pin-b pin-l",
                    attrs: {
                      href: _vm.package.novapackages_url,
                      target: "_blank"
                    }
                  },
                  [
                    _vm._v(
                      "\n                            Learn More\n                        "
                    )
                  ]
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "bg-grey-lightest flex text-sm border-t border-grey-light px-4 py-4 justify-between"
            },
            [
              _c(
                "a",
                {
                  staticClass:
                    "text-indigo font-bold no-underline uppercase text-xs hover:text-indigo-dark",
                  attrs: {
                    href: _vm.package.author.url ? _vm.package.author.url : "#",
                    target: ""
                  }
                },
                [
                  _vm._v(
                    "\n                        " +
                      _vm._s(_vm.package.author.name) +
                      "\n                    "
                  )
                ]
              ),
              _vm._v(" "),
              !_vm.installed
                ? _c(
                    "a",
                    {
                      staticClass: "btn btn-default btn-small btn-primary",
                      attrs: { href: "#" },
                      on: { click: _vm.install }
                    },
                    [_vm._v("Install Package")]
                  )
                : _vm._e()
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0daacaab", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "flex flex-wrap sm:justify-start" },
    _vm._l(_vm.packages, function(package, index) {
      return _c("Package", {
        key: index,
        attrs: { package: package, installedPackages: _vm.installedPackages }
      })
    })
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6a5bc22e", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "flex justify-between" },
        [
          _c(
            "div",
            { staticClass: "relative h-9 flex items-center mb-6" },
            [
              _c("icon", {
                staticClass: "absolute ml-3 text-70",
                attrs: { type: "search" }
              }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.term,
                    expression: "term"
                  }
                ],
                staticClass:
                  "appearance-none form-control form-input w-search pl-search",
                attrs: {
                  placeholder: "Search novapackages.com",
                  type: "search"
                },
                domProps: { value: _vm.term },
                on: {
                  input: [
                    function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.term = $event.target.value
                    },
                    _vm.searchPackages
                  ]
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "router-link",
            {
              staticClass: "no-underline",
              attrs: { to: { name: "nova-installed-packages" } }
            },
            [
              _c("button", { staticClass: "btn btn-default btn-primary" }, [
                _c(
                  "svg",
                  {
                    staticClass: "fill-current w-4 h-4 mr-2",
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 20 20"
                    }
                  },
                  [
                    _c("path", {
                      attrs: { d: "M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" }
                    })
                  ]
                ),
                _vm._v(" "),
                _c("span", [_vm._v("Installed Packages")])
              ])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.foundPackages.length
        ? [
            _c("heading", { staticClass: "mb-6" }, [
              _vm._v(
                "Found Packages (" + _vm._s(this.foundPackages.length) + ")"
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "w-full" },
              [
                _c("PackageList", {
                  attrs: {
                    packages: _vm.foundPackages,
                    installedPackages: _vm.installedPackages
                  }
                })
              ],
              1
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      !_vm.foundPackages.length
        ? [
            _c("heading", { staticClass: "mb-6" }, [
              _vm._v(
                "Popular Packages (" + _vm._s(this.popularPackages.length) + ")"
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "w-full" },
              [
                _c("PackageList", {
                  attrs: {
                    packages: _vm.popularPackages,
                    installedPackages: _vm.installedPackages
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("heading", { staticClass: "mb-6 mt-4" }, [
              _vm._v(
                "Recent Packages (" + _vm._s(this.recentPackages.length) + ")"
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "w-full" },
              [
                _c("PackageList", {
                  attrs: {
                    packages: _vm.recentPackages,
                    installedPackages: _vm.installedPackages
                  }
                })
              ],
              1
            )
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-70b2ffb5", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(23)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(25)
/* template */
var __vue_template__ = __webpack_require__(26)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Show.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e124e930", Component.options)
  } else {
    hotAPI.reload("data-v-e124e930", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("eb7176ca", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e124e930\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Show.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e124e930\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Show.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = ({
    mounted: function mounted() {
        this.getPackageDataFromNovaPackages();
    },
    data: function data() {
        return {
            packageData: ''
        };
    },


    methods: {
        getPackageDataFromNovaPackages: function getPackageDataFromNovaPackages() {
            var _this = this;

            axios.get('https://novapackages.com/api/search?q=' + this.packageName).then(function (response) {
                _this.packageData = response.data['data'][0];
            });
        }
    },

    computed: {
        packageName: function packageName() {
            return this.$route.params.packageName;
        }
    }
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "router-link",
        { attrs: { to: { name: "nova-installed-packages" } } },
        [_vm._v("\n        ← Back\n    ")]
      ),
      _vm._v(" "),
      _c("h2", {
        staticClass: "uppercase text-center mb-4",
        domProps: { innerHTML: _vm._s(this.packageName) }
      }),
      _vm._v(" "),
      _c("card", { staticClass: "flex flex-col mb-6 p-4" }, [
        _c("p", {
          domProps: { innerHTML: _vm._s(_vm.packageData["abstract"]) }
        })
      ]),
      _vm._v(" "),
      _c("card", { staticClass: "flex flex-col mb-6 p-4" }, [
        _c("h4", { staticClass: "uppercase text-center mb-4" }, [
          _vm._v("Description")
        ]),
        _vm._v(" "),
        _c("span", {
          domProps: { innerHTML: _vm._s(_vm.packageData["description_html"]) }
        })
      ]),
      _vm._v(" "),
      _c("card", { staticClass: "flex flex-col mb-6 p-4" }, [
        _c("h4", { staticClass: "uppercase text-center mb-4" }, [
          _vm._v("Instructions")
        ]),
        _vm._v(" "),
        _c("span", {
          domProps: { innerHTML: _vm._s(_vm.packageData["instructions_html"]) }
        })
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e124e930", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);