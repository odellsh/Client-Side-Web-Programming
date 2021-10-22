class BananaadeStand{
    constructor(bananas, gallonsOfWater, cupsOfSugar, emptyGlasses, price){
        this.bananas = bananas;
        this.gallonsOfWater = gallonsOfWater;
        this.cupsOfSugar = cupsOfSugar;
        this.emptyGlasses = emptyGlasses;
        this.price = price;
        this.income = 0.0;
        this.glassesOfBananaade = 0;
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

    showIngredients(id){
        let ingredients =
        "<table><caption>Ingredients</caption>" +
        "<tr><td>Bananas</td>" + "<td>" + this.bananas + "</td></tr>" +
        "<tr><td>Water</td>" + "<td>" + this.gallonsOfWater + "</td></tr>" +
        "<tr><td>Sugar</td>" + "<td>" + this.cupsOfSugar + "</td></tr>" +
        "<tr><td>Empty Glasses</td>" + "<td>" + this.emptyGlasses + "</td></tr></table>";
        id.innerHTML = ingredients;
    }

    showAdmin(id){
        let admin =
        "<h1>Admin</h1>" +
        "<ul><li id=\"price\">Price per Glass: $" + this.price.toFixed(2) + "</li>" +
        "<li id=\"glasses\">Glasses of Bananaade: " + this.glassesOfBananaade + "</li>" +
        "<li id=\"income\">Income: $" + this.income.toFixed(2) + "</li></ul>";
        id.innerHTML = admin;
    }
}

function test1() {
    //The following code will execute when the JS file loads.
    let ls = new BananaadeStand(15,3,4,20,1.5);
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