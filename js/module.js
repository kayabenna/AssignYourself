import MOCK_DATA from "../mockData.js";
import { showTutorModal, showSubmitModal } from "./modal.js";

function getModuleTitle() {
  const searchParams = new URLSearchParams(window.location.search);
  const moduleTitle = searchParams.get("title") || "unknown module";

  document.querySelector(".module-title").textContent = moduleTitle;
  document.querySelector(".module-header").textContent = moduleTitle;
}

function isOverdue(assignmentTitle, moduleData) {
  const assignment = moduleData.assignments.find((a) => a.title === assignmentTitle);
  console.log(assignment);
  return new Date(assignment.due) < Date.now();
}

function userAssignmentStatus(data, assignment) {
  const userData = getUserData(data);
  const moduleData = getModuleData(data);

  let status;
  for (let i = 0; i < userData.assignments.length; i++) {
    if (userData.assignments[i].title === assignment) {
      status = userData.assignments[i].status;
    }
  }
  if (status === "open" && isOverdue(assignment, moduleData)) {
    status = "overdue";
  }
  switch (status) {
    case "open":
      return "🟡 open";
    case "done":
      return "🟢 done";
    case "overdue":
      return "🔴 overdue";
  }
}

function userTotalPoints(data) {
  const userData = getUserData(data);
  let totalPoints = 0;
  for (let assignment of userData.assignments) {
    if (assignment.status === "done") {
      totalPoints += assignment.points;
    }
  }
  return totalPoints;
}

function createWrapper(data) {
  const left = createLeftSection(data).outerHTML;

  const wrapperHTML = `
        <div class="wrapper">
            ${left}
        </div>
    `;

  document.body.innerHTML = `
        <h1 class="module-header">unknown module</h1>
        <a href="../index.html" class="back-button">back</a>
        ${wrapperHTML}
    `;
}

function createLeftSection(data) {
  const assignmentsSection = createAssignmentsSection(data).outerHTML;
  const presentationsSection = createPresentationsSection(data).outerHTML;

  const leftHTML = `
        <div class="left">
            ${assignmentsSection}
            ${presentationsSection}
        </div>
    `;

  const left = document.createElement("div");
  left.innerHTML = leftHTML;
  return left.firstElementChild;
}

function tableEntry(assignment, due, status) {
  return `
        <tr>
            <td>${assignment}</td>
            <td>${due}</td>
            <td>${status}</td>
            <td>
                <button class="download-button ${
                  status.includes("done") ? "" : "unavailable"
                }">download submission</button>
                <button class="correction-button ${
                  status.includes("done") ? "" : "unavailable"
                }">view correction</button>
            </td>
        </tr>
    `;
}

function getModuleData(data) {
  const searchParams = new URLSearchParams(window.location.search);
  const title = searchParams.get("title");

  let res;
  data.modules.forEach((module) => {
    if (module.title === title) {
      res = module;
    }
  });
  return res;
}

function getUserData(data) {
  const searchParams = new URLSearchParams(window.location.search);
  const title = searchParams.get("title");

  let res;
  data.users[0].modules.forEach((module) => {
    if (module.title === title) {
      res = module;
    }
  });
  return res;
}

function createAssignmentsSection(data) {
  const module = getModuleData(data);

  let entries = [];
  for (let assignment of module.assignments) {
    entries.push(
      tableEntry(assignment.title, assignment.due, userAssignmentStatus(data, assignment.title))
    );
  }

  const assignmentsSectionHTML = `
        <div class="section assignments">
            <h2 class="section-header">Assignments</h2>
            <div class="assignment-table-container">
                <table class="assignment-table">
                    <tr>
                        <th>Submission</th>
                        <th>Due</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    ${entries.join("")}
                </table>
            </div>
            <div class="additional-content">
                <p class="total-points">total points: <strong>${userTotalPoints(data)}</strong></p>
                <button class="submit-button">submit assignment</button>
            </div>
        </div>
    `;

  const assignmentsSection = document.createElement("div");
  assignmentsSection.innerHTML = assignmentsSectionHTML;
  return assignmentsSection.firstElementChild;
}

function CreatePresentationsRow(date, room, tutor) {
  return `	<tr>
    <td>${date}</td>
    <td>${room}</td>
    <td>${tutor}</td>
    </tr>
    `;
}

function createPresentationsSection(data) {
  const module = getUserData(data);
  const presentations = module.presentations;

  const presentationsSectionHTML = `
        <div class="section presentations">
            <h2 class="section-header">Pending Presentations</h2>
            <div class="presentation-table-container">
                <table>
                    <tr>
                        <th>date</th>
                        <th>room</th>
                        <th>tutor</th>
                    </tr>
                    ${presentations
                      .map((presentation) =>
                        CreatePresentationsRow(
                          presentation.date,
                          presentation.room,
                          presentation.tutor
                        )
                      )
                      .join("")}
                </table>
            </div>
        </div>
    `;

  const presentationsSection = document.createElement("div");
  presentationsSection.innerHTML = presentationsSectionHTML;
  return presentationsSection.firstElementChild;
}

function createFooter(data) {
  const tutorsList = data.tutors.map((tutor) => `<p>${tutor}</p>`).join("");

  const footerHTML = `
    <footer class="tutors">
    <div class="tutor-wrapper">
      <h1>tutors</h1>
      <button class="sign-in-button">Sign In</button>
    </div>
      ${tutorsList}
    </footer>
    <div id="modal" class="modal hidden"></div>
    <input type="file" id="file" style="display: none;" />
    <label for="file" class="mocklabel" style="display: none;" />
  `;
  document.body.innerHTML += footerHTML;
}

function initButtons() {
  const submitButton = document.querySelector(".submit-button");
  const downloadButtons = document.querySelectorAll(".download-button");
  const correctionButtons = document.querySelectorAll(".correction-button");
  const mock = document.getElementById("file");

  submitButton.addEventListener("click", () => {
    showSubmitModal();
  });

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mock.click();
    });
  });

  correctionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mock.click();
    });
  });

  const signInButton = document.querySelector(".sign-in-button");
  signInButton.addEventListener("click", () => {
    showTutorModal("[tutor].html");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = MOCK_DATA;
  createWrapper(data);
  createFooter(data);
  getModuleTitle(data);
  initButtons();
});
