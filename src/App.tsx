/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import founderImage from './assets/images/fundador_sena_portrait_1790199544562.jpg';
import escudoImg from './assets/images/sena_escudo_simbolo_1790278308530.jpg';
import banderaImg from './assets/images/sena_bandera_simbolo_1790278320450.jpg';
import NormativaModule from './components/NormativaModule';
import EstructuraModule from './components/EstructuraModule';
import EvaluationRepository from './components/EvaluationRepository';
import ApprenticeProfileModal from './components/ApprenticeProfileModal';
import { ApprenticeProfile } from './types';
import {
  getSavedProfile,
  getEvaluationRepository,
} from './utils/repositoryStorage';
import {
  BookOpen,
  Compass,
  Database,
  UserCheck,
  User,
  Award,
  Sparkles,
  Play,
  ArrowRight,
  Shield,
  Scale,
  FileText,
  ExternalLink,
  Info,
  Calendar,
  X,
  GraduationCap,
  Layers,
  ChevronRight,
  Music,
  Flag,
  Volume2,
  Maximize2
} from 'lucide-react';

const SENA_LOGO_URL = "data:image/svg+xml,%3c?xml%20version=%271.0%27%20encoding=%27utf-8%27?%3e%3c!--%20Generator:%20Adobe%20Illustrator%2026.0.1,%20SVG%20Export%20Plug-In%20.%20SVG%20Version:%206.00%20Build%200)%20--%3e%3csvg%20version=%271.1%27%20id=%27Capa_1%27%20xmlns=%27http://www.w3.org/2000/svg%27%20xmlns:xlink=%27http://www.w3.org/1999/xlink%27%20x=%270px%27%20y=%270px%27%20viewBox=%270%200%201000%201000%27%20style=%27enable-background:new%200%200%201000%201000;%27%20xml:space=%27preserve%27%3e%3cstyle%20type=%27text/css%27%3e%20.st0{fill:%2339a900;}%20%3c/style%3e%3cpath%20id=%27path47-5%27%20class=%27st0%27%20d=%27M504.2,20.5c-58.3,0.1-105.6,47.4-105.5,105.8c0.1,58.3,47.4,105.6,105.7,105.6%20c58.3,0,105.6-47.3,105.6-105.7V126C609.9,67.6,562.6,20.4,504.2,20.5z%20M155.6,264.6c-18.6,0.1-37.5,1.1-55.2,5.6%20c-11.7,3-23,7.8-30.3,15.4c-9.2,9.5-10.4,22.3-5.9,33.3c4,9.7,14.8,16.9,26.8,21.1c25.9,8.9,54.6,10.7,81.8,16.3%20c5,1.2,10.6,2.6,13.7,6c3.2,4.1,1.3,9.7-4,12.2c-8.8,4.5-20.1,4.5-30.4,4.4c-9.4-0.4-19.7-1.2-27.2-5.9c-5.5-3.4-6.5-9.1-5.2-14.1%20l-60.6,0c-0.2,9.2,1.6,18.9,8.4,26.8c5.6,6.8,14.8,11.5,24.6,14.4c15.7,4.6,32.7,6,49.4,6.4c22.7,0.4,45.8-0.3,67.6-5.4%20c13-3.2,25.8-8.3,34.1-16.6c14.8-14.8,11.3-38.3-8.3-49.8c-9.8-5.7-21.5-9.2-33.4-11.5c-17.5-3.6-35.3-6.3-52.9-9.2%20c-6.2-1.2-12.8-2.3-18-5.2c-5.5-2.9-5.9-9.8-0.3-12.9c7.2-4.1,16.8-4,25.4-4c9.1,0.2,19,0.7,26.5,5c4.2,2.3,5.9,6.3,5.9,10.1%20l57.6-0.1c-0.2-7.3-1.6-14.9-6.9-21.2c-6.2-7.8-17.1-12.7-28.3-15.5C192.8,265.6,174.1,264.7,155.6,264.6L155.6,264.6z%20M280.6,268.9%20l0,137.7l168.1,0l0-30H342.3v-26.7h94.9v-29.3h-94.9l0-21.9l102.6,0l-0.1-29.7L280.6,268.9z%20M557.5,269c0,0-51.9,0-77.9,0l0,137.7%20l59,0l0-92.7l80.8,92.6l81,0.1l0-137.7l-59.1,0l0.1,92L557.5,269z%20M805.6,269.2c0,0-63.6,91.9-95.6,137.7l61.9,0l14.9-24.8h95.7%20l13.9,24.9l68.8,0L874,269.2L805.6,269.2z%20M836.6,302.1l29.4,49.9l-60.7,0.1L836.6,302.1z%20M10.6,445.6l0.5,75l280.1-1%20c14.3,3.1,22.6,12.4,19.7,33.5L138.6,854.7l56.1,52.5l266.9-461.6L10.6,445.6z%20M545.2,446.2l262.4,459.6l58-52.1L691.3,552.9%20c-2.9-21.2,5.4-30.6,19.7-33.7l280.2,1l-0.1-73.7L545.2,446.2z%20M500.9,522.3L254.8,944.7l65.4,31.9L484.4,699%20c5.7-4.6,11.4-7.1,17.1-7.3c6-0.2,12.2,2,18.3,6.8l163.8,278.4l67.4-35.2L500.9,522.3z%27/%3e%3cg%20id=%27_x23_000000ff-2%27%20transform=%27matrix(0.31570611,0,0,0.23560774,-391.49698,-10.601126)%27%3e%3c/g%3e%3c/svg%3e";

