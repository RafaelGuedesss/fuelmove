import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { Trip } from "../types";

type State = {
  trips: Trip[];
  loading: boolean;
  fetchTrips: () => Promise<void>;
  addTrip: (t: Partial<Trip>) => Promise<void>;
};

export const useTrips = create<State>((set) => ({
  trips: [],
  loading: false,
  fetchTrips: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false });
        
      if (error) {
        console.error("Error fetching trips:", error);
        set({ trips: [], loading: false });
        return;
      }
      
      set({ trips: (data as Trip[]) || [], loading: false });
    } catch (err) {
      console.error("Unexpected error fetching trips:", err);
      set({ trips: [], loading: false });
    }
  },
  addTrip: async (t) => {
    set({ loading: true });
    try {
      // Recuperar o usuário atual para vincular à viagem
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("User not authenticated");
        set({ loading: false });
        throw new Error("Usuário não autenticado");
      }

      // Adiciona o user_id ao objeto da viagem
      const tripData = { ...t, user_id: user.id };

      const { error } = await supabase.from("trips").insert([tripData]);
      
      if (error) {
        console.error("Error adding trip:", error);
        set({ loading: false });
        throw error;
      }

      // Atualiza a lista após a inserção
      const { data } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false });
        
      set({ trips: (data as Trip[]) || [], loading: false });
    } catch (err) {
      console.error("Unexpected error adding trip:", err);
      set({ loading: false });
      throw err;
    }
  }
}));
