import MOCK_DATA from "../mockData.js";

function fillModuleWrapper() {
  const moduleWrapper = document.querySelector(".moduleWrapper");
  let moduleContent = "";

  MOCK_DATA.modules.forEach((module) => {
    moduleContent += `
      <div class="taskCard">
        <div class="task-title">${module.title}</div>
        <div class="task-info">due next: ${
          module.assignments[module.assignments.length - 1].due
        }</div>
        <div class="buttons">
          <a class="button" href="${createLinkToModule(module)}">open</a>
          <a class="button" href="#">submit</a>
        </div>
      </div>
    `;
  });

  moduleContent += `
    <div class="addModuleCard">
      <div class="addModule">+</div>
      <span>add new module</span>
    </div>
  `;

  moduleWrapper.innerHTML = moduleContent;

  document.querySelector(".addModuleCard").addEventListener("click", () => {
    alert("Add Module functionality coming soon!");
  });
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
  return `pages/[module].html?title=${module.title}`;
}

fillModuleWrapper();
