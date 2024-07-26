const url = "./taskList.json";
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`error -> ${error}`);
  }
}
const taskLists = await fetchData(url);
const scheduleList = document.getElementById("scheduleList");
function getIndex(arr, nameEl) {
  const index = arr.findIndex((item) => item.name == nameEl.textContent);
  return index;
}
function displaySchedule(
  name,
  timeEvent,
  maxQuantityPuple,
  currentQuantityPuple
) {
  const scheduleItem = document.createElement("li");
  scheduleItem.classList.add("list-group-item");

  const scheduleName = document.createElement("h4");
  scheduleName.classList.add("mb-4", "name");
  scheduleName.textContent = name;

  const scheduleTimeEvent = document.createElement("h4");
  scheduleTimeEvent.classList.add("mb-4");
  scheduleTimeEvent.textContent = `Начало занятий ${timeEvent}`;

  const scheduleMaxQuantityPuple = document.createElement("h4");
  scheduleMaxQuantityPuple.classList.add("mb-4");
  scheduleMaxQuantityPuple.innerHTML = `Максимальное количество участинков <span class='get-all'>${maxQuantityPuple}</span> человек`;

  const scheduleCurrentQuantityPuple = document.createElement("h4");
  scheduleCurrentQuantityPuple.classList.add("mb-4");
  scheduleCurrentQuantityPuple.innerHTML = `Текущее количество участников <span class='get-item'>${currentQuantityPuple}</span> человек`;

  const recordButton = document.createElement("button");
  recordButton.classList.add("btn", "btn-success", "m-3", "get-button");
  recordButton.textContent = "Записаться";

  const cancelRecordButton = document.createElement("button");
  cancelRecordButton.classList.add("btn", "btn-info", "m-3");
  cancelRecordButton.textContent = "Отменить запись";

  scheduleItem.append(scheduleName);
  scheduleItem.append(scheduleTimeEvent);
  scheduleItem.append(scheduleMaxQuantityPuple);
  scheduleItem.append(scheduleCurrentQuantityPuple);
  scheduleItem.append(recordButton);
  scheduleItem.append(cancelRecordButton);

  return scheduleItem;
}
taskLists.forEach((element) => {
  const scheduleItem = displaySchedule(
    element.name,
    element.time_event,
    element.max_quantity_puple,
    element.current_quantity_puple
  );
  scheduleList.appendChild(scheduleItem);
});
let oneClick = false;
let toClick = true;
scheduleList.addEventListener("click", (e) => {
  if (e.target.textContent == "Записаться") {
    const scheduleItem = e.target.closest("li");
    const nameEl = scheduleItem.querySelector(".name");
    const getAllEl = scheduleItem.querySelector(".get-all");
    const getItemEl = scheduleItem.querySelector(".get-item");
    const getButton = scheduleItem.querySelector(".get-button");
    const index = getIndex(taskLists, nameEl);

    if (!toClick) {
      alert("Вы уже записаны сегодня на тренировку");
    }
    if (
      Number(taskLists[index].current_quantity_puple) <
        Number(taskLists[index].max_quantity_puple) &&
      toClick
    ) {
      let b = Number(taskLists[index].current_quantity_puple);
      b = b + 1;
      taskLists[index].current_quantity_puple = Number(b);
      getItemEl.textContent = b;
      oneClick = true;
      toClick = false;
      taskLists[index].flag = true;
    }
    if (getItemEl.textContent === getAllEl.textContent) {
      getButton.setAttribute("disabled", true);
    }
  }
});
scheduleList.addEventListener("click", (e) => {
  if (e.target.textContent == "Отменить запись") {
    const scheduleItem = e.target.closest("li");
    const getAllEl = scheduleItem.querySelector(".get-all");
    const getItemEl = scheduleItem.querySelector(".get-item");
    const getButton = scheduleItem.querySelector(".get-button");
    const nameEl = scheduleItem.querySelector(".name");

    const indexO = getIndex(taskLists, nameEl);
    if (getItemEl.textContent === getAllEl.textContent) {
      getButton.removeAttribute("disabled");
    }
    if (
      Number(taskLists[indexO].current_quantity_puple) <=
        Number(taskLists[indexO].max_quantity_puple) &&
      oneClick &&
      taskLists[indexO].flag
    ) {
      let b = Number(taskLists[indexO].current_quantity_puple);
      b = b - 1;
      taskLists[indexO].current_quantity_puple = Number(b);
      getItemEl.textContent = b;
      oneClick = false;
      toClick = true;
      taskLists[indexO].flag = false;
    }
  }
});
