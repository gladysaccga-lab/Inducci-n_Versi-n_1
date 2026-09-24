import { useState } from 'react';
import {
  MapPin,
  Building,
  Users,
  Compass,
  ChevronRight,
  Award,
  Layers,
  Camera,
  Maximize2,
  X,
  Navigation,
  CheckCircle2,
  Sparkles,
  Map,
  Search,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Globe2,
  Check
} from 'lucide-react';

import mapaImg from '../assets/images/mapa_sena_colombia_1790279312136.jpg';
import bogotaImg from '../assets/images/sena_bogota_sede_1790277062024.jpg';
import medellinImg from '../assets/images/sena_medellin_sede_1790277077118.jpg';
import caliImg from '../assets/images/sena_cali_sede_1790277088866.jpg';
import caribeImg from '../assets/images/sena_caribe_sede_1790277101003.jpg';
import santanderImg from '../assets/images/sena_santander_sede_1790277112661.jpg';

export interface RegionalInfo {
  id: string;
  nombre: string;
  sede: string;
  departamento: string;
  direccion: string;
  altitud: string;
  imagen: string;
  descripcionFoto: string;
  centrosCount: number;
  destacados: string[];
  zonas: string;
  vocacion: string;
}

export interface DepartmentSummary {
  departamento: string;
  centrosCount: number;
  centros: string[];
  regional: string;
  tecnoparque?: boolean;
  tecnoacademia?: boolean;
}

