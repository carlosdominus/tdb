
import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Play, Search, MessageCircle, ChevronRight, HelpCircle, ChevronLeft } from 'lucide-react';

export const HelpView: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const videos = [
    { title: 'Primeiros Passos: Como navegar no App', duration: '3:45', thumbnail: 'https://picsum.photos/seed/h1/800/450' },
    { title: 'Configurando seus Lembretes Diários', duration: '2:15', thumbnail: 'https://picsum.photos/seed/h2/800/450' },
    { title: 'Entendendo os Gráficos de Evolução', duration: '4:10', thumbnail: 'https://picsum.photos/seed/h3/800/450' },
    { title: 'Como registrar seus resultados diários', duration: '1:55', thumbnail: 'https://picsum.photos/seed/h4/800/450' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 mt-4">
      {onBack && (
        <div className="mb-4">
          <button onClick={onBack} className="flex items-center gap-2 text-[#86868B] hover:text-[#1B4D3E] transition-colors font-black text-[11px] uppercase tracking-[0.2em]">
            <ChevronLeft size={20} /> Voltar
          </button>
        </div>
      )}

      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1B4D3E] mb-2 uppercase tracking-tight">Central de Ajuda</h1>
        <p className="text-[#86868B] font-medium">Tudo o que você precisa saber para dominar a ferramenta.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Qual sua dúvida?"
          className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border-none shadow-sm focus:ring-2 focus:ring-[#2ECC71] transition-all outline-none font-medium"
        />
      </div>

      <section>
        <h2 className="text-xl font-bold mb-6 text-[#1B4D3E] uppercase tracking-tight">Tutoriais em Vídeo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((vid, i) => (
            <GlassCard key={i} className="p-0 overflow-hidden group cursor-pointer border-none shadow-md" hoverEffect>
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img src={vid.thumbnail} alt={vid.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#2ECC71] group-hover:scale-110 transition-all">
                  <Play size={24} fill="currentColor" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-[10px] text-white font-bold">
                  {vid.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1B4D3E] text-sm leading-tight group-hover:text-[#2ECC71] transition-colors">{vid.title}</h3>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#1B4D3E] uppercase tracking-tight mb-2">Suporte Direto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard className="flex items-center justify-between group hover:bg-green-50 transition-colors cursor-pointer border-none shadow-sm" onClick={() => window.open('https://wa.me/seunumerowhatsapp', '_blank')}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-[#2ECC71] flex items-center justify-center group-hover:bg-[#2ECC71] group-hover:text-white transition-all">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4D3E]">Suporte via WhatsApp</h3>
                <p className="text-xs text-[#86868B] font-medium">Fale com nossa equipe agora</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#1B4D3E] transition-all" />
          </GlassCard>

          <GlassCard className="flex items-center justify-between group hover:bg-blue-50 transition-colors cursor-pointer border-none shadow-sm" onClick={() => alert("Central de artigos em desenvolvimento.")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <HelpCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#1B4D3E]">Base de Conhecimento</h3>
                <p className="text-xs text-[#86868B] font-medium">Artigos e guias detalhados</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300 group-hover:text-[#1B4D3E] transition-all" />
          </GlassCard>
        </div>
      </section>
    </div>
  );
};
