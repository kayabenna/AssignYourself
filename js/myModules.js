async function fetchModules() {
  return await fetch("../mockData.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.modules);
      return data.modules;
    });
}

async function fillModuleWrapper() {
  const modules = await fetchModules();
  const moduleWrapper = document.querySelector(".moduleWrapper");
  modules.forEach((module) => {
    const taskCard = createTaskCard(module);
    moduleWrapper.appendChild(taskCard);
  });

  const addModuleCard = document.createElement("div");
  addModuleCard.className = "addModuleCard";
  addModuleCard.innerHTML = `
    <div class="addModule">+</div>
    <span>add new module</span>
  `;
  addModuleCard.addEventListener("click", () => {
    alert("Add Module functionality coming soon!");
  });
  moduleWrapper.appendChild(addModuleCard);
}

function createTaskCard(module) {
  const taskCard = document.createElement("div");
  taskCard.className = "taskCard";

  const title = document.createElement("div");
  title.className = "task-title";
  title.textContent = module.title;

  const info = document.createElement("div");
  info.className = "task-info";
  info.textContent = `due next: ${module.assignments[module.assignments.length - 1].due}`;

  const buttons = document.createElement("div");
  buttons.className = "buttons";

  const openButton = document.createElement("a");
  openButton.className = "button";
  openButton.href = createLinkToModule(module);
  openButton.textContent = "open";

  const submitButton = document.createElement("a");
  submitButton.className = "button";
  submitButton.href = "#";
  submitButton.textContent = "submit";

  buttons.appendChild(openButton);
  buttons.appendChild(submitButton);

  taskCard.appendChild(title);
  taskCard.appendChild(info);
  taskCard.appendChild(buttons);

  return taskCard;
}

function createLinkToModule(module) {
  return `[module].html?title=${module.title}`;
}

fillModuleWrapper();
