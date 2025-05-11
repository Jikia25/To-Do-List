const wrapper = document.querySelector(".wrapper");
const input = document.querySelector(".manage-task");
const button = document.querySelector(".create-task-btn");
const baseUrl = "https://us-central1-js04-b4877.cloudfunctions.net/tasks";

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    renderTasks(data.data);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

async function taskDelete(baseUrl, taskId) {
  try {
    const response = await fetch(baseUrl + "/" + taskId, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
}

getData(baseUrl);

function renderTasks(dataArray) {
  dataArray.forEach((taskData) => {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.checked = taskData.completed;
    li.append(checkBox);
    const text = document.createElement("h6");
    text.textContent = taskData.text;
    li.append(text);
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete Task";
    console.log(taskData);
    buttonDelete.addEventListener("click", taskDelete(baseUrl, taskData.id));
    li.append(buttonDelete);
    wrapper.append(li);
  });
}

input.addEventListener("input", (e) => {
  console.log(e);
});
