import MOCK_DATA from "../mockData.js";

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
  const footer = document.createElement("footer");
  footer.className = "tutors";

  const tutorsHeader = document.createElement("h2");
  tutorsHeader.textContent = "tutors";
  footer.appendChild(tutorsHeader);

  const tutorsList = data.tutors;

  for (let tutor of tutorsList) {
    const tutorElement = document.createElement("p");
    tutorElement.textContent = tutor;
    footer.appendChild(tutorElement);
  }

  document.body.appendChild(footer);
}

function initButtons() {
  const submitButton = document.querySelector(".submit-button");
  const downloadButtons = document.querySelectorAll(".download-button");
  const correctionButtons = document.querySelectorAll(".correction-button");

  submitButton.addEventListener("click", () => {
    alert("Submit functionality to be implemented");
  });

  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Download functionality to be implemented");
    });
  });

  correctionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("view correction functionality to be implemented");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = MOCK_DATA;
  createWrapper(data);
  createFooter(data);
  getModuleTitle(data);
  initButtons();
});
