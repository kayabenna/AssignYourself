export function getNextDueAssignment(assignments) {
  const currentDate = new Date();

  for (let assignment of assignments) {
    if (new Date(assignment.due) > currentDate) {
      return dueDate;
    }
  }
}
