"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Clock3, Settings2, Store, Users } from "lucide-react";

type Unit = { id: string; name: string; hours: string; sunday: boolean; mode: "automatic" | "approval"; professionals: string[] };

const initialUnits: Unit[] = [
  { id: "shopping", name: "Shopping Eusébio", hours: "10:00 às 21:00", sunday: true, mode: "approval", professionals: ["Adonay", "Israel", "Jorge", "Moss", "Rafael"] },
  { id: "eusebio-centro", name: "Eusébio Centro", hours: "09:00 às 20:00", sunday: false, mode: "approval", professionals: ["Samuel", "Erick", "Emanoel", "Manu", "Anderson", "Tyago", "Jonh", "Celina (manicure)"] },
  { id: "aquiraz", name: "Centro do Aquirás", hours: "09:00 às 20:00", sunday: false, mode: "approval", professionals: ["Isaque", "Danilo", "Matheus", "Willa", "Nelson", "Teófilo"] },
];

export default function ConfiguracaoPage() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("elizes-ia-unit-settings-v1");
      if (raw) {
        const parsed = JSON.parse(raw) as Unit[];
        if (Array.isArray(parsed) && parsed.length === 3) setUnits(parsed);
      }
    } catch { /* mantém configuração inicial */ }
    setReady(true);
  }, []);

  const update = (id: string, patch: Partial<Unit>) => {
    setUnits(current => current.map(unit => unit.id === id ? { ...unit, ...patch } : unit));
    setSaved(false);
  };

  const total = useMemo(() => units.reduce((sum, unit) => sum + unit.professionals.length, 0), [units]);

  const save = () => {
    window.localStorage.setItem("elizes-ia-unit-settings-v1", JSON.stringify(units));
    setSaved(true);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#f5f7f5", color: "#17231c", padding: "32px 18px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <a href="/" style={{ color: "#287747", textDecoration: "none", fontWeight: 700 }}>← ELIZES IA</a>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
          <div style={{ background: "#e3f1e7", padding: 12, borderRadius: 14 }}><Settings2 color="#287747" /></div>
          <div><div style={{ color: "#62806b", fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>PAINEL DE CONFIGURAÇÃO</div><h1 style={{ margin: "5px 0", fontSize: 30 }}>Unidades e agendamentos</h1></div>
        </div>
        <p style={{ color: "#607066", lineHeight: 1.6, maxWidth: 720 }}>Configure o modo de atendimento de cada unidade. A agenda provisória ainda não consulta o AppBarber; a confirmação automática só deve ser ativada quando houver disponibilidade real conectada.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "22px 0" }}>
          {[["3", "unidades"], [String(total), "profissionais"], ["2", "modos de agendamento"]].map(([value, label]) => <div key={label} style={{ background: "white", border: "1px solid #e1e8e2", borderRadius: 14, padding: "14px 18px", minWidth: 150 }}><strong style={{ fontSize: 24 }}>{value}</strong><div style={{ color: "#718076", fontSize: 13 }}>{label}</div></div>)}
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {units.map(unit => (
            <section key={unit.id} style={{ background: "white", border: "1px solid #e1e8e2", borderRadius: 18, padding: 22, boxShadow: "0 5px 20px #1b3a2510" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Store color="#287747" /><h2 style={{ margin: 0, fontSize: 20 }}>{unit.name}</h2></div>
                <span style={{ color: "#65806b", fontSize: 13 }}>{unit.professionals.length} profissionais</span>
              </div>
              <div style={{ display: "flex", gap: 22, flexWrap: "wrap", margin: "18px 0", color: "#526258", fontSize: 14 }}>
                <span style={{ display: "flex", gap: 7, alignItems: "center" }}><Clock3 size={16} />{unit.hours}</span>
                <span style={{ display: "flex", gap: 7, alignItems: "center" }}><CalendarDays size={16} />Domingo: {unit.sunday ? "aberto" : "fechado"}</span>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 9 }}>Modo de agendamento</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                <button onClick={() => update(unit.id, { mode: "automatic" })} style={{ textAlign: "left", border: unit.mode === "automatic" ? "2px solid #2e8b50" : "1px solid #dce5de", background: unit.mode === "automatic" ? "#eff8f1" : "white", borderRadius: 12, padding: 14, cursor: "pointer", color: "#24362a" }}>
                  <strong>Reserva automática</strong><div style={{ fontSize: 13, color: "#68766d", marginTop: 5 }}>Só usar quando a agenda provisória estiver sincronizada e confiável.</div>
                </button>
                <button onClick={() => update(unit.id, { mode: "approval" })} style={{ textAlign: "left", border: unit.mode === "approval" ? "2px solid #2e8b50" : "1px solid #dce5de", background: unit.mode === "approval" ? "#eff8f1" : "white", borderRadius: 12, padding: 14, cursor: "pointer", color: "#24362a" }}>
                  <strong>Recepção aprova</strong><div style={{ fontSize: 13, color: "#68766d", marginTop: 5 }}>A IA recebe o pedido e a equipe confirma manualmente.</div>
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontWeight: 700 }}><Users size={17} color="#287747" /> Profissionais cadastrados</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>{unit.professionals.map(name => <span key={name} style={{ background: "#f1f5f1", borderRadius: 99, padding: "7px 11px", fontSize: 13 }}>{name}</span>)}</div>
            </section>
          ))}
        </div>
        <div style={{ position: "sticky", bottom: 12, display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button disabled={!ready} onClick={save} style={{ background: "#237444", color: "white", border: 0, borderRadius: 12, padding: "13px 20px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}><Check size={17} />{saved ? "Configurações salvas neste navegador" : "Salvar configurações"}</button>
        </div>
        <p style={{ color: "#8a6a35", background: "#fff8e9", border: "1px solid #f0dfb8", borderRadius: 12, padding: 14, fontSize: 13, lineHeight: 1.55, marginTop: 16 }}>Importante: esta primeira tela salva as preferências somente neste navegador. Ainda não é um painel multiusuário nem grava agendamentos. Antes de usar com clientes, vamos conectar o salvamento seguro ao Supabase, autenticação e agenda provisória com bloqueio de conflitos.</p>
      </div>
    </main>
  );
}
