"use strict";
class BananaadeStand{
    constructor(bananas, ingallonsOfWater, incupsOfSugar, inemptyGlasses, inprice){
        this.bananas = bananas;
        this.gallonsOfWater = ingallonsOfWater;
        this.cupsOfSugar = incupsOfSugar;
        this.emptyGlasses = inemptyGlasses;
        this.price = inprice;
        this.income = 0.0;
        this.glassesOfBananaade = 0.0;
    }
    makeBananaade(){
        if(this.bananas >= 6 && this.gallonsOfWater > 0 && this.cupsOfSugar > 0 && this.emptyGlasses >= 8){
            this.bananas -= 6;
            this.gallonsOfWater--;
            this.cupsOfSugar--;
            this.emptyGlasses -= 8;
            this.glassesOfLemonade += 8;
            this.updateAllIngredients();
            return 8;
        }
        else{
            return 0;
        }
    }

    sellBananaade(){
        if(this.glassesOfLemonade > 0){
            this.glassesOfLemonade--;
            this.income += this.price;
            this.updateAllIngredients();
            return 1;
        }
        else{
            this.makeBananaade();
            if(this.glassesOfBananaade > 0){
                this.glassesOfBananaade--;
                this.income += this.price;
                this.updateAllIngredients();
                return 1;
            }
            else{
                return 0;
            }
        }
    }

    sellMoreBananaade(glasses){
        if(glasses > 8){
            glasses = 8;
        }
        if (this.glassesOfBananaade < glassesRequested){
            this.makeBananaade();
        }
        if(this.glassesOfBananaade >= glasses){
            this.glassesOfBananaade -= glasses;
            this.income += glasses * this.price;
        }
        if (this.glassesOfBananaade < glasses){
            this.income += this.price * this.glassesOfBananaade;
            let someGlasses = this.glassesOfBananaade;
            this.glassesOfBananaade = 0;
            this.updateAllIngredients();
            return someGlasses;
            
        }
        else{
            this.glassesOfBananaade -= glasses;
            this.income += this.price * glasses;
            this.updateAllIngredients();
            return glasses;
        }    
    }


    showIngredients(){
        let art = document.createElement("article");
        let table = document.createElement("table");
        let header = document.createElement("caption");
        let headInfo = document.createTextNode("Inventory");

        //row 1
        let rowOne = document.createElement("tr");
        let rowOneLemons = document.createElement("td");
        let rowOneLemonsTxt = document.createTextNode("Bananas");
        let rowOneValue = document.createElement("td");
        let rowOneValueTxt = document.createTextNode(this.bananas);

        //row 2
        let rowTwo = document.createElement("tr");
        let rowTwoWater = document.createElement("td");
        let rowTwoWaterTxt = document.createTextNode("Water");
        let rowTwoValue = document.createElement("td");
        let rowTwoValueTxt = document.createTextNode(this.gallonsOfWater);

        //row 3
        let rowThree = document.createElement("tr");
        let rowThreeSugar = document.createElement("td");
        let rowThreeSugarTxt = document.createTextNode("Sugar");
        let rowThreeValue = document.createElement("td");
        let rowThreeValueTxt = document.createTextNode(this.cupsOfSugar);

        //row 4
        let rowFour = document.createElement("tr");
        let rowFourGlasses = document.createElement("td");
        let rowFourGlassesTxt = document.createTextNode("Empty Glasses");
        let rowFourValue = document.createElement("td");
        let rowFourValueTxt = document.createTextNode(this.emptyGlasses);

        rowOne.appendChild(rowOneLemons);
        rowOneLemons.appendChild(rowOneLemonsTxt);
        rowOne.appendChild(rowOneValue);
        rowOneValue.appendChild(rowOneValueTxt);

        rowTwo.appendChild(rowTwoWater);
        rowTwoWater.appendChild(rowTwoWaterTxt);
        rowTwo.appendChild(rowTwoValue);
        rowTwoValue.appendChild(rowTwoValueTxt);

        rowThree.appendChild(rowThreeSugar);
        rowThreeSugar.appendChild(rowThreeSugarTxt);
        rowThree.appendChild(rowThreeValue);
        rowThreeValue.appendChild(rowThreeValueTxt);

        rowFour.appendChild(rowFourGlasses);
        rowFourGlasses.appendChild(rowFourGlassesTxt);
        rowFour.appendChild(rowFourValue);
        rowFourValue.appendChild(rowFourValueTxt);

        header.appendChild(headInfo);
        table.appendChild(header);
        table.appendChild(rowOne);
        table.appendChild(rowTwo);
        table.appendChild(rowThree);
        table.appendChild(rowFour);

        art.appendChild(table);
        document.body.appendChild(art);
    }

