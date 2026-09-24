/**
 * Tipos de datos para la plataforma de inducción y repositorio de evaluaciones SENA
 * Basado en el Reglamento del Aprendiz - Acuerdo 009 de 2024
 */

export interface ApprenticeProfile {
  tipoDocumento: 'CC' | 'TI' | 'CE' | 'PEP' | 'PPT' | 'Otro';
  numeroDocumento: string;
  nombreCompleto: string;
  correo: string;
  telefono: string;
  programa: string;
  ficha: string;
  regional: string;
  centro: string;
  jornada: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual' | 'Madrugada' | 'Fin de semana';
  fechaRegistro: string;
}

export interface QuizQuestion {
  id: number;
  categoria: 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Novedades y Trámites' | 'Evaluación y Deserción';
  pregunta: string;
  contextoCaso?: string;
  opciones: {
    id: string;
    texto: string;
  }[];
  opcionCorrectaId: string;
  articuloReferencia: string;
  refuerzoPedagogico: string;
}

export interface EvaluationAnswerRecord {
  preguntaId: number;
  categoria: string;
  pregunta: string;
  respuestaSeleccionadaId: string;
  respuestaSeleccionadaTexto: string;
  respuestaCorrectaId: string;
  respuestaCorrectaTexto: string;
  esCorrecta: boolean;
  articuloReferencia: string;
  refuerzoPedagogico: string;
}

export interface EvaluationAttempt {
  id: string;
  folio: string;
  fecha: string;
  timestamp: number;
  moduloId: string;
  moduloTitulo: string;
  aprendiz: ApprenticeProfile;
  totalPreguntas: number;
  respuestasCorrectas: number;
  respuestasIncorrectas: number;
  porcentaje: number;
  juicio: 'APROBADO' | 'NO APROBADO - REQUIERE PLAN DE MEJORAMIENTO';
  respuestas: EvaluationAnswerRecord[];
  recomendacionPedagogica: string;
}
