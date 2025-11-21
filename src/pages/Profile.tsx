import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import LargeButton from "../components/ui/LargeButton";
import { supabase } from "../lib/supabase";
import { User as UserIcon, Mail, LogOut } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <div className="flex-1 bg-neutral-50">
      <Header title="Meu Perfil" />
      
      <div className="bg-primary-500 pt-8 pb-16 px-4 rounded-b-[2rem] shadow-lg mb-[-3rem]">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full p-1 shadow-md mb-3">
            <div className="w-full h-full bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
              <UserIcon size={48} />
            </div>
          </div>
          <h2 className="text-white font-bold text-xl">Motorista</h2>
          <p className="text-primary-100 text-sm">Membro desde 2025</p>
        </div>
      </div>

      <div className="px-4 pt-16 pb-4">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden mb-6">
          <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-lg text-primary-500">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs text-neutral-400">Email cadastrado</p>
              <p className="text-sm font-medium text-neutral-800">{user?.email ?? "Carregando..."}</p>
            </div>
          </div>
        </div>

        <LargeButton variant="danger" onClick={handleLogout} className="flex items-center justify-center gap-2">
          <LogOut size={20} />
          Sair da Conta
        </LargeButton>
      </div>
    </div>
  );
}
