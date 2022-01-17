export interface Pup {
  id: number;
  created_at: Date;
  name: string;
  birthday: Date | null;
  colors: string[];
  mom: number | null;
  dad: number | null;
  breed_id: number | null;
  avatar: string;
  price: null;
  available: boolean | null;
  embark: null | string;
  sold: boolean | null;
  gender: "MALE" | "FEMALE" | null;
  parent: boolean;
  family_id: string | null;
}