const REGIONALES_DATA: RegionalInfo[] = [
  {
    id: 'dc',
    nombre: 'Distrito Capital',
    sede: 'Bogotá D.C.',
    departamento: 'Distrito Capital / Cundinamarca',
    direccion: 'Complejo Paloquemao - Cra. 30 # 17B-25 Sur / Cra. 13 # 65-10',
    altitud: '2.625 m s. n. m.',
    imagen: bogotaImg,
    descripcionFoto: 'Campus de la Dirección General y Complejo de Paloquemao en Bogotá, con laboratorios de alta tecnología, mecatrónica, software y telecomunicaciones.',
    centrosCount: 15,
    destacados: [
      'Centro de Gestión de Mercados, Logística y TI',
      'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      'Centro de Tecnologías del Transporte',
      'Centro Metalmecánico',
      'Centro de Servicios Financieros',
      'Centro Nacional de Hotelería, Turismo y Alimentos'
    ],
    zonas: 'Urbana y Metropolitana Capitalina',
    vocacion: 'Servicios, TIC, Industria 4.0 y Gestión Empresarial'
  },
  {
    id: 'ant',
    nombre: 'Antioquia',
    sede: 'Medellín',
    departamento: 'Antioquia',
    direccion: 'Torre Central - Calle 51 # 57-70 / Complejo El Pomar y Pedregal',
    altitud: '1.495 m s. n. m.',
    imagen: medellinImg,
    descripcionFoto: 'Complejo Central del SENA en el Valle de Aburrá, epicentro de formación para confección, agroindustria, software, aviación y mecatrónica avanzada.',
    centrosCount: 16,
    destacados: [
      'Centro de Servicios y Gestión Empresarial',
      'Centro de la Innovación, la Agroindustria y la Aviación',
      'Centro Textil y de Gestión Industrial',
      'Centro de Tecnología de la Manufactura Avanzada',
      'Centro de Recursos Naturales Renovables - La Salada',
      'Centro de Formación en Diseño, Confección y Moda'
    ],
    zonas: 'Valle de Aburrá, Urabá, Oriente, Suroeste, Magdalena Medio',
    vocacion: 'Innovación, Textil, Software y Agroindustria'
  },
  {
    id: 'val',
    nombre: 'Valle del Cauca',
    sede: 'Cali',
    departamento: 'Valle del Cauca',
    direccion: 'Complejo Salomia - Calle 52 # 2Bis-15, Cali',
    altitud: '1.018 m s. n. m.',
    imagen: caliImg,
    descripcionFoto: 'Campus formativo de Salomia en Cali, rodeado de áreas verdes con amplios talleres industriales, centros de energía solar, biotecnología y logística del Pacífico.',
    centrosCount: 10,
    destacados: [
      'Centro de Electricidad y Automatización Industrial (CEAI)',
      'Centro Náutico Pesquero de Buenaventura',
      'Centro de Biotecnología Industrial (Palmira)',
      'Centro de la Construcción',
      'Centro Nacional de Asistencia Técnica a la Industria - ASTIN',
      'Centro Latinoamericano de Especies Menores'
    ],
    zonas: 'Pacífico, Valle Geográfico del Río Cauca, Cordillera Occidental',
    vocacion: 'Automatización, Biotecnología y Portuaria'
  },
  {
    id: 'san',
    nombre: 'Santander',
    sede: 'Bucaramanga',
    departamento: 'Santander',
    direccion: 'Ciudadela Real de Minas - Cra. 27 # 48-144 / Sede Floridablanca',
    altitud: '959 m s. n. m.',
    imagen: santanderImg,
    descripcionFoto: 'Sede de innovación tecnológica en Bucaramanga y Floridablanca, con ambientes de metalmecánica, calzado, turismo cordillerano y agroindustria.',
    centrosCount: 8,
    destacados: [
      'Centro de Servicios Empresariales y Turísticos',
      'Centro Industrial del Diseño y la Manufactura (Floridablanca)',
      'Centro Agroturístico (San Gil)',
      'Centro Industrial y del Desarrollo Tecnológico (Barrancabermeja)',
      'Centro Agroempresarial y Turístico de los Andes',
      'Centro de Atención al Sector Agropecuario'
    ],
    zonas: 'Metropolitana, Comunera, Guanentina, Mares y Soto Norte',
    vocacion: 'Diseño, Manufactura, Turismo y Petróleo'
  },
  {
    id: 'atl',
    nombre: 'Atlántico',
    sede: 'Barranquilla',
    departamento: 'Atlántico',
    direccion: 'Complejo Colombo Alemán - Calle 30 # 3E-164, Barranquilla',
    altitud: '18 m s. n. m.',
    imagen: caribeImg,
    descripcionFoto: 'Sede del Caribe industrial en Barranquilla, líder en refrigeración, mantenimiento naval, metalistería, logística marítima y energías renovables.',
    centrosCount: 4,
    destacados: [
      'Centro Nacional Colombo Alemán',
      'Centro de Comercio y Servicios',
      'Centro Industrial y de Aviación',
      'Centro para el Desarrollo Agroecológico y Agroindustrial'
    ],
    zonas: 'Ribera del Magdalena, Costa Caribe e Industrial',
    vocacion: 'Mantenimiento Naval, Logística y Refrigeración'
  },
  {
    id: 'cun',
    nombre: 'Cundinamarca',
    sede: 'Mosquera / Facatativá',
    departamento: 'Cundinamarca',
    direccion: 'Centro de Biotecnología Agropecuaria - Km 7 Vía Mosquera',
    altitud: '2.516 m s. n. m.',
    imagen: bogotaImg,
    descripcionFoto: 'Centro formativo agroindustrial en la Sabana de Cundinamarca, especializado en biotecnología, producción lechera, floricultura y gestión ambiental.',
    centrosCount: 6,
    destacados: [
      'Centro de Desarrollo Agroempresarial (Chía)',
      'Centro de Biotecnología Agropecuaria (Mosquera)',
      'Centro Industrial y de Desarrollo Empresarial de Soacha',
      'Centro Agroecológico y Empresarial (Fusagasugá)'
    ],
    zonas: 'Sabana de Bogotá, Almeidas, Rionegro, Sumapaz y Tequendama',
    vocacion: 'Agrobiotecnología, Floricultura y Agroindustria'
  },
  {
    id: 'bol',
    nombre: 'Bolívar',
    sede: 'Cartagena de Indias',
    departamento: 'Bolívar',
    direccion: 'Av. Pedro de Heredia, Sector Cuatro Vientos - Calle 31 # 47B-74',
    altitud: '2 m s. n. m.',
    imagen: caribeImg,
    descripcionFoto: 'Instalaciones náuticas, portuarias y petroquímicas en Cartagena de Indias, ciudad natal del ilustre fundador Dr. Rodolfo Martínez Tono.',
    centrosCount: 4,
    destacados: [
      'Centro para el Desarrollo Agroecológico y Agroindustrial (CEDAGRO)',
      'Centro Internacional Náutico, Fluvial y Portuario',
      'Centro para la Industria Petroquímica',
      'Centro de Comercio y Servicios'
    ],
    zonas: 'Costera Caribe, Bahía de Cartagena y Depresión Momposina',
    vocacion: 'Operaciones Portuarias, Náutica y Petroquímica'
  },
  {
    id: 'cal',
    nombre: 'Caldas',
    sede: 'Manizales',
    departamento: 'Caldas',
    direccion: 'Complejo Maltería - Km 10 Vía al Magdalena, Manizales',
    altitud: '2.160 m s. n. m.',
    imagen: medellinImg,
    descripcionFoto: 'Sede formativa en el Eje Cafetero caldense, con ambientes para mecatrónica, automatización industrial, biotecnología del café y agroempresas.',
    centrosCount: 5,
    destacados: [
      'Centro para la Formación Cafetera',
      'Centro de Automatización Industrial',
      'Centro Pecuario y Agroempresarial (La Dorada)',
      'Centro de Procesos Industriales',
      'Centro de Comercio y Servicios'
    ],
    zonas: 'Eje Cafetero, Magdalena Caldense y Subregión Centro-Sur',
    vocacion: 'Automatización, Caficultura y Construcción'
  }
];

