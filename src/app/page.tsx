"use client";

import { useState } from "react";
import { Activity, AudioLines, Bot, CalendarDays, CheckCheck, ChevronDown, CircleHelp, Clock3, Headphones, LayoutDashboard, MessageCircle, MoreHorizontal, Plus, Scissors, Settings2, ShoppingBag, Sparkles, Users, Volume2, Zap } from "lucide-react";

type PageKey = "overview" | "conversations" | "appointments" | "customers" | "sales" | "voice" | "settings";
const navigation: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  {key:"overview",label:"Visão geral",icon:LayoutDashboard},{key:"conversations",label:"Conversas",icon:MessageCircle},{key:"appointments",label:"Agendamentos",icon:CalendarDays},{key:"customers",label:"Clientes",icon:Users},{key:"sales",label:"Vendas e retornos",icon:ShoppingBag},{key:"voice",label:"Áudio e voz",icon:AudioLines},{key:"settings",label:"Configurações",icon:Settings2}
];
const conversations = [
  {name:"Mariana Costa",message:"Gostaria de saber os horários disponíveis para amanhã.",time:"Agora",status:"Novo",initials:"MC"},
  {name:"Rafael Oliveira",message:"Pode confirmar meu corte às 15h?",time:"4 min",status:"Agendamento",initials:"RO"},
  {name:"Pedro Henrique",message:"Qual o valor do corte e da barba?",time:"12 min",status:"Em atendimento",initials:"PH"},
  {name:"Lucas Almeida",message:"Obrigado pelo atendimento!",time:"28 min",status:"Concluído",initials:"LA"}
];
const upcoming = [{time:"09:00",name:"André Martins",service:"Corte masculino",pro:"Anderson"},{time:"09:30",name:"Felipe Santos",service:"Corte + barba",pro:"Samuel"},{time:"10:00",name:"João Pedro",service:"Degradê",pro:"Erick"}];
const titles: Record<PageKey,string> = {overview:"Visão geral",conversations:"Conversas",appointments:"Agendamentos",customers:"Clientes",sales:"Vendas e retornos",voice:"Áudio e voz",settings:"Configurações"};

