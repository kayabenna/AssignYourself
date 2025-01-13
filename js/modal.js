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
  initClosingFunctionality();
}

function initClosingFunctionality() {
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("hidden");
    }
  });
}
