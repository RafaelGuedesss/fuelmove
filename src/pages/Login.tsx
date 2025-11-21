import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LargeButton from "../components/ui/LargeButton";
import Input from "../components/ui/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Conta criada! Verifique seu email ou faça login.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/dashboard");
      }
    } catch (error: any) {
      alert(error.message || "Erro na autenticação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-8 bg-white">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary-500 mb-2">FuelMove</h1>
        <p className="text-neutral-500">Gerencie suas viagens com estilo.</p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <Input 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="seu@email.com"
          required
        />
        <Input 
          label="Senha" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="******"
          required
        />
        
        <div className="pt-4">
          <LargeButton type="submit" loading={loading}>
            {isSignUp ? "Criar Conta" : "Entrar"}
          </LargeButton>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-neutral-500 text-sm hover:text-primary-500 font-medium"
        >
          {isSignUp ? "Já tem uma conta? Entre aqui." : "Não tem conta? Crie uma agora."}
        </button>
      </div>
    </div>
  );
}
