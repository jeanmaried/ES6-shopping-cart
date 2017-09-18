export default class productUtil{
	constructor (){
	}
	
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
		this.cartBuilder(sku, product);
	}


	cartBuilder(sku, product){
		document.getElementById('listItems').innerHTML="";
		for(let key in sessionStorage){
			let cartItem = $('<div id="itemRows"></div>');
			sku = key;
			product = JSON.parse(sessionStorage[key]);
		
			cartItem.html(
				'<div>'+'SKU'+'</div>'+
				'<div>'+sku+'</div>'+
				'<div>'+'QUANTITY'+'</div>'+
				'<input id="'+sku+'" type="number" value="'+product.quantity+'">'+
				'<div>'+'UNIT PRICE'+'</div>'+
				'<div>'+product.price+'</div>'+
				'<div>'+'TOTAL'+'</div>'+
				'<div>'+product.price*product.quantity+'</div>'+
				'<button class="update" type="button" data-sku="'+sku+'">'+'UPDATE'+'</button>'+
				'<button class="remove" type="button" data-sku="'+sku+'">'+'REMOVE'+'</button>');
			$('#listItems').append(cartItem);
		}
		this.updateButton();
		this.removeButton();
		this.getcartItems();	
	}

    updateButton(){
    	let update = document.getElementsByClassName('update');
    	for (let i = 0; i < update.length; i++){
    		update[i].addEventListener('click', (e) => {
    			let goGrabInput = e.target;
    			this.getCartInput(goGrabInput);
    		})
    	}
    } // this section allows you to see what update button has been pressed and passes the values on to
      // getCartInput

    getCartInput(goGrabInput){
    	let thisSku = goGrabInput.getAttribute("data-sku");
    	let oldQuantity = JSON.parse(sessionStorage.getItem(thisSku));
    	let update_value = document.getElementById(thisSku);
    		if (update_value.value == oldQuantity.quantity){
    		}
    		else{
    			console.log(typeof update_value.value);
    			oldQuantity.quantity = parseInt(update_value.value);
    			console.log(oldQuantity);
    			sessionStorage.setItem(thisSku,JSON.stringify(oldQuantity));
    		}
    		this.cartBuilder();
    } //this method looks into the input to see if the value has changed. If no, do nothing. If yes, update
      //session storage.

    removeButton(){
    	let remove = document.getElementsByClassName('remove')
		for (var i = 0; i < remove.length; i++){
		   	let thisSku = remove[i].getAttribute("data-sku");
	    	remove[i].addEventListener('click', ()=>{
	    		sessionStorage.removeItem(thisSku);
	    		this.cartBuilder();
	    	})
    	}
    } // this method removes the cart item from session storage and fires the cart builder
      // which them rebuilds cart to erase said item

	getcartItems(){
		let totalPrice = 0;
		let totalQny = 0;
		for (let key in sessionStorage) {
			let x = JSON.parse(sessionStorage.getItem([key]));
			// console.log(x);
			totalQny += x.quantity;
			totalPrice += x.price * x.quantity;
			}
			document.getElementById('price').innerHTML= totalPrice;
			document.getElementById('cartnum').innerHTML= totalQny;
	};

};

//Need to get the total quantity working as it bugs when removing an item and then writes out the last
// quantity next to the sum of all the other quantities

// for some reason i getcartInput is changing the quantity to a string but not letting it change back?
// or i guess i can't figure out how to set sessionstorage as a number

	
