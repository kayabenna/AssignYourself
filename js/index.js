import MOCK_DATA from "../mockData.js";
import { showSubmitModal, showAddModuleModal, showDeleteConfirmationModal } from "./modal.js";
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
      <div class="courseCard" style="position: relative;">
        <div class="course-title">${module.title}</div>
        <div class="course-info">${getNextDueAssignment(module.assignments)}</div>
        <div class="buttons">
          <a class="button" href="${createLinkToModule(module)}">open</a>
          <a class="submit-button button" href="#">submit</a>
        </div>
        <div class="close-button" style="position: absolute; top: 10px; right: 10px; cursor: pointer;">X</div>
      </div>
    `;
}

function createLinkToModule(module) {
  return `pages/[module].html?title=${module.title}`;
}

function initButtons() {
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parentElement = event.target.parentElement;
      showDeleteConfirmationModal(parentElement);
    });
  });

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
