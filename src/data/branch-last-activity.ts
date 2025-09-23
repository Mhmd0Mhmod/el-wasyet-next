interface BranchActivity {
  id: string;
  title: string;
  time: string;
  status: "completed" | "in-progress" | "failed";
}

export const ACTIVITIES_DATA: BranchActivity[] = [
  {
    id: "1",
    title: "إيداع نقدي - 25,000 ج.م",
    time: "منذ 3 ساعات",
    status: "completed",
  },
  {
    id: "2",
    title: "استخراج شهادة ميلاد",
    time: "منذ 3 ساعات",
    status: "in-progress",
  },
  {
    id: "3",
    title: "إيداع نقدي - 25,000 ج.م",
    time: "منذ 3 ساعات",
    status: "completed",
  },
  {
    id: "4",
    title: "استخراج شهادة ميلاد",
    time: "منذ 3 ساعات",
    status: "in-progress",
  },
];
