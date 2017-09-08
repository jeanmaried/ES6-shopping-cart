export const carousel = (data) => {

	document.getElementById("here").innerHTML="";

		for (var i=0; i < data.products.length; i++){
				
			if (data.products[i].largeImage.length){
				let image = data.products[i].largeImage;
				let manu = data.products[i].manufacturer;
				let price = data.products[i].regularPrice;
				let description = data.products[i].name;
				let sku = data.products[i].sku;
				let div = $('<div></div>');	
   				div.html('<div>'+manu+'</div>'+'<div>'+description+'</div>'+
   					'<img src='+image+'>'+'<div>'+price+'</div>'+
   					'<button class="atc" data-sku="'+sku+'" data-price="'+price+'">'+"ADD TO CART"+'</div>');
				$("#here").append(div);
			}
			else {
				break;
			};
		};


};

