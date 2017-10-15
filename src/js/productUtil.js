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
		if (sessionStorage){

			for(let key in sessionStorage){
				if(sessionStorage.hasOwnProperty(key)){
				let cartItem = document.createElement("div");
				cartItem.setAttribute("id","itemRows");
				product = JSON.parse(sessionStorage[key]);
				let totalPrice = product.price*product.quantity;
			
				cartItem.innerHTML=(
					'<div class="padding-bottom-small">'+
						'<div class="small">'+'SKU:'+'</div>'+
						'<div>'+key+'</div>'+
					'</div>'+
					'<div class="padding-bottom-small">'+
						'<div class="small">'+'QUANTITY:'+'</div>'+
						'<input class="cart_input_size" id="'+key+'" type="number" value="'+product.quantity+'">'+
					'</div>'+
					'<div class="padding-bottom-small">'+
						'<div class="small">'+'UNIT PRICE:'+'</div>'+
						'<div>'+'$'+product.price+'</div>'+
					'</div>'+
					'<div class="padding-bottom-small">'+
						'<div class="small">'+'TOTAL:'+'</div>'+
						'<div>'+'$'+totalPrice.toFixed(2)+'</div>'+
					'</div>'+
					'<div class="flex">'+
						'<button class="update" type="button" data-sku="'+key+'">'+'UPDATE'+'</button>'+
						'<button class="remove" type="button" data-sku="'+key+'">'+'REMOVE'+'</button>'+
					'</div>');
				document.getElementById('listItems').appendChild(cartItem);
				}
			}
			this.updateButton();
			this.removeButton();
			this.getcartItems();	
		}
	}

    updateButton(){
    	let update = document.getElementsByClassName('update');
    	for (let i = 0; i < update.length; i++){
    		update[i].addEventListener('click', (e) => {
    			let goGrabInput = e.target;
    			this.getCartInput(goGrabInput);
    		})
    	}
    }

    getCartInput(goGrabInput){
    	let thisSku = goGrabInput.getAttribute("data-sku");
    	let oldQuantity = JSON.parse(sessionStorage.getItem(thisSku));
    	let update_value = document.getElementById(thisSku);
    		if (update_value.value !== oldQuantity.quantity){
    			oldQuantity.quantity = parseInt(update_value.value);
    			sessionStorage.setItem(thisSku,JSON.stringify(oldQuantity));
    		}
    		this.cartBuilder();
    }

    removeButton(){
    	let remove = document.getElementsByClassName('remove')
		for (var i = 0; i < remove.length; i++){
		   	let thisSku = remove[i].getAttribute("data-sku");
	    	remove[i].addEventListener('click', ()=>{
	    		sessionStorage.removeItem(thisSku);
	    		this.cartBuilder();
	    	})
    	}
    }

	getcartItems(){
		let totalPrice = 0;
		let totalQny = 0;
		for (let key in sessionStorage) {
			if(sessionStorage.hasOwnProperty(key)){
			let x = JSON.parse(sessionStorage.getItem([key]));
			totalQny += x.quantity;
			totalPrice += x.price * x.quantity;
			}
		}
		document.getElementById('price').innerHTML= '$' + totalPrice.toFixed(2);
		document.getElementById('cartnum').innerHTML= totalQny;
	};
};

	
