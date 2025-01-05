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

  taskCard.innerHTML = `
    <div class="task-title">${module.title}</div>
    <div class="task-info">due next: ${module.assignments[module.assignments.length - 1].due}</div>
    <div class="buttons">
      <a class="button" href="${createLinkToModule(module)}">open</a>
      <a class="button" href="#">submit</a>
    </div>
  `;

  return taskCard;
}

function createLinkToModule(module) {
  return `[module].html?title=${module.title}`;
}

fillModuleWrapper();
