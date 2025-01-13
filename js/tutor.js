const students = [
  "Alice",
  "Bob",
  "Anna",
  "Ben",
  "Clara",
  "David",
  "Emma",
  "Felix",
  "Greta",
  "Hans",
  "Ingrid",
  "Johann",
];
const assignments = [
  "Mathe 1: Assignment 1",
  "Mathe 1: Assignment 2",
  "Mathe 1: Assignment 3",
  "Mathe 1: Assignment 4",
  "Mathe 1: Assignment 5",

  "Rechnerarchitektur: Assignment 1",
  "Rechnerarchitektur: Assignment 2",
  "Rechnerarchitektur: Assignment 3",
  "Rechnerarchitektur: Assignment 4",
  "Rechnerarchitektur: Assignment 5",

  "Programmieren 3: Assignment 1",
  "Programmieren 3: Assignment 2",
  "Programmieren 3: Assignment 3",
  "Programmieren 3: Assignment 4",
  "Programmieren 3: Assignment 5",

  "Datenbanken: Assignment 1",
  "Datenbanken: Assignment 2",
  "Datenbanken: Assignment 3",
  "Datenbanken: Assignment 4",
  "Datenbanken: Assignment 5",
];

function randomAssignmentData() {
  return {
    title: assignments[Math.floor(Math.random() * assignments.length)],
    student: students[Math.floor(Math.random() * students.length)],
    corrected: Math.random() > 0.5,
  };
}

function initTutorName() {
  const urlParams = new URLSearchParams(window.location.search);
  const tutorName = urlParams.get("name");

  if (tutorName) document.getElementById("tutor-name").textContent = tutorName;
  else document.getElementById("tutor-name").textContent = "Guest";
}

function initAssignmentList() {
  const rndAssignments = [];
  for (let i = 0; i < 15; i++) {
    rndAssignments.push(randomAssignmentData());
  }
  initPendingAssignmentsCount(rndAssignments);

  rndAssignments.forEach((assignment) => {
    addListElement(assignment);
  });
}

function addListElement(assignment) {
  const listItem = document.createElement("li");
  listItem.classList.add("assignment-items");
  listItem.innerHTML = `
    <div class="assignment-item">
        <div class="assignment-stuff-wrapper">
            <div class="assignment-info">
                <div class="assignment-title">${assignment.title}</div>
                <div class="assignment-student">${assignment.student}</div>
                <div class="assignment-status ${assignment.corrected ? "corrected" : ""}">
                    ${assignment.corrected ? "Corrected" : "Pending"}
                </div>
            </div>
            <div class="assignment-buttons">
                <button class="download-button">
                    Download Submission
                </button>
                <button class="correction-button ${
                  assignment.corrected ? "" : "upload-correction"
                }">
                    ${assignment.corrected ? "View Correction" : "Upload Correction"}
                </button>
            </div>
        </div>
    </div>
`;
  document.getElementById("assignment-items").appendChild(listItem);
}

function initPendingAssignmentsCount(assignments) {
  let cnt = 0;
  for (let assignment of assignments) {
    if (!assignment.corrected) {
      cnt++;
    }
  }
  const num = document.getElementById("pending-assignments-num");
  num.textContent = cnt;
}

function initButtons() {
  const mock = document.getElementById("file");
  const downloadButtons = document.querySelectorAll(".download-button");
  downloadButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mock.click();
    });
  });

  const correctionButtons = document.querySelectorAll(".correction-button");
  correctionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      mock.click();
    });
  });
}

initTutorName();
initAssignmentList();
initButtons();
