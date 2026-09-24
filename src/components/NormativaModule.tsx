import { useState, useEffect } from 'react';
import normativaData from '../data/normativaCompletaAcuerdo009.json';
import { ApprenticeProfile, QuizQuestion, EvaluationAnswerRecord, EvaluationAttempt } from '../types';
import { getSavedProfile, saveProfile, saveEvaluationAttempt } from '../utils/repositoryStorage';
import ApprenticeProfileModal from './ApprenticeProfileModal';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Scale,
  ShieldCheck,
  AlertTriangle,
  Award,
  Database,
  Search,
  UserCheck,
  User,
  GraduationCap,
  Save,
  Check,
  Building,
  Hash,
  Mail,
  Phone,
  Clock,
  FileCheck
} from 'lucide-react';

interface NormativaModuleProps {
  onOpenRepository?: () => void;
  initialTab?: 'explorador' | 'documento' | 'evaluacion';
}

const REGIONALES_SENA = [
  'Regional Distrito Capital',
  'Regional Antioquia',
  'Regional Valle',
  'Regional Santander',
  'Regional Atlántico',
  'Regional Cundinamarca',
  'Regional Caldas',
  'Regional Risaralda',
  'Regional Bolívar',
  'Regional Boyacá',
  'Regional Tolima',
  'Regional Huila',
  'Regional Cauca',
  'Regional Nariño',
  'Regional Meta',
  'Otra Regional SENA'
];

