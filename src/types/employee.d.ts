interface Employee extends ShortEmployee {
  roleId: string;
  abilityDTOs: Ability[];
}
interface ShortEmployee {
  id: number;
  name: string;
  role: string;

  userName: string;
  phone: string;
  email: string;
  managerName: string | null;
  suspended: boolean;
}
type ShortManager = {
  id: number;
  name: string;
};