export default function Home() {
 const [active,setActive]=useState<PageKey>("overview");
 const [aiEnabled,setAiEnabled]=useState(true);
 const [voiceEnabled,setVoiceEnabled]=useState(false);
 const [notice,setNotice]=useState("");
 const showNotice=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),3000)};
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">E</div><div><div className="brand-name">ELIZES IA</div><span className="brand-sub">TECNOLOGIA INTELIGENTE</span></div></div>
   <div><div className="nav-label">MENU PRINCIPAL</div><nav className="nav-list">{navigation.map(item=><button key={item.key} className={`nav-item ${active===item.key?"active":""}`} onClick={()=>setActive(item.key)}><item.icon size={17}/>{item.label}</button>)}</nav></div>
   <div className="side-bottom"><div className="nav-label">EMPRESA CONECTADA</div><div className="company-switch"><div className="company-avatar">SE</div><div className="company-meta"><b>Barbearia Seu Elizes</b><span>Conta proprietária</span></div><ChevronDown size={14} color="#91a49b"/></div><div style={{display:"flex",gap:8,alignItems:"center",padding:"17px 9px 0",color:"#6f857c",fontSize:10}}><CircleHelp size={14}/> Central de ajuda <span style={{marginLeft:"auto"}}>v0.1.0</span></div></div>
  </aside>
  <main className="main">
   <header className="topbar"><div><div className="eyebrow">ELIZES TECNOLOGIA / PAINEL</div><h1 className="page-title">{titles[active]}</h1><div className="sub-title">Acompanhe sua operação e cuide dos seus clientes.</div></div><div className="top-actions"><div className="status-pill"><span className="dot"/>{aiEnabled?"IA ativada":"IA pausada"}</div><div className="avatar">SE</div></div></header>
   {active==="overview" ? <>
    <section className="welcome"><div><h2>Olá! Bem-vindo à central da Seu Elizes.</h2><p>Sua assistente está preparada para organizar atendimentos e ajudar sua equipe.<br/>Este é o primeiro painel de demonstração da ELIZES IA.</p></div><div className="welcome-tag"><Sparkles size={13} style={{display:"inline",verticalAlign:"middle",marginRight:5}}/> Inteligência em atendimento</div></section>
    <section className="stats">
     <Stat icon={<MessageCircle size={17}/>} label="Conversas hoje" value="24" foot="Dados ilustrativos da demonstração"/>
     <Stat icon={<CalendarDays size={17}/>} label="Agendamentos" value="12" foot="Dados ilustrativos da demonstração"/>
     <Stat icon={<Users size={17}/>} label="Clientes atendidos" value="18" foot="Dados ilustrativos da demonstração"/>
     <Stat icon={<ShoppingBag size={17}/>} label="Oportunidades" value="07" foot="Dados ilustrativos da demonstração"/>
    </section>
    <section className="content-grid">
     <div className="panel"><div className="panel-head"><div><div className="panel-title">Conversas recentes</div><div className="panel-caption">Acompanhe os últimos contatos recebidos.</div></div><button className="link-btn" onClick={()=>setActive("conversations")}>Ver todas</button></div><div className="conversation-list">{conversations.map(c=><div className="conversation" key={c.name}><div className="person">{c.initials}</div><div className="conversation-info"><b>{c.name}</b><p>{c.message}</p></div><div style={{display:"grid",justifyItems:"end",gap:8}}><span className="conversation-time">{c.time}</span><span className={`tag ${c.status==="Novo"?"amber":""}`}>{c.status}</span></div></div>)}</div></div>
     <div className="panel"><div className="panel-head"><div><div className="panel-title">Ações rápidas</div><div className="panel-caption">Atalhos para a operação.</div></div><Zap size={17} color="#65d99d"/></div><div className="quick-list"><Quick icon={<CalendarDays size={17}/>} title="Ver agenda" desc="Confira os próximos horários" onClick={()=>setActive("appointments")}/><Quick icon={<Users size={17}/>} title="Cadastrar cliente" desc="Organize sua base de contatos" onClick={()=>setActive("customers")}/><Quick icon={<Bot size={17}/>} title={aiEnabled?"Pausar atendimento IA":"Ativar atendimento IA"} desc="Controle as respostas automáticas" onClick={()=>setAiEnabled(!aiEnabled)}/><Quick icon={<AudioLines size={17}/>} title="Configurar voz" desc="Personalize respostas por áudio" onClick={()=>setActive("voice")}/></div></div>
    </section>
    <section className="bottom-grid"><div className="panel"><div className="panel-head"><div><div className="panel-title">Movimento de atendimento</div><div className="panel-caption">Exemplo visual de distribuição semanal.</div></div><Activity size={17} color="#75dca8"/></div><div className="bar-list">{[["Segunda",68],["Terça",82],["Quarta",48],["Quinta",76],["Sexta",94],["Sábado",60]].map(([day,n])=><div className="bar-row" key={day}><span>{day}</span><div className="bar-track"><div className="bar-fill" style={{width:n+"%"}}/></div><b style={{color:"#c5d5ce",fontWeight:500}}>{n}%</b></div>)}</div></div>
     <div className="panel"><div className="panel-head"><div><div className="panel-title">Próximos agendamentos</div><div className="panel-caption">Exemplos para visualizar a agenda.</div></div><button className="link-btn" onClick={()=>setActive("appointments")}>Abrir agenda</button></div><div className="conversation-list">{upcoming.map(a=><div className="conversation" key={a.name}><div className="stat-icon"><Clock3 size={15}/></div><div className="conversation-info"><b>{a.name}</b><p>{a.service} · {a.pro}</p></div><span className="conversation-time">{a.time}</span></div>)}</div></div>
    </section>
   </> : <Section page={active} aiEnabled={aiEnabled} setAiEnabled={setAiEnabled} voiceEnabled={voiceEnabled} setVoiceEnabled={setVoiceEnabled} showNotice={showNotice}/>}
   {notice && <div style={{position:"fixed",bottom:22,right:22,background:"#17382b",border:"1px solid #367b58",padding:"12px 17px",borderRadius:10,fontSize:12,color:"#c9f5dc"}}>{notice}</div>}
  </main>
 </div>
}
function Stat({icon,label,value,foot}:{icon:React.ReactNode;label:string;value:string;foot:string}){return <div className="stat-card"><div className="stat-head"><span>{label}</span><div className="stat-icon">{icon}</div></div><div className="stat-value">{value}</div><div className="stat-foot">{foot}</div></div>}
function Quick({icon,title,desc,onClick}:{icon:React.ReactNode;title:string;desc:string;onClick:()=>void}){return <button className="quick-action" onClick={onClick}><div className="quick-icon">{icon}</div><div><b>{title}</b><span>{desc}</span></div><Plus size={15} style={{marginLeft:"auto",color:"#729286"}}/></button>}
function Section({page,aiEnabled,setAiEnabled,voiceEnabled,setVoiceEnabled,showNotice}:{page:PageKey;aiEnabled:boolean;setAiEnabled:(v:boolean)=>void;voiceEnabled:boolean;setVoiceEnabled:(v:boolean)=>void;showNotice:(s:string)=>void}){
 const messages:Record<PageKey,{title:string;desc:string;icon:React.ReactNode;items:string[]}>={
 overview:{title:"Visão geral",desc:"",icon:<LayoutDashboard/>,items:[]},
 conversations:{title:"Central de conversas",desc:"As conversas reais aparecerão aqui depois da conexão com a API oficial do WhatsApp.",icon:<MessageCircle/>,items:["Caixa de entrada unificada","Status de atendimento: aberto, aguardando e concluído","Transferência para atendimento humano"]},
 appointments:{title:"Agenda de agendamentos",desc:"A agenda será conectada aos horários e profissionais cadastrados pela barbearia.",icon:<CalendarDays/>,items:["Visualização diária e semanal","Disponibilidade por profissional","Confirmação, cancelamento e lembretes"]},
 customers:{title:"Base de clientes",desc:"Cadastro e histórico de relacionamento dos clientes da Barbearia Seu Elizes.",icon:<Users/>,items:["Nome e telefone","Histórico de conversas e visitas","Preferências e observações"]},
 sales:{title:"Vendas e recuperação",desc:"Organize oportunidades e retornos de clientes, respeitando consentimento e as regras de mensagens do WhatsApp.",icon:<ShoppingBag/>,items:["Clientes que pediram informações","Lembretes de retorno autorizados","Relatório de conversões"]},
 voice:{title:"Áudio e voz",desc:"Configuração inicial para atendimento por áudio e respostas faladas.",icon:<AudioLines/>,items:["Receber e transcrever áudios","Gerar resposta em áudio","Selecionar voz e estilo da assistente"]},
 settings:{title:"Configurações da assistente",desc:"Defina como a IA deve representar a qualidade e a cordialidade da Barbearia Seu Elizes.",icon:<Settings2/>,items:["Nome: Assistente Seu Elizes","Tom: cordial, elegante e objetivo","Idioma: português brasileiro"]}
 };
 const data=messages[page];
 return <section className="section-page"><div className="panel"><div className="panel-head"><div><div className="panel-title">{data.title}</div><div className="panel-caption">{data.desc}</div></div><div className="stat-icon">{data.icon}</div></div><div className="quick-list">{data.items.map((item,i)=><div className="quick-action" key={item} style={{cursor:"default"}}><div className="quick-icon">{i===0?<CheckCheck size={16}/>:i===1?<Clock3 size={16}/>:<Headphones size={16}/>}</div><div><b>{item}</b><span>Disponível na estrutura planejada da ELIZES IA.</span></div></div>)}</div></div>
 {page==="settings"&&<div className="panel"><div className="panel-head"><div><div className="panel-title">Atendimento automático</div><div className="panel-caption">Controle demonstrativo, ainda sem envio de mensagens.</div></div><button className="status-pill" onClick={()=>setAiEnabled(!aiEnabled)}>{aiEnabled?"Ativado":"Pausado"}</button></div><p className="empty-note">A chave liga/desliga será conectada ao motor de atendimento depois da integração com WhatsApp.</p></div>}
 {page==="voice"&&<div className="panel"><div className="panel-head"><div><div className="panel-title">Resposta por voz</div><div className="panel-caption">Ative quando a integração de áudio estiver configurada.</div></div><button className="status-pill" onClick={()=>setVoiceEnabled(!voiceEnabled)}>{voiceEnabled?"Ativada":"Desativada"}</button></div><p className="empty-note">Esta opção é apenas visual neste protótipo e ainda não gera nem envia áudio.</p></div>}
 <div className="panel"><div className="panel-title">Próxima integração</div><p className="empty-note">Conectar esta tela ao Supabase Meni uza e à API oficial do WhatsApp. Nenhuma mensagem será enviada até configurar as credenciais e validar o webhook.</p><button className="link-btn" style={{padding:"9px 0"}} onClick={()=>showNotice("Estrutura visual pronta. Integração será configurada na próxima etapa.")}>Entendi</button></div>
 </section>
}
