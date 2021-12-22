class BananaadeStand{
    constructor(inbananas, ingallonsOfWater, incupsOfSugar, inemptyGlasses, inprice){
        this.bananas = inbananas;
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
        }
        else{
            this.makeBananaade();
            if(this.glassesOfBananaade > 0){
                this.glassesOfBananaade--;
                this.income += this.price;
            }
        }
    }

    sellMoreBananaade(glasses){
        if(glasses > 8){
            glasses = 8;
        }
        if(this.glassesOfLemonade >= glasses){
            this.glassesOfBananaade -= glasses;
            this.income += glasses * this.price;
        }
        else{
            this.makeBananaade();
            if(this.glassesOfLemonade >= glasses){
                this.glassesOfBananaade -= glasses;
                this.income += glasses * this.price;
            }
            else{
                if(this.glassesOfBananaade > 0){
                    this.income += this.price * this.glassesOfBananaade;
                    this.glassesOfBananaade = 0;
                }
            }
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
        this.updateInventory("Bananas", +ls.bananas, 6);
        this.updateInventory("Water", +ls.gallonsOfWater, 1);
        this.updateInventory("Sugar", +ls.cupsOfSugar, 1);
        this.updateInventory("Empty Glasses", +ls.emptyGlasses, 8);
    }
}

let ls = new BananaadeStand(20,10,10,10,2.0);

function hideAll(){
    let nodes = document.getElementsByClassName('hide_me');
    for(let ele of nodes){
        ele.style.display='none';
    }
    let sellNodes = document.getElementsByClassName('hide_sell');
    for (let ele of sellNodes) {
        ele.style.display = 'none';
    }
}

function initAdd(){
    let nodes = document.querySelectorAll('.hide_me');
    for(let ele of nodes){
        ele.addEventListener('click', showInput, false);
        ele.addEventListener('keyup', addValue, false);
    }
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
        hideAll();
    }
}

function showInput(){
    hideAll();  //might need to delete
    this.style.display='inline';
    this.value='';
    this.focus();
}

function sellMoreGoods() {
    showSellingInput();
    let nodes = document.querySelectorAll('.hide_sell');
    for (let ele of nodes) {
         ele.addEventListener('keydown', addGoods, false);
    }
}

function addGoods(e) {
    if (e.key == "Enter") {
        if (e.target.id == 'numRequested') {
            if((e.target.value <= 8) && (e.target.value > 0)) {
                ls.sellMoreBananaade(+e.target.value);
                hideAll();
            }
        }
    }
}

function showSellingInput() {
    hideAll();
    let nodes = document.getElementsByClassName('hide_sell');
    for (let ele of nodes) {
        ele.style.display = 'inline';
        ele.value = '';
        ele.focus();
    }
}

function initButtons(){
    let buttons = document.querySelectorAll("button");
    buttons[0].addEventListener('click', () => {ls.makeBananaade();}, false);
	buttons[1].addEventListener('click', () => {ls.sellBananaade();}, false);
    buttons[2].addEventListener('click', (e) => {sellMoreGoods();}, false);
}

function initImageMouseOver(){
    let nodes = document.querySelectorAll('span');
    for (let ele of nodes) {
        ele.addEventListener('mouseover', (e) => {
            e.target.style.color='purple';
            e.target.previousSibling.previousSibling.src='../images/plus_dark.png';
        }, false);
        ele.addEventListener('mouseout', function(e) {
            e.target.previousSibling.previousSibling.src='../images/plus_light.png';
            e.target.style.color='blue';
        }, false);     
    }
    let nodess = document.querySelectorAll('span');
    for (let ele of nodess) {
        ele.addEventListener('onmouseover', (e) => {
            e.target.style.color='purple';
            e.target.previousSibling.previousSibling.src='../images';
        }, false);
        ele.addEventListener('onmouseout', function(e) {
            e.target.previousSibling.previousSibling.src='../images';
            e.target.style.color='blue';
        }, false);     
    }
  
}

function init() {
    //The following code will execute when the JS file loads.
    ls.showAdmin();
    ls.showIngredients();
    hideAll();
    initAdd();
    initButtons();
    initImageMouseOver();
}
init(); //Run the test