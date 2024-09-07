export type TProjuct = {
  id: string;
  title: string;
  users: string[];
  clients: string[];
  status: "On Going" | "Started" | "Default" | "In Review";
  priority: "Default";
  budget: string;
  tags: string[];
};
