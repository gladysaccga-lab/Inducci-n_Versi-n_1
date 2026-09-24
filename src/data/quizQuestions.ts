export interface QuizQuestion {
  id: number;
  categoria: 'Derechos' | 'Deberes' | 'Prohibiciones' | 'Novedades' | 'Deserción' | 'Sanciones';
  articuloReferencia: string;
  pregunta: string;
  contexto: string;
  opciones: string[];
  respuestaCorrecta: number; // 0-indexed
  refuerzoPedagogico: {
    analisisError: string;
    fundamentoLegal: string;
    conceptoCorrecto: string;
    consejoPractico: string;
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    categoria: 'Derechos',
    articuloReferencia: 'Artículo 5, Numeral 15',
    contexto: 'Un aprendiz presenta su proyecto final el día lunes y desea saber cuándo tiene derecho a conocer su resultado evaluativo.',
    pregunta: '¿En qué plazo máximo tiene derecho el aprendiz a conocer los resultados de sus evaluaciones?',
    opciones: [
      'Dentro de los ocho (8) días hábiles siguientes a su realización.',
      'Al finalizar el trimestre de formación junto con el boletín general.',
      'En un plazo no mayor a treinta (30) días calendario.',
      'El instructor no tiene un plazo definido, depende de su disponibilidad.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'Es común creer que las notas se entregan solo al corte de trimestre, pero el reglamento protege el derecho del aprendiz a la retroalimentación oportuna.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 5 (Derechos del aprendiz SENA), Numeral 15: "Ser evaluado objetiva e integralmente... y conocer los resultados de las evaluaciones dentro de los ocho (8) días hábiles siguientes a su realización".',
      conceptoCorrecto: 'Tienes derecho a que tus evaluaciones sean publicadas y explicadas en un plazo máximo de 8 días hábiles para que puedas solicitar revisión o planes de apoyo si los necesitas.',
      consejoPractico: 'Si pasan más de 8 días hábiles sin conocer tu juicio de evaluación, puedes solicitar cordialmente a tu instructor la publicación del resultado.'
    }
  },
  {
    id: 2,
    categoria: 'Deberes',
    articuloReferencia: 'Artículo 8, Numeral 20',
    contexto: 'Un aprendiz de bajos recursos no ha podido comprar el uniforme institucional de diario y le informan en la entrada que no puede ingresar al Centro.',
    pregunta: '¿Es causal reglamentaria impedir el ingreso a un aprendiz a los ambientes de formación por no portar el uniforme de uso diario?',
    opciones: [
      'No. La falta de condiciones económicas para el uniforme diario no es causal para impedir el acceso, siempre que no sea un EPP de seguridad obligatorio.',
      'Sí. El uniforme completo es requisito innegociable de asistencia diaria sin excepciones.',
      'Sí, a menos que el aprendiz pague una sanción monetaria en la coordinación.',
      'Depende del criterio particular que decida cada celador o instructor del día.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'El error radica en asumir que la indumentaria de diario está por encima del derecho a la educación garantizado en el SENA.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 8, Numeral 20: "...cuando el aprendiz no cuente con las condiciones económicas para acceder al uniforme para el uso diario, no asociado como elemento de protección... no será causal para que los directores, subdirectores, coordinadores e instructores impidan el acceso a los ambientes de formación".',
      conceptoCorrecto: 'Los Elementos de Protección Personal (EPP) sí son obligatorios por seguridad industrial (laboratorios/talleres), pero el uniforme de diario jamás puede ser barrera económica para estudiar.',
      consejoPractico: 'Si tienes dificultades para adquirir el uniforme de diario, comunícate con Bienestar al Aprendiz; nunca dejes de asistir a tus clases por esta razón.'
    }
  },
  {
    id: 3,
    categoria: 'Prohibiciones',
    articuloReferencia: 'Artículo 9, Numeral 4',
    contexto: 'Para entregar una evidencia grupal, un aprendiz descarga un informe de internet y copia párrafos extensos sin citar ni indicar la fuente.',
    pregunta: '¿Cómo clasifica el Acuerdo 009 de 2024 la acción de plagiar o presentar trabajos ajenos como propios?',
    opciones: [
      'Está tipificado expresamente como una Prohibición del aprendiz y constituye falta grave contra la ética y derechos de autor.',
      'Es un simple error académico que solo se resuelve borrando el archivo.',
      'Es permitido siempre y cuando el aprendiz cambie el título y la portada.',
      'Solo se considera falta si el proyecto va a ser comercializado fuera del SENA.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'El error estuvo en minimizar el plagio. Copiar y pegar contenido ajeno sin créditos vulnera la propiedad intelectual y las normas éticas del SENA.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 9, Numeral 4: "Plagiar materiales, trabajos y demás documentos generados en los grupos de trabajo o producto del trabajo institucional, así como en actividades evaluativas". Concordante con el Artículo 8 Numeral 12 y 13.',
      conceptoCorrecto: 'La honestidad académica es un pilar formativo. Todo material de apoyo debe ser debidamente citado bajo normas de citación (como APA).',
      consejoPractico: 'Utiliza las normas de citación y apóyate en las bibliotecas y bases de datos virtuales del SENA; tu instructor valora tu propio esfuerzo analítico.'
    }
  },
  {
    id: 4,
    categoria: 'Novedades',
    articuloReferencia: 'Artículo 18, Numeral 2 y 3',
    contexto: 'Un aprendiz debe someterse a una intervención quirúrgica con 30 días de reposo y necesita suspender temporalmente su formación.',
    pregunta: '¿Cuál es el trámite correcto y el plazo para solicitar el reintegro tras un aplazamiento?',
    opciones: [
      'Solicitar aplazamiento con soportes médicos y luego solicitar el reintegro dentro de los cinco (5) días hábiles previos al vencimiento del plazo.',
      'Abandonar las clases sin avisar y volver cuando se sienta recuperado para pedir cupo.',
      'Enviar un mensaje de WhatsApp a un compañero el día que finalice la incapacidad.',
      'El reintegro se realiza automáticamente por el sistema sin necesidad de solicitud escrita.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'El error consiste en creer que los trámites administrativos son automáticos o informales.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 18, Numeral 2 (Aplazamiento) y Numeral 3 (Reintegro): "El aprendiz debe solicitar el reintegro dentro de los cinco (5) días hábiles previos al vencimiento del plazo concedido... De no solicitarlo dentro de este término se entiende como causal de deserción".',
      conceptoCorrecto: 'El aplazamiento requiere radicación formal en el sistema de gestión. Además, debes estar muy atento a la fecha de término para solicitar el reintegro con mínimo 5 días hábiles de anticipación.',
      consejoPractico: 'Guarda en tu calendario personal la fecha límite de vencimiento de tu aplazamiento para radicar tu carta de reintegro a tiempo y no perder tu cupo.'
    }
  },
  {
    id: 5,
    categoria: 'Deserción',
    articuloReferencia: 'Artículo 30, Numeral 1',
    contexto: 'En formación presencial titulada, un aprendiz deja de asistir a clases sin presentar excusa ni comunicarse con su instructor.',
    pregunta: '¿Cuándo se configura causal de deserción por inasistencias en la modalidad presencial?',
    opciones: [
      'Al completar tres (3) días continuos o cinco (5) días no continuos de inasistencia injustificada durante el proceso formativo.',
      'Únicamente cuando se completan treinta (30) días calendario de ausencia consecutiva.',
      'Cuando el aprendiz falta a una sola clase teórica sin justificación médica.',
      'Solo si el aprendiz envía una carta formal firmada notificando su abandono.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'Pensar que se requieren semanas de ausencia para desertar es un error frecuente que lleva a muchos aprendices a perder su matrícula.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 30, Numeral 1, literal a: "En la formación presencial... tener tres (3) días continuos de inasistencia injustificada o acumular cinco (5) días no continuos de inasistencia injustificada durante todo el proceso de formación".',
      conceptoCorrecto: 'La asistencia es fundamental. Tres días seguidos o cinco acumulados sin justificación oportuna activan inmediatamente el proceso de deserción ante el Comité de Evaluación.',
      consejoPractico: 'Si tienes una emergencia, comunícate con tu instructor dentro de los cinco (5) días hábiles siguientes con los soportes de fuerza mayor correspondientes.'
    }
  },
  {
    id: 6,
    categoria: 'Sanciones',
    articuloReferencia: 'Artículo 46 y 47',
    contexto: 'Un aprendiz presenta dificultades para superar un resultado de aprendizaje técnico en la etapa lectiva.',
    pregunta: '¿Cuál es la ruta formativa pedagógica antes de imponer una sanción disciplinaria por rendimiento académico?',
    opciones: [
      'Hasta dos (2) llamados de atención académicos escritos acompañados de orientaciones y luego un Plan de Mejoramiento Académico de máx. 20 días.',
      'Expulsión inmediata y cancelación de matrícula sin derecho a reclamo.',
      'Cobro de multa económica para repetir la evaluación en horario extraordinario.',
      'Un llamado de atención verbal y suspensión de dos meses del centro de formación.'
    ],
    respuestaCorrecta: 0,
    refuerzoPedagogico: {
      analisisError: 'El SENA no aplica sanciones directas sin antes agotar las medidas formativas y el debido proceso pedagógico.',
      fundamentoLegal: 'Acuerdo 009 de 2024, Artículo 46, Numeral 1: "Son medidas formativas académicas: a) Llamado de atención académico (hasta dos por fase con orientaciones pedagógicas)... b) Plan de mejoramiento (máximo 20 días calendario tras agotar llamados)".',
      conceptoCorrecto: 'El enfoque del SENA es formativo y no punitivo. El instructor debe brindarte orientaciones académicas y acordar un plan de mejoramiento para ayudarte a alcanzar la competencia.',
      consejoPractico: 'Aprovecha los planes de mejoramiento como una valiosa oportunidad pedagógica concertada para superar tus debilidades técnicas.'
    }
  }
];
