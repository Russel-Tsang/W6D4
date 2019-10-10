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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor (array) {\n    this.collection = array;\n  }\n\n  children() {\n    let nursery = [];\n    this.collection.forEach(el => {\n      Array.from(el.children).forEach(child => nursery.push(child));\n    });\n    return new DOMNodeCollection(nursery);\n  }\n\n  parent() {\n    let parents = [];\n    this.collection.forEach( (el) => {\n      if (!parents.includes(el.parentElement)) parents.push(el.parentElement);\n    });\n\n    return new DOMNodeCollection(parents);\n  }\n\n  find(ele) {\n    let selected = [];\n    this.collection.forEach((el) => {\n      Array.from(el.querySelectorAll(ele)).forEach( (found) => {\n        if (!selected.includes(found)) {\n          selected.push(found);\n        }\n      })\n    });\n    return new DOMNodeCollection(selected);\n  }\n\n\n  html(string) {\n    if (!string) {\n      return this.collection[0].innerHTML;\n    } else {\n      this.collection.forEach( function (el){\n        el.innerHTML = string;\n      })\n    }\n  }\n\n  empty() {\n    this.collection.forEach(function(el) {\n      el.innerHTML = \"\";\n    })\n  }\n\n  remove() {\n    this.collection.forEach( (el) => el.outerHTML = '')\n  }\n\n  on(action, callback) {\n    this.action = action;\n    this.collection.forEach( el => {\n      el.addEventListener(`${action}`, callback);\n    });\n  }\n\n  append(arg) {\n    if (typeof arg === 'string') {\n      this.collection.forEach( (el) => {\n        el.innerHTML += arg; \n      })\n    } else if (typeof arg === 'object') {\n      arg.array.forEach( (el) => {\n        this.collection.forEach((thisArr) => {\n          thisArr.innerHTML += el.outerHTML;\n        });\n      });\n    } \n  }\n\n  attr(prop, val) {\n    if (!val) return this.collection[0].attributes[prop].value;\n    this.collection.forEach( (el) => {\n      el.setAttribute(`${prop}`, val);\n    })\n  }\n\n  addClass(name) {\n    this.collection.forEach( (el) => {\n      el.className = name;\n    })\n  }\n\n  removeClass(classesString) {\n    if (!classesString) {\n      this.collection.forEach( (el) => {\n        el.className = '';\n      });\n    } else {\n      let classesArr = classesString.split(\" \");\n      this.collection.forEach( (el) => {\n        el.className = el.className.split(\" \").filter( name => !classesArr.includes(name) ).join(\" \"); \n      });\n    }\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./src/dom_node_collection.js\");\n\nwindow.$l = function(ele) {\n  // initialize innerText if the variable is later necessary\n  let innerText;\n  // check if user wants to create element\n  if (ele[0] === \"<\") {\n    ele = ele.slice(1, ele.length - 1);\n    // if format of argument is <element>innerText</element>, \n    if (ele.includes('<')) {\n      let start = ele.indexOf('>') + 1, \n          end = ele.indexOf('<');\n\n      // then set innerText variable to the text between tags\n      innerText = ele.slice(start, end);\n      ele = ele.slice(0, start - 1);\n    }\n    let newElement = document.createElement(ele);\n    if (innerText) newElement.innerHTML = innerText;\n    return new DOMNodeCollection([newElement]);\n  // else, the user is selecting existing element from DOM, so return node collection\n  } else {\n    return new DOMNodeCollection(Array.from(document.querySelectorAll(ele)));\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });