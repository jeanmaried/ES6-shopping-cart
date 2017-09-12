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
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var carousel = exports.carousel = function carousel(data) {

	document.getElementById("here").innerHTML = "";

	for (var i = 0; i < data.products.length; i++) {

		if (data.products[i].largeImage.length) {
			var image = data.products[i].largeImage;
			var manu = data.products[i].manufacturer;
			var price = data.products[i].regularPrice;
			var description = data.products[i].name;
			var sku = data.products[i].sku;
			var div = $('<div></div>');
			div.html('<div>' + manu + '</div>' + '<div>' + description + '</div>' + '<img src=' + image + '>' + '<div>' + price + '</div>' + '<button class="atc" data-sku="' + sku + '" data-price="' + price + '">' + "ADD TO CART" + '</div>');
			$("#here").append(div);
		} else {
			break;
		};
	};
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bestbuy = require("./bestbuy");

var _bestbuy2 = _interopRequireDefault(_bestbuy);

var _carousel = require("./carousel");

var _productUtil = require("./productUtil");

var _productUtil2 = _interopRequireDefault(_productUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.cat_clicked = "((categoryPath.id=abcat0502000))";
		this.initBBCall();
		this.catListeners();
		// let Cartinit = new productUtil;
		// Cartinit.rebuildCart(); 
	}

	_createClass(App, [{
		key: "initBBCall",
		value: function initBBCall() {
			var _this = this;

			(0, _bestbuy2.default)({ url: "https://api.bestbuy.com/v1/products" + this.cat_clicked, api: "8ccddf4rtjz5k5btqam84qak" }).then(function (data) {
				(0, _carousel.carousel)(data);
				_this.atcListeners();
			}).catch(function (error) {
				console.log("warning Christopher Robins... Error");
				console.log(error);
			});
		}
	}, {
		key: "atcListeners",
		value: function atcListeners() {
			var test = document.getElementsByClassName('atc');
			for (var i = 0; i < test.length; i++) {
				test[i].addEventListener("click", function (e) {
					var sku = e.target.getAttribute("data-sku");
					var price = e.target.getAttribute("data-price");
					new _productUtil2.default().addToCart(sku, price);
				});
			}
		}
	}, {
		key: "catListeners",
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
;

var x = new App();

},{"./bestbuy":1,"./carousel":2,"./productUtil":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var productUtil = function () {
	function productUtil() {
		_classCallCheck(this, productUtil);
	}

	_createClass(productUtil, [{
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
			document.getElementById('listItems').innerHTML = "";
			this.cartList(sku, product);
		}
	}, {
		key: 'cartList',
		value: function cartList(sku, product) {

			for (var key in sessionStorage) {

				var cartItem = $('<div id="itemRows"></div>');

				sku = key;
				product = JSON.parse(sessionStorage[key]);

				cartItem.html('<div>' + 'SKU' + '</div>' + '<div>' + sku + '</div>' + '<div>' + 'QUANTITY' + '</div>' + '<input class="item_input" type="number" value="' + product.quantity + '">' + '<div>' + 'TOTAL' + '</div>' + '<div id="totalPrice">' + product.price * product.quantity + '</div>' + '<button class="update" type="button" data-sku="' + sku + '">' + 'UPDATE' + '</button>' + '<button class="remove" type="button" data-sku="' + sku + '">' + 'REMOVE' + '</button>');
				$('#listItems').append(cartItem);
			}
			this.updateCart();
			// this.removeCart(sku, product);		
		}
	}, {
		key: 'getCartInput',
		value: function getCartInput(goGrabInput) {
			var thisSku = goGrabInput.getAttribute("data-sku");
			var oldQuantity = JSON.parse(sessionStorage.getItem(thisSku)).quantity;
			var update_value = document.getElementsByClassName('item_input');
			for (var i = 0; i < update_value.length; i++) {
				if (update_value[i].value == oldQuantity) {
					console.log(oldQuantity);
				} else {
					console.log("not the same");
					oldQuantity = update_value[i].value;
					console.log(newQuantity);
					sessionStorage.setItem(thisSku, JSON.stringify(goGrabInput.price, oldQuantity));
					//    			let oldValue=JSON.parse(sessionStorage.getItem(thisSku)); 
					// 			let totalValue = (update_value[i].value - oldValue.quantity)+oldValue.quantity;
					// 			thisProduct.quantity = totalValue;
					// 			sessionStorage.setItem(thisSku,JSON.stringify(thisProduct));
					// 			this.totalPrice(thisProduct);
				}
			};
		} //here we look into the input to see if the value has changed. If no, do nothing. If yes, update
		//session storage.

	}, {
		key: 'updateCart',
		value: function updateCart() {
			var _this = this;

			var update = document.getElementsByClassName('update');
			for (var i = 0; i < update.length; i++) {
				update[i].addEventListener('click', function (e) {
					var goGrabInput = e.target;
					_this.getCartInput(goGrabInput);
				});
			}
		} // this section allows you to see what update button has been pressed and passes the values on to
		// getCartInput

		//    removeCart(sku, product){
		//    	let remove = document.getElementsByClassName('remove')
		// 	for (var i = 0; i < remove.length; i++){
		//    	let thisSku = remove[i].getAttribute("data-sku");
		//    	remove[i].addEventListener('click', ()=>{
		//    		sessionStorage.removeItem(thisSku);
		//  //   		document.getElementsByClassName('itemRows')[i].innerHTML="";
		//  //   		this.getcartItems(sku, product);
		//    	})
		//    	}
		//    }

		//    totalPrice(thisProduct){
		//    	let totalPrice = thisProduct.price*thisProduct.quantity;
		//    	document.getElementById('totalPrice').innerHTML= totalPrice;
		//    	this.getcartItems();
		//    }

		// getcartItems(){
		// 	let totalPrice = 0;
		// 	let totalQny = 0;
		// 	for (let key in sessionStorage) {
		// 		let x = JSON.parse(sessionStorage[key]);
		// 		totalQny = totalQny + x.quantity;
		// 		document.getElementById('cartnum').innerHTML= totalQny;
		// 		totalPrice += x.price * x.quantity;
		// 		document.getElementById('price').innerHTML= totalPrice;
		// 		}
		// };

	}]);

	return productUtil;
}();

exports.default = productUtil;
;

},{}]},{},[3]);
