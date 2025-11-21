export type Trip = {
  id?: string;
  origin: string;
  destination: string;
  km_initial: number;
  km_final: number;
  km_run: number;
  fuel_price: number;
  km_per_l: number;
  created_at?: string;
  user_id?: string | null;
};
