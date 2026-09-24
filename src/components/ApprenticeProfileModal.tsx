import React, { useState, useEffect } from 'react';
import { ApprenticeProfile } from '../types';
import { getSavedProfile, saveProfile } from '../utils/repositoryStorage';
import { UserCheck, Shield, AlertCircle, Save, X, Building, BookOpen, Hash, Phone, Mail } from 'lucide-react';

interface ApprenticeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: ApprenticeProfile) => void;
  title?: string;
  description?: string;
  isMandatoryBeforeQuiz?: boolean;
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

export default function ApprenticeProfileModal({
  isOpen,
  onClose,
  onSave,
  title = 'Ficha de Caracterización y Datos Básicos del Aprendiz',
  description = 'Verifica y completa tus datos institucionales. Esta información se asociará formalmente a tus resultados y quedará registrada en el Repositorio de Evaluaciones según el Acuerdo 009 de 2024.',
  isMandatoryBeforeQuiz = false,
}: ApprenticeProfileModalProps) {
  const [formData, setFormData] = useState<ApprenticeProfile>(getSavedProfile());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(getSavedProfile());
      setSavedSuccess(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombreCompleto.trim() || !formData.numeroDocumento.trim() || !formData.ficha.trim()) {
      setErrorMsg('Por favor completa los campos obligatorios: Nombre, Documento y Ficha.');
      return;
    }

    const updated: ApprenticeProfile = {
      ...formData,
      fechaRegistro: formData.fechaRegistro || new Date().toISOString(),
    };

    saveProfile(updated);
    setSavedSuccess(true);
    setErrorMsg('');

    if (onSave) {
      onSave(updated);
    }

    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden my-8 animate-in fade-in duration-200">
        {/* Header con identidad SENA */}
        <div className="bg-linear-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white relative">
          {!isMandatoryBeforeQuiz && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-emerald-100 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20">
              <UserCheck className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Acuerdo 009 de 2024
                </span>
                <span className="text-xs text-emerald-200">Artículo 8 Numeral 4</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight mt-1">{title}</h2>
            </div>
          </div>
          <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-sm font-medium">
              <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Datos básicos del aprendiz verificados y guardados con éxito! Redirigiendo...</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre completo */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Nombres y Apellidos Completos *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="nombreCompleto"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Lilian Alvarez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 font-medium transition-all"
                />
              </div>
            </div>

            {/* Tipo de Documento */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Tipo de Documento *
              </label>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 bg-white font-medium"
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
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Número de Documento *
              </label>
              <input
                type="text"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleChange}
                required
                placeholder="Ej. 1025894123"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 font-medium"
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> Correo Electrónico Institucional/Personal *
              </label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                placeholder="aprendiz@soy.sena.edu.co"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> Teléfono de Contacto
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej. 3101234567"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800"
              />
            </div>

            {/* Programa de formación */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Programa de Formación SENA *
              </label>
              <input
                type="text"
                name="programa"
                value={formData.programa}
                onChange={handleChange}
                required
                placeholder="Ej. Tecnología en Análisis y Desarrollo de Software (ADSO)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 font-medium"
              />
            </div>

            {/* Ficha de caracterización */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-emerald-600" /> Número de Ficha / Grupo *
              </label>
              <input
                type="text"
                name="ficha"
                value={formData.ficha}
                onChange={handleChange}
                required
                placeholder="Ej. 2874915"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 font-medium"
              />
            </div>

            {/* Jornada */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Jornada o Modalidad
              </label>
              <select
                name="jornada"
                value={formData.jornada}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 bg-white font-medium"
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
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-emerald-600" /> Regional SENA
              </label>
              <select
                name="regional"
                value={formData.regional}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800 bg-white"
              >
                {REGIONALES_SENA.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Centro de Formación */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Centro de Formación
              </label>
              <input
                type="text"
                name="centro"
                value={formData.centro}
                onChange={handleChange}
                placeholder="Ej. Centro de Gestión de Mercados, Logística y TI"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-800 flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Deber del Aprendiz (Art. 8 Numeral 4):</strong> Es deber del aprendiz registrar y mantener actualizada su información básica y de contacto en el sistema de gestión académica del SENA.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            {!isMandatoryBeforeQuiz && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md hover:shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y Confirmar Datos</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
