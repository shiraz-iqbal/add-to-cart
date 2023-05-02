import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js"

import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js'





const appSettings = {
    databaseURL: "https://playground-45cca-default-rtdb.europe-west1.firebasedatabase.app"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppinglist = ref(database, 'shoppinglist')

console.log(app)

const nameInput = document.getElementById("input");
const nameSubmit = document.getElementById("button");
const shoppingListElement = document.getElementById('shopping-list')

onValue(shoppinglist, function (snapshot) {

    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val())



        clearList()

        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i]

            addToList(currentItem)
        }
    }
    else {
        shoppingListElement.innerHTML = "No items here....yet"
    }



})

nameSubmit.addEventListener('click', function () {
    let inputValue = nameInput.value

    push(shoppinglist, inputValue)
    clearInputField()



    console.log(inputValue)
})

function clearList() {
    shoppingListElement.innerHTML = ""
}

function clearInputField() {
    nameInput.value = "";
}

function addToList(item) {
    // shoppingListElement.innerHTML += `<li>${itemValue}</li>`;

    let currentItemID = item[0]
    let currentItemValue = item[1]

    let newElement = document.createElement('li')

    newElement.textContent = currentItemValue

    newElement.addEventListener("dblclick", function () {
        let abc = ref(database, `shoppinglist/${currentItemID}`)
        remove(abc)
    })

    shoppingListElement.append(newElement)

}