    showAdmin(){
        let adminArticle = document.createElement("article");
        let Header1 = document.createElement("h2");
        let Header1Txt = document.createTextNode("Admin");
        Header1.appendChild(Header1Txt);
        adminArticle.appendChild(Header1);

        let ul = document.createElement("ul");
        let li = document.createElement("li");
        let price = document.createTextNode("Price per Glass: $" + this.price.toFixed(2));
        li.appendChild(price);
        ul.appendChild(li);

        let li2 = document.createElement("li");
        let glasses = document.createTextNode("Glasses of Bananaade: " + this.glassesOfBananaade);
        li2.appendChild(glasses);
        ul.appendChild(li2);

        let li3 = document.createElement("li");
        let income = document.createTextNode("Income: $" + this.income.toFixed(2));
        li3.appendChild(income);
        ul.appendChild(li3);

        adminArticle.appendChild(ul);
        document.body.appendChild(adminArticle);

    }

    updateInventory(str, value, limit){
        let table = document.querySelector("table");
        let nodes = table.getElementsByTagName("td");
        for(let ele of nodes){
            if(ele.innerHTML.indexOf(str) >= 0){
                ele.nextSibling.innerHTML = value;
                if(value < limit){
                    ele.style.backgroundColor = "pink";
                    ele.nextSibling.backgroundColor = "pink";
                }
                else{
                    ele.style.backgroundColor = "white";
                    ele.nextSibling.backgroundColor = "white";
                }
            }
        }
    }

    updateAllIngredients(){
        this.updateInventory("Bananas", +this.bananas, 6);
        this.updateInventory("Water", +this.gallonsOfWater, 1);
        this.updateInventory("Sugar", +this.cupsOfSugar, 1);
        this.updateInventory("Empty Glasses", +this.emptyGlasses, 8);
    }

    updateAdmin() {
		let list = document.querySelector("ul");
		let nodes = list.getElementsByTagName("li");
		nodes[0].textContent = "Price per Glass: $" + ls.price.toFixed(2);
		nodes[1].textContent = "Glasses of Bananaade: " + this.glassesOfBananaade;
		nodes[2].textContent = "Income: $" + this.income.toFixed(2);
	}
}

let ls = new BananaadeStand(20,10,10,10,2.0);

function initAdd(){
    $('.hide_me').on('click', showInput).on('keyup', addValue);
}


function addValue(e){
    if(e.key == "Enter"){
        if(e.target.id == 'numBananas'){
            ls.bananas += +e.target.value;
            ls.updateInventory("Bananas", +ls.bananas, 6);
        }
        else if(e.target.id == 'numGallonsOfWater'){
            ls.gallonsOfWater += +e.target.value;
            ls.updateInventory("Water", +ls.gallonsOfWater, 1);
        }
        else if(e.target.id == 'numcupsOfSugar'){
            ls.cupsOfSugar += +e.target.value;
            ls.updateInventory("Sugar", +ls.cupsOfSugar, 1);
        }
        else if(e.target.id == 'numEmptyGlasses'){
            ls.emptyGlasses += +e.target.value;
            ls.updateInventory("Empty Glasses", +ls.emptyGlasses, 8);
        }
        e.target.value = '';
        $('.hide_me').hide();
        $('.hide_sell').hide();
        $('.hide_change_price').hide();
    }
}