export default function NormativaModule({ onOpenRepository, initialTab }: NormativaModuleProps) {
  const [activeTab, setActiveTab] = useState<'explorador' | 'documento' | 'evaluacion'>(initialTab || 'explorador');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'derechos' | 'deberes' | 'prohibiciones' | 'sanciones'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Perfil del aprendiz y modal de edición
  const [currentProfile, setCurrentProfile] = useState<ApprenticeProfile>(getSavedProfile());
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Estados del flujo de la Evaluación: 'previa' (pantalla previa) | 'en_progreso' | 'finalizada'
  const [evaluationStage, setEvaluationStage] = useState<'previa' | 'en_progreso' | 'finalizada'>('previa');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [recordedAnswers, setRecordedAnswers] = useState<EvaluationAnswerRecord[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<EvaluationAttempt | null>(null);

  // Manejo de cambios en el formulario de la pantalla previa
  const handleProfileFieldChange = (field: keyof ApprenticeProfile, value: string) => {
    setCurrentProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Guardar y comenzar la evaluación
  const handleStartEvaluation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveProfile(currentProfile);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
    setIsCurrentCorrect(false);
    setRecordedAnswers([]);
    setEvaluationStage('en_progreso');
  };

  // Preguntas desde el JSON
  const questions: QuizQuestion[] = normativaData.preguntasEvaluacion as QuizQuestion[];
  const currentQuestion = questions[currentQuestionIndex];

  // Manejador de selección de respuesta
  const handleSelectOption = (optionId: string) => {
    if (hasAnsweredCurrent) return;
    setSelectedOptionId(optionId);
  };

  // Confirmar respuesta de la pregunta actual
  const handleConfirmAnswer = () => {
    if (!selectedOptionId || hasAnsweredCurrent) return;

    const isCorrect = selectedOptionId === currentQuestion.opcionCorrectaId;
    setIsCurrentCorrect(isCorrect);
    setHasAnsweredCurrent(true);

    const selectedOption = currentQuestion.opciones.find((o) => o.id === selectedOptionId);
    const correctOption = currentQuestion.opciones.find((o) => o.id === currentQuestion.opcionCorrectaId);

    const answerRecord: EvaluationAnswerRecord = {
      preguntaId: currentQuestion.id,
      categoria: currentQuestion.categoria,
      pregunta: currentQuestion.pregunta,
      respuestaSeleccionadaId: selectedOptionId,
      respuestaSeleccionadaTexto: selectedOption?.texto || '',
      respuestaCorrectaId: currentQuestion.opcionCorrectaId,
      respuestaCorrectaTexto: correctOption?.texto || '',
      esCorrecta: isCorrect,
      articuloReferencia: currentQuestion.articuloReferencia,
      refuerzoPedagogico: currentQuestion.refuerzoPedagogico,
    };

    setRecordedAnswers((prev) => [...prev, answerRecord]);
  };

  // Pasar a la siguiente pregunta o finalizar
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnsweredCurrent(false);
    } else {
      // Finalizar y almacenar en el repositorio
      finalizeEvaluation();
    }
  };

  // Almacenar en el repositorio de evaluaciones
  const finalizeEvaluation = () => {
    const total = questions.length;
    const correctCount = recordedAnswers.filter((a) => a.esCorrecta).length + (isCurrentCorrect ? 1 : 0);
    const percentage = Math.round((correctCount / total) * 100);
    const aprobado = percentage >= 70;

    const attempt: EvaluationAttempt = {
      id: 'eval_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      folio: 'SENA-009-' + Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      moduloId: 'normativa_acuerdo_009_2024',
      moduloTitulo: 'Evaluación Normativa y Reglamento - Acuerdo 009 de 2024',
      aprendiz: currentProfile,
      totalPreguntas: total,
      respuestasCorrectas: correctCount,
      respuestasIncorrectas: total - correctCount,
      porcentaje: percentage,
      juicio: aprobado ? 'APROBADO' : 'NO APROBADO - REQUIERE PLAN DE MEJORAMIENTO',
      respuestas: recordedAnswers,
      recomendacionPedagogica: aprobado
        ? '¡Felicitaciones! Demuestras un conocimiento solvente de los derechos, deberes y debido proceso según el Acuerdo 009 de 2024. Mantén este compromiso durante toda tu formación profesional integral.'
        : 'Se evidencia la necesidad de reforzar aspectos clave de deberes, trámites de novedades y causas de deserción (Artículos 8, 18, 28 y 30 del Acuerdo 009 de 2024). Revisa los contenidos interactivos y vuelve a presentar la prueba.',
    };

    saveEvaluationAttempt(attempt);
    setLatestAttempt(attempt);
    setEvaluationStage('finalizada');
  };

  // Reiniciar prueba volviendo a la pantalla previa
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setHasAnsweredCurrent(false);
    setIsCurrentCorrect(false);
    setRecordedAnswers([]);
    setEvaluationStage('previa');
    setLatestAttempt(null);
  };

  return (
    <div className="space-y-6">
      {/* Modal para verificar o editar datos básicos del aprendiz */}
      <ApprenticeProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={(updated) => setCurrentProfile(updated)}
        title="Datos Básicos del Aprendiz para Evaluación"
        description="Confirma tus datos personales y programa de formación. Estas credenciales se incluirán en el folio del repositorio de respuestas."
      />

      {/* Barra de navegación de pestañas */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-2 text-xs md:text-sm font-semibold text-slate-700">
        <button
          onClick={() => setActiveTab('explorador')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'explorador'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'hover:text-emerald-700 hover:bg-slate-200/50'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Explorador de Derechos y Deberes</span>
        </button>

        <button
          onClick={() => setActiveTab('documento')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'documento'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'hover:text-emerald-700 hover:bg-slate-200/50'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>Documento Oficial (Acuerdo 009)</span>
        </button>

        <button
          onClick={() => setActiveTab('evaluacion')}
          className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'evaluacion'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'hover:text-emerald-700 hover:bg-slate-200/50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Prueba de Conocimientos con Refuerzo</span>
        </button>
      </div>

      {/* ========================================================
          PESTAÑA 1: EXPLORADOR INTERACTIVO DE DERECHOS Y DEBERES
         ======================================================== */}
      {activeTab === 'explorador' && (
        <div className="space-y-6">
          {/* Header con búsqueda y filtros */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Marco Normativo Integral - Acuerdo 009 de 2024
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adoptado el 5 de noviembre de 2024. Regula la formación profesional integral, permanencia, derechos y deberes.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en el reglamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                />
              </div>
            </div>

            {/* Categorías filtro */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              {[
                { id: 'todos', label: 'Todos los Artículos' },
                { id: 'derechos', label: '24 Derechos (Art. 5)' },
                { id: 'deberes', label: '24 Deberes (Art. 8)' },
                { id: 'prohibiciones', label: '14 Prohibiciones (Art. 9)' },
                { id: 'sanciones', label: 'Régimen de Faltas (Art. 41-47)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjetas interactivas de contenidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* DERECHOS CLAVE */}
            {(activeCategory === 'todos' || activeCategory === 'derechos') && (
              <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      Capítulo II - Artículo 5o
                    </span>
                    <h4 className="text-base font-bold text-slate-800">Derechos Fundamentales del Aprendiz</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Garantizan una formación integral de calidad, dignidad humana, debido proceso y bienestar.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-900 block mb-0.5">Inducción y Bienestar:</strong>
                    Recibir inducción integral y acceder a los beneficios del Plan de Bienestar (Num. 1 y 6).
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-900 block mb-0.5">Calidad, EPP e Infraestructura:</strong>
                    Disponer de ambientes, equipos, tecnologías y Elementos de Protección Personal oportunos (Num. 2, 4 y 5).
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-900 block mb-0.5">Debido Proceso y Defensa:</strong>
                    Presunción de inocencia, contradicción, ser escuchado y recurso de revisión de evaluaciones dentro de 2 días hábiles (Num. 10 y 16).
                  </div>
                  <div className="p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                    <strong className="text-emerald-900 block mb-0.5">Inclusión y Ajustes Razonables:</strong>
                    Reconocimiento de discapacidad y adaptaciones formativas pertinentes (Num. 8 y 9).
                  </div>
                </div>
              </div>
            )}

            {/* DEBERES CLAVE */}
            {(activeCategory === 'todos' || activeCategory === 'deberes') && (
              <div className="bg-white rounded-2xl p-5 border border-teal-100 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-teal-50 rounded-xl text-teal-700">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                      Capítulo III - Artículo 8o
                    </span>
                    <h4 className="text-base font-bold text-slate-800">Deberes y Responsabilidades</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Obligaciones académicas, disciplinarias y éticas asumidas desde el acta de compromiso.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                  <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <strong className="text-teal-900 block mb-0.5">Asistencia y Puntualidad:</strong>
                    Asistir puntualmente a actividades presenciales y virtuales; justificar faltas en máx. 5 días hábiles (Num. 5 y 7).
                  </div>
                  <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <strong className="text-teal-900 block mb-0.5">Autoría Propia y Honestidad:</strong>
                    Realizar personalmente las evidencias sin plagio, respetando derechos de autor (Num. 12 y 13).
                  </div>
                  <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <strong className="text-teal-900 block mb-0.5">Actualización de Datos:</strong>
                    Mantener al día datos de contacto en aplicativos del SENA y APE (Num. 4).
                  </div>
                  <div className="p-2.5 bg-teal-50/50 rounded-xl border border-teal-100">
                    <strong className="text-teal-900 block mb-0.5">Uso de Ambientes y EPP:</strong>
                    Cuidar instalaciones, equipos de cómputo, talleres y portar EPP reglamentarios (Num. 11 y 15).
                  </div>
                </div>
              </div>
            )}

            {/* PROHIBICIONES */}
            {(activeCategory === 'todos' || activeCategory === 'prohibiciones') && (
              <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-red-50 rounded-xl text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                      Capítulo III - Artículo 9o
                    </span>
                    <h4 className="text-base font-bold text-slate-800">Prohibiciones Taxativas</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Actos que rompen la convivencia formativa y acarrean medidas sancionatorias inmediatas.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                  <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100">
                    <strong className="text-red-900 block mb-0.5">Plagio y Suplantación:</strong>
                    Plagiar trabajos, tareas o suplantar identidades en trámites o pruebas (Num. 2 y 4).
                  </div>
                  <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100">
                    <strong className="text-red-900 block mb-0.5">Alcohol, SPA y Armas:</strong>
                    Ingresar bajo efectos o portar alcohol, drogas o armas cortopunzantes/de fuego (Num. 6 y 7).
                  </div>
                  <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100">
                    <strong className="text-red-900 block mb-0.5">Bullying y Discriminación:</strong>
                    Cualquier forma de acoso escolar, ciberacoso o discriminación por credo, género u origen (Num. 13 y 14).
                  </div>
                </div>
              </div>
            )}

            {/* FALTAS Y SANCIONES */}
            {(activeCategory === 'todos' || activeCategory === 'sanciones') && (
              <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                      Capítulo V - Artículos 41 al 47
                    </span>
                    <h4 className="text-base font-bold text-slate-800">Medidas Formativas y Sanciones</h4>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Diferenciación estricta entre medidas pedagógicas formativas y sanciones disciplinarias.
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 text-xs">
                  <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
                    <strong className="text-amber-900 block mb-0.5">Medidas Formativas (Art. 45-46):</strong>
                    Hasta 2 llamados de atención escritos y Plan de Mejoramiento (máximo 20 días calendario).
                  </div>
                  <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
                    <strong className="text-amber-900 block mb-0.5">Condicionamiento de Matrícula (Art. 47.1):</strong>
                    Ante reincidencia o faltas graves no superadas. Pérdida temporal de apoyos de sostenimiento.
                  </div>
                  <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100">
                    <strong className="text-amber-900 block mb-0.5">Cancelación de Matrícula (Art. 47.2):</strong>
                    Retiro formal del programa e inhabilidad de 6 meses para volver a ingresar al SENA.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          PESTAÑA 2: VISOR DEL DOCUMENTO OFICIAL COMPLETO
         ======================================================== */}
      {activeTab === 'documento' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Encabezado del visor */}
          <div className="bg-slate-900 text-white p-6 border-b border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                  <span>{normativaData.documento.publicacion}</span>
                  <span>•</span>
                  <span>{normativaData.documento.fecha}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white">
                  {normativaData.documento.numero} - {normativaData.documento.titulo}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  {normativaData.documento.entidad}. {normativaData.documento.derogatorias}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Imprimir Vista</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cuerpo del Documento Estructurado */}
          <div className="p-6 md:p-8 max-h-[600px] overflow-y-auto space-y-8 text-slate-800 text-sm leading-relaxed">
            {/* Considerando Legal */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <h5 className="font-bold text-slate-800 uppercase tracking-wider">Fundamento Constitucional y Legal</h5>
              <p>
                El Consejo Directivo Nacional del SENA adopta el presente reglamento en cumplimiento de los artículos 54 y 67 de la Constitución Política, la Ley 119 de 1994, el Decreto 249 de 2004, la Ley 2365 de 2024 (prevención del acoso sexual) y la Ley 2394 de 2024 (protección a estudiantes gestantes y lactantes).
              </p>
            </div>

            {/* Capítulos y Artículos Extraídos */}
            {normativaData.capitulos.map((cap, cIdx) => (
              <div key={cIdx} className="space-y-4 border-b border-slate-100 pb-6 last:border-b-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-mono text-xs font-bold">
                    {cap.numero}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">{cap.titulo}</h4>
                </div>

                <div className="space-y-4 pl-2">
                  {cap.articulos.map((art, aIdx) => (
                    <div key={aIdx} className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-emerald-800 text-sm">{art.articulo}:</span>
                        <span className="font-semibold text-slate-800 text-sm">{art.nombre}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{art.descripcion}</p>

                      {art.puntosClave && art.puntosClave.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                          {art.puntosClave.map((punto, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2">
                              <span className="text-emerald-600 shrink-0 font-bold">•</span>
                              <span>{punto}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          PESTAÑA 3: PRUEBA DE CONOCIMIENTOS CON REFUERZO PEDAGÓGICO
         ======================================================== */}
      {activeTab === 'evaluacion' && (
        <div className="space-y-6">
          {/* PANTALLA PREVIA: REGISTRO Y VALIDACIÓN DE DATOS DEL APRENDIZ */}
          {evaluationStage === 'previa' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-200">
              {/* Cabecera Institucional SENA */}
              <div className="bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 md:p-8 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs border border-white/20">
                      <UserCheck className="w-8 h-8 text-emerald-300" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 uppercase tracking-wider">
                          Módulo Previo Obligatorio
                        </span>
                        <span className="text-xs text-emerald-200 font-mono">Paso 1 de 2</span>
                      </div>
                      <h3 className="text-2xl font-black mt-1">Identificación del Aprendiz y Condiciones de Evaluación</h3>
                    </div>
                  </div>

                  {onOpenRepository && (
                    <button
                      onClick={onOpenRepository}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Database className="w-4 h-4 text-emerald-300" />
                      <span>Ver Repositorio Histórico</span>
                    </button>
                  )}
                </div>

                <p className="text-xs md:text-sm text-emerald-100 mt-3 max-w-3xl leading-relaxed">
                  Antes de iniciar la prueba de conocimientos sobre el <strong>Acuerdo 009 de 2024</strong>, confirma tus datos institucionales. Cada respuesta, calificación y refuerzo pedagógico se registrará en el <strong>Repositorio de Evaluaciones</strong> con folio de verificación para trazabilidad académica.
                </p>
              </div>

              {/* Formulario de la Pantalla Previa */}
              <form onSubmit={handleStartEvaluation} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nombre Completo */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Nombres y Apellidos Completos *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentProfile.nombreCompleto}
                      onChange={(e) => handleProfileFieldChange('nombreCompleto', e.target.value)}
                      placeholder="Ej. Lilian Alvarez"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-semibold text-slate-800 outline-hidden transition-all"
                    />
                  </div>

                  {/* Tipo de Documento */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tipo de Documento *
                    </label>
                    <select
                      value={currentProfile.tipoDocumento}
                      onChange={(e) => handleProfileFieldChange('tipoDocumento', e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-800 bg-white font-medium outline-hidden"
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="TI">Tarjeta de Identidad (TI)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                      <option value="PPT">Permiso por Protección Temporal (PPT)</option>
                      <option value="PEP">Permiso Especial de Permanencia (PEP)</option>
                      <option value="Otro">Otro Documento</option>
                    </select>
                  </div>

                  {/* Número de Documento */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentProfile.numeroDocumento}
                      onChange={(e) => handleProfileFieldChange('numeroDocumento', e.target.value)}
                      placeholder="Ej. 1025894123"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-slate-800 outline-hidden"
                    />
                  </div>

                  {/* Programa de Formación */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                      Programa de Formación *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentProfile.programa}
                      onChange={(e) => handleProfileFieldChange('programa', e.target.value)}
                      placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium text-slate-800 outline-hidden"
                    />
                  </div>

                  {/* Ficha / Grupo */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-emerald-600" />
                      Número de Ficha / Grupo *
                    </label>
                    <input
                      type="text"
                      required
                      value={currentProfile.ficha}
                      onChange={(e) => handleProfileFieldChange('ficha', e.target.value)}
                      placeholder="Ej. 2874915"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono font-bold text-emerald-800 outline-hidden"
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={currentProfile.correo}
                      onChange={(e) => handleProfileFieldChange('correo', e.target.value)}
                      placeholder="aprendiz@soy.sena.edu.co"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-800 outline-hidden"
                    />
                  </div>

                  {/* Teléfono Celular */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      Teléfono Celular
                    </label>
                    <input
                      type="tel"
                      value={currentProfile.telefono || ''}
                      onChange={(e) => handleProfileFieldChange('telefono', e.target.value)}
                      placeholder="Ej. 3104567890"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-800 outline-hidden"
                    />
                  </div>

                  {/* Jornada */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      Jornada de Formación
                    </label>
                    <select
                      value={currentProfile.jornada || 'Diurna'}
                      onChange={(e) => handleProfileFieldChange('jornada', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white font-medium outline-hidden"
                    >
                      <option value="Diurna">Diurna</option>
                      <option value="Nocturna">Nocturna</option>
                      <option value="Mixta">Mixta</option>
                      <option value="Virtual">Virtual</option>
                      <option value="Madrugada">Madrugada</option>
                      <option value="Fin de semana">Fin de semana</option>
                    </select>
                  </div>

                  {/* Regional */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-emerald-600" />
                      Regional SENA
                    </label>
                    <select
                      value={currentProfile.regional}
                      onChange={(e) => handleProfileFieldChange('regional', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 bg-white font-medium outline-hidden"
                    >
                      {REGIONALES_SENA.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Centro de Formación */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Centro de Formación
                    </label>
                    <input
                      type="text"
                      value={currentProfile.centro}
                      onChange={(e) => handleProfileFieldChange('centro', e.target.value)}
                      placeholder="Ej. Centro de Gestión de Mercados, Logística y TI"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 outline-hidden"
                    />
                  </div>
                </div>

                {/* Condiciones de la Evaluación */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2">
                  <div className="font-bold text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Reglas de Evaluación y Almacenamiento (Acuerdo 009 de 2024):</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Total:</strong> {questions.length} preguntas de casos prácticos.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Aprobación:</strong> Mínimo 70% de respuestas correctas.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Refuerzo Pedagógico:</strong> Explicación legal en cada respuesta.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Repositorio:</strong> Guardado permanente con folio único.</span>
                    </li>
                  </ul>
                </div>

                {/* Botón de Acción Principal */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 text-center sm:text-left">
                    Al continuar, confirmas la veracidad de tus datos según el Art. 8 numeral 4.
                  </span>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Confirmar Datos e Iniciar Evaluación</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ESTADO EN PROCESO DE EVALUACIÓN */}
          {evaluationStage === 'en_progreso' && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
              {/* Barra Superior con Datos del Aprendiz en Evaluación */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-6 h-6 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                    {currentProfile.nombreCompleto.charAt(0) || 'A'}
                  </div>
                  <span className="text-slate-800 font-bold truncate">
                    Aprendiz: {currentProfile.nombreCompleto}
                  </span>
                  <span className="text-slate-400 hidden sm:inline">|</span>
                  <span className="text-slate-500 font-mono hidden sm:inline">Ficha: {currentProfile.ficha}</span>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold shrink-0">
                  En Evaluación
                </span>
              </div>

              {/* Barra de Progreso */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>
                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    Categoría: {currentQuestion.categoria}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + (hasAnsweredCurrent ? 1 : 0)) / questions.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Enunciado de la Pregunta */}
              <div className="space-y-2">
                {currentQuestion.contextoCaso && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 italic">
                    <strong>Caso formativo:</strong> {currentQuestion.contextoCaso}
                  </div>
                )}
                <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {currentQuestion.pregunta}
                </h3>
              </div>

              {/* Opciones de Respuesta */}
              <div className="space-y-3">
                {currentQuestion.opciones.map((opcion) => {
                  const isSelected = selectedOptionId === opcion.id;
                  const isCorrectAnswer = opcion.id === currentQuestion.opcionCorrectaId;

                  let cardStyle = 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/50';

                  if (hasAnsweredCurrent) {
                    if (isCorrectAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-2 ring-emerald-400/40';
                    } else if (isSelected && !isCorrectAnswer) {
                      cardStyle = 'border-red-500 bg-red-50 text-red-950 ring-2 ring-red-400/40';
                    } else {
                      cardStyle = 'border-slate-200 opacity-60 bg-slate-50';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/30 text-emerald-950';
                  }

                  return (
                    <button
                      key={opcion.id}
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(opcion.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {opcion.id}
                      </span>
                      <span className="text-xs md:text-sm leading-relaxed">{opcion.texto}</span>
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK VISUAL POSITIVO O NEGATIVO + REFUERZO PEDAGÓGICO */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-5 rounded-2xl border transition-all duration-300 ${
                    isCurrentCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                      : 'bg-red-50 border-red-300 text-red-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isCurrentCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {isCurrentCorrect ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm">
                          {isCurrentCorrect
                            ? '¡Respuesta Correcta! Asimilación Normativa Sobresaliente'
                            : '¡Atención! Respuesta Incorrecta'}
                        </h4>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/80 border border-current">
                          {currentQuestion.articuloReferencia}
                        </span>
                      </div>

                      {/* Caja de Refuerzo Pedagógico */}
                      <div className="bg-white/90 rounded-xl p-3 text-xs leading-relaxed text-slate-800 border border-slate-200">
                        <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-emerald-600" />
                          <span>Refuerzo Pedagógico - Acuerdo 009 de 2024:</span>
                        </div>
                        <p>{currentQuestion.refuerzoPedagogico}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de Acción Inferior */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-400">
                  {hasAnsweredCurrent
                    ? 'Revisa el refuerzo pedagógico antes de avanzar.'
                    : 'Selecciona una respuesta y pulsa calificar.'}
                </span>

                {!hasAnsweredCurrent ? (
                  <button
                    disabled={!selectedOptionId}
                    onClick={handleConfirmAnswer}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs md:text-sm font-semibold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Comprobar Respuesta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs md:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>
                      {currentQuestionIndex + 1 < questions.length
                        ? 'Siguiente Pregunta'
                        : 'Finalizar y Guardar en Repositorio'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ESTADO FINAL: EVALUACIÓN FINALIZADA Y GUARDADA */}
          {evaluationStage === 'finalizada' && latestAttempt && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg ${
                  latestAttempt.porcentaje >= 70
                    ? 'bg-emerald-100 text-emerald-600 border-4 border-emerald-200'
                    : 'bg-amber-100 text-amber-600 border-4 border-amber-200'
                }`}
              >
                {latestAttempt.porcentaje >= 70 ? (
                  <CheckCircle2 className="w-10 h-10" />
                ) : (
                  <AlertTriangle className="w-10 h-10" />
                )}
              </div>

              <div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                  Folio: {latestAttempt.folio}
                </span>

                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  {latestAttempt.porcentaje >= 70
                    ? '¡Evaluación Superada con Éxito!'
                    : 'Resultado: Requiere Plan de Mejoramiento Formativo'}
                </h3>

                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase mt-2 ${
                    latestAttempt.porcentaje >= 70
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-slate-950'
                  }`}
                >
                  {latestAttempt.juicio}
                </div>

                <p className="text-sm text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
                  {latestAttempt.recomendacionPedagogica}
                </p>
              </div>

              {/* Estadísticas del intento */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 block">Puntaje Total</span>
                  <span className="text-xl font-bold text-slate-800">{latestAttempt.porcentaje}%</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-xs text-emerald-700 block">Aciertos</span>
                  <span className="text-xl font-bold text-emerald-800">
                    {latestAttempt.respuestasCorrectas} / {latestAttempt.totalPreguntas}
                  </span>
                </div>
                <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                  <span className="text-xs text-red-700 block">A Mejorar</span>
                  <span className="text-xl font-bold text-red-800">{latestAttempt.respuestasIncorrectas}</span>
                </div>
              </div>

              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-center justify-center gap-2">
                <Database className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>¡Evaluación Registrada con Éxito!</strong> Las {latestAttempt.totalPreguntas} respuestas con sus justificaciones normativas quedaron archivadas en el <strong>Repositorio de Evaluaciones</strong>.
                </span>
              </div>

              {/* Botones de acción final */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartQuiz}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Realizar Otra Evaluación</span>
                </button>

                {onOpenRepository && (
                  <button
                    onClick={onOpenRepository}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Database className="w-4 h-4" />
                    <span>Abrir Repositorio de Evaluaciones y Respuestas</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
