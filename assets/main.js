let tasks = JSON.parse(localStorage.getItem("items")) ?
    JSON.parse(localStorage.getItem("items")) : [{
        id: 1,
        item: "task One",
        createdDate: new Date(),
    }, ];
//
document.addEventListener("DOMContentLoaded", () => {
    readItems();
});
// Add new item
function addItems() {
    try {
        let task = document.getElementById("list-content").value;
        // getting the index for tasks
        let index = tasks.length + 1;
        // Adding a new item object
        tasks.push({
            id: index !== undefined ? index : 1,
            item: task,
            createdDate: new Date(),
        });
        // Saving new data to the localstorage
        localStorage.setItem("items", JSON.stringify(tasks));
    } catch (e) {
        console.log(e.message);
    }
    readItems();
}
// Loading the data to html
function readItems() {
    let contents = document.querySelector("#item-wrapper");
    contents.innerHTML = "";
    tasks.forEach((item, index) => {
        contents.innerHTML += `<button class="btn btn-grad2">
        <li class=" list-unstyled" id="${index}">
        <input type="checkbox" onclick="itemCompleted(${index})" class="chkItem form-check-input">
        <span class="list-content">${item.item}</span>
        <i class="bi bi-trash d-flex justify-content-end list-icon delete" onclick="removeItem(${index})" id="${index}"></i>
        </li></button>
        `;
    });
}
// Add item button 
const btnAddItem = document.querySelector("#addItem");
btnAddItem.addEventListener("click", addItems);
// Checked checkbox crossout
function itemCompleted(id) {
    if (document.querySelectorAll(".chkItem")[id].checked) {
        document.querySelectorAll(".list-content")[id].classList.add("Line");
        localStorage.setItem("items", JSON.stringify(tasks));

    } else {
        document.querySelectorAll(".list-content")[id].classList.remove("Line");
        localStorage.setItem("items", JSON.stringify(tasks));
    }
}
// Sorting the data
document.querySelector("#sorting").addEventListener("click", () => {
    tasks.sort((x, y) => {
        return x.item < y.item ? -1 : 0;
    });
    // Saving the data to the localstorage
    localStorage.setItem("items", JSON.stringify(tasks));
    readItems();
});

function removeItem(id) {
    if (id > -1) {
        tasks.splice(id, 1);
        // Appling the delete to local
        localStorage.setItem("items", JSON.stringify(tasks));
    }
    readItems();
}