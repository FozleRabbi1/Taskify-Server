export type TProjuct = {
  id: number;
  title: string;
  usersId?: string[];
  users?: string[];
  clientsId?: string[];
  clients?: string[];
  status: "On Going" | "Started" | "Default" | "In Review" | "Completed";
  priority: "Default" | "High"| "Medium" | "Low";
  budget: string;
  tags: string[];
  isFavourite? : "true" | "favourite",
  startsAt: Date; 
  endsAt: Date;
};
