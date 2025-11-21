import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewTrip from "./pages/NewTrip";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/auth/login" element={!session ? <Login /> : <Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={session ? <Dashboard /> : <Navigate to="/auth/login" />} />
          <Route path="/new" element={session ? <NewTrip /> : <Navigate to="/auth/login" />} />
          <Route path="/history" element={session ? <History /> : <Navigate to="/auth/login" />} />
          <Route path="/profile" element={session ? <Profile /> : <Navigate to="/auth/login" />} />
          
          <Route path="/" element={<Navigate to={session ? "/dashboard" : "/auth/login"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
