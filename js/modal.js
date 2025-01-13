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

const tutorModal = `
<div class="modal-content">
  <span class="close-button">&times;</span>
  <h2 class="modal-header">Sign In</h2>
  <form class="tutor-form">
    <input type="text" id="tutor" name="tutor" class="tutor-input" placeholder="Enter your name" required />
    <br />
    <input type="password" id="password" name="password" class="password-input" placeholder="Enter your password" required />
    <br />
    <button type="submit" class="modal-submit-button">Sign In</button>
  </form>
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
    }, 400);
    modal.classList.add("hidden");
  });
  const dontDeleteButton = document.querySelector(".modal-dontdelete-button");
  dontDeleteButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  initModal();
}

export function showTutorModal(tutorPath) {
  const modal = document.getElementById("modal");
  modal.innerHTML = tutorModal;

  // when clicking sign in open tutor.html
  const signInButton = document.querySelector(".modal-submit-button");
  signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    const tutorName = document.getElementById("tutor").value;
    window.location.href = `${tutorPath}?name=${encodeURIComponent(tutorName)}`;
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
