export default class productUtil{
	constructor (){
		
	};
	
	addToCart (sku, price){

		let product={price, quantity:1};

		if (sessionStorage.getItem(sku) == undefined){
			sessionStorage.setItem(sku,JSON.stringify(product));
		}

		else {
			let oldValue=JSON.parse(sessionStorage.getItem(sku)); 
			let newValue = oldValue.quantity + 1;
			product.quantity = newValue;
			sessionStorage.setItem(sku,JSON.stringify(product));
		}
		document.getElementById('listItems').innerHTML="";
		this.rebuildCart();
		this.getcartItems();

	};

	rebuildCart(){
		for(let key in sessionStorage){
			let sku = key;
			let product = JSON.parse(sessionStorage[key]);
			this.cartList(sku,product);
			this.getcartItems();
		}
	};

	cartList(sku, product){
		let cartItem = $('<div id="itemRows"></div>');
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
		this.updateCart(sku, product);
		this.removeCart(sku, product);		
	}

    updateCart(sku, product){
    	let update_value = document.getElementsByClassName('item_input');
    	let update = document.getElementsByClassName('update');
    	for (var i = 0; i < update.length && item_input.length; i++){
    	update.addEventListener('click', () => {
    		if (update_value.value == product.quantity){
    		}
    		else{
    			let oldValue=JSON.parse(sessionStorage.getItem(sku)); 
				let totalValue = (update_value.value - oldValue.quantity)+oldValue.quantity;
				product.quantity = totalValue;
				sessionStorage.setItem(sku,JSON.stringify(product));
				this.totalPrice(sku, product);
    		}
    	});
    };

    removeCart(sku, product){
    	let remove = document.getElementsByClassName('remove')
		for (var i = 0; i < remove.length; i++){
			console.log(remove[i]);
	   	let thisSku = remove[i].getAttribute("data-sku");
    	remove[i].addEventListener('click', ()=>{
    		sessionStorage.removeItem(thisSku);
  //   		document.getElementsByClassName('itemRows')[i].innerHTML="";
  //   		this.getcartItems(sku, product);
    	})
    	}
    }

    totalPrice(sku,product){
    	let totalPrice = product.price*product.quantity;
    	document.getElementById('totalPrice').innerHTML= totalPrice;
    	this.getcartItems();
    }

	getcartItems(){
		let totalPrice = 0;
		let totalQny = 0;
		for (let key in sessionStorage) {
			let x = JSON.parse(sessionStorage[key]);
			totalQny = totalQny + x.quantity;
			document.getElementById('cartnum').innerHTML= totalQny;
			totalPrice += x.price * x.quantity;
			document.getElementById('price').innerHTML= totalPrice;
			}
	};

};



	
