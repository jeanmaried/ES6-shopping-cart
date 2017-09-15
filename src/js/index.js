import request from "./bestbuy";
import {carousel} from "./carousel";
import productUtil from "./productUtil";

export default class App{
	constructor(){
		this.cat_clicked = "((categoryPath.id=abcat0502000))";
		this.initBBCall();
		this.catListeners();
		let Cartinit = new productUtil;
		Cartinit.cartBuilder(); 
	}

	
	initBBCall () {
		request({url: "https://api.bestbuy.com/v1/products"+this.cat_clicked ,api : "8ccddf4rtjz5k5btqam84qak"})
		.then(data => {
			carousel(data);
			this.atcListeners();
		})
		.catch(error => {
			console.log("warning Christopher Robins... Error");
			console.log(error);
		});
	};

	
	atcListeners () {
		let test = document.getElementsByClassName('atc');
		for (var i = 0; i < test.length; i++){
			test[i].addEventListener("click", (e) =>  {
    			let sku = e.target.getAttribute("data-sku");
    			let price = e.target.getAttribute("data-price");
    			new productUtil().addToCart(sku,price);
			})
		}
    };

    catListeners () {
    	let test_two = document.getElementsByClassName('categories');
    	for (var i = 0; i < test_two.length; i++){
    	test_two[i].addEventListener('click', (e) => {
    		this.cat_clicked = e.target.value;
    		this.initBBCall();
    	})


    	}

    };
	
};

let x = new App;












