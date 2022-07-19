const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

let editIdItem;

let result = JSON.parse(localStorage.getItem("result"))
  ? JSON.parse(localStorage.getItem("result"))
  : [];

if (result.length) appendToDom();

//   Set Local Storgae
function appendToLocalStorage() {
  localStorage.setItem("result", JSON.stringify(result));
}

// Get Time
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + (now.getDate() + 1) : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour =
    now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
  const minutes =
    now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes();
  const seconds =
    now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let monthTitle = now.getMonth();

  fullDay.textContent = `${date} ${months[monthTitle]}, ${year}`;

  hourEl.textContent = hour;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
  return `${hour}:${minutes}, ${date}.${month}.${year}`;
}

setInterval(() => {
  getTime();
}, 1000);

// Show todos any appendToDom

function appendToDom() {
  let result = JSON.parse(localStorage.getItem("result"));
  listGroupTodo.innerHTML = "";
  result.forEach((el, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setComplated(${i})" class="list-group-item d-flex justify-content-between ${`${
      el.isComplate == true ? "complated" : ""
    }`}">
        
    ${el.name}
    
    <div class="todo-icons">
      <span class="opacity-50 me-3">${el.time}</span>
      <img onclick = (editTodo(${i})) src="./img/edit.svg" alt="edit as input" width="25" height="25">
      <img onclick=(deleteTodo(${i})) src="./img/delete.svg" alt="edit as input" width="25" height="25">
    </div>
    </li>
    `;
  });
}

// // <li class="list-group-item d-flex justify-content-between ">
// <div class="todo-icons">
//   <span class="opacity-50 me-3">18.07.2022</span>
//   <img src="./img/edit.svg" alt="edit as input" width="25" height="25">
//   <img onclick() src="./img/delete.svg" alt="delete as input" width="25" height="25">
// </div>
// </li>

// Show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

// Get Result
formCreate.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const elInputVal = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (elInputVal.length) {
    result.push({
      name: elInputVal,
      time: `${getTime()}`,
      isComplate: false,
    });
    appendToLocalStorage();
    appendToDom();
  } else {
    showMessage("message-create", "plase enter some text");
  }
});

// delete todo
function deleteTodo(id) {
  const deleteTodos = result.filter((item, i) => {
    return i !== id;
  });
  result = deleteTodos;
  appendToLocalStorage();
  appendToDom();
}

// set complated
function setComplated(id) {
  const complateTodos = result.map((item, i) => {
    if (id == i) {
      return { ...item, isComplate: item.isComplate == true ? false : true };
    } else {
      return { ...item };
    }
  });

  result = complateTodos;

  appendToLocalStorage();
  appendToDom();
}

// edit form

formEdit.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const elInputVal = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (elInputVal.length) {
    result.splice(editIdItem, 1, {
      name: elInputVal,
      time: `${getTime()}`,
      isComplate: false,
    });
    appendToLocalStorage();
    appendToDom();
    close();
  } else {
    showMessage("message-edit", "plase enter some text");
  }
});

// edit todo
function editTodo(id) {
  open();
  editIdItem = id;
}

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);

document.addEventListener("keydown", (evt) => {
  if(evt.which == 27) {
    close()
  }

})

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
