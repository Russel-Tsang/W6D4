class DOMNodeCollection {
  constructor (array) {
    this.array = array;

  }

  children () {
    let nursery = [];
    this.array.forEach( (el) => {
      Array.from(el.children).forEach( child => nursery.push(child));
    });
    return new DOMNodeCollection(nursery);
  }

  parent () {
    let parents = [];
    this.array.forEach( (el) => {
      if (!parents.includes(el.parentElement)) parents.push(el.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  find (ele) {
    let selected = [];
    this.array.forEach((el) => {
      Array.from(el.querySelectorAll(ele)).forEach( (found) => {
        if (!selected.includes(found)) {
          selected.push(found);
        }
      })
    });
    return new DOMNodeCollection(selected);
  }


  html (string) {
    if (!string) {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach( function (el){
        el.innerHTML = string;
      })
    }
  }

  empty() {
    this.array.forEach(function(el) {
      el.innerHTML = "";
    })
  }

  remove() {
    this.array.forEach( (el) => el.outerHTML = '')
  }

  on(action, callback) {
    this.action = action;
    this.array.forEach( el => {
      el.addEventListener(`${action}`, callback);
    });
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.array.forEach( (el) => {
        el.innerHTML += arg; 
      })
    } else if (typeof arg === 'object') {
      arg.array.forEach( (el) => {
        this.array.forEach((thisArr) => {
          thisArr.innerHTML += el.outerHTML;
        });
      });
    } 
  }

  attr(prop, val) {
    if (!val) return this.array[0].attributes[prop].value;
    this.array.forEach( (el) => {
      el.setAttribute(`${prop}`, val);
    })
  }

  addClass(name) {
    this.array.forEach( (el) => {
      el.className = name;
    })
  }

  removeClass(classesString) {
    if (!classesString) {
      this.array.forEach( (el) => {
        el.className = '';
      });
    } else {
      let classesArr = classesString.split(" ");
      this.array.forEach( (el) => {
        el.className = el.className.split(" ").filter( name => !classesArr.includes(name) ).join(" "); 
      });
    }
  }
}

module.exports = DOMNodeCollection;