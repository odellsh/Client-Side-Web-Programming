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
            this.glassesOfLemonade += 8
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
        let headInfo = document.createTextNode("Ingredients");

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
        let Header1 = document.createElement("h1");
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
}

function test1() {
    //The following code will execute when the JS file loads.
    let ls = new BananaadeStand(69,5,100,100,2.5);
    ls.makeBananaade();
    ls.sellBananaade();
    ls.sellMoreBananaade(8);
    //Call showAdmin and showIngredients to add the HTML to the page.
    let article1 = document.getElementById('admin');
    ls.showAdmin(article1);

    let article2 = document.getElementById('ingredients');
    ls.showIngredients(article2);
}
test1(); //Run the test