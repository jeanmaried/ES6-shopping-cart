(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(obj.method || "GET", obj.url + '?apiKey=' + obj.api + '&format=json');

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = function () {
            return reject(xhr.statusText);
        };
        xhr.send(obj.body);
    });
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shop = function () {
  function shop() {
    _classCallCheck(this, shop);
  }

  _createClass(shop, [{
    key: 'addToCart',
    value: function addToCart(sku, price) {
      var product = { price: price, quantity: 1 };
      if (sessionStorage.getItem(sku) == undefined) {
        sessionStorage.setItem(sku, JSON.stringify(product));
      } else {
        var oldValue = JSON.parse(sessionStorage.getItem(sku, product));
        var newValue = oldValue.quantity + 1;
        product.quantity = newValue;
        sessionStorage.setItem(sku, JSON.stringify(product));
      }
      this.cartBuilder(sku, product);
    }
  }, {
    key: 'cartBuilder',
    value: function cartBuilder(sku, product) {
      document.getElementById('listItems').innerHTML = '';
      if (sessionStorage) {
        for (var key in sessionStorage) {
          if (sessionStorage.hasOwnProperty(key)) {
            var cartItem = document.createElement('div');
            cartItem.setAttribute('id', 'itemRows');
            product = JSON.parse(sessionStorage[key]);
            var totalPrice = product.price * product.quantity;

            cartItem.innerHTML = '<div class="flex padding-bottom-small">' + '<div class="small">' + '</div>' + '<div class="cart_title_spacing">' + key + '</div>' + '</div>' + '<div class="flex padding-bottom-small">' + '<div class="small">' + '</div>' + '<input class="cart_title_spacing" id="' + key + '" type="number" value="' + product.quantity + '">' + '</div>' + '<div class="flex padding-bottom-small">' + '<div class="small">' + '</div>' + '<div class="cart_title_spacing">' + '$' + product.price + '</div>' + '</div>' + '<div class="flex padding-bottom-small">' + '<div class="small">' + '</div>' + '<div class="cart_title_spacing">' + '$' + totalPrice.toFixed(2) + '</div>' + '</div>' + '<div class="flex">' + '<button class="update" type="button" data-sku="' + key + '">' + 'UPDATE' + '</button>' + '<button class="remove" type="button" data-sku="' + key + '">' + 'REMOVE' + '</button>' + '</div>';
            document.getElementById('listItems').appendChild(cartItem);
          }
        }
        this.updateButton();
        this.removeButton();
        this.getcartItems();
      }
    }
  }, {
    key: 'updateButton',
    value: function updateButton() {
      var _this = this;

      var update = document.getElementsByClassName('update');
      for (var i = 0; i < update.length; i++) {
        update[i].addEventListener('click', function (e) {
          var goGrabInput = e.target;
          _this.getCartInput(goGrabInput);
        });
      }
    }
  }, {
    key: 'getCartInput',
    value: function getCartInput(goGrabInput) {
      var thisSku = goGrabInput.getAttribute('data-sku');
      var oldQuantity = JSON.parse(sessionStorage.getItem(thisSku));
      var update_value = document.getElementById(thisSku);
      if (update_value.value !== oldQuantity.quantity) {
        oldQuantity.quantity = parseInt(update_value.value);
        sessionStorage.setItem(thisSku, JSON.stringify(oldQuantity));
      }
      this.cartBuilder();
    }
  }, {
    key: 'removeButton',
    value: function removeButton() {
      var _this2 = this;

      var remove = document.getElementsByClassName('remove');

      var _loop = function _loop() {
        var thisSku = remove[i].getAttribute('data-sku');
        remove[i].addEventListener('click', function () {
          sessionStorage.removeItem(thisSku);
          _this2.cartBuilder();
        });
      };

      for (var i = 0; i < remove.length; i++) {
        _loop();
      }
    }
  }, {
    key: 'getcartItems',
    value: function getcartItems() {
      var totalPrice = 0;
      var totalQny = 0;
      for (var key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
          var x = JSON.parse(sessionStorage.getItem([key]));
          totalQny += x.quantity;
          totalPrice += x.price * x.quantity;
        }
      }
      document.getElementById('price').innerHTML = '$' + totalPrice.toFixed(2);
      document.getElementById('cartnum').innerHTML = totalQny;
    }
  }]);

  return shop;
}();

exports.default = shop;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuyAPI = require('./bestbuyAPI');

var _bestbuyAPI2 = _interopRequireDefault(_bestbuyAPI);

var _shop = require('./shop');

var _cart = require('./cart');

var _cart2 = _interopRequireDefault(_cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.cat_clicked = '((categoryPath.id=abcat0502000))';
    this.initBBCall();
    this.catListeners();
    var Cartinit = new _cart2.default();
    Cartinit.cartBuilder();
    Cartinit.getcartItems();
  }

  _createClass(App, [{
    key: 'initBBCall',
    value: function initBBCall() {
      var _this = this;

      (0, _bestbuyAPI2.default)({
        url: 'https://api.bestbuy.com/v1/products' + this.cat_clicked,
        api: '8ccddf4rtjz5k5btqam84qak'
      }).then(function (data) {
        (0, _shop.carousel)(data);
        _this.atcListeners();
      }).catch(function (error) {
        console.log('warning Christopher Robins... Error');
        console.log(error);
      });
    }
  }, {
    key: 'atcListeners',
    value: function atcListeners() {
      var test = document.getElementsByClassName('atc');
      for (var i = 0; i < test.length; i++) {
        test[i].addEventListener('click', function (e) {
          var sku = e.target.getAttribute('data-sku');
          var price = e.target.getAttribute('data-price');
          new _cart2.default().addToCart(sku, price);
        });
      }
    }
  }, {
    key: 'catListeners',
    value: function catListeners() {
      var _this2 = this;

      var test_two = document.getElementsByClassName('categories');
      for (var i = 0; i < test_two.length; i++) {
        test_two[i].addEventListener('click', function (e) {
          _this2.cat_clicked = e.target.value;
          _this2.initBBCall();
        });
      }
    }
  }]);

  return App;
}();

exports.default = App;


var x = new App();

},{"./bestbuyAPI":1,"./cart":2,"./shop":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var carousel = exports.carousel = function carousel(data) {
  document.getElementById('here').innerHTML = '';

  for (var i = 0; i < data.products.length; i++) {
    if (data.products[i].largeImage.length) {
      var image = data.products[i].largeImage;
      var price = data.products[i].regularPrice;
      var description = data.products[i].name;
      var sku = data.products[i].sku;
      var div = document.createElement('div');
      div.classList.add('text-align', 'item_size', 'padding-bottom');
      div.innerHTML = '<img src=' + image + '>' + '<div>' + '$' + price + '</div>' + '<div>' + 'SKU: ' + sku + '</div>' + '<button class="atc" data-sku="' + sku + '" data-price="' + price + '">' + 'ADD TO CART' + '</div>';
      document.getElementById('here').appendChild(div);
    } else {
      break;
    }
  }
};

},{}]},{},[3]);
