export interface User {
  id: string;
  name: string;
  avatar: string;
  status: "Active" | "Inactive";
  email: string;
  role: "Admin" | "Copywriter";
  lastOnline: string;
  username?: string;
  password?: string;
}
