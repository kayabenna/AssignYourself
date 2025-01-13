import MOCK_DATA from "../mockData.js";
import { initModal, showSubmitModal, showAddModuleModal } from "./modal.js";
import { getNextDueAssignment } from "./util/helpers.js";

function fillModuleWrapper() {
  const moduleWrapper = document.querySelector(".moduleWrapper");
  let moduleContent = "";

  for (let module of MOCK_DATA.modules) moduleContent += createTaskCard(module);

  moduleContent += `
    <div class="addModuleCard">
      <div class="addModule">+</div>
      <span>add new module</span>
    </div>
  `;

  moduleWrapper.innerHTML = moduleContent;
}

function createTaskCard(module) {
  return `
      <div class="courseCard">
        <div class="course-title">${module.title}</div>
        <div class="course-info">${getNextDueAssignment(module.assignments)}</div>
        <div class="buttons">
          <a class="button" href="${createLinkToModule(module)}">open</a>
          <a class="submit-button button" href="#">submit</a>
        </div>
      </div>
    `;
}

function createLinkToModule(module) {
  return `pages/[module].html?title=${module.title}`;
}

function initButtons() {
  // Add Module functionality
  document.querySelector(".addModule").addEventListener("click", () => {
    showAddModuleModal();
  });

  const submitButtons = document.querySelectorAll(".submit-button");
  submitButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      showSubmitModal();
    });
  });
}

fillModuleWrapper();
initButtons();
