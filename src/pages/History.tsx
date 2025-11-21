import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import { supabase } from "../lib/supabase";
import { Trip } from "../types";
import { Calendar, ArrowRight } from "lucide-react";

export default function History() {
  const [items, setItems] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("trips")
        .select("*")
        .order("created_at", { ascending: false });
      setItems((data as Trip[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex-1 bg-neutral-50">
      <Header title="Histórico Completo" />
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-3">
             {items.length === 0 ? (
                <p className="text-center text-neutral-500 mt-8">Nenhum histórico disponível.</p>
             ) : (
               items.map((item) => (
                <Card key={item.id || Math.random().toString()}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded-md">
                      <Calendar size={12} />
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR') : 'Data desconhecida'}</span>
                    </div>
                    <span className="text-sm font-bold text-primary-600">R$ {item.fuel_price}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium text-neutral-800 text-sm truncate max-w-[40%]">{item.origin}</span>
                    <ArrowRight size={14} className="text-neutral-400 flex-shrink-0" />
                    <span className="font-medium text-neutral-800 text-sm truncate max-w-[40%]">{item.destination}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100">
                    <div className="text-center">
                      <p className="text-[10px] text-neutral-400 uppercase">Distância</p>
                      <p className="text-sm font-semibold text-neutral-700">{item.km_run} km</p>
                    </div>
                    <div className="text-center border-l border-neutral-100">
                      <p className="text-[10px] text-neutral-400 uppercase">Consumo</p>
                      <p className="text-sm font-semibold text-neutral-700">{item.km_per_l} km/L</p>
                    </div>
                    <div className="text-center border-l border-neutral-100">
                      <p className="text-[10px] text-neutral-400 uppercase">Gasto Est.</p>
                      <p className="text-sm font-semibold text-neutral-700">
                        R$ {((item.km_run / (item.km_per_l || 1)) * item.fuel_price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
             )}
          </div>
        )}
      </div>
    </div>
  );
}