function showInput(){
    $('.hide_me').slideUp(500);
	$('.hide_sell').slideUp(500);
	$('.hide_change_price').slideUp(500);
	$(this).slideDown(500, 
	    function (){
			this.focus();
		}
	);
    this.value = '';
}

function sellMore() {
    showSellMoreInput();
    let nodes = document.querySelectorAll('.hide_sell');
    for (let ele of nodes) {
         ele.addEventListener('keydown', stuffToSell, false);
    }
}

function stuffToSell(e) {
    if (e.key == "Enter") {
        if (e.target.id == 'amountToSell') {
            if((e.target.value <= 8) && (e.target.value > 0)){
                ls.sellMoreBananaade(+e.target.value);
				$('.hide_me').hide();
				$('.hide_sell').hide();
				$('.hide_change_price').hide();
            }
            else{
                document.getElementById('warning').textContent = "You must enter a number between 1 and 8";
				$('#warning').slideDown(500);
            }
        }
    }
}

function showSellMoreInput() {
	$('.hide_me').slideUp(500);
	$('.hide_sell').slideUp(500);
	$('.hide_change_price').slideUp(500);
    let ele = document.getElementById('amountToSell');
	$(ele).slideDown(500, 
		function (){
			this.focus();
		}
	);
	ele.value = '';
}

function pricePerGlassChange() {
    showPriceInput();
    let nodes = document.querySelectorAll('.hide_change_price');
    for (let ele of nodes) {
        ele.addEventListener('keydown', addPriceValue, false);
    }
}

function addPriceValue(e) {
    if (e.key == "Enter") {
        if (e.target.id == 'priceValueChange' && !isNaN(+e.target.value) && +e.target.value > 0){
            ls.price = +e.target.value;
            ls.updateAdmin();
			$('.hide_me').hide();
			$('.hide_sell').hide();
			$('.hide_change_price').hide();
        }
    }
}

function showPriceInput() {
    $('.hide_me').slideUp(500);
	$('.hide_sell').slideUp(500);
	$('.hide_change_price').slideUp(500);
    let nodes = document.getElementsByClassName('hide_change_price');
    for (let ele of nodes){
		$(ele).slideDown(500, 
			function (){
				this.focus();
			}
		);
        ele.value = '';
    }
}

function initButtons(){
    let buttons = $('button');
    buttons[0].addEventListener('click', () => {ls.makeBananaade();}, false);
	buttons[1].addEventListener('click', () => {ls.sellBananaade();}, false);
    buttons[2].addEventListener('click', (e) => {sellMore();}, false);
    buttons[3].addEventListener('click', pricePerGlassChange, false);
}

function initImageMouseOver(){
    $('.clickable').on('mouseover', (e) => {
        e.target.style.color = "purple";
        e.target.previousSibling.previousSibling.src = '../images/plus_dark.png';
    }).on('mouseout', function (e) {
        e.target.style.color = "blue";
        e.target.previousSibling.previousSibling.src = '../images/plus_light.png';
    });

    $('img').on('mouseover', (e) => {
        e.target.nextSibling.nextSibling.style.color = "purple";
        e.target.src = '../images/plus_dark.png';
    }).on('mouseout', function (e) {
        e.target.nextSibling.nextSibling.style.color = "blue";
        e.target.src = '../images/plus_light.png';
    });    
}

function init() {
    //The following code will execute when the JS file loads.
    ls.showAdmin();
    ls.showIngredients();
    $('.hide_me').hide();
	$('.hide_sell').hide();
	$('.hide_change_price').hide();
    initAdd();
    initButtons();
    initImageMouseOver();
}
$(function() {
	init();
});