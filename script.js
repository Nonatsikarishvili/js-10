"use strict";

let divWrapper = document.querySelector(".wrapper-post");
let overlay = document.querySelector(".overlay");
let content = document.querySelector(".content");
let closeIcon = document.querySelector(".close");
let addButton = document.querySelector(".add-post");
let overlayContent = document.querySelector(".overlay-content");
let form = document.querySelector(".form");
let input = document.getElementById("inputTitle");

function ajaxPost(url, callback) {
  let request = new XMLHttpRequest();
  request.open("get", url);

  request.addEventListener("load", function () {
    let response = JSON.parse(request.responseText);
    callback(response);
    // console.log(response);
  });
  request.send();
}
ajaxPost("https://jsonplaceholder.typicode.com/posts", function (data) {
  data.forEach((element) => {
    Divebi(element);
  });
});
function Divebi(item) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("post");
  mainDiv.setAttribute("data-id", `${item.id}`);

  let h4Element = document.createElement("h4");
  h4Element.innerText = `${item.id}`;

  let h2Element = document.createElement("h2");
  h2Element.innerText = `${item.title}`;

  let deletebutton = document.createElement("button");
  deletebutton.innerText = "Delete";
  deletebutton.setAttribute("btn-id", `${item.id}`);
  deletebutton.style.marginTop = "10px";

  mainDiv.appendChild(h4Element);
  mainDiv.appendChild(h2Element);
  mainDiv.appendChild(deletebutton);

  divWrapper.appendChild(mainDiv);

  deletebutton.addEventListener("click", function (event) {
    event.stopPropagation();

    let deleteButtonId = event.target.getAttribute("btn-id");
    // console.log(deleteButtonId);

    let deleteUrl = `https://jsonplaceholder.typicode.com/posts/${deleteButtonId}`;

    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => mainDiv.remove());
  });
  mainDiv.addEventListener("click", function (event) {
    overlay.classList.add("overlayactive");
    let divID = event.currentTarget.getAttribute("data-id");

    let newurl = `https://jsonplaceholder.typicode.com/posts/${divID}`;
    console.log(newurl);
    ajaxPost(newurl, function (daemateba) {
      addContent(daemateba);
    });
  });
}

// daxurva
closeIcon.addEventListener("click", function () {
  overlay.classList.remove("overlayactive");
  content.innerHTML = " ";
});
function addContent(x) {
  let pElement = document.createElement("p");
  pElement.innerText = `${x.body}`;
  content.appendChild(pElement);
}

// damateba
addButton.addEventListener("click", function () {
  overlayContent.classList.add("activeAddOverlay");
});
form.addEventListener("submit", function (x) {
  x.preventDefault();
  let formData = {
    title: x.target[0].value,
  };
  // console.log(formData);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((mosuliInfo) => {
      Divebi(mosuliInfo);
      overlayContent.classList.remove("activeAddOverlay");
      console.log(mosuliInfo);
      input.value = " ";
    });
});
