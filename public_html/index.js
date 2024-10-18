var formData = new FormData();
var data = new Array();
const APP = {
    init() {
        APP.addListeners();
    },
    
    addListeners() {
        //Listen for add to cart buttons for each item sold
        let mabelCart = document.getElementById("mabelCart");
        mabelCart.addEventListener("submit", APP.cartClickHandler);

        let razCart = document.getElementById("razorkinCart");
        razCart.addEventListener("submit", APP.cartClickHandler);
    },
    
    checkoutClickHandler(event) {        
        //Export formData to CSV
        APP.exportForm();
        
        
        //let a = document.createElement('a');
        //a.href = "checkout.html";
        //a.click();

    },

    cartClickHandler(event) {
        event.preventDefault();
        
        //Cache card data in arrays
        APP.cacheData();
        
        //Build the rows
        APP.buildRows();
    },

    cacheData() {
        
        let prices = [];
        let quantities = [];
        let names = [];
        let pictures = [];

        pictures = document.getElementsByClassName("pictures");
        prices = document.getElementsByClassName("price");
        quantities = document.getElementsByClassName("quantity");
        names = document.getElementsByClassName("names");

        //console.log(formData);
        //Delete old form
        for( const [key, value] of formData ) {
            formData.delete("toBuyName");
            formData.delete("toBuyPrice");
            formData.delete("toBuyQuantity");
            formData.delete("toBuyPicture");

        }
        
        //put the arrays into a form
        for (let i = 0; i < names.length; i++) {
            formData.append("toBuyName", names[i].firstChild.nodeValue.trim());
            formData.append("toBuyPrice", prices[i].firstChild.nodeValue);
            formData.append("toBuyQuantity", quantities[i].options[quantities[i].selectedIndex].text);
            formData.append("toBuyPicture", pictures[i].src);   
            
        }
        
        //for (const [key, value] of formData) {
        //    console.log(key + ": " + value);
        //}
         
        data[0] = (Array.from(formData.values()));
        //console.table(data);
    },
        
    buildRows() {
        const tbody = document.getElementById("tbody");
        
        tbody.innerHTML = "";
        
        
        //create multiple rows
        const tr = new Array();
        for(let i = 0; i < formData.getAll("toBuyName").length+3; i++) {
            tr[i] = document.createElement("tr");
            tr[i].innnerHTML = "";
            tr[i].setAttribute("rowNum", i);
        }
        
        let i = 0;
        let col = 0;
        let allPrices = new Array();
        let allQuantities = new Array();
        let quantity = 0;
        let price = 0;
        let subtotal = 0;
        let tax = .08;
        let total = 0;
        
        //add table data with picture as the last col
        for(const [key, value] of formData) {
            if(key === "toBuyPicture") {
                tr[i].innerHTML += '<td style="border-bottom: 1px solid; vertical-align: middle;" colNum="' + col + '" class="' + key + '"><img src="' + value +
                        '" alt="Image of Card to Buy" width="75" height="150"></td>';
                col = 0;
                i++;
                if(i >= formData.getAll("toBuyName").length) {
                    break;
                }
            }
            else {
                tr[i].innerHTML += '<td style="border-bottom: 1px solid; vertical-align: middle;" colNum="' + col +
                        '">' + value + '</td>';
                //console.log(col);
                col++;
            }
        }
        
        //Get Prices and Quantities arrays
        allPrices = formData.getAll("toBuyPrice");
        allQuantities = formData.getAll("toBuyQuantity");
        
        //console.log(allPrices[0]);
        
        //Find subtotal
        for(let i = 0; i < formData.getAll("toBuyName").length; i++) {
            quantity = parseInt(allQuantities[i]);
            price = parseFloat( allPrices[i].substring(1) );
            subtotal = subtotal + (price * quantity);

            subtotal = Math.round(subtotal * 100) / 100; //round to 2 digits
            
            //console.log(quantity);
            //console.log(price);
            //console.log(subtotal);
        }
        
        //Build Subtotal Row
        tr[formData.getAll("toBuyName").length].innerHTML += 
                '<td colspan="4" style="vertical-align: middle;text-align: right;">Subtotal: $' +
                subtotal + '</td>';
        
        //Build Tax Row
        tr[formData.getAll("toBuyName").length+1].innerHTML += 
                '<td colspan="4" style="border-bottom: 1px solid;vertical-align: middle;;text-align: right;">Tax: ' +
                (tax * 100) + '%</td>';
        
        //Find Total
        total = subtotal + (subtotal * tax);
        total = Math.round(total * 100) / 100; 
        
        //Build Total Row
        tr[formData.getAll("toBuyName").length+2].innerHTML += 
                '<td colspan="4" style="border-bottom: 1px solid;vertical-align: middle;;text-align: right;">Total: $' +
                total + '</td>';
        
        //Append all Rows to table in HTML doc
        for(let i = 0; i < formData.getAll("toBuyName").length+3; i++) {
            tbody.append(tr[i]);
        }
    },
    
    exportForm() {      
       //Create string for data
       let str = '"';

       let col = 0; 

       for(let value of formData.values()){
           if(col >= 3) {
               str += value.concat('"\n"');
               col = 0;
           }
           else {
               str += value.concat('","');
               col++;
           }
       }

       //console.log(str);

       //Create filename
       let filename = 'dataexport.csv';

       let file = new File([str], filename, {type: 'text/csv'});

       let a = document.createElement('a');
       a.href = URL.createObjectURL(file);
       a.download = filename;
       a.href = "checkout.html";
       a.target = "_blank";
       a.onclick = "window.open('checkout.html');";
       a.click();

   } 
    
   
};

document.addEventListener('DOMContentLoaded', APP.init);

//export {formData};

//Listen for the checkout button to be clicked
let checkout = document.getElementById("checkout");
checkout.addEventListener("click", APP.checkoutClickHandler);



//<!--  <a href="checkout.html">CHECKOUT</a> -->
/*
 * function parseToArray(csvString){
  //Split the array into rows, then split these rows into cells
  return csvString.split('\r\n').map(row => {
    return row.split(',')
  })
}
const csvAsArray = parseToArray(csvAsString))
console.log(csvAsArray)
 * function parseToArray(csvString){
  //Split the array into rows, then split these rows into cells
  return csvString.split('\r\n').map(row => {
    return row.split(',')
  })
}
const csvAsArray = parseToArray(csvAsString))
console.log(csvAsArray)
 */