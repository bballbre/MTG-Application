import {message, num, multiplyNumbers} from './test.js';

const APP = {
    init() {
        //data = new Array();
        //formData = new FormData();
        
        //APP.exportForm();
        //APP.buildCheckout();
        
        const cart = document.getElementById("checkoutCart");
        cart.innerHTML = num;
        
        APP.addListeners();
    },
    
    addListeners() {
        //Listen for add to cart buttons for each item sold
        
    },
    
    buildCheckout() {
        const cart = document.getElementById("checkoutCart");
        
        cart.innerHTML = "";
        for( let value of formData.values()) {
            cart.innerHTML = " " + value + " ";
        }
        
        //create multiple images
        /*const img = new Array();
        for(let i = 0; i < formData.getAll("toBuyName").length; i++) {
            img[i] = document.createElement("div");
            img[i].innnerHTML = "";
            img[i].setAttribute("rowNum", i);
        }
        
        let i = 0;
        let col = 0;
        
        //add checkout properties
        for(const [key, value] of formData) {
            if(key === "toBuyPicture") {
                img[i].innerHTML += '<div colNum="' + col + '" class="' + key + 'Checkout"><img src="' + value +
                        '" alt="Image of Card to Buy" width="75" height="150"></div>';
                col = 0;
                i++;
                if(i >= formData.getAll("toBuyName").length) {
                    break;
                }
            }
            else {
                img[i].innerHTML += '<div colNum="' + col +
                        '" class="' + key + 'Checkout">' + value + '</div>';
                //console.log(col);
                col++;
            }
            
        }
        for(let i = 0; i < formData.getAll("toBuyName").length; i++) {
            cart.append(img[i]);
        }*/
    }
    
   
};

document.addEventListener('DOMContentLoaded', APP.init);

