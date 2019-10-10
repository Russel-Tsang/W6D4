class DOMNodeCollection {
  constructor (array) {
    this.collection = array;
  }

  children() {
    let nursery = [];
    this.collection.forEach(el => {
      Array.from(el.children).forEach(child => nursery.push(child));
    });
    return new DOMNodeCollection(nursery);
  }

  parent() {
    let parents = [];
    this.collection.forEach( (el) => {
      if (!parents.includes(el.parentElement)) parents.push(el.parentElement);
    });

    return new DOMNodeCollection(parents);
  }

  find(ele) {
    let selected = [];
    this.collection.forEach((el) => {
      Array.from(el.querySelectorAll(ele)).forEach( (found) => {
        if (!selected.includes(found)) {
          selected.push(found);
        }
      })
    });
    return new DOMNodeCollection(selected);
  }


  html(string) {
    if (!string) {
      return this.collection[0].innerHTML;
    } else {
      this.collection.forEach( function (el){
        el.innerHTML = string;
      })
    }
  }

  empty() {
    this.collection.forEach(function(el) {
      el.innerHTML = "";
    })
  }

  remove() {
    this.collection.forEach( (el) => el.outerHTML = '')
  }

  on(action, callback) {
    this.action = action;
    this.collection.forEach( el => {
      el.addEventListener(`${action}`, callback);
    });
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.collection.forEach( (el) => {
        el.innerHTML += arg; 
      })
    } else if (typeof arg === 'object') {
      arg.array.forEach( (el) => {
        this.collection.forEach((thisArr) => {
          thisArr.innerHTML += el.outerHTML;
        });
      });
    } 
  }

  attr(prop, val) {
    if (!val) return this.collection[0].attributes[prop].value;
    this.collection.forEach( (el) => {
      el.setAttribute(`${prop}`, val);
    })
  }

  addClass(name) {
    this.collection.forEach( (el) => {
      el.className = name;
    })
  }

  removeClass(classesString) {
    if (!classesString) {
      this.collection.forEach( (el) => {
        el.className = '';
      });
    } else {
      let classesArr = classesString.split(" ");
      this.collection.forEach( (el) => {
        el.className = el.className.split(" ").filter( name => !classesArr.includes(name) ).join(" "); 
      });
    }
  }
}

module.exports = DOMNodeCollection;