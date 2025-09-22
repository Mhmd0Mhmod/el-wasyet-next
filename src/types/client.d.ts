import { ShortOrder } from "./order";

interface ShortClient {
  id: number;
  name: string;
  phone1: string;
  phone2: string | null;
  email: string;
  address: string;
  createdDate: string;
}

interface Client extends ShortClient {
  parentClient: Client | null;
  childClients: Client[];
  orders: ShortOrder[];
}
