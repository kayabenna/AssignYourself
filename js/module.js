async function fetchMockData() {
  return await fetch("../mockData.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

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
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  const left = createLeftSection(data);
  const right = createRightSection(data);

  wrapper.appendChild(left);
  wrapper.appendChild(right);

  document.body.innerHTML = `<h1 class="module-header">unknown module</h1>`;
  document.body.appendChild(wrapper);
}

function createLeftSection(data) {
  const left = document.createElement("div");
  left.className = "left";

  const assignmentsSection = createAssignmentsSection(data);
  const presentationsSection = createPresentationsSection(data);

  left.appendChild(assignmentsSection);
  left.appendChild(presentationsSection);

  return left;
}

function createRightSection(data) {
  const right = document.createElement("div");
  right.className = "right";

  const achievementsSection = createAchievementsSection(data);
  right.appendChild(achievementsSection);

  return right;
}

function tableEntry(assignment, status) {
  return `
        <tr>
            <td>${assignment}</td>
            <td>${status}</td>
            <td>
                <button>Download</button>
                <button>Korrektur</button>
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
  const assignmentsSection = document.createElement("div");
  assignmentsSection.className = "section assignments";

  const assignmentsHeader = document.createElement("h2");
  assignmentsHeader.textContent = "Assignments";
  assignmentsSection.appendChild(assignmentsHeader);

  const module = getModuleData(data);

  let entries = [];
  for (let assignment of module.assignments) {
    entries.push(tableEntry(assignment.title, userAssignmentStatus(data, assignment.title)));
  }

  const assignmentsTable = document.createElement("table");

  assignmentsTable.innerHTML = `
            <tr>
                <th>Submission</th>
                <th>Status</th>
                <th>Aktionen</th>
            </tr>
            ${entries.join("")}
        `;

  assignmentsSection.appendChild(assignmentsTable);

  const additionalContent = `
    <div class="additional-content">
        <p>total points: ${userTotalPoints(data)}</p>
        <button class="add-assignment">submit assignment</button>
    </div>
`;
  assignmentsSection.innerHTML += additionalContent;

  return assignmentsSection;
}

function createPresentationsLine(date, room, tutor) {
  return `	<tr>
    <td>${date}</td>
    <td>${room}</td>
    <td>${tutor}</td>
    <td>
    `;
}

function createPresentationsSection(data) {
  const presentationsSection = document.createElement("div");
  presentationsSection.className = "section presentations";

  const presentationsHeader = document.createElement("h2");
  presentationsHeader.textContent = "Pending Presentations";
  presentationsSection.appendChild(presentationsHeader);

  const presentationsTable = document.createElement("table");
  const module = getUserData(data);
  const presentations = module.presentations;

  presentationsTable.innerHTML = `
            <tr>
                <th>date</th>
                <th>room</th>
                <th>tutor</th>
            </tr>
        `;
  for (let presentation of presentations) {
    presentationsTable.innerHTML += createPresentationsLine(
      presentation.date,
      presentation.room,
      presentation.tutor
    );
  }
  presentationsSection.appendChild(presentationsTable);

  return presentationsSection;
}

function createAchievementsSection(data) {
  const achievementsSection = document.createElement("div");
  achievementsSection.className = "section achievements";

  const achievementsHeader = document.createElement("h2");
  achievementsHeader.textContent = "Achievements";
  achievementsSection.appendChild(achievementsHeader);

  const achievementsList = document.createElement("ul");
  achievementsList.innerHTML = `
        <li>🟢 Erste Abgabe</li>
        <li>🟢 Alle Abgaben</li>
        <li>🟢 Volle Punktzahl</li>
    `;
  achievementsSection.appendChild(achievementsList);

  return achievementsSection;
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

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchMockData();
  createWrapper(data);
  createFooter(data);
  getModuleTitle(data);
});
