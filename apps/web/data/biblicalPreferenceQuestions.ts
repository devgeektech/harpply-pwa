type Question = {
  id: string;
  title: string;
  options: readonly string[];
};

export const BIBICAL_PREFERENCE_QUESTIONS: readonly Question[] = [
  {
    id: "q1",
    title: "When do you usually spend time with God?",
    options: [
      "Morning — I start my day with Him",
      "Evening — I end my day with Him",
      "Throughout the day — it is ongoing",
      "Whenever I can — my schedule varies",
    ],
  },
  {
    id: "q2",
    title: "How do you like to read the Bible?",
    options: [
      "A structured reading plan",
      "Wherever I feel led that day",
      "One book at a time, studied deeply",
      "Devotionals that draw from Scripture",
    ],
  },
  {
    id: "q3",
    title: "How do you usually pray?",
    options: ["Out loud", "Silently", "Written — I journal my prayers", "A mix depending on the moment"],
  },
  {
    id: "q4",
    title:
      "Outside of the Gospels, which part of the Bible do you find yourself drawn to most?",
    options: [
      "Psalms and Proverbs — worship and wisdom",
      "The Letters — Paul, Peter, James",
      "The Old Testament — history and prophecy",
      "It changes with the season I am in",
    ],
  },
  {
    id: "q5",
    title: "How do you worship best?",
    options: [
      "Singing and music",
      "Quiet reflection and prayer",
      "Through serving others",
      "A combination of all of these",
    ],
  },
  {
    id: "q6",
    title: "How are you involved in your church community?",
    options: [
      "Serving on a ministry team",
      "Part of a small group or Bible study",
      "Attending services consistently",
      "Looking to get more involved",
    ],
  },
  {
    id: "q7",
    title: "How do you share your faith?",
    options: [
      "Through conversation when it naturally comes up",
      "Intentionally — I look for opportunities to share",
      "More through how I live than what I say",
      "This is something I am still growing in",
    ],
  },
  {
    id: "q8",
    title: "When life gets hard, you turn to:",
    options: ["Prayer first", "Scripture first", "My faith community first", "A combination of all three"],
  },
  {
    id: "q9",
    title: "In a godly relationship, what matters most to you?",
    options: [
      "Deep spiritual intimacy — praying, worshipping, and studying Scripture together",
      "Honest communication — vulnerability, trust, and real conversation",
      "Mutual accountability — pushing each other to grow and stay close to God",
      "Servant-heartedness — consistently choosing the other person above yourself",
    ],
  },
  {
    id: "q10",
    title: "How do you picture your home life with a future spouse?",
    options: [
      "Praying together, reading Scripture together, keeping God at the center daily",
      "Active in church and community together",
      "Quiet and faith-filled — peace and presence over busy schedules",
      "A balance of all of these",
    ],
  },
] as const;
