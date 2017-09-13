export default class productUtil{
	constructor (){
		
	};
	
	addToCart (sku, price){

		let product={price, quantity:1};

		if (sessionStorage.getItem(sku) == undefined){
			sessionStorage.setItem(sku, JSON.stringify(product));
		}

		else {
			let oldValue=JSON.parse(sessionStorage.getItem(sku, product)); 
			let newValue = oldValue.quantity + 1;
			product.quantity = newValue;
			sessionStorage.setItem(sku,JSON.stringify(product));
		}
		document.getElementById('listItems').innerHTML="";
		this.cartList(sku, product);
	};


	cartList(sku, product){

		for(let key in sessionStorage){
		
			let cartItem = $('<div id="itemRows"></div>');

			sku = key;
			product = JSON.parse(sessionStorage[key]);
		
			cartItem.html(
				'<div>'+'SKU'+'</div>'+
				'<div>'+sku+'</div>'+
				'<div>'+'QUANTITY'+'</div>'+
				'<input class="item_input" type="number" value="'+product.quantity+'">'+
				'<div>'+'TOTAL'+'</div>'+
				'<div id="totalPrice">'+product.price*product.quantity+'</div>'+
				'<button class="update" type="button" data-sku="'+sku+'">'+'UPDATE'+'</button>'+
				'<button class="remove" type="button" data-sku="'+sku+'">'+'REMOVE'+'</button>');
			$('#listItems').append(cartItem);

		}
		this.updateCart();
		// this.removeCart(sku, product);		
	}

    getCartInput(goGrabInput){
    	let thisSku = goGrabInput.getAttribute("data-sku");
    	let oldQuantity = JSON.parse(sessionStorage.getItem(thisSku));
    	let update_value = document.getElementsByClassName('item_input');
    	for (var i = 0; i < update_value.length; i++){
    		if (update_value[i].value == oldQuantity.quantity){
    			console.log(oldQuantity.quantity);
    		}
    		else{
    			oldQuantity.quantity = update_value[i].value;
    			sessionStorage.setItem(thisSku,JSON.stringify(oldQuantity));
    		}
    	};
    } //here we look into the input to see if the value has changed. If no, do nothing. If yes, update
      //session storage.

    updateCart(){
    	let update = document.getElementsByClassName('update');
    	for (var i = 0; i < update.length; i++){
    		update[i].addEventListener('click', (e) => {
    			let goGrabInput = e.target;
    			this.getCartInput(goGrabInput);
    		})
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

};



	
