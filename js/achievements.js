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
  updateProgressBar();
}

function getFormattedAchievement(achievement) {
  return `
        <li class="achievementItem ${achievement.checked ? "completed" : ""}">
            <div class="achievementContent">
                <span class="achievementLabel">${achievement.label}</span>
                <span class="achievementCheckmark">&#10003;</span>
            </div>
        </li>
        `;
}

function updateProgressBar() {
  const totalAchievements = ACHIEVEMENTS.length;
  const completedAchievements = ACHIEVEMENTS.filter((a) => a.checked).length;
  const progressPercentage = Math.round((completedAchievements / totalAchievements) * 100);

  const progressFill = document.querySelector(".progressFill");
  const progressText = document.querySelector(".progressText");

  progressFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `${progressPercentage}% Completed`;
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".achievementItem")) {
    const item = e.target.closest(".achievementItem");
    const achievementName = item.querySelector(".achievementLabel").textContent.trim();

    const achievement = ACHIEVEMENTS.find((ach) => ach.label === achievementName);
    if (achievement) {
      achievement.checked = !achievement.checked;
      item.classList.toggle("completed");
      updateProgressBar();
    }
  }
});

fillAchievementList();
