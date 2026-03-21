import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Link as LinkIcon, 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  Layout,
  Eye,
  Zap,
  ChevronRight,
  ChevronDown,
  Download,
  RefreshCw,
  Search,
  Check,
  Copy,
  ExternalLink,
  Share2,
  Menu,
  X
} from 'lucide-react';
import { analyzeInstagramProfile, ProfileAnalysis } from './services/geminiService';

const LoadingMessages = [
  "Analisando a estética do seu perfil...",
  "Mapeando padrões de engajamento...",
  "Criando temas estratégicos para os próximos 30 dias...",
  "Gerando ganchos de conteúdo de alto impacto...",
  "Otimizando caminhos de conversão...",
  "Finalizando seu roteiro de crescimento personalizado..."
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-2 hover:bg-brand-bg rounded-lg transition-colors text-brand-subtle hover:text-brand-primary"
      title="Copiar para área de transferência"
    >
      {copied ? <Check size={16} className="text-brand-teal" /> : <Copy size={16} />}
    </button>
  );
};

export default function App() {
  const [handle, setHandle] = useState('');
  const [url, setUrl] = useState('');
  const [bioLink, setBioLink] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [result, setResult] = useState<ProfileAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'strategy' | 'calendar'>('analysis');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const interval = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % LoadingMessages.length);
    }, 3000);

    try {
      const data = await analyzeInstagramProfile(handle, url, bioLink, niche);
      setResult(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Falha ao analisar o perfil. Verifique sua chave de API e tente novamente.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-primary/30">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0" />

      {/* Header */}
      <header className="glass-panel border-none rounded-none sticky top-0 z-50 border-b border-brand-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <Instagram className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight block leading-none">Instagrow.AI</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-subtle">Conteúdo bonito é bom. Conteúdo estratégico vende.</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {result && (
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 text-sm font-bold text-brand-muted hover:text-brand-text transition-all hover:scale-105"
              >
                <Download size={18} />
                Exportar PDF
              </button>
            )}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-primary hover:text-brand-primary-dark transition-colors"
            >
              <ExternalLink size={18} />
              Instagram
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {!result && !loading && (
          <div className="max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles size={14} />
                Destrave o crescimento do seu perfil
              </div>
              <h1 className="text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Domine o Instagram <br />
                <span className="text-brand-muted italic font-serif font-normal">Conteúdo bonito é bom. Conteúdo estratégico vende.</span>
              </h1>
              <p className="text-xl text-brand-muted max-w-xl mx-auto leading-relaxed">
                Análise profunda, plano de 30 dias e calendário editorial completo. Tudo o que você precisa para crescer de verdade.
              </p>
            </motion.div>

            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="card-elevated p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-subtle">@ do Instagram</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-subtle">@</span>
                    <input 
                      required
                      type="text" 
                      placeholder="usuario"
                      className="input-field pl-8"
                      value={handle}
                      onChange={e => setHandle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-subtle">URL do Perfil</label>
                  <input 
                    required
                    type="url" 
                    placeholder="https://instagram.com/..."
                    className="input-field"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-subtle">Link da Bio (Site/Linktree)</label>
                <input 
                  type="url" 
                  placeholder="https://meusite.com.br"
                  className="input-field"
                  value={bioLink}
                  onChange={e => setBioLink(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-subtle">Nicho e Objetivos</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Conte-nos sobre seu negócio, público-alvo e o que você deseja alcançar..."
                  className="input-field resize-none"
                  value={niche}
                  onChange={e => setNiche(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-cta text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity group shadow-lg shadow-brand-cta/20"
              >
                Gerar Estratégia
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 space-y-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-brand-border border-t-brand-primary rounded-full animate-spin"></div>
              <Sparkles className="absolute -top-2 -right-2 text-brand-amber animate-pulse" />
            </div>
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={loadingMsgIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl font-medium text-brand-muted"
                >
                  {LoadingMessages[loadingMsgIdx]}
                </motion.p>
              </AnimatePresence>
              <p className="text-sm text-brand-subtle mt-2 italic">Isso pode levar até 60 segundos...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-8">
            {/* Dashboard Navigation */}
            <div className="flex items-center gap-4 bg-brand-elevated p-2 rounded-2xl border border-brand-border w-fit mx-auto">
              <button 
                onClick={() => setActiveTab('analysis')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'analysis' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-brand-muted hover:bg-brand-bg'}`}
              >
                Análise
              </button>
              <button 
                onClick={() => setActiveTab('strategy')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'strategy' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-brand-muted hover:bg-brand-bg'}`}
              >
                Estratégia 30 Dias
              </button>
              <button 
                onClick={() => setActiveTab('calendar')}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'calendar' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-brand-muted hover:bg-brand-bg'}`}
              >
                Calendário Editorial
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'analysis' && (
                <motion.div 
                  key="analysis"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Left Column: Summary & Bio */}
                  <div className="lg:col-span-2 space-y-8">
                    <section className="card-elevated p-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Search size={24} className="text-brand-primary" />
                        Análise do Perfil
                      </h2>
                      <p className="text-brand-muted leading-relaxed mb-8">
                        {result.profile_analysis}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-brand-teal/5 rounded-2xl border border-brand-teal/20 card-glow">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-teal mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} />
                            Pontos Fortes
                          </h3>
                          <ul className="space-y-3">
                            {result.strengths.map((s, i) => (
                              <li key={i} className="text-sm text-brand-text/80 flex gap-2">
                                <span className="text-brand-teal opacity-40">•</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 bg-brand-cta/5 rounded-2xl border border-brand-cta/20 card-glow">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-cta mb-4 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Pontos Fracos
                          </h3>
                          <ul className="space-y-3">
                            {result.weaknesses.map((w, i) => (
                              <li key={i} className="text-sm text-brand-text/80 flex gap-2">
                                <span className="text-brand-cta opacity-40">•</span> {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section className="card-elevated p-8">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Layout size={24} className="text-brand-primary" />
                        Melhorias na Bio
                      </h2>
                      <div className="space-y-4">
                        {result.bio_improvements.map((item, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-brand-bg rounded-xl border border-brand-border group hover:border-brand-primary/30 transition-colors">
                            <div className="w-6 h-6 bg-brand-primary text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </div>
                            <p className="text-sm text-brand-muted flex-grow">{item}</p>
                            <CopyButton text={item} />
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Right Column: Visual & Conversion */}
                  <div className="space-y-8">
                    <section className="card-elevated p-8">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Eye size={20} className="text-brand-primary" />
                        Visual e Estética
                      </h2>
                      <ul className="space-y-4">
                        {result.visual_improvements.map((v, i) => (
                          <li key={i} className="text-sm text-brand-muted flex gap-3">
                            <ChevronRight size={16} className="flex-shrink-0 mt-0.5 text-brand-primary/40" />
                            {v}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="card-elevated p-8">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Zap size={20} className="text-brand-amber" />
                        Otimização de Conversão
                      </h2>
                      <ul className="space-y-4">
                        {result.conversion_optimization.map((c, i) => (
                          <li key={i} className="text-sm text-brand-muted flex gap-3">
                            <ChevronRight size={16} className="flex-shrink-0 mt-0.5 text-brand-amber/40" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-brand-primary text-white p-8 rounded-3xl shadow-xl shadow-brand-primary/20">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Target size={20} />
                        Plano de Ação Imediato
                      </h2>
                      <div className="space-y-4">
                        {result.action_plan.map((a, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 border border-white/20 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <CheckCircle2 size={12} className="text-white/60" />
                            </div>
                            <p className="text-sm text-white/90">{a}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </motion.div>
              )}

              {activeTab === 'strategy' && (
                <motion.div 
                  key="strategy"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <section className="card-elevated p-8">
                    <h2 className="text-3xl font-bold mb-4">Visão Geral Estratégica</h2>
                    <p className="text-lg text-brand-muted leading-relaxed">
                      {result.thirty_day_strategy.overview}
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {result.thirty_day_strategy.weekly_themes.map((week) => (
                      <div key={week.week} className="card-elevated overflow-hidden flex flex-col">
                        <div className="p-6 bg-brand-primary text-white">
                          <div className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">Semana {week.week}</div>
                          <h3 className="text-xl font-bold">{week.theme}</h3>
                        </div>
                        <div className="p-8 space-y-6 flex-grow">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-subtle mb-3">Pilares de Conteúdo</h4>
                            <div className="flex flex-wrap gap-2">
                              {week.content_pillars.map((p, i) => (
                                <span key={i} className="px-3 py-1 bg-brand-bg rounded-full text-xs font-medium text-brand-muted border border-brand-border">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-subtle mb-3">Cronograma de Postagem</h4>
                            <ul className="space-y-2">
                              {week.posting_schedule.map((s, i) => (
                                <li key={i} className="text-sm text-brand-muted flex gap-2">
                                  <span className="text-brand-primary opacity-40">•</span> {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-4 border-t border-brand-border">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-subtle mb-3">Resultados Esperados</h4>
                            <ul className="space-y-2">
                              {week.expected_results.map((r, i) => (
                                <li key={i} className="text-sm text-brand-teal font-medium flex gap-2">
                                  <TrendingUp size={14} className="mt-0.5 flex-shrink-0" /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'calendar' && (
                <motion.div 
                  key="calendar"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="card-elevated p-6 flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">Calendário de Conteúdo (30 Dias)</h2>
                      <p className="text-brand-subtle text-sm">Mix estratégico de Reels, Carrosséis e Stories</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
                        <div className="w-3 h-3 bg-purple-500/20 rounded-full border border-purple-500/40"></div> Reels
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
                        <div className="w-3 h-3 bg-blue-500/20 rounded-full border border-blue-500/40"></div> Carrosséis
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-brand-muted">
                        <div className="w-3 h-3 bg-brand-cta/20 rounded-full border border-brand-cta/40"></div> Stories
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {result.content_calendar.map((post) => (
                      <div 
                        key={post.day} 
                        className={`card-elevated p-6 relative overflow-hidden group hover:border-brand-primary/40 transition-all duration-300`}
                      >
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-110 ${
                          post.format.toLowerCase().includes('reel') ? 'bg-purple-500' : 
                          post.format.toLowerCase().includes('carousel') ? 'bg-blue-500' : 
                          'bg-brand-cta'
                        }`}></div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 bg-brand-primary text-white rounded-lg flex items-center justify-center text-xs font-bold">
                              {post.day}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              post.format.toLowerCase().includes('reel') ? 'bg-purple-500/10 text-purple-400' : 
                              post.format.toLowerCase().includes('carousel') ? 'bg-blue-500/10 text-blue-400' : 
                              'bg-brand-cta/10 text-brand-cta'
                            }`}>
                              {post.format}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold text-brand-subtle uppercase tracking-wider">{post.objective}</span>
                            <CopyButton text={`${post.title_or_hook}\n\n${post.content_outline.join('\n')}\n\nCTA: ${post.cta}`} />
                          </div>
                        </div>

                        <h3 className="font-bold text-lg mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                          {post.title_or_hook}
                        </h3>

                        <div className="space-y-3 mb-6">
                          {post.content_outline.map((step, i) => (
                            <p key={i} className="text-xs text-brand-muted leading-relaxed flex gap-2">
                              <span className="text-brand-primary/40 font-mono">{i + 1}.</span> {step}
                            </p>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-subtle uppercase tracking-wider">
                            <Zap size={12} className="text-brand-amber" />
                            CTA: {post.cta}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-brand-border text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center">
            <Instagram className="text-white w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm tracking-tight">Instagrow.AI</span>
        </div>
        <p className="text-xs text-brand-subtle">
          Desenvolvido com Gemini 3.1 Pro • Foco em Crescimento • © 2026
        </p>
      </footer>
    </div>
  );
}
