import React, { useEffect } from "react";
import Header from "../components/ui/Header";
import Card from "../components/ui/Card";
import { useTrips } from "../store/useTrips";
import { MapPin, Fuel } from "lucide-react";

export default function Dashboard() {
  const { trips, fetchTrips, loading } = useTrips();

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="flex-1 bg-neutral-50">
      <Header title="Dashboard" />
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-neutral-800">Viagens Recentes</h2>
          <span className="text-xs font-medium text-primary-500 bg-primary-50 px-2 py-1 rounded-full">
            {trips.length} total
          </span>
        </div>

        {loading && trips.length === 0 ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {trips.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-300">
                <p className="text-neutral-400">Nenhuma viagem registrada.</p>
              </div>
            ) : (
              trips.map((item) => (
                <Card key={item.id || Math.random().toString()}>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                      <div className="w-0.5 h-6 bg-neutral-200 my-0.5"></div>
                      <div className="w-2 h-2 rounded-full bg-neutral-800"></div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <p className="font-semibold text-neutral-900 text-sm">{item.origin}</p>
                        <p className="text-xs text-neutral-400 mt-1">para</p>
                        <p className="font-semibold text-neutral-900 text-sm">{item.destination}</p>
                      </div>
                      <div className="flex items-center gap-4 pt-3 border-t border-neutral-100">
                        <div className="flex items-center gap-1.5 text-neutral-600">
                          <MapPin size={14} />
                          <span className="text-xs font-medium">{item.km_run} km</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-neutral-600">
                          <Fuel size={14} />
                          <span className="text-xs font-medium">R$ {item.fuel_price}</span>
                        </div>
                      </div>
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
