import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import LargeButton from "../components/ui/LargeButton";
import { useTrips } from "../store/useTrips";

export default function NewTrip() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [kmInitial, setKmInitial] = useState("");
  const [kmFinal, setKmFinal] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [kmPerL, setKmPerL] = useState("");
  const { addTrip } = useTrips();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const km_run = Number(kmFinal) - Number(kmInitial);
      if (km_run < 0) {
        alert("Km final deve ser maior que Km inicial");
        setSubmitting(false);
        return;
      }

      await addTrip({
        origin,
        destination,
        km_initial: Number(kmInitial),
        km_final: Number(kmFinal),
        km_run,
        fuel_price: Number(fuelPrice),
        km_per_l: Number(kmPerL)
      });
      
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao salvar viagem");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-neutral-50">
      <Header title="Nova Viagem" />
      <form onSubmit={submit} className="p-4 pb-24">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 mb-4">
          <h3 className="text-sm font-bold text-neutral-800 mb-3 uppercase tracking-wide">Rota</h3>
          <Input 
            label="Origem" 
            value={origin} 
            onChange={(e) => setOrigin(e.target.value)} 
            placeholder="Ex: Rua A, 123" 
            required
          />
          <Input 
            label="Destino" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            placeholder="Ex: Rua B, 456" 
            required
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-100 mb-6">
          <h3 className="text-sm font-bold text-neutral-800 mb-3 uppercase tracking-wide">Dados do Veículo</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              label="Km Inicial" 
              type="number" 
              value={kmInitial} 
              onChange={(e) => setKmInitial(e.target.value)} 
              required
            />
            <Input 
              label="Km Final" 
              type="number" 
              value={kmFinal} 
              onChange={(e) => setKmFinal(e.target.value)} 
              required
            />
          </div>
          <Input 
            label="Preço Combustível (R$/L)" 
            type="number" 
            step="0.01"
            value={fuelPrice} 
            onChange={(e) => setFuelPrice(e.target.value)} 
            required
          />
          <Input 
            label="Média Km/L" 
            type="number" 
            step="0.1"
            value={kmPerL} 
            onChange={(e) => setKmPerL(e.target.value)} 
            required
          />
        </div>

        <LargeButton type="submit" loading={submitting}>Registrar Viagem</LargeButton>
      </form>
    </div>
  );
}
