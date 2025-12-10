interface Employee extends ShortEmployee {
  roleId: string;
  abilityDTOs: Ability[];
}
interface ShortEmployee {
  id: number;
  name: string;
  role: string;
  roleId: string;
  userName: string;
  phone: string;
  email: string;
  managerId: number | null;
  managerName: string | null;
  suspended: boolean;
}
type ShortManager = {
  id: number;
  name: string;
};
