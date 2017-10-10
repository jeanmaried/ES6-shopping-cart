export const carousel = (data) => {

	document.getElementById("here").innerHTML="";

		for (var i=0; i < data.products.length; i++){
				
			if (data.products[i].largeImage.length){
				let image = data.products[i].largeImage;
				let price = data.products[i].regularPrice;
				let description = data.products[i].name;
				let sku = data.products[i].sku;
				let div = document.createElement('div');
				div.classList.add("text-align", "padding-bottom");	
   				div.innerHTML=('<div>'+description+'</div>'+
   					'<img src='+image+'>'+'<div>'+'$'+price+'</div>'+'<div>'+'SKU: '+sku+'</div>'+
   					'<button class="atc" data-sku="'+sku+'" data-price="'+price+'">'+"ADD TO CART"+'</div>');
				document.getElementById('here').appendChild(div);
			}
			else {
				break;
			};
		};


};

