import MOCK_DATA from "../mockData.js";

function getNextDueAssignment(assignments) {
  const currentDate = new Date();

  for (let assignment of assignments) {
    if (new Date(assignment.due) > currentDate) {
      return "due next: " + new Date(assignment.due).toLocaleDateString();
    }
  }
  return "no upcoming assignments";
}

function fillModuleWrapper() {
  const moduleWrapper = document.querySelector(".moduleWrapper");
  let moduleContent = "";

  MOCK_DATA.modules.forEach((module) => {
    moduleContent += `
      <div class="courseCard">
        <div class="course-title">${module.title}</div>
        <div class="course-info">${getNextDueAssignment(module.assignments)}</div>
        <div class="buttons">
          <a class="button" href="${createLinkToModule(module)}">open</a>
          <a class="submit-button button" href="#">submit</a>
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
}

function createTaskCard(module) {
  const courseCard = document.createElement("div");
  courseCard.className = "courseCard";

  courseCard.innerHTML = `
    <div class="course-title">${module.title}</div>
    <div class="course-info">due next: ${
      module.assignments[module.assignments.length - 1].due
    }</div>
    <div class="buttons">
      <a class="button" href="${createLinkToModule(module)}">open</a>
      <a class="button" href="#">submit</a>
    </div>
  `;

  return courseCard;
}

function createLinkToModule(module) {
  return `pages/[module].html?title=${module.title}`;
}

function initButtons() {
  document.querySelector(".addModuleCard").addEventListener("click", () => {
    alert("Add Module functionality to be implemented");
  });
  const submitButtons = document.querySelectorAll(".submit-button");

  submitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("submit functionality to be implemented");
    });
  });
}

fillModuleWrapper();
initButtons();
