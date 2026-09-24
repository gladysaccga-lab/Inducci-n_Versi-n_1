import { useState, useEffect } from 'react';
import { EvaluationAttempt } from '../types';
import {
  getEvaluationRepository,
  deleteEvaluationAttempt,
  clearRepository,
} from '../utils/repositoryStorage';
import {
  Database,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Download,
  Calendar,
  Hash,
  BookOpen,
  Building,
  Award,
  Search,
  Printer,
  ChevronRight,
  X,
  FileCheck,
  Scale
} from 'lucide-react';

interface EvaluationRepositoryProps {
  onBackToModules: () => void;
  onTakeQuizAgain?: () => void;
}

export default function EvaluationRepository({
  onBackToModules,
  onTakeQuizAgain,
}: EvaluationRepositoryProps) {
  const [attempts, setAttempts] = useState<EvaluationAttempt[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<EvaluationAttempt | null>(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [filterJuicio, setFilterJuicio] = useState<string>('ALL');

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setAttempts(getEvaluationRepository());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteEvaluationAttempt(id);
    setAttempts(updated);
    setConfirmDeleteId(null);
    if (selectedAttempt?.id === id) {
      setSelectedAttempt(null);
    }
  };

  const handleClearAll = () => {
    clearRepository();
    setAttempts([]);
    setSelectedAttempt(null);
    setShowClearConfirm(false);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(attempts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `repositorio_evaluaciones_sena_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // Filtrado
  const filteredAttempts = attempts.filter((att) => {
    const matchesSearch =
      att.aprendiz.nombreCompleto.toLowerCase().includes(filterTerm.toLowerCase()) ||
      att.aprendiz.numeroDocumento.includes(filterTerm) ||
      att.aprendiz.ficha.includes(filterTerm) ||
      att.moduloTitulo.toLowerCase().includes(filterTerm.toLowerCase()) ||
      att.folio.toLowerCase().includes(filterTerm.toLowerCase());

    const matchesJuicio =
      filterJuicio === 'ALL' ||
      (filterJuicio === 'APROBADO' && att.juicio.includes('APROBADO') && !att.juicio.includes('NO APROBADO')) ||
      (filterJuicio === 'NO_APROBADO' && att.juicio.includes('NO APROBADO'));

    return matchesSearch && matchesJuicio;
  });

  // Métricas
  const totalEvaluaciones = attempts.length;
  const aprobadas = attempts.filter((a) => a.juicio.includes('APROBADO') && !a.juicio.includes('NO APROBADO')).length;
  const promedioGeneral = totalEvaluaciones > 0
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.porcentaje, 0) / totalEvaluaciones)
    : 0;

  return (
    <div className="space-y-6">
      {/* Banner Principal */}
      <div className="bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20">
                <Database className="w-6 h-6 text-emerald-300" />
              </span>
              <span className="px-3 py-1 bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Sistema de Registro Académico
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Repositorio de Evaluaciones y Respuestas SENA
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
              Almacenamiento persistente de intentos, respuestas detalladas, juicios de evaluación y refuerzos pedagógicos fundamentados en el Acuerdo 009 de 2024.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportJSON}
              disabled={attempts.length === 0}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white text-xs font-medium rounded-xl border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>Exportar JSON</span>
            </button>
            <button
              onClick={onBackToModules}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Volver a Módulos
            </button>
          </div>
        </div>

        {/* Tarjetas KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/50">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-xs text-emerald-200 font-medium">Total Evaluaciones</p>
            <p className="text-2xl font-black text-white mt-1">{totalEvaluaciones}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-xs text-emerald-200 font-medium">Aprobadas</p>
            <p className="text-2xl font-black text-emerald-400 mt-1">{aprobadas}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-xs text-emerald-200 font-medium">Planes de Mejoramiento</p>
            <p className="text-2xl font-black text-amber-300 mt-1">{totalEvaluaciones - aprobadas}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <p className="text-xs text-emerald-200 font-medium">Promedio General</p>
            <p className="text-2xl font-black text-white mt-1">{promedioGeneral}%</p>
          </div>
        </div>
      </div>

      {/* Barra de Filtro y Búsqueda */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, documento, ficha o folio..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterJuicio}
            onChange={(e) => setFilterJuicio(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white focus:ring-2 focus:ring-emerald-500 outline-hidden font-medium"
          >
            <option value="ALL">Todos los Juicios</option>
            <option value="APROBADO">Solo Aprobados</option>
            <option value="NO_APROBADO">Solo Requiere Mejoramiento</option>
          </select>

          {attempts.length > 0 && (
            showClearConfirm ? (
              <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 px-2 py-1 rounded-xl text-xs">
                <span className="text-red-700 font-semibold">¿Vaciar todo?</span>
                <button
                  onClick={handleClearAll}
                  className="px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold cursor-pointer"
                >
                  Sí
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                title="Vaciar Repositorio"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )
          )}
        </div>
      </div>

      {/* Lista de Registros */}
      {attempts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <FileCheck className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">El repositorio aún no tiene registros de evaluación</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Cuando un aprendiz complete la prueba de conocimientos en el módulo de Normativa, sus respuestas, puntajes y justificaciones legales se guardarán aquí automáticamente.
          </p>
          {onTakeQuizAgain && (
            <button
              onClick={onTakeQuizAgain}
              className="mt-5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Realizar Prueba de Conocimientos Ahora
            </button>
          )}
        </div>
      ) : filteredAttempts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">No se encontraron evaluaciones con los filtros actuales.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAttempts.map((attempt) => {
            const isAprobado = attempt.juicio.includes('APROBADO') && !attempt.juicio.includes('NO APROBADO');
            return (
              <div
                key={attempt.id}
                onClick={() => setSelectedAttempt(attempt)}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Info del Aprendiz y Folio */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                        isAprobado
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                          : 'bg-amber-50 text-amber-600 border-amber-200'
                      }`}
                    >
                      {isAprobado ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {attempt.folio}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isAprobado
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {isAprobado ? 'APROBADO' : 'PLAN DE MEJORAMIENTO'}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {attempt.fecha}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors mt-1">
                        {attempt.aprendiz.nombreCompleto}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                        <span>
                          <strong>Doc:</strong> {attempt.aprendiz.tipoDocumento} {attempt.aprendiz.numeroDocumento}
                        </span>
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3 text-emerald-600" />
                          <strong>Ficha:</strong> {attempt.aprendiz.ficha}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-emerald-600" />
                          {attempt.aprendiz.programa}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Resultados y Acciones */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-right">
                      <div className="text-xl font-black text-slate-800">
                        {attempt.respuestasCorrectas} / {attempt.totalPreguntas}
                      </div>
                      <div className="text-xs font-semibold text-slate-500">
                        Puntaje: <span className={isAprobado ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>{attempt.porcentaje}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAttempt(attempt);
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Detalle</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {confirmDeleteId === attempt.id ? (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-1 rounded-xl text-[11px]"
                        >
                          <span className="text-red-700 font-semibold">¿Borrar?</span>
                          <button
                            onClick={(e) => handleDelete(attempt.id, e)}
                            className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded font-bold cursor-pointer"
                          >
                            Sí
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setConfirmDeleteId(null);
                            }}
                            className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded font-medium cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(attempt.id);
                          }}
                          title="Eliminar este registro"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detalle Completo de Respuestas */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in max-h-[90vh] flex flex-col">
            {/* Encabezado del Modal */}
            <div className="bg-linear-to-r from-emerald-800 to-teal-800 text-white p-6 relative shrink-0">
              <button
                onClick={() => setSelectedAttempt(null)}
                className="absolute top-4 right-4 text-emerald-100 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/20 text-white">
                  {selectedAttempt.folio}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedAttempt.juicio.includes('APROBADO') && !selectedAttempt.juicio.includes('NO APROBADO')
                      ? 'bg-emerald-400 text-slate-950'
                      : 'bg-amber-300 text-slate-950'
                  }`}
                >
                  {selectedAttempt.juicio}
                </span>
              </div>

              <h2 className="text-xl font-bold">{selectedAttempt.moduloTitulo}</h2>
              <p className="text-xs text-emerald-100 mt-1">
                Evaluación registrada el {selectedAttempt.fecha}
              </p>
            </div>

            {/* Contenido con scroll */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Ficha del Aprendiz Evaluado */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Datos del Aprendiz Registrado
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                  <div><strong>Nombre:</strong> {selectedAttempt.aprendiz.nombreCompleto}</div>
                  <div><strong>Documento:</strong> {selectedAttempt.aprendiz.tipoDocumento} {selectedAttempt.aprendiz.numeroDocumento}</div>
                  <div><strong>Ficha:</strong> {selectedAttempt.aprendiz.ficha}</div>
                  <div><strong>Programa:</strong> {selectedAttempt.aprendiz.programa}</div>
                  <div><strong>Correo:</strong> {selectedAttempt.aprendiz.correo}</div>
                  <div><strong>Regional:</strong> {selectedAttempt.aprendiz.regional}</div>
                  <div><strong>Centro:</strong> {selectedAttempt.aprendiz.centro}</div>
                  <div><strong>Jornada:</strong> {selectedAttempt.aprendiz.jornada}</div>
                </div>
              </div>

              {/* Dictamen y Recomendación Pedagógica */}
              <div
                className={`p-4 rounded-xl border ${
                  selectedAttempt.porcentaje >= 70
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm mb-1">
                  <span>Resultado: {selectedAttempt.respuestasCorrectas} de {selectedAttempt.totalPreguntas} aciertos ({selectedAttempt.porcentaje}%)</span>
                  <span>{selectedAttempt.porcentaje >= 70 ? 'Competencia Demostrada' : 'Plan de Mejoramiento'}</span>
                </div>
                <p className="text-xs leading-relaxed mt-1">
                  {selectedAttempt.recomendacionPedagogica}
                </p>
              </div>

              {/* Desglose de Cada Respuesta y Refuerzo Pedagógico */}
              <div>
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  Desglose Detallado de Respuestas y Soporte Legal (Acuerdo 009 de 2024)
                </h4>

                <div className="space-y-4">
                  {selectedAttempt.respuestas.map((resp, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition-all ${
                        resp.esCorrecta
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-red-50/50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                          Pregunta {idx + 1} - {resp.categoria}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            resp.esCorrecta
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {resp.esCorrecta ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Incorrecta
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-800 mt-2">
                        {resp.pregunta}
                      </p>

                      <div className="mt-3 space-y-1.5 text-xs">
                        <div className="p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-500 font-medium">Tu respuesta:</span>{' '}
                          <span className={resp.esCorrecta ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                            {resp.respuestaSeleccionadaTexto}
                          </span>
                        </div>

                        {!resp.esCorrecta && (
                          <div className="p-2 rounded-lg bg-emerald-100/60 border border-emerald-200">
                            <span className="text-emerald-800 font-semibold">Respuesta correcta:</span>{' '}
                            <span className="text-emerald-900 font-bold">{resp.respuestaCorrectaTexto}</span>
                          </div>
                        )}

                        <div className="p-2.5 rounded-lg bg-white/80 border border-slate-200 text-slate-700 mt-2">
                          <div className="font-bold text-emerald-800 mb-1 flex items-center gap-1">
                            <span>Soporte Normativo:</span> {resp.articuloReferencia}
                          </div>
                          <p className="italic text-slate-600">
                            {resp.refuerzoPedagogico}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Modal con Impresión */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={handlePrintCertificate}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Imprimir / Guardar en PDF</span>
              </button>

              <button
                onClick={() => setSelectedAttempt(null)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
