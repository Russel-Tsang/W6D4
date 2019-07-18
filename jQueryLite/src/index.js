const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(el) {
  let innerText;
  if (el[0] === "<") {
    el = el.slice(1, el.length - 1);
    if (el.includes('<')) {
      let start = el.indexOf('>') + 1;
      let end = el.indexOf('<');
      innerText = el.slice(start, end);
      el = el.slice(0, start - 1);
    }
    let x = document.createElement(el);
    if (innerText) x.innerHTML = innerText;
    let array = [];
    array.push(x);
    return new DOMNodeCollection(array);
  } else {
    return new DOMNodeCollection(Array.from(document.querySelectorAll(el)));
  }
}