// Datos exhaustivos de los 117 centros en las 33 Regionales extraídos del Mapa Infográfico Oficial del SENA
const MAPA_DEPARTAMENTOS: DepartmentSummary[] = [
  {
    departamento: 'Antioquia',
    centrosCount: 16,
    regional: 'Regional Antioquia',
    tecnoparque: true,
    tecnoacademia: true,
    centros: [
      'Centro de los Recursos Naturales Renovables - La Salada',
      'Centro del Diseño y Manufactura del Cuero',
      'Centro de Formación en Diseño, Confección y Moda',
      'Centro para el Desarrollo del Hábitat y la Construcción',
      'Centro de Tecnología de la Manufactura Avanzada',
      'Centro Tecnológico del Mobiliario',
      'Centro de Comercio',
      'Centro de Servicios de Salud',
      'Centro de Servicios y Gestión Empresarial',
      'Complejo Tecnológico para la Gestión Agroempresarial',
      'Complejo Tecnológico Minero Agroempresarial',
      'Centro de la Innovación, la Agroindustria y la Aviación',
      'Complejo Tecnológico Agroindustrial, Pecuario y Turístico',
      'Complejo Tecnológico Turístico y Agroindustrial del Occidente',
      'Centro Minero Ambiental del Alto Chicamocha'
    ]
  },
  {
    departamento: 'Distrito Capital',
    centrosCount: 15,
    regional: 'Regional Distrito Capital',
    tecnoparque: true,
    centros: [
      'Centro de Tecnologías para la Construcción y la Madera',
      'Centro de Electricidad, Electrónica y Telecomunicaciones',
      'Centro de Gestión Industrial',
      'Centro de Manufactura en Textiles y Cuero',
      'Centro de Tecnologías del Transporte',
      'Centro Metalmecánico',
      'Centro de Materiales y Ensayos',
      'Centro de Diseño y Metrología',
      'Centro para la Industria de la Comunicación Gráfica',
      'Centro de Gestión de Mercados, Logística y TI',
      'Centro de Formación de Talento Humano en Salud',
      'Centro de Gestión Administrativa',
      'Centro de Servicios Financieros',
      'Centro Nacional de Hotelería, Turismo y Alimentos',
      'Centro de Formación en Actividad Física y Cultura'
    ]
  },
  {
    departamento: 'Valle del Cauca',
    centrosCount: 10,
    regional: 'Regional Valle',
    tecnoparque: true,
    centros: [
      'Centro Agropecuario de Buga',
      'Centro Latinoamericano de Especies Menores',
      'Centro Náutico Pesquero de Buenaventura',
      'Centro de Electricidad y Automatización Industrial - CEAI',
      'Centro de la Construcción',
      'Centro de Diseño Tecnológico Industrial',
      'Centro Nacional de Asistencia Técnica a la Industria - ASTIN',
      'Centro de Gestión Tecnológica de Servicios',
      'Centro de Biotecnología Industrial',
      'Centro de Tecnologías Agroindustriales'
    ]
  },
  {
    departamento: 'Santander',
    centrosCount: 8,
    regional: 'Regional Santander',
    tecnoparque: true,
    centros: [
      'Centro Agroempresarial y Turístico de los Andes',
      'Centro Industrial del Diseño y la Manufactura',
      'Centro de Servicios Empresariales y Turísticos',
      'Centro Industrial y del Desarrollo Tecnológico',
      'Centro Agroturístico',
      'Centro de Atención al Sector Agropecuario',
      'Centro de Gestión Agroempresarial del Oriente',
      'Centro de Formación para el Desarrollo Rural y Minero'
    ]
  },
  {
    departamento: 'Cundinamarca',
    centrosCount: 6,
    regional: 'Regional Cundinamarca',
    tecnoparque: true,
    tecnoacademia: true,
    centros: [
      'Centro Industrial y de Desarrollo Empresarial de Soacha',
      'Centro de Desarrollo Agroindustrial y Empresarial',
      'Centro Agroecológico y Empresarial',
      'Centro de la Tecnología del Diseño y la Productividad',
      'Centro de Biotecnología Agropecuaria',
      'Centro de Desarrollo Agroempresarial'
    ]
  },
  {
    departamento: 'Caldas',
    centrosCount: 5,
    regional: 'Regional Caldas',
    tecnoparque: true,
    tecnoacademia: true,
    centros: [
      'Centro para la Formación Cafetera',
      'Centro de Automatización Industrial',
      'Centro de Procesos Industriales',
      'Centro de Comercio y Servicios',
      'Centro Pecuario y Agroempresarial'
    ]
  },
  {
    departamento: 'Huila',
    centrosCount: 5,
    regional: 'Regional Huila',
    tecnoparque: true,
    tecnoacademia: true,
    centros: [
      'Centro de Formación Agroindustrial',
      'Centro Agroempresarial y Desarrollo Pecuario del Huila',
      'Centro de Desarrollo Agroempresarial y Turístico',
      'Centro de la Industria, la Empresa y los Servicios',
      'Centro de Gestión y Desarrollo Sostenible Surcolombiano'
    ]
  },
  {
    departamento: 'Atlántico',
    centrosCount: 4,
    regional: 'Regional Atlántico',
    centros: [
      'Centro para el Desarrollo Agroecológico y Agroindustrial',
      'Centro Nacional Colombo Alemán',
      'Centro Industrial y de Aviación',
      'Centro de Comercio y Servicios'
    ]
  },
  {
    departamento: 'Bolívar',
    centrosCount: 4,
    regional: 'Regional Bolívar',
    centros: [
      'Centro Agroempresarial y Minero',
      'Centro Internacional Náutico, Fluvial y Portuario',
      'Centro para la Industria Petroquímica',
      'Centro de Comercio y Servicios'
    ]
  },
  {
    departamento: 'Boyacá',
    centrosCount: 4,
    regional: 'Regional Boyacá',
    centros: [
      'Centro de Desarrollo Agropecuario y Agroindustrial',
      'Centro Minero',
      'Centro de Gestión Administrativa y Fortalecimiento Empresarial',
      'Centro Industrial de Mantenimiento y Manufactura'
    ]
  },
  {
    departamento: 'Cesar',
    centrosCount: 3,
    regional: 'Regional Cesar',
    tecnoparque: true,
    centros: [
      'Centro Biotecnológico del Caribe',
      'Centro Agroempresarial',
      'Centro de Operación y Mantenimiento Minero'
    ]
  },
  {
    departamento: 'Tolima',
    centrosCount: 3,
    regional: 'Regional Tolima',
    tecnoparque: true,
    centros: [
      'Centro Agropecuario La Granja',
      'Centro de Industria y Construcción',
      'Centro de Comercio y Servicios'
    ]
  },
  {
    departamento: 'Cauca',
    centrosCount: 3,
    regional: 'Regional Cauca',
    centros: [
      'Centro Agropecuario',
      'Centro de Teleinformática y Producción Industrial',
      'Centro de Comercio y Servicios'
    ]
  },
  {
    departamento: 'Nariño',
    centrosCount: 3,
    regional: 'Regional Nariño',
    tecnoacademia: true,
    centros: [
      'Centro Sur Colombiano de Logística Internacional',
      'Centro Agroindustrial y Pesquero de la Costa Pacífica',
      'Centro Internacional de Producción Limpia - Lope'
    ]
  },
  {
    departamento: 'Quindío',
    centrosCount: 3,
    regional: 'Regional Quindío',
    centros: [
      'Centro Agroindustrial',
      'Centro para el Desarrollo Tecnológico de la Construcción',
      'Centro de Comercio y Turismo'
    ]
  },
  {
    departamento: 'Risaralda',
    centrosCount: 3,
    regional: 'Regional Risaralda',
    tecnoparque: true,
    centros: [
      'Centro Atención Sector Agropecuario',
      'Centro de Diseño e Innovación Tecnológica Industrial',
      'Centro de Comercio y Servicios'
    ]
  },
  {
    departamento: 'Magdalena',
    centrosCount: 2,
    regional: 'Regional Magdalena',
    centros: [
      'Centro Acuícola y Agroindustrial de Gaira',
      'Centro de Logística y Promoción Ecoturística del Magdalena'
    ]
  },
  {
    departamento: 'Guajira',
    centrosCount: 2,
    regional: 'Regional Guajira',
    centros: [
      'Centro Industrial y de Energías Alternativas',
      'Centro Agroempresarial y Acuícola'
    ]
  },
  {
    departamento: 'Norte de Santander',
    centrosCount: 2,
    regional: 'Regional Norte de Santander',
    tecnoparque: true,
    centros: [
      'Centro de Formación para el Desarrollo Rural y Minero',
      'Centro de la Industria, la Empresa y los Servicios'
    ]
  },
  {
    departamento: 'Córdoba',
    centrosCount: 2,
    regional: 'Regional Córdoba',
    centros: [
      'Centro Agropecuario y de Biotecnología El Porvenir',
      'Centro de Comercio, Industria y Turismo de Córdoba'
    ]
  },
  {
    departamento: 'Meta',
    centrosCount: 2,
    regional: 'Regional Meta',
    centros: [
      'Centro Agroindustrial del Meta',
      'Centro de Industria y Servicios del Meta'
    ]
  },
  {
    departamento: 'San Andrés y Providencia',
    centrosCount: 1,
    regional: 'Regional San Andrés',
    centros: ['Centro de Formación Turística, Gente de Mar y de Servicios']
  },
  {
    departamento: 'Sucre',
    centrosCount: 1,
    regional: 'Regional Sucre',
    centros: ['Centro de la Innovación, la Tecnología y los Servicios']
  },
  {
    departamento: 'Chocó',
    centrosCount: 1,
    regional: 'Regional Chocó',
    centros: ['Centro de Recursos Naturales, Industria y Biodiversidad']
  },
  {
    departamento: 'Arauca',
    centrosCount: 1,
    regional: 'Regional Arauca',
    centros: ['Centro de Gestión y Desarrollo Agroindustrial de Arauca']
  },
  {
    departamento: 'Vichada',
    centrosCount: 1,
    regional: 'Regional Vichada',
    centros: ['Centro de Producción y Transformación Agroindustrial de la Orinoquía']
  },
  {
    departamento: 'Casanare',
    centrosCount: 1,
    regional: 'Regional Casanare',
    centros: ['Centro Agroindustrial y Fortalecimiento Empresarial de Casanare']
  },
  {
    departamento: 'Guainía',
    centrosCount: 1,
    regional: 'Regional Guainía',
    centros: ['Centro Ambiental y Ecoturístico del Nororiente Amazónico']
  },
  {
    departamento: 'Guaviare',
    centrosCount: 1,
    regional: 'Regional Guaviare',
    centros: ['Centro de Desarrollo Agroindustrial, Turístico y Tecnológico del Guaviare']
  },
  {
    departamento: 'Vaupés',
    centrosCount: 1,
    regional: 'Regional Vaupés',
    centros: ['Centro Agropecuario y de Servicios Ambientales "Jirijirimo"']
  },
  {
    departamento: 'Caquetá',
    centrosCount: 1,
    regional: 'Regional Caquetá',
    centros: ['Centro Tecnológico de la Amazonía']
  },
  {
    departamento: 'Putumayo',
    centrosCount: 1,
    regional: 'Regional Putumayo',
    centros: ['Centro Agroforestal y Acuícola Andino Amazónico']
  },
  {
    departamento: 'Amazonas',
    centrosCount: 1,
    regional: 'Regional Amazonas',
    centros: ['Centro para la Biodiversidad y el Turismo del Amazonas']
  }
];

