const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(ele) {
  // if (ele is actually a function) 
  if (typeof ele === 'function') {
    document.addEventListener('DOMContentLoaded', () => {
      ele();
    })
  } else {
    // initialize innerText if the variable is later necessary
    let innerText;
    // check if user wants to create element
    if (ele[0] === "<") {
      ele = ele.slice(1, ele.length - 1);
      // if format of argument is <element>innerText</element>, 
      if (ele.includes('<')) {
        let start = ele.indexOf('>') + 1,
          end = ele.indexOf('<');

        // then set innerText variable to the text between tags
        innerText = ele.slice(start, end);
        ele = ele.slice(0, start - 1);
      }
      let newElement = document.createElement(ele);
      if (innerText) newElement.innerHTML = innerText;
      return new DOMNodeCollection([newElement]);
      // else, the user is selecting existing element from DOM, so return node collection
    } else {
      return new DOMNodeCollection(Array.from(document.querySelectorAll(ele)));
    }
  }
}

window.$l.extend = function(...objs) {
  let mergeObject = objs[0];
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => mergeObject[key] = obj[key]);
  });
  return mergeObject;
}

window.$l.ajax = function(options) {
  const defaultOptions = {
    method: 'GET',
    url: location.href,
    success: (successResponse) => console.log(JSON.parse(successResponse)),
    error: (errorResponse) => console.log(errorResponse),
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  // merge default options with provided options
  options = $l.extend(defaultOptions, options);
  options.method = options.method.toUpperCase();

  const request = new XMLHttpRequest();

  request.open(options.method, options.url, true);

  request.onload = function () {
    if (request.status === 200) {
      options.success(JSON.parse(request.response));
    } else {
      options.error(request.response);
    }
  }

  request.send(JSON.stringify(options.data));
}