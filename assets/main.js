let lists = JSON.parse(localStorage.getItem("items")) ?
    JSON.parse(localStorage.getItem("items")) : [{
        id: 1,
        item: "TV Stand",
        createdDate: new Date(),
    }, ];
//
document.addEventListener("DOMContentLoaded", () => {
    readItems();
});
// Add item
function addItems() {
    try {
        let list = document.getElementById("list-content").value;
        // Fetch the last index of id
        let index = lists.length + 1;
        // Add a new item
        lists.push({
            id: index !== undefined ? index : 1,
            item: list,
            createdDate: new Date(),
        });
        // Save new data to the localstorage
        localStorage.setItem("items", JSON.stringify(lists));
    } catch (e) {
        console.log(e.message);
    }
    readItems();
}
// Load data
function readItems() {
    let contents = document.querySelector("#item-wrapper");
    contents.innerHTML = "";
    lists.forEach((item, index) => {
        contents.innerHTML += `
        <li class="bg-gradient list-unstyled" id="${index}">
        <input type="checkbox" onclick="itemCompleted(${index})" class="chkItem form-check-input">
        <span class="list-content">${item.item}</span>
        <i class="bi bi-trash d-flex justify-content-end list-icon" onclick="removeItem(${index})" id="${index}"></i>
        </li>
        `;
    });
}
// btnAddItem
const btnAddItem = document.querySelector("#addItem");
btnAddItem.addEventListener("click", addItems);
// Checked
function itemCompleted(id) {
    if (document.querySelectorAll(".chkItem")[id].checked) {
        document.querySelectorAll(".list-content")[id].classList.add("addLine");
    } else {
        document.querySelectorAll(".list-content")[id].classList.remove("addLine");
    }
}
// Sorting
document.querySelector("#sorting").addEventListener("click", () => {
    lists.sort((a, b) => {
        return a.item < b.item ? -1 : 0;
    });
    // Save new data to the localstorage
    localStorage.setItem("items", JSON.stringify(lists));
    readItems();
});

function removeItem(id) {
    if (id > -1) {
        lists.splice(id, 1);
        // Apply the change
        localStorage.setItem("items", JSON.stringify(lists));
    }
    readItems();
}