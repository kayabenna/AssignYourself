const MOCK_DATA = {
  modules: [
    {
      title: "Programmieren 1",
      assignments: [
        {
          title: "Prog1 Assignment 1",
          due: "2024-11-20",
        },
        {
          title: "Prog1 Assignment 2",
          due: "2024-11-25",
        },
      ],
    },
    {
      title: "Grundlagen der Betriebssysteme",
      assignments: [
        {
          title: "GBS Assignment 1",
          due: "2024-12-05",
        },
        {
          title: "GBS Assignment 2",
          due: "2024-12-10",
        },
        {
          title: "GBS Assignment 3",
          due: "2024-12-15",
        },
        {
          title: "GBS Assignment 4",
          due: "2024-12-20",
        },
        {
          title: "GBS Assignment 5",
          due: "2024-12-25",
        },
      ],
    },
    {
      title: "Mathematik 2: Analysis",
      assignments: [
        {
          title: "Analysis Assignment 1",
          due: "2024-11-01",
        },
        {
          title: "Analysis Assignment 2",
          due: "2024-12-01",
        },
        {
          title: "Analysis Assignment 3",
          due: "2024-12-11",
        },
        {
          title: "Analysis Assignment 4",
          due: "2024-12-22",
        },
        {
          title: "Analysis Assignment 5",
          due: "2025-03-25",
        },
      ],
    },
    {
      title: "Grundlagen Mensch-Computer-Interaktion",
      assignments: [
        {
          title: "HCI Assignment 1",
          due: "2024-11-01",
        },
        {
          title: "HCI Assignment 2",
          due: "2024-12-01",
        },
        {
          title: "HCI Assignment 3",
          due: "2025-7-11",
        },
        {
          title: "HCI Assignment 4",
          due: "2025-12-22",
        },
      ],
    },
  ],

  users: [
    {
      name: "Max Mustermann",
      id: "1",
      modules: [
        {
          title: "Programmieren 1",

          presentations: [
            {
              date: "2025-12-05",
              room: "A123",
              tutor: "Kay Bennet Städing",
            },
            {
              date: "2025-12-10",
              room: "A124",
              tutor: "Thore Klattenberg",
            },
          ],

          assignments: [
            {
              title: "Prog1 Assignment 1",
              status: "done",
              points: 20,
            },
            {
              title: "Prog1 Assignment 2",
              status: "open",
              points: 20,
            },
          ],
        },
        {
          title: "Grundlagen der Betriebssysteme",
          presentations: [
            {
              date: "2025-12-05",
              room: "A123",
              tutor: "Kay Bennet Städing",
            },
            {
              date: "2025-12-10",
              room: "A124",
              tutor: "Thore Klattenberg",
            },
          ],
          assignments: [
            {
              title: "GBS Assignment 1",
              status: "done",
              points: 20,
            },
            {
              title: "GBS Assignment 2",
              status: "open",
              points: 20,
            },
            {
              title: "GBS Assignment 3",
              status: "done",
              points: 20,
            },
            {
              title: "GBS Assignment 4",
              status: "done",
              points: 20,
            },
            {
              title: "GBS Assignment 5",
              status: "open",
              points: 20,
            },
          ],
        },
        {
          title: "Mathematik 2: Analysis",
          presentations: [
            {
              date: "2025-12-05",
              room: "A123",
              tutor: "Kay Bennet Städing",
            },
            {
              date: "2025-12-10",
              room: "A124",
              tutor: "Thore Klattenberg",
            },
            {
              date: "2025-12-15",
              room: "A125",
              tutor: "Thore Klattenberg",
            },
            {
              date: "2025-12-20",
              room: "A126",
              tutor: "Jan Koch",
            },
            {
              date: "2025-12-25",
              room: "A127",
              tutor: "Thore Klattenberg",
            },
          ],
          assignments: [
            {
              title: "Analysis Assignment 1",
              status: "done",
              points: 12,
            },
            {
              title: "Analysis Assignment 2",
              status: "open",
              points: 12,
            },
            {
              title: "Analysis Assignment 3",
              status: "done",
              points: 12,
            },
            {
              title: "Analysis Assignment 4",
              status: "done",
              points: 12,
            },
            {
              title: "Analysis Assignment 5",
              status: "open",
              points: 12,
            },
          ],
        },
        {
          title: "Grundlagen Mensch-Computer-Interaktion",
          presentations: [
            {
              date: "2025-12-05",
              room: "A123",
              tutor: "Kay Bennet Städing",
            },
          ],
          assignments: [
            {
              title: "HCI Assignment 1",
              status: "open",
              points: 20,
            },
            {
              title: "HCI Assignment 2",
              status: "open",
              points: 20,
            },
            {
              title: "HCI Assignment 3",
              status: "open",
              points: 20,
            },
            {
              title: "HCI Assignment 4",
              status: "open",
              points: 20,
            },
          ],
        },
      ],
    },
  ],

  tutors: ["Hanko Neumann", "Kay Bennet Städing", "Thore Klattenberg", "Jan Koch"],
};

export default MOCK_DATA;
