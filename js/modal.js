const submitModal = `
<div class="modal-content">
    <span class="close-button">&times;</span>
    <h2 class="modal-header">Submit Assignment</h2>
    <form class="assignment-form">
        <label for="assignment" class="assignment-label">Assignment Name:</label>
        <input type="text" id="assignment" name="assignment" class="assignment-input" required />
        <br />
        <label for="file" class="file-label">Upload File:</label>
        <input type="file" id="file" name="file" class="file-input" />
        <br />
        <button type="submit" class="modal-submit-button">Submit</button>
    </form>
</div>

`;

const addModuleTemplate = `
<div class="modal-content">
  <span class="close-button">&times;</span>
  <h2 class="modal-header">Add Module</h2>
  <form class="module-form">
    <input type="text" id="module" name="module" class="module-input" placeholder="Enter module name" required />
    <br />
    <button type="submit" class="modal-submit-button">Add</button>
  </form>
</div>
`;

const deleteConfirmationModal = `
<div class="modal-content">
  <span class="close-button">&times;</span>
  <h3 class="deletion-header">Are you sure you want to remove this module?</h3>
  <div class="modal-confirmation-buttons">
    <button class="modal-delete-button">Yes</button>
    <button class="modal-dontdelete-button">No</button>
  </div>
</div>
`;
export function showDeleteConfirmationModal(element) {
  const modal = document.getElementById("modal");
  modal.innerHTML = deleteConfirmationModal;

  const deleteButton = document.querySelector(".modal-delete-button");
  deleteButton.addEventListener("click", () => {
    element.classList.add("to-be-deleted");
    // wait half a second for the animation to finish
    setTimeout(() => {
      element.remove();
    }, 200);
    modal.classList.add("hidden");
  });
  const dontDeleteButton = document.querySelector(".modal-dontdelete-button");
  dontDeleteButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  initModal();
}

export function showSubmitModal() {
  const modal = document.getElementById("modal");
  modal.innerHTML = submitModal;

  initModal();
}

export function showAddModuleModal() {
  const modal = document.getElementById("modal");
  modal.innerHTML = addModuleTemplate;

  initModal();
}

export function initModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  initClosingFunctionality(modal);
}

function initClosingFunctionality(modal) {
  const closeButton = modal.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