export default function EstructuraModule() {
  const [activeTab, setActiveTab] = useState<'mapa' | 'sedes_fotos'>('mapa');
  const [selectedRegional, setSelectedRegional] = useState<RegionalInfo>(REGIONALES_DATA[0]);
  const [zoomedImage, setZoomedImage] = useState<RegionalInfo | null>(null);
  const [isMapZoomOpen, setIsMapZoomOpen] = useState(false);
  const [mapSearch, setMapSearch] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string | null>(null);

  // Filtrado de departamentos en el mapa
  const filteredDepartments = MAPA_DEPARTAMENTOS.filter((dept) => {
    const matchesSearch =
      dept.departamento.toLowerCase().includes(mapSearch.toLowerCase()) ||
      dept.centros.some((c) => c.toLowerCase().includes(mapSearch.toLowerCase()));
    const matchesFilter = selectedDeptFilter ? dept.departamento === selectedDeptFilter : true;
    return matchesSearch && matchesFilter;
  });

  const totalCentrosCalculados = MAPA_DEPARTAMENTOS.reduce((acc, d) => acc + d.centrosCount, 0);

  return (
    <div className="space-y-6">
      {/* Modal Lightbox para Ampliar el Mapa Oficial del SENA */}
      {isMapZoomOpen && (
        <div
          onClick={() => setIsMapZoomOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-3 md:p-6 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 max-h-[92vh] flex flex-col"
          >
            {/* Header del Modal */}
            <div className="bg-[#8ec339] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-white" />
                <div>
                  <h3 className="text-base font-black text-white leading-tight">
                    El SENA tiene presencia en 1.102 municipios de Colombia • 117 centros de formación
                  </h3>
                  <p className="text-[11px] text-white/90">
                    Mapa Oficial de Regionales y Cobertura Nacional
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMapZoomOpen(false)}
                className="p-1.5 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors cursor-pointer"
                title="Cerrar mapa ampliado"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Imagen en Alta Definición */}
            <div className="p-4 bg-slate-100 overflow-y-auto flex-1 flex items-center justify-center">
              <img
                src={mapaImg}
                alt="Mapa Oficial de las Regionales del SENA Colombia"
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-md border border-slate-200"
              />
            </div>

            <div className="p-3 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2 shrink-0">
              <span className="font-semibold text-emerald-800">
                117 Centros • 33 Direcciones Regionales • Fondo Emprender • Agencia Pública de Empleo
              </span>
              <button
                onClick={() => setIsMapZoomOpen(false)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer text-xs"
              >
                Cerrar Vista
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para ampliación de foto de Sede Regional */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95"
          >
            <div className="relative aspect-video w-full bg-slate-900">
              <img
                src={zoomedImage.imagen}
                alt={`Sede SENA Regional ${zoomedImage.nombre}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
                title="Cerrar imagen"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/85 backdrop-blur-md rounded-2xl text-white border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                    SENA Regional {zoomedImage.nombre}
                  </span>
                  <span className="text-xs text-emerald-200">
                    Sede: {zoomedImage.sede}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {zoomedImage.descripcionFoto}
                </p>
                <p className="text-[11px] text-emerald-300 font-mono mt-1">
                  Dirección: {zoomedImage.direccion}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta de Encabezado Institucional con Selector de Vistas */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-700">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Módulo 2 • Presencia Territorial
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Estructura Organizativa y Mapa de las Regionales
              </h3>
            </div>
          </div>

          {/* Selector de Pestañas del Módulo */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('mapa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'mapa'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Mapa Oficial de Regionales</span>
            </button>

            <button
              onClick={() => setActiveTab('sedes_fotos')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'sedes_fotos'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Sedes y Complejos (Fotos al Lado Derecho)</span>
            </button>
          </div>
        </div>

        {/* Métricas Rápidas Nacionales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <span className="text-slate-500 font-medium block">Municipios Atendidos</span>
            <span className="text-lg font-black text-emerald-800">1.102 Municipios</span>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <span className="text-slate-500 font-medium block">Centros de Formación</span>
            <span className="text-lg font-black text-emerald-800">117 Centros</span>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <span className="text-slate-500 font-medium block">Direcciones Regionales</span>
            <span className="text-lg font-black text-emerald-800">33 Regionales</span>
          </div>
          <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
            <span className="text-slate-500 font-medium block">Cobertura Nacional</span>
            <span className="text-lg font-black text-emerald-800">32 Departamentos + D.C.</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          PESTAÑA 1: MAPA OFICIAL DE LAS REGIONALES DEL SENA
          (Solicitado: mostrar este mapa de las regionales)
         ======================================================== */}
      {activeTab === 'mapa' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Tarjeta del Mapa Infográfico Oficial */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            {/* Cabecera Oficial al estilo de la Infografía del SENA */}
            <div className="bg-[#8ec339] p-4 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                  Infografía Institucional
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  El SENA tiene presencia en 1.102 municipios de Colombia • 117 centros de formación
                </h3>
                <p className="text-xs text-white/90">
                  Distribución territorial de las 33 direcciones regionales, tecnoacademias y tecnoparques
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setIsMapZoomOpen(true)}
                  className="px-4 py-2 bg-white text-[#8ec339] hover:bg-slate-50 font-bold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Ampliar Mapa Completo</span>
                </button>
              </div>
            </div>

            {/* Layout del Mapa: Imagen a la Izquierda/Centro + Directorio de Centros a la Derecha */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Contenedor de la Imagen del Mapa (7 cols) */}
              <div className="lg:col-span-7 space-y-3">
                <div
                  onClick={() => setIsMapZoomOpen(true)}
                  className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group shadow-inner"
                  title="Haz clic para ver el mapa en pantalla completa"
                >
                  <img
                    src={mapaImg}
                    alt="Mapa de presencia regional del SENA en 1.102 municipios y 117 centros"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain max-h-[640px] mx-auto group-hover:scale-102 transition-transform duration-300"
                  />

                  {/* Overlay interactivo al pasar el mouse */}
                  <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-slate-900/90 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4 text-emerald-400" />
                      <span>Clic para Ampliar Mapa en Alta Resolución</span>
                    </span>
                  </div>
                </div>

                {/* Aviso del Fondo Emprender y Agencia Pública de Empleo (Extraído del mapa) */}
                <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Briefcase className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Red de Servicios Institucionales del SENA:</span>
                  </div>
                  <p className="leading-relaxed text-slate-700">
                    Recuerde que contamos con oficinas del <strong>Fondo Emprender</strong> en los <strong>117 centros de formación</strong> y oficinas de la <strong>Agencia Pública de Empleo (APE)</strong> en las <strong>32 regionales</strong> para acompañar a los aprendices y egresados en su inserción laboral y emprendimiento.
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-amber-900 font-medium">
                    <span>Portal oficial: www.sena.edu.co</span>
                    <span className="font-bold">SENA comunica</span>
                  </div>
                </div>
              </div>

              {/* Directorio Interactivo de los 117 Centros por Regional (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 max-h-[740px] flex flex-col">
                <div className="pb-2 border-b border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>Desglose de los 117 Centros</span>
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-800 font-bold">
                      {totalCentrosCalculados} Centros
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Busca o filtra los centros de formación por cada departamento
                  </p>
                </div>

                {/* Buscador de Centros y Departamentos */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar regional, departamento o centro..."
                    value={mapSearch}
                    onChange={(e) => setMapSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
                  />
                </div>

                {/* Lista de Departamentos y sus Centros con Scroll */}
                <div className="overflow-y-auto space-y-2.5 flex-1 pr-1">
                  {filteredDepartments.map((dept, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs space-y-2 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                            {dept.centrosCount}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">
                              {dept.departamento}
                            </span>
                            <span className="text-[10px] text-slate-400">{dept.regional}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {dept.tecnoparque && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 border border-teal-200 font-semibold">
                              Tecnoparque
                            </span>
                          )}
                          {dept.tecnoacademia && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                              Tecnoacademia
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Lista de Centros del Departamento */}
                      <div className="pt-1.5 border-t border-slate-100 space-y-1 text-[11px] text-slate-600">
                        {dept.centros.map((centro, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold shrink-0">•</span>
                            <span className="leading-snug">{centro}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {filteredDepartments.length === 0 && (
                    <div className="text-center py-8 text-xs text-slate-400">
                      No se encontraron centros que coincidan con la búsqueda.
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('sedes_fotos')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Ver Fotografías de las Sedes Regionales</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PESTAÑA 2: EXPLORADOR DE SEDES CON FOTOGRAFÍAS AL LADO DERECHO
          (Mantiene la funcionalidad del prompt anterior)
         ======================================================== */}
      {activeTab === 'sedes_fotos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-200">
          {/* COLUMNA IZQUIERDA: SELECTOR DE REGIONALES (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 max-h-[640px] overflow-y-auto">
            <div className="px-2 mb-2 pb-2 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Regionales Destacadas</span>
              </h4>
              <span className="text-[11px] font-mono text-emerald-700 font-bold">
                {REGIONALES_DATA.length} Sedes
              </span>
            </div>

            <div className="space-y-1.5">
              {REGIONALES_DATA.map((reg) => {
                const isSelected = selectedRegional.id === reg.id;
                return (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegional(reg)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-slate-100 hover:bg-slate-50 text-slate-700 hover:border-slate-200'
                    }`}
                  >
                    {/* Miniatura de la sede */}
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                      <img
                        src={reg.imagen}
                        alt={reg.nombre}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs md:text-sm truncate font-bold text-slate-800 group-hover:text-emerald-800">
                        {reg.nombre}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{reg.sede}</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        {reg.centrosCount} Centros de Formación
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-emerald-600 translate-x-0.5' : 'text-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('mapa')}
              className="w-full mt-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ver Mapa Oficial de los 1.102 Municipios</span>
            </button>
          </div>

          {/* PANEL DERECHO: DETALLES DE LA REGIONAL + IMÁGENES AL LADO DERECHO (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Subcolumna Central (Información y Centros: 7 cols) */}
            <div className="md:col-span-7 bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Regional Seleccionada
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {selectedRegional.departamento}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                  Regional {selectedRegional.nombre}
                </h3>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  Vocación productiva: {selectedRegional.vocacion}
                </p>
              </div>

              {/* Datos Clave */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Sede Principal
                  </span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">
                    {selectedRegional.sede}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                    {selectedRegional.direccion}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Infraestructura
                  </span>
                  <span className="text-lg font-black text-emerald-800 block">
                    {selectedRegional.centrosCount} Centros
                  </span>
                  <span className="text-[11px] text-emerald-700 block">
                    Altitud: {selectedRegional.altitud}
                  </span>
                </div>
              </div>

              {/* Zonas de Influencia */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-600" />
                  Zonas y Subregiones de Cobertura
                </span>
                <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                  {selectedRegional.zonas}
                </p>
              </div>

              {/* Centros de Formación Destacados */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-600" />
                  Centros de Formación Destacados en {selectedRegional.nombre}
                </h4>
                <div className="space-y-1.5">
                  {selectedRegional.destacados.map((centro, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-emerald-50/40 border border-emerald-100 flex items-center gap-2.5 text-xs text-slate-800"
                    >
                      <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-slate-800">{centro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Articulación con el Acuerdo 009 de 2024 */}
              <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                <strong>Articulación con el Acuerdo 009 de 2024 (Art. 48 y 49):</strong> En las investigaciones sancionatorias del aprendiz, la <em>primera instancia</em> decisoria corresponde a la Subdirección del Centro y la <em>segunda instancia</em> en apelación es resuelta por la Dirección Regional.
              </div>
            </div>

            {/* SUBCOLUMNA DERECHA: IMÁGENES DE LAS REGIONALES DEL SENA */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Sede Regional • {selectedRegional.sede}
                    </span>
                  </div>
                  <button
                    onClick={() => setZoomedImage(selectedRegional)}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 text-emerald-300 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Ampliar fotografía"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Ampliar</span>
                  </button>
                </div>

                <div
                  onClick={() => setZoomedImage(selectedRegional)}
                  className="relative aspect-4/3 bg-slate-950 cursor-pointer group overflow-hidden"
                >
                  <img
                    src={selectedRegional.imagen}
                    alt={`Sede del SENA Regional ${selectedRegional.nombre}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold self-start mb-1 backdrop-blur-xs">
                      <Navigation className="w-3 h-3" />
                      <span>{selectedRegional.sede}, Colombia</span>
                    </div>
                    <h4 className="text-sm font-black text-white leading-tight">
                      Sede Regional {selectedRegional.nombre}
                    </h4>
                    <p className="text-[11px] text-slate-300 font-mono mt-0.5 line-clamp-1">
                      {selectedRegional.direccion}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3 bg-slate-50/50 flex-1">
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <p>{selectedRegional.descripcionFoto}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 space-y-1.5 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-500">Departamento:</span>
                      <span className="font-bold text-slate-800">{selectedRegional.departamento}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-500">Altitud media:</span>
                      <span className="font-mono text-emerald-800 font-semibold">{selectedRegional.altitud}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-500">Ambientes de formación:</span>
                      <span className="text-slate-800">Talleres, Labs y Aulas</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setZoomedImage(selectedRegional)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Ver Foto en Alta Resolución</span>
                  </button>
                </div>
              </div>

              {/* Galería Rápida de Fotografías */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Galería de Sedes Regionales</span>
                  </h5>
                  <span className="text-[10px] text-slate-400">Clic para ver</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {REGIONALES_DATA.map((r) => {
                    const isCurrent = r.id === selectedRegional.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRegional(r)}
                        title={`Ver sede SENA ${r.nombre} en ${r.sede}`}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                          isCurrent
                            ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-102'
                            : 'border-slate-200 hover:border-emerald-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={r.imagen}
                          alt={r.nombre}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition-colors flex items-end p-1">
                          <span className="text-[9px] font-bold text-white bg-slate-900/80 px-1 py-0.5 rounded leading-none truncate max-w-full">
                            {r.sede.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