export default function App() {
  const [viewMode, setViewMode] = useState<'modules' | 'repository'>('modules');
  const [activeModuleId, setActiveModuleId] = useState<'identidad' | 'estructura' | 'normativa'>('identidad');
  const [normativaTab, setNormativaTab] = useState<'explorador' | 'documento' | 'evaluacion'>('explorador');

  // Perfil del aprendiz (asociado a las evaluaciones)
  const [profile, setProfile] = useState<ApprenticeProfile>(getSavedProfile());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
  const [zoomedSymbol, setZoomedSymbol] = useState<{
    titulo: string;
    imagen: string;
    subtitulo: string;
    descripcion: string;
    detalles: string[];
  } | null>(null);

  // Repositorio contador
  const [repositoryCount, setRepositoryCount] = useState<number>(0);

  // Actualizar contador del repositorio
  const refreshRepositoryCount = () => {
    const list = getEvaluationRepository();
    setRepositoryCount(list.length);
  };

  useEffect(() => {
    refreshRepositoryCount();
    setProfile(getSavedProfile());
  }, [viewMode, activeModuleId]);

  // Función para ir directamente a la evaluación (solicitará datos en la pantalla previa del quiz)
  const handleGoToEvaluation = () => {
    setViewMode('modules');
    setActiveModuleId('normativa');
    setNormativaTab('evaluacion');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans antialiased">
      {/* Modal de Actualización / Consulta de Ficha del Aprendiz */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={(updated) => {
          setProfile(updated);
          refreshRepositoryCount();
        }}
      />

      {/* Modal Informativo del Fundador Rodolfo Martínez Tono (evita window.alert) */}
      {isFounderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-emerald-800 to-teal-800 p-6 text-white relative">
              <button
                onClick={() => setIsFounderModalOpen(false)}
                className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-emerald-200 uppercase tracking-wider">
                Fundador Histórico
              </span>
              <h3 className="text-xl font-black mt-2">Dr. Rodolfo Martínez Tono (1927 - 2015)</h3>
              <p className="text-xs text-emerald-100 mt-1">Economista, diplomático y padre del SENA</p>
            </div>

            <div className="p-6 space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed">
              <div className="flex gap-4 items-center">
                <img
                  src={founderImage}
                  alt="Dr. Rodolfo Martínez Tono"
                  className="w-20 h-24 object-cover rounded-xl border-2 border-emerald-600 shadow-sm shrink-0"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    Director General durante los primeros 17 años (1957 - 1974)
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Cartagenero visionary que propuso la creación del SENA como tesis de grado doctoral en la Universidad Javeriana.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                <strong className="block mb-1 text-emerald-900">Pensamiento Fundacional:</strong>
                "Una institución donde el trabajador colombiano adquiera no solo conocimientos técnicos, sino la conciencia de su dignidad como ser humano y su responsabilidad ciudadana."
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p>• Concibió los centros móviles, la formación profesional integral y el sistema de aprendizaje empresarial.</p>
                <p>• Impulsó convenios internacionales con la OIT (Organización Internacional del Trabajo) y gobiernos de Europa y América.</p>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setIsFounderModalOpen(false)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ampliación de Símbolos Institucionales (Escudo / Bandera) */}
      {zoomedSymbol && (
        <div
          onClick={() => setZoomedSymbol(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95"
          >
            <div className="bg-linear-to-r from-emerald-800 to-teal-800 p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-emerald-200 uppercase tracking-wider">
                  Símbolo Institucional
                </span>
                <h3 className="text-xl font-black mt-1">{zoomedSymbol.titulo}</h3>
                <p className="text-xs text-emerald-100">{zoomedSymbol.subtitulo}</p>
              </div>
              <button
                onClick={() => setZoomedSymbol(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <img
                  src={zoomedSymbol.imagen}
                  alt={zoomedSymbol.titulo}
                  referrerPolicy="no-referrer"
                  className="max-h-72 object-contain rounded-xl shadow-xs"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {zoomedSymbol.descripcion}
              </p>

              {zoomedSymbol.detalles && zoomedSymbol.detalles.length > 0 && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-950">
                  <span className="font-bold block text-emerald-900">Significado heráldico y representativo:</span>
                  {zoomedSymbol.detalles.map((det, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="text-right pt-2">
                <button
                  onClick={() => setZoomedSymbol(null)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          BARRA SUPERIOR GLOBAL INSTITUCIONAL
         ======================================================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo y Título SENA */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <img
                src={SENA_LOGO_URL}
                alt="Logo SENA"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wider text-emerald-800 uppercase">
                  SENA COLOMBIA
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hidden sm:inline-block">
                  Acuerdo 009 de 2024
                </span>
              </div>
              <h1 className="text-sm md:text-base font-bold text-slate-800 tracking-tight leading-none">
                Inducción Interactiva y Repositorio de Saberes
              </h1>
            </div>
          </div>

          {/* Acceso a la Ficha y Repositorio */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tarjeta del Aprendiz (consulta/edición opcional) */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all flex items-center gap-2 text-left cursor-pointer group"
              title="Haz clic para consultar o editar tus datos básicos de aprendiz"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {profile.nombreCompleto.charAt(0) || 'L'}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-bold text-emerald-950 group-hover:text-emerald-700 leading-tight tracking-tight flex items-center gap-1.5">
                  {profile.nombreCompleto || 'Lilian Alvarez'}
                </div>
                <div className="text-[10px] text-slate-500">
                  Ficha: <span className="font-mono font-semibold text-emerald-700">{profile.ficha}</span> • {profile.programa.substring(0, 20)}...
                </div>
              </div>
            </button>

            {/* Botón directo al Repositorio de Evaluaciones */}
            <button
              onClick={() => setViewMode('repository')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                viewMode === 'repository'
                  ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Repositorio</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-mono">
                {repositoryCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          VISTA PRINCIPAL: MÓDULOS DE FORMACIÓN VS REPOSITORIO
         ======================================================== */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {/* Barra superior de navegación entre Módulos y Repositorio */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('modules')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'modules'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Módulos de Inducción</span>
            </button>

            <button
              onClick={() => setViewMode('repository')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'repository'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Repositorio de Evaluaciones y Respuestas</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/20 text-current">
                {repositoryCount}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGoToEvaluation}
              className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Presentar Evaluación de Normativa</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            SI LA VISTA ES EL REPOSITORIO DE EVALUACIONES
           ======================================================== */}
        {viewMode === 'repository' ? (
          <EvaluationRepository
            onBackToModules={() => setViewMode('modules')}
            onTakeQuizAgain={() => {
              handleGoToEvaluation();
            }}
          />
        ) : (
          /* ========================================================
              SI LA VISTA SON LOS MÓDULOS DE FORMACIÓN
             ======================================================== */
          <div className="space-y-6">
            {/* Banner de Bienvenida y Accesos Rápidos */}
            <div className="bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
              <div className="max-w-3xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/10">
                  <GraduationCap className="w-4 h-4" />
                  <span>Proceso de Inducción Institucional</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Bienvenido al Entorno de Aprendizaje y Reglamento SENA
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-2xl">
                  Explora la historia fundacional, la estructura territorial de las 33 regionales y el marco del <strong>Acuerdo 009 de 2024</strong>. Cuando decidas presentar la prueba de conocimientos, se solicitarán tus datos para certificar tus respuestas en el repositorio académico.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setActiveModuleId('identidad')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeModuleId === 'identidad'
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    1. Historia e Identidad
                  </button>
                  <button
                    onClick={() => setActiveModuleId('estructura')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeModuleId === 'estructura'
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    2. Estructura y Centros
                  </button>
                  <button
                    onClick={() => {
                      setActiveModuleId('normativa');
                      setNormativaTab('explorador');
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeModuleId === 'normativa' && normativaTab !== 'evaluacion'
                        ? 'bg-white text-emerald-900 shadow-xs'
                        : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                    }`}
                  >
                    3. Normativa (Acuerdo 009)
                  </button>
                  <button
                    onClick={handleGoToEvaluation}
                    className="px-4 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <Award className="w-4 h-4 text-emerald-900" />
                    <span>Presentar Evaluación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Layout principal con barra lateral y panel de contenidos */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Barra lateral de selección de módulos */}
              <div className="lg:col-span-1 space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                    Módulos de Formación
                  </h3>

                  {/* Módulo 1: Identidad */}
                  <button
                    onClick={() => setActiveModuleId('identidad')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      activeModuleId === 'identidad'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold block uppercase">Módulo 1</span>
                      <span className="text-xs md:text-sm">Identidad SENA</span>
                      <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                        Historia, video oficial, símbolos y fundador.
                      </p>
                    </div>
                  </button>

                  {/* Módulo 2: Estructura */}
                  <button
                    onClick={() => setActiveModuleId('estructura')}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      activeModuleId === 'estructura'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-teal-100 text-teal-700 shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-teal-600 font-bold block uppercase">Módulo 2</span>
                      <span className="text-xs md:text-sm">Estructura Organizativa</span>
                      <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                        Mapa interactivo de las 33 regionales y centros.
                      </p>
                    </div>
                  </button>

                  {/* Módulo 3: Marco Normativo */}
                  <button
                    onClick={() => {
                      setActiveModuleId('normativa');
                      setNormativaTab('explorador');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      activeModuleId === 'normativa'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-600 font-bold block uppercase">Módulo 3</span>
                      <span className="text-xs md:text-sm">Marco Normativo y Prueba</span>
                      <p className="text-[11px] text-slate-400 font-normal mt-0.5">
                        Acuerdo 009 de 2024 y evaluación interactiva.
                      </p>
                    </div>
                  </button>
                </div>

                {/* Acceso Rápido a la Evaluación con Refuerzo */}
                <div className="bg-emerald-900 text-white rounded-2xl p-4 shadow-sm space-y-3 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-200">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Evaluación de Conocimientos</span>
                  </div>
                  <p className="text-emerald-100 leading-relaxed">
                    Comprueba tu asimilación de los 24 derechos, 24 deberes y prohibiciones. Al ingresar a la prueba se registrarán tus datos básicos.
                  </p>
                  <button
                    onClick={handleGoToEvaluation}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Presentar Evaluación</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Área de Contenido Principal del Módulo Seleccionado */}
              <div className="lg:col-span-3">
                {/* ========================================================
                    MÓDULO 1: IDENTIDAD SENA (HISTORIA, VIDEO Y SÍMBOLOS)
                   ======================================================== */}
                {activeModuleId === 'identidad' && (
                  <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-xs space-y-8">
                    {/* Encabezado */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                            Módulo 1 • ADN Institucional
                          </span>
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            Historia del SENA
                          </span>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mt-1">
                          Historia del SENA, Identidad y Memoria
                        </h2>
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold self-start sm:self-auto">
                        Fundado el 21 de junio de 1957
                      </span>
                    </div>

                    {/* Reseña Histórica */}
                    <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed">
                      <p>
                        El <strong>Servicio Nacional de Aprendizaje (SENA)</strong> nació el <strong>21 de junio de 1957</strong> gracias a la iniciativa del ilustre economista cartagenero <strong>Dr. Rodolfo Martínez Tono</strong>, con el respaldo tripartito de los trabajadores, los empresarios y el Gobierno Nacional.
                      </p>
                      <p>
                        Su misión original fue brindar formación técnica y cualificación a la creciente clase trabajadora del país, convirtiéndose en el patrimonio educativo y formativo más querido por las familias colombianas.
                      </p>
                    </div>

                    {/* VIDEO OFICIAL DE LA HISTORIA DEL SENA (Solicitado por el usuario) */}
                    <div className="space-y-3 bg-slate-900 rounded-3xl p-5 md:p-6 text-white shadow-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
                            <Play className="w-4 h-4 fill-current" />
                          </div>
                          <div>
                            <h4 className="text-sm md:text-base font-bold text-white leading-tight">
                              Historia del SENA contada por Rodolfo Martínez Tono
                            </h4>
                            <p className="text-[11px] text-slate-400">
                              Video oficial testimonial • Inicia en el segundo 26 con el relato fundacional
                            </p>
                          </div>
                        </div>

                        <a
                          href="https://www.youtube.com/watch?v=B3b7T6-h8i4&t=26s"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-auto"
                        >
                          <span>Ver en YouTube</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Reproductor Embebido Responsive (Aspect Ratio 16:9) */}
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black border border-white/10">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/B3b7T6-h8i4?start=26&rel=0"
                          title="Historia Oficial del SENA contada por Rodolfo Martínez Tono"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Fuente documental: Archivo de Memoria Histórica SENA</span>
                        <span className="font-mono text-emerald-400">ID: B3b7T6-h8i4 • t=26s</span>
                      </div>
                    </div>

                    {/* Línea de Tiempo de Hitos Históricos */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        Línea de Tiempo y Evolución Histórica
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                          <span className="text-xs font-mono font-bold text-emerald-800">1957</span>
                          <h5 className="font-bold text-slate-900 text-xs mt-1">Creación Institucional</h5>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            Decreto 118 de 1957. Iniciativa del Dr. Rodolfo Martínez Tono y apoyo empresarial.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-mono font-bold text-teal-700">1960 - 1974</span>
                          <h5 className="font-bold text-slate-900 text-xs mt-1">Expansión Nacional</h5>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            Construcción de sedes en las capitales, centros agropecuarios y talleres móviles.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-mono font-bold text-emerald-700">1990 - 2010</span>
                          <h5 className="font-bold text-slate-900 text-xs mt-1">Tecnología y Virtualidad</h5>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            Incorporación de telemática, formación titulada virtual y certificación de competencias.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-emerald-100/60 border border-emerald-300">
                          <span className="text-xs font-mono font-bold text-emerald-900">2024 - 2026</span>
                          <h5 className="font-bold text-slate-900 text-xs mt-1">Acuerdo 009 de 2024</h5>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                            Nuevo Reglamento del Aprendiz: garantías de debido proceso, bienestar y saberes digitales.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Retrato Interactivo del Fundador (sin window.alert) */}
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center gap-6">
                      <div
                        onClick={() => setIsFounderModalOpen(true)}
                        className="cursor-pointer group relative shrink-0 transition-transform hover:scale-105"
                        title="Haz clic para ver la biografía completa del Fundador"
                      >
                        <img
                          src={founderImage}
                          alt="Retrato de Rodolfo Martínez Tono"
                          className="w-44 h-52 object-cover rounded-2xl shadow-md border-2 border-emerald-500/50"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-emerald-950/30 group-hover:bg-transparent transition-colors flex items-end justify-center p-2">
                          <span className="text-[10px] bg-slate-900/90 text-white px-2 py-1 rounded-lg font-semibold backdrop-blur-xs flex items-center gap-1">
                            <Info className="w-3 h-3 text-emerald-400" />
                            Ver Biografía
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          Padre Fundador de la Institución
                        </span>
                        <h3 className="text-xl font-bold text-slate-900">
                          Dr. Rodolfo Martínez Tono (1927 - 2015)
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          "Una institución donde el trabajador colombiano adquiera no solo conocimientos técnicos, sino la conciencia de su dignidad como ser humano y su responsabilidad ciudadana."
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start text-[11px]">
                          <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium">
                            Director General 1957 - 1974
                          </span>
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-medium">
                            Tesis de Doctorado Javeriana
                          </span>
                          <button
                            onClick={() => setIsFounderModalOpen(true)}
                            className="px-2.5 py-1 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 cursor-pointer"
                          >
                            Conocer más sobre su legado
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================
                        SÍMBOLOS INSTITUCIONALES: ESCUDO Y BANDERA
                       ======================================================== */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-emerald-600" />
                          <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">
                            Símbolos Patrios e Institucionales
                          </h3>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          Identidad, Memoria y Esperanza
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 1. EL ESCUDO DEL SENA */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                                Emblema Heráldico
                              </span>
                              <button
                                onClick={() =>
                                  setZoomedSymbol({
                                    titulo: 'El Escudo del SENA',
                                    imagen: escudoImg,
                                    subtitulo: 'Reflejo de los tres sectores de la economía nacional',
                                    descripcion:
                                      'El Escudo del SENA representa los pilares del desarrollo económico de Colombia y la dignificación del trabajo productivo en sus tres dimensiones esenciales.',
                                    detalles: [
                                      'Rueda dentada (Piñón): Representa al sector industrial, la fuerza manufacturera, la construcción y la transformación metalmecánica.',
                                      'Espiga de trigo: Simboliza al sector agropecuario, la seguridad alimentaria, el trabajo de la tierra y la ruralidad colombiana.',
                                      'Caduceo con alas: Emblema clásico del comercio, las ventas, los servicios, la diplomacia y el intercambio mercantil.'
                                    ]
                                  })
                                }
                                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Detalle</span>
                              </button>
                            </div>

                            <div
                              onClick={() =>
                                setZoomedSymbol({
                                  titulo: 'El Escudo del SENA',
                                  imagen: escudoImg,
                                  subtitulo: 'Reflejo de los tres sectores de la economía nacional',
                                  descripcion:
                                    'El Escudo del SENA representa los pilares del desarrollo económico de Colombia y la dignificación del trabajo productivo en sus tres dimensiones esenciales.',
                                  detalles: [
                                    'Rueda dentada (Piñón): Representa al sector industrial, la fuerza manufacturera, la construcción y la transformación metalmecánica.',
                                    'Espiga de trigo: Simboliza al sector agropecuario, la seguridad alimentaria, el trabajo de la tierra y la ruralidad colombiana.',
                                    'Caduceo con alas: Emblema clásico del comercio, las ventas, los servicios, la diplomacia y el intercambio mercantil.'
                                  ]
                                })
                              }
                              className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-slate-200 p-3 flex items-center justify-center cursor-pointer group shadow-inner"
                            >
                              <img
                                src={escudoImg}
                                alt="Escudo Institucional del SENA"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-slate-900/80 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-xs font-semibold flex items-center gap-1.5">
                                  <Maximize2 className="w-3.5 h-3.5" />
                                  <span>Ampliar Escudo</span>
                                </span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-black text-slate-900">El Escudo del SENA</h4>
                              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                                Creado desde los orígenes de la institución, compendia en sus elementos la integración de los sectores productivos que impulsan el porvenir de la patria.
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-[11px] text-slate-700 text-center">
                            <div className="p-2 rounded-lg bg-white border border-slate-100">
                              <span className="block font-bold text-emerald-800">Industria</span>
                              <span className="text-[10px] text-slate-500">Rueda Dentada</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-100">
                              <span className="block font-bold text-emerald-800">Agro</span>
                              <span className="text-[10px] text-slate-500">Espiga de Trigo</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-100">
                              <span className="block font-bold text-emerald-800">Comercio</span>
                              <span className="text-[10px] text-slate-500">Caduceo</span>
                            </div>
                          </div>
                        </div>

                        {/* 2. LA BANDERA DEL SENA */}
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase tracking-wider">
                                Pabellón Institucional
                              </span>
                              <button
                                onClick={() =>
                                  setZoomedSymbol({
                                    titulo: 'La Bandera del SENA',
                                    imagen: banderaImg,
                                    subtitulo: 'Paz, serenidad y formación integral para Colombia',
                                    descripcion:
                                      'La Bandera del SENA ondea en todas las sedes del país como símbolo de unidad nacional, convivencia democrática y compromiso con la juventud trabajadora.',
                                    detalles: [
                                      'Fondo blanco: Simboliza la paz, la pureza, la transparencia administrativa, la concordia y el diálogo social.',
                                      'Emblema central verde: El escudo y logotipo oficial del SENA en verde institucional, representando la esperanza, la formación para la vida y el progreso de los aprendices.',
                                      'Presencia nacional: Acompaña al pabellón de Colombia en todos los actos académicos, ceremonias de certificación e instalaciones.'
                                    ]
                                  })
                                }
                                className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Ver en Detalle</span>
                              </button>
                            </div>

                            <div
                              onClick={() =>
                                setZoomedSymbol({
                                  titulo: 'La Bandera del SENA',
                                  imagen: banderaImg,
                                  subtitulo: 'Paz, serenidad y formación integral para Colombia',
                                  descripcion:
                                    'La Bandera del SENA ondea en todas las sedes del país como símbolo de unidad nacional, convivencia democrática y compromiso con la juventud trabajadora.',
                                  detalles: [
                                    'Fondo blanco: Simboliza la paz, la pureza, la transparencia administrativa, la concordia y el diálogo social.',
                                    'Emblema central verde: El escudo y logotipo oficial del SENA en verde institucional, representando la esperanza, la formación para la vida y el progreso de los aprendices.',
                                    'Presencia nacional: Acompaña al pabellón de Colombia en todos los actos académicos, ceremonias de certificación e instalaciones.'
                                  ]
                                })
                              }
                              className="relative aspect-4/3 rounded-xl overflow-hidden bg-white border border-slate-200 p-3 flex items-center justify-center cursor-pointer group shadow-inner"
                            >
                              <img
                                src={banderaImg}
                                alt="Bandera Institucional del SENA"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-slate-900/80 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-xs font-semibold flex items-center gap-1.5">
                                  <Maximize2 className="w-3.5 h-3.5" />
                                  <span>Ampliar Bandera</span>
                                </span>
                              </div>
                            </div>

                            <div>
                              <h4 className="text-base font-black text-slate-900">La Bandera del SENA</h4>
                              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                                Su campo blanco inmaculado refleja la paz y la tranquilidad que la formación brinda al país, llevando en el centro el verde institucional de la esperanza.
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-[11px] text-slate-700 text-center">
                            <div className="p-2 rounded-lg bg-white border border-slate-100">
                              <span className="block font-bold text-teal-800">Fondo Blanco</span>
                              <span className="text-[10px] text-slate-500">Paz y Transparencia</span>
                            </div>
                            <div className="p-2 rounded-lg bg-white border border-slate-100">
                              <span className="block font-bold text-emerald-800">Verde SENA</span>
                              <span className="text-[10px] text-slate-500">Esperanza y Futuro</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ========================================================
                        HIMNO OFICIAL DEL SENA: VIDEO Y LETRA COMPLETA
                        (Solicitado por el usuario: Video https://www.youtube.com/watch?v=KD5wULG4PcY)
                       ======================================================== */}
                    <div className="space-y-5 pt-4 border-t border-slate-100">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                            <Music className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                              Canto a la Patria y al Aprendizaje
                            </span>
                            <h3 className="text-lg md:text-xl font-black text-slate-900">
                              Himno Oficial del SENA
                            </h3>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-500 sm:text-right">
                          <p><strong>Letra:</strong> Jesús Briceño S. y Luis A. Sarmiento</p>
                          <p><strong>Música:</strong> Daniel Marlés E.</p>
                        </div>
                      </div>

                      {/* Video Oficial del Himno */}
                      <div className="bg-slate-900 rounded-3xl p-5 md:p-6 text-white shadow-xl space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
                              <Volume2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm md:text-base font-bold text-white leading-tight">
                                Himno del SENA (Video Oficial y Audio Institucional)
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                Versión coral orquestada con la letra en pantalla para la inducción
                              </p>
                            </div>
                          </div>

                          <a
                            href="https://www.youtube.com/watch?v=KD5wULG4PcY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 self-start sm:self-auto cursor-pointer"
                          >
                            <span>Ver en YouTube</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Reproductor Embebido Responsive (Aspect Ratio 16:9) */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black border border-white/10">
                          <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/KD5wULG4PcY?rel=0"
                            title="Himno Oficial del SENA con Letra"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                          <span>Interpretación coral institucional SENA Colombia</span>
                          <span className="font-mono text-emerald-400">ID: KD5wULG4PcY</span>
                        </div>
                      </div>

                      {/* LETRA OFICIAL COMPLETA: CORO Y ESTROFAS */}
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                        {/* El Coro Destacado */}
                        <div className="bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-5 md:p-6 text-white text-center shadow-md relative overflow-hidden">
                          <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-white/20 text-emerald-200 border border-white/20 inline-block mb-3">
                            Coro Oficial
                          </span>
                          <div className="space-y-1.5 text-base md:text-lg font-bold tracking-tight leading-relaxed max-w-xl mx-auto">
                            <p>Estudiantes del SENA, ¡adelante!</p>
                            <p>por Colombia luchad con amor,</p>
                            <p>con el ánimo noble y radiante,</p>
                            <p>transformémosla en mundo mejor.</p>
                          </div>
                        </div>

                        {/* Las 4 Estrofas */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
                            Estrofas Oficiales
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Estrofa I */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors">
                              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                                I
                              </span>
                              <div className="text-xs text-slate-700 leading-relaxed font-medium space-y-1 pt-1">
                                <p>De la patria el futuro destino,</p>
                                <p>en las manos del joven está,</p>
                                <p>el trabajo es seguro camino,</p>
                                <p>que el progreso a Colombia dará.</p>
                              </div>
                            </div>

                            {/* Estrofa II */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors">
                              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                                II
                              </span>
                              <div className="text-xs text-slate-700 leading-relaxed font-medium space-y-1 pt-1">
                                <p>En la forja del SENA se forman,</p>
                                <p>hombres libres que anhelan triunfar,</p>
                                <p>con la ciencia y la técnica unidas,</p>
                                <p>nuevos rumbos de paz trazarán.</p>
                              </div>
                            </div>

                            {/* Estrofa III */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors">
                              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                                III
                              </span>
                              <div className="text-xs text-slate-700 leading-relaxed font-medium space-y-1 pt-1">
                                <p>Hoy la patria nos grita sentida,</p>
                                <p>¡estudiantes del SENA triunfad!</p>
                                <p>solo así lograréis en la vida,</p>
                                <p>más justicia, mayor libertad.</p>
                              </div>
                            </div>

                            {/* Estrofa IV */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors">
                              <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                                IV
                              </span>
                              <div className="text-xs text-slate-700 leading-relaxed font-medium space-y-1 pt-1">
                                <p>Avancemos con fuerza guerrera,</p>
                                <p>¡estudiantes con firme tesón!</p>
                                <p>que la patria en nosotros espera,</p>
                                <p>su pacífica revolución.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed text-center">
                          <strong>Sentido de Pertenencia Institucional:</strong> El himno del SENA se entona solemnemente en los comités, eventos de inducción y graduaciones, convocando a la comunidad de aprendices a ser artífices de paz, trabajo digno y justicia social en Colombia.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    MÓDULO 2: ESTRUCTURA ORGANIZATIVA (33 REGIONALES)
                   ======================================================== */}
                {activeModuleId === 'estructura' && <EstructuraModule />}

                {/* ========================================================
                    MÓDULO 3: MARCO NORMATIVO Y EVALUACIÓN
                    (Solicita los datos del aprendiz únicamente cuando vaya a presentar la evaluación)
                   ======================================================== */}
                {activeModuleId === 'normativa' && (
                  <NormativaModule
                    initialTab={normativaTab}
                    onOpenRepository={() => setViewMode('repository')}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          PIE DE PÁGINA INSTITUCIONAL
         ======================================================== */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Servicio Nacional de Aprendizaje - SENA • Inducción Interactiva 2024-2026</span>
          <span className="font-mono text-emerald-700 font-semibold">Reglamento del Aprendiz - Acuerdo 009 de 2024</span>
        </div>
      </footer>
    </div>
  );
}
