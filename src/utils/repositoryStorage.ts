import { ApprenticeProfile, EvaluationAttempt } from '../types';

const PROFILE_KEY = 'sena_aprendiz_perfil_activo';
const REPOSITORY_KEY = 'sena_repositorio_evaluaciones';

export const DEFAULT_PROFILE: ApprenticeProfile = {
  tipoDocumento: 'CC',
  numeroDocumento: '1025894123',
  nombreCompleto: 'Lilian Alvarez',
  correo: 'lilian.alvarez@soy.sena.edu.co',
  telefono: '3104567890',
  programa: 'Análisis y Desarrollo de Software (ADSO)',
  ficha: '2874915',
  regional: 'Regional Distrito Capital',
  centro: 'Centro de Gestión de Mercados, Logística y TI',
  jornada: 'Diurna',
  fechaRegistro: new Date().toISOString(),
};

export const getSavedProfile = (): ApprenticeProfile => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.nombreCompleto === 'Gladys Acosta') {
        parsed.nombreCompleto = 'Lilian Alvarez';
        if (parsed.correo === 'gladysac.cga@gmail.com') {
          parsed.correo = 'lilian.alvarez@soy.sena.edu.co';
        }
        localStorage.setItem(PROFILE_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (err) {
    console.error('Error al leer el perfil del aprendiz:', err);
  }
  return DEFAULT_PROFILE;
};

export const saveProfile = (profile: ApprenticeProfile): void => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error al guardar el perfil:', err);
  }
};

export const getEvaluationRepository = (): EvaluationAttempt[] => {
  try {
    const raw = localStorage.getItem(REPOSITORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error al cargar repositorio:', err);
  }
  return [];
};

export const saveEvaluationAttempt = (attempt: EvaluationAttempt): void => {
  try {
    const existing = getEvaluationRepository();
    const updated = [attempt, ...existing];
    localStorage.setItem(REPOSITORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error al guardar intento de evaluación:', err);
  }
};

export const deleteEvaluationAttempt = (id: string): EvaluationAttempt[] => {
  try {
    const existing = getEvaluationRepository();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(REPOSITORY_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error('Error al eliminar intento:', err);
    return [];
  }
};

export const clearRepository = (): void => {
  try {
    localStorage.removeItem(REPOSITORY_KEY);
  } catch (err) {
    console.error('Error al limpiar repositorio:', err);
  }
};
