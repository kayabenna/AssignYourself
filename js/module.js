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

function createAssignmentsSection(data) {
  const assignmentsSection = document.createElement("div");
  assignmentsSection.className = "section assignments";

  const assignmentsHeader = document.createElement("h2");
  assignmentsHeader.textContent = "Abgaben";
  assignmentsSection.appendChild(assignmentsHeader);

  const searchParams = new URLSearchParams(window.location.search);
  const title = searchParams.get("title") || "unknown module";

  let assignments = [];
  data.modules.forEach((module) => {
    if (module.title === title) {
      assignments = module.assignments;
    }
  });

  let entries = [];
  for (let assignment of assignments) {
    entries.push(tableEntry(assignment.title, "assignment.status"));
  }

  const assignmentsTable = document.createElement("table");

  assignmentsTable.innerHTML = `
            <tr>
                <th>Abgabe</th>
                <th>Status</th>
                <th>Aktionen</th>
            </tr>
            ${entries.join("")}
        `;

  assignmentsSection.appendChild(assignmentsTable);

  const totalPoints = document.createElement("p");
  totalPoints.textContent = "Insgesamt Punkte: 20";
  assignmentsSection.appendChild(totalPoints);

  const addAssignmentButton = document.createElement("button");
  addAssignmentButton.className = "add-assignment";
  addAssignmentButton.textContent = "Abgabe hinzufügen";
  assignmentsSection.appendChild(addAssignmentButton);

  return assignmentsSection;
}

function createPresentationsSection(data) {
  const presentationsSection = document.createElement("div");
  presentationsSection.className = "section presentations";

  const presentationsHeader = document.createElement("h2");
  presentationsHeader.textContent = "Vorstellen";
  presentationsSection.appendChild(presentationsHeader);

  const presentationsTable = document.createElement("table");
  presentationsTable.innerHTML = `
        <tr>
            <th>Datum</th>
            <th>Wo</th>
        </tr>
        <tr>
            <td>Morgen</td>
            <td>7:11</td>
        </tr>
        <tr>
            <td>In 2 Tagen</td>
            <td>7:11</td>
        </tr>
    `;
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
  tutorsHeader.textContent = "Tutoren";
  footer.appendChild(tutorsHeader);

  const tutor1 = document.createElement("p");
  tutor1.textContent = "Hanko Neumann";
  footer.appendChild(tutor1);

  const tutor2 = document.createElement("p");
  tutor2.textContent = "Bennet Stüding";
  footer.appendChild(tutor2);

  document.body.appendChild(footer);
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchMockData();
  createWrapper(data);
  createFooter(data);
  getModuleTitle(data);
});
