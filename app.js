import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

const appSettings = {
    databaseURL : "https://quick-list-b7790-default-rtdb.asia-southeast1.firebasedatabase.app",
}

const InputFiledEl = document.getElementById('input-item');
const addBtn = document.getElementById('add-btn');
const app = initializeApp(appSettings);
const database = getDatabase(app);
const listItemInDB = ref(database, "item");
const itemList = document.getElementById('item-list');

onValue(listItemInDB, (snapshot) => {
    if(snapshot.exists()){
        let snapshotVal = snapshot.val();
        let itemsList = Object.entries(snapshotVal);
        clearItemList();
        itemsList.forEach(element => {
            appendItem2List(element);
        }); 
    } 
    else{
        clearItemList();
        let text = document.createElement('p');
        let image = document.createElement('img');
        text.textContent = "No Item to show ... "
        image.src = "assets/empty-list.gif"
        image.height = "100";
        image.width = "100";
        itemList.append(text);
        itemList.append(image);
    }
});


addBtn.addEventListener('click', () => {
    let inputText = InputFiledEl.value;
    console.log(inputText);
    if(inputText !== ""){
        push(listItemInDB, inputText);
        // appendItem2List(inputText);
        clearInputFiledEl();
    }
});

function clearInputFiledEl(){
    InputFiledEl.value = "";
}

function appendItem2List(item){ 
    let newEl = document.createElement('li');
    let itemValue = item[1];
    let itemID = item[0];
    newEl.textContent = itemValue;
    itemList.append(newEl);
    newEl.addEventListener('dblclick', () => {
        let getLocationOnDB = ref(database, `item/${itemID}`);
        remove(getLocationOnDB);
    });

}

function clearItemList(){
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}