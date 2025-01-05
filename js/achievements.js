// Data to populate the list
const ACHIEVEMENTS = [
  {
    name: "firstCourse",
    label: "Enroll for your first course",
    checked: true,
  },
  {
    name: "completeSubmissions",
    label: "Complete all submissions",
    checked: true,
  },
  {
    name: "submitQuickly",
    label: "Submit less than 24 hours after an assignment was uploaded",
    checked: false,
  },
  {
    name: "submitLate",
    label: "Submit more than 24 hours after an assignment was uploaded",
    checked: false,
  },
  {
    name: "noSubmissionMissed",
    label: "submit all assignments of a course",
    checked: false,
  },
  {
    name: "topGrades",
    label: "Achieve top grades in all assignments of a course",
    checked: true,
  },
  {
    name: "extraCredit",
    label: "Complete extra credit assignments",
    checked: false,
  },
  {
    name: "etc",
    label: "...",
    checked: false,
  },
];

function fillAchievementList() {
  const checkboxList = document.querySelector(".checkboxList");
  for (let achievement of ACHIEVEMENTS) {
    const formattedAchievement = getFormattedAchievement(achievement);
    checkboxList.innerHTML += formattedAchievement;
  }
}

function getFormattedAchievement(achievement) {
  return `
        <li>
                <input class="achievementBox" type="checkbox" name="${achievement.name}" value="${
    achievement.name
  }" ${achievement.checked ? "checked" : ""}>
                <label class="achievementLabel" for="${achievement.name}">${
    achievement.label
  }</label>
        </li>
        `;
}

fillAchievementList();
