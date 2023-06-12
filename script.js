import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL : "https://playground-825e2-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputEl = document.getElementById("input-el");
const btnEl = document.getElementById("btn-el");
const shoppingListEl = document.getElementById("shopping-list");

onValue (shoppingListInDb, function(snapshot){
    if(snapshot.exists()){
        const itemsArray = Object.entries(snapshot.val());
        clearShoppingListEl();
        for(let i = 0; i < itemsArray.length ; i++){
            addItemToShoppingListE(itemsArray[i]);
        }
    }
     else {
        shoppingListEl.innerHTML = "No items here... yet";
    }
})

btnEl.addEventListener("click", function(){
    let inputValue = inputEl.value;
    push(shoppingListInDb, inputValue);
    clearInputEl();
})

function clearInputEl() {
    inputEl.value = "";
}

function addItemToShoppingListE(item){
    let itemId = item[0];
    let itemValue = item[1];
    const newEl = document.createElement("li");
    newEl.textContent = itemValue ;
    newEl.addEventListener("dblclick", function(){
        let exactLocationOfId = ref(database, `shoppingList/${ itemId }`);
        remove(exactLocationOfId);
    })
    shoppingListEl.append(newEl);
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}