export type TProjuct = {
  id: string;
  title: string;
  users: string[];
  clients: string[];
  status: "On Going" | "Started" | "Default" | "In Review" | "Completed";
  priority: "Default" | "High"| "Medium" | "Low";
  budget: string;
  tags: string[];
  isFavourite? : "notFavourite" | "favourite"
};
