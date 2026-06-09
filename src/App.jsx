import { useState, useEffect, useRef } from "react";

// ============================================================
// OPERACIÓN: CÓDIGO VERDE — VERSIÓN A
// Técnico Superior en Servicios Empresariales + Construcción
// Grupo SE-2-1 / CO-2-1 | EDA1001 | II Cuatrimestre 2026
// Equipos: ALFA · GAMMA · ÉPSILON
// Palabra: COMPACTADOR
// ============================================================

const VERSION = "A";
const EQUIPOS_VERSION = [
  { nombre: "ALFA",    color: "#4A7C59", icono: "🏗️", integrantes: 4 },
  { nombre: "GAMMA",   color: "#6B5B95", icono: "📊", integrantes: 4 },
  { nombre: "ÉPSILON", color: "#C0622F", icono: "♻️", integrantes: 4 },
];
const TEAMS_URL = "https://teams.microsoft.com";
const DURACION_GLOBAL = 90 * 60;

// Letras de COMPACTADOR reveladas reto a reto
const LETRAS_PALABRA = ["C","O","M","P","A","C","T","A","D","O","R"].slice(0,10);
// 10 letras exactas: C-O-M-P-A-C-T-A-D-O

const RETOS = [
  // ─────────────────────────────────────────────────────────
  // BLOQUE 1: CALENTAMIENTO (Retos 1–3, 10 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 1, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "La obra bajo sospecha",
    letra: "C",
    narrativa: `Una constructora en Ciudad de Panamá recibió una orden de paralización de MiAMBIENTE. 
El inspector encontró 6 irregularidades ambientales en la obra. Tu equipo debe identificarlas antes de que el plazo venza.`,
    escenario: `Durante una visita sorpresa a la obra "Torre Verano", el inspector anotó lo siguiente en su bitácora:
— Mezcla de cemento descargada directamente sobre el suelo sin geomembrana.
— Contenedores de residuos de demolición sin clasificar (RCD mezclado con basura doméstica).
— Motobomba sin mantenimiento descargando agua con sedimentos a la alcantarilla.
— Trabajadores sin EPP auditivo en zona de corte de acero.
— Árbol patrimonial marcado para tala sin permiso de MiAMBIENTE.
— Bitácora ambiental de obra en blanco (nunca registrada).`,
    pregunta1: {
      texto: "Clasifica las 6 irregularidades según el tipo de impacto ambiental: físico, biológico o social/laboral. Justifica brevemente cada clasificación.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de estas acciones constituye una violación directa a la Ley 41 de 1998 de Panamá?",
      opciones: [
        "A) No tener bitácora ambiental",
        "B) Talar un árbol patrimonial sin permiso de MiAMBIENTE",
        "C) Mezclar residuos de demolición con basura",
        "D) Trabajadores sin EPP auditivo",
      ],
      correcta: "B",
      explicacion: "La Ley 41 de 1998 regula la conservación de recursos naturales. La tala sin autorización de MiAMBIENTE viola directamente el artículo sobre recursos bióticos. Las demás son incumplimientos reglamentarios pero se rigen por otras normas (MINSA, Decreto 57, reglamentos laborales).",
    },
  },
  {
    id: 2, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "La huella del edificio",
    letra: "O",
    narrativa: `Una empresa de servicios empresariales acaba de recibir su auditoría ambiental anual. 
Los resultados muestran tres huellas preocupantes. Tu equipo debe interpretarlas y proponer acciones concretas.`,
    escenario: `Informe de Auditoría — Empresa "Nexo Corporativo S.A." — Panamá, 2026
▪ Huella de carbono: 48 tCO₂e/año (factor ETESA: 0.264 kg CO₂eq/kWh)
▪ Huella hídrica: 3,200 m³/año (operativa + embebida en servicios contratados)
▪ Huella ecológica: 5.1 hag/persona/año (biocapacidad de Panamá: 3.8 hag/persona/año)

La empresa tiene 12 empleados, consume 15,000 kWh/mes de electricidad, y sus residuos sólidos no están clasificados.`,
    pregunta1: {
      texto: "¿Cuál de las tres huellas representa mayor urgencia de intervención y por qué? Propón una acción concreta para reducirla en al menos un 20% en 6 meses.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "Si la empresa reduce su consumo eléctrico de 15,000 kWh/mes a 11,000 kWh/mes, ¿cuántas tCO₂e anuales dejará de emitir? (Factor: 0.264 kg CO₂eq/kWh)",
      opciones: [
        "A) 10.56 tCO₂e/año",
        "B) 12.67 tCO₂e/año",
        "C) 15.84 tCO₂e/año",
        "D) 8.44 tCO₂e/año",
      ],
      correcta: "B",
      explicacion: "Reducción mensual: 4,000 kWh × 0.264 = 1,056 kg CO₂eq = 1.056 tCO₂e/mes. Anual: 1.056 × 12 = 12.672 tCO₂e/año ≈ 12.67 tCO₂e/año.",
    },
  },
  {
    id: 3, bloque: "CALENTAMIENTO", bloqueColor: "#2E7D32", minutos: 10,
    titulo: "El expediente contaminado",
    letra: "M",
    narrativa: `Un asistente inexperto preparó el expediente de EIA de un proyecto constructivo. 
Tu equipo debe encontrar los 4 errores técnicos graves que invalidarían el documento ante MiAMBIENTE.`,
    escenario: `Fragmento del expediente de EIA — Proyecto "Comercial Istmo":

"1. El presente EIA es de Categoría A porque el área del proyecto supera los 500 m² en zona urbana.
2. El Decreto Ejecutivo 57 establece que MiAMBIENTE debe emitir resolución en 30 días hábiles.
3. Los residuos de construcción (RCD) serán depositados en un terreno baldío cercano sin tratamiento previo, lo que es permitido por el reglamento vigente.
4. El plan de mitigación incluye reforestación con especies ornamentales exóticas para compensar la remoción de cobertura vegetal nativa.
5. La empresa contratará a un regente ambiental solo si MiAMBIENTE lo exige como condición posterior a la aprobación."`,
    pregunta1: {
      texto: "Identifica los 4 errores técnicos o legales del expediente y explica por qué cada uno invalidaría o debilitaría el documento.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál es el criterio correcto para clasificar un proyecto como EIA Categoría A en Panamá según el Decreto Ejecutivo 57?",
      opciones: [
        "A) Todo proyecto en zona urbana con más de 500 m² de construcción",
        "B) Proyectos con potencial de impacto significativo, irreversible o de gran magnitud sobre el ambiente",
        "C) Cualquier proyecto que requiera permiso de construcción municipal",
        "D) Proyectos financiados con fondos públicos superiores a $500,000",
      ],
      correcta: "B",
      explicacion: "El Decreto Ejecutivo 57 de 2000 clasifica los EIA en tres categorías según la magnitud e irreversibilidad de los impactos ambientales potenciales, no por área ni costo. Categoría A es para proyectos con impactos significativos e irreversibles.",
    },
  },

  // ─────────────────────────────────────────────────────────
  // BLOQUE 2: NÚCLEO TÉCNICO (Retos 4–7, 8 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 4, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "El ciclo PHVA en crisis",
    letra: "P",
    narrativa: `Una empresa de servicios logísticos implementó un SGA (Sistema de Gestión Ambiental) basado en ISO 14001, 
pero falló la auditoría externa. Tu equipo debe diagnosticar en qué fase del ciclo PHVA ocurrieron los fallos.`,
    escenario: `Hallazgos de la auditoría:
✗ No existe política ambiental firmada por la alta dirección.
✗ Los objetivos ambientales se definieron pero nunca se asignaron responsables ni recursos.
✗ Los registros de consumo de agua y energía se llevan en papel y tienen datos incompletos desde marzo.
✗ Las acciones correctivas de la auditoría anterior fueron "cerradas" sin evidencia de implementación.
✗ Los empleados desconocen los procedimientos de respuesta ante derrames.`,
    pregunta1: {
      texto: "Asigna cada hallazgo a su fase correcta del ciclo PHVA (Planificar, Hacer, Verificar, Actuar). Justifica tu asignación y propón una acción inmediata para el hallazgo más crítico.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "Según ISO 14001:2015, ¿cuál es el requisito del que dependen TODOS los demás elementos del SGA?",
      opciones: [
        "A) La identificación de aspectos e impactos ambientales",
        "B) El liderazgo y compromiso de la alta dirección",
        "C) La planificación de auditorías internas",
        "D) La capacitación del personal operativo",
      ],
      correcta: "B",
      explicacion: "ISO 14001:2015 establece en la Cláusula 5 que el liderazgo y compromiso de la alta dirección es el requisito fundacional. Sin este, ningún otro elemento del SGA puede funcionar correctamente, ya que la política, los recursos y la rendición de cuentas emanan de la dirección.",
    },
  },
  {
    id: 5, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "Los ODS bajo lupa",
    letra: "A",
    narrativa: `Una empresa panameña elaboró su reporte de sostenibilidad y listó 10 prácticas empresariales. 
Sin embargo, hay un intruso: una práctica que NO corresponde a ningún ODS relevante para el sector.`,
    escenario: `Las 10 prácticas reportadas por "Grupo Empresarial Veraguas":
1. Instalación de paneles solares en sus tres oficinas en la capital.
2. Programa de compras sostenibles con proveedores certificados.
3. Patrocinio del equipo de fútbol local de la empresa.
4. Reducción del 30% en impresiones mediante digitalización de procesos.
5. Clasificación de residuos sólidos con disposición final en relleno sanitario autorizado.
6. Medición anual de huella de carbono con reporte público.
7. Capacitación de empleados en gestión ambiental y ODS.
8. Uso de vehículos eléctricos para entregas urbanas.
9. Campaña de donación de ropa usada entre empleados.
10. Instalación de sistemas de captación de agua de lluvia en bodega.`,
    pregunta1: {
      texto: "Identifica el intruso (la práctica que NO es una acción de sostenibilidad empresarial verificable) y explica por qué. Luego, asigna el ODS principal y uno secundario a CINCO de las prácticas restantes.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Qué ODS tiene mayor relevancia transversal para una empresa de servicios empresariales o constructora panameña?",
      opciones: [
        "A) ODS 14 (Vida submarina)",
        "B) ODS 12 (Producción y consumo responsables)",
        "C) ODS 1 (Fin de la pobreza)",
        "D) ODS 16 (Paz, justicia e instituciones sólidas)",
      ],
      correcta: "B",
      explicacion: "El ODS 12 es el más transversal para empresas de servicios y construcción porque aborda directamente la eficiencia en el uso de recursos, gestión de residuos, compras sostenibles y reducción de impactos a lo largo de la cadena de valor — todos elementos centrales del sector.",
    },
  },
  {
    id: 6, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "La matriz rota",
    letra: "C",
    narrativa: `Un técnico ambiental presentó una Matriz de Leopold simplificada para un proyecto de remodelación de oficinas. 
Tu equipo debe corregir 3 errores conceptuales graves y completar una celda faltante.`,
    escenario: `Fragmento de la Matriz de Leopold — Proyecto: Remodelación Oficina Piso 12, Ciudad de Panamá

Actividad: Demolición de tabiques internos
→ Componente Aire: Magnitud +3, Importancia 8 ✗ (el técnico marcó impacto POSITIVO)
→ Componente Agua: Magnitud -1, Importancia 1 (correcto: el polvo puede contaminar drenajes)
→ Componente Fauna: Magnitud -5, Importancia 9 ✗ (marcó impacto severo en fauna por demolición interior)
→ Componente Social/Laboral: [CELDA EN BLANCO]

Actividad: Pintura con solventes orgánicos
→ Componente Aire: Magnitud -4, Importancia 9 (correcto: VOC y olores)
→ Componente Salud Ocupacional: Magnitud +2, Importancia 7 ✗ (marcó impacto POSITIVO en salud)`,
    pregunta1: {
      texto: "Identifica y corrige los 3 errores conceptuales. Luego, completa la celda en blanco [Demolición de tabiques → Componente Social/Laboral] con magnitud, importancia y justificación.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "En la Matriz de Leopold, ¿qué representa el valor de IMPORTANCIA de un impacto?",
      opciones: [
        "A) La probabilidad de que ocurra el impacto",
        "B) La extensión geográfica y trascendencia del impacto en el sistema ambiental",
        "C) El costo económico de mitigar el impacto",
        "D) La duración temporal del impacto (corto, mediano o largo plazo)",
      ],
      correcta: "B",
      explicacion: "La IMPORTANCIA en la Matriz de Leopold representa el peso relativo del impacto en el sistema ambiental, considerando su extensión, reversibilidad, sinergia y trascendencia — no solo su duración ni su costo de mitigación.",
    },
  },
  {
    id: 7, bloque: "NÚCLEO TÉCNICO", bloqueColor: "#E65100", minutos: 8,
    titulo: "El PIGA en construcción",
    letra: "T",
    narrativa: `Una PYME constructora contrató a tu equipo para diseñar el núcleo de su PIGA 
(Plan Integral de Gestión Ambiental). Solo tienes 8 minutos. Los inversores llegan a las 3 PM.`,
    escenario: `Datos de la empresa "Constructora Atalaya":
• Proyectos activos: 2 obras residenciales en Chitré, Herrera
• Residuos generados: 4 toneladas/mes de RCD (concreto, acero, madera, plástico)
• Consumo de agua: 800 m³/mes (por obra)
• Personal: 35 trabajadores, sin capacitación ambiental formal
• Situación legal: No tiene EIA aprobada (proyectos < umbral Categoría C)
• Mayor queja vecinal: polvo y ruido fuera de horario permitido`,
    pregunta1: {
      texto: "Diseña los 3 componentes más urgentes del PIGA para esta empresa: (1) Plan de manejo de RCD, (2) Plan de control de polvo y ruido, (3) Un indicador ambiental (KPI verde) medible para cada uno. Sé específico: menciona acciones, responsables y frecuencia de medición.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál es la diferencia fundamental entre un PGA (Plan de Gestión Ambiental) y un PIGA (Plan Integral de Gestión Ambiental)?",
      opciones: [
        "A) El PIGA incluye solo residuos sólidos; el PGA abarca todos los impactos",
        "B) El PIGA integra las tres dimensiones de sostenibilidad (ambiental, social y económica); el PGA se enfoca en los aspectos e impactos ambientales del proyecto",
        "C) No hay diferencia; son sinónimos usados en diferentes países",
        "D) El PGA es obligatorio por ley; el PIGA es voluntario",
      ],
      correcta: "B",
      explicacion: "El PIGA es un instrumento más amplio e integral que incorpora la sostenibilidad tridimensional (ambiental, social y económica), mientras que el PGA tradicional se centra en la identificación y control de aspectos e impactos ambientales del proyecto o actividad.",
    },
  },

  // ─────────────────────────────────────────────────────────
  // BLOQUE 3: SPRINT FINAL (Retos 8–10, 5 min c/u)
  // ─────────────────────────────────────────────────────────
  {
    id: 8, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "El KPI verde fugitivo",
    letra: "A",
    narrativa: `Un gerente de sostenibilidad presentó 6 indicadores ambientales a la junta directiva. 
Tu equipo tiene 5 minutos para identificar cuáles son KPI verdes reales y cuáles son indicadores de vanidad.`,
    escenario: `Los 6 indicadores presentados:
① "Número de publicaciones en redes sociales sobre medio ambiente: 24/mes"
② "Toneladas de RCD recicladas / total de RCD generado × 100 = % de valorización"
③ "Cantidad de empleados que asistieron a charlas de reciclaje: 18"
④ "kWh consumidos por m² de área construida / mes"
⑤ "Número de árboles plantados en actividades de RSE: 50/año"
⑥ "Reducción porcentual de consumo de agua vs. línea base del año anterior"`,
    pregunta1: {
      texto: "Clasifica los 6 indicadores en KPI verde real (medible, comparable, con línea base) vs. indicador de vanidad (no medible en términos de impacto real). Justifica brevemente.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál es la característica esencial que distingue un KPI ambiental efectivo de un indicador de vanidad?",
      opciones: [
        "A) Que sea publicado en el reporte anual de sostenibilidad",
        "B) Que tenga una línea base, sea medible en unidades reales y permita comparar evolución en el tiempo",
        "C) Que sea aprobado por MiAMBIENTE",
        "D) Que involucre a toda la empresa y no solo al área ambiental",
      ],
      correcta: "B",
      explicacion: "Un KPI ambiental efectivo debe tener línea base (punto de referencia), ser medible en unidades cuantificables y permitir comparar la evolución. Sin estos tres elementos, es un indicador de vanidad: comunica esfuerzo pero no impacto real.",
    },
  },
  {
    id: 9, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "La norma o el mito",
    letra: "D",
    narrativa: `Circulan 5 afirmaciones sobre gestión ambiental en Panamá. Algunas son verdaderas. 
Otras son mitos que cuestan multas millonarias. Tu equipo debe distinguirlas en tiempo récord.`,
    escenario: `Las 5 afirmaciones:
① "Todo proyecto de construcción en Panamá requiere EIA, sin importar su tamaño."
② "La certificación ISO 14001 es obligatoria para empresas que operan en zonas de amortiguamiento."
③ "El Decreto Ejecutivo 57 de 2000 regula el procedimiento de EIA en Panamá."
④ "Las empresas de servicios sin instalaciones físicas propias no generan aspectos ambientales significativos."
⑤ "La huella ecológica per cápita en Panamá supera la biocapacidad disponible del país."`,
    pregunta1: {
      texto: "Clasifica cada afirmación como VERDADERA o MITO. Corrige brevemente cada mito con la información correcta.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de las 5 afirmaciones es completamente VERDADERA sin condiciones ni matices?",
      opciones: [
        "A) Afirmación ①",
        "B) Afirmación ②",
        "C) Afirmación ③",
        "D) Afirmación ④",
      ],
      correcta: "C",
      explicacion: "El Decreto Ejecutivo 57 de 2000 sí regula el proceso de EIA en Panamá — esta es verdad sin matices. ① es falsa (solo proyectos que superen umbrales). ② es falsa (ISO 14001 es voluntaria). ④ es falsa (toda empresa genera aspectos ambientales: electricidad, residuos de papel, emisiones de transporte).",
    },
  },
  {
    id: 10, bloque: "SPRINT FINAL", bloqueColor: "#1565C0", minutos: 5,
    titulo: "La palabra final",
    letra: "O",
    narrativa: `Último reto. El código ambiental está a punto de ser descifrado. 
5 afirmaciones integradoras. 5 decisiones. Solo los equipos que dominan todo el curso llegan hasta aquí.`,
    escenario: `Afirmaciones integradoras — EDA1001 IIC2026:
① "El ciclo PHVA de ISO 14001 y el proceso de EIA del Decreto 57 son herramientas incompatibles que no pueden usarse juntas."
② "Un aspecto ambiental es la CAUSA; el impacto ambiental es el EFECTO de la actividad sobre el ambiente."
③ "Una empresa puede tener huella ecológica mayor a la biocapacidad disponible y aun así operar de forma sostenible si compensa con créditos de carbono."
④ "Los KPI verdes solo son útiles cuando la empresa ya tiene un SGA certificado bajo ISO 14001."
⑤ "La educación ambiental en el sector productivo reduce costos operativos a mediano plazo porque optimiza el uso de recursos y reduce multas y sanciones."`,
    pregunta1: {
      texto: "Argumenta brevemente por qué la afirmación ⑤ es la más poderosa estratégicamente para convencer a un empresario escéptico de invertir en gestión ambiental. Usa datos o ejemplos concretos del sector.",
      tipo: "abierta",
    },
    pregunta2: {
      texto: "¿Cuál de las 5 afirmaciones es VERDADERA sin excepción?",
      opciones: [
        "A) Afirmación ①",
        "B) Afirmación ②",
        "C) Afirmación ③",
        "D) Afirmación ④",
      ],
      correcta: "B",
      explicacion: "La distinción aspecto→impacto es un principio fundamental de ISO 14001. El aspecto es la causa (ej: uso de solventes), el impacto es el efecto sobre el ambiente (contaminación del aire por VOC). Esta relación causal es siempre válida. Las demás son falsas o tienen condiciones que las invalidan.",
    },
  },
];

// ══════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════
export default function CodigoVerdeA() {
  const [pantalla, setPantalla] = useState("bienvenida"); // bienvenida | instrucciones | reto | resultado
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [retoActual, setRetoActual] = useState(0);
  const [respuestasAbiertas, setRespuestasAbiertas] = useState({});
  const [respuestasMultiple, setRespuestasMultiple] = useState({});
  const [retroalimentacion, setRetroalimentacion] = useState({});
  const [letrasDesveladas, setLetrasDesveladas] = useState([]);
  const [tiempoGlobal, setTiempoGlobal] = useState(DURACION_GLOBAL);
  const [tiempoReto, setTiempoReto] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [retoEnviado, setRetoEnviado] = useState(false);
  const [actividadCompleta, setActividadCompleta] = useState(false);

  const intervaloGlobal = useRef(null);
  const intervaloReto = useRef(null);

  // Cronómetro global
  useEffect(() => {
    if (corriendo && tiempoGlobal > 0) {
      intervaloGlobal.current = setInterval(() => {
        setTiempoGlobal(t => t - 1);
      }, 1000);
    } else {
      clearInterval(intervaloGlobal.current);
    }
    return () => clearInterval(intervaloGlobal.current);
  }, [corriendo, tiempoGlobal]);

  // Cronómetro por reto
  useEffect(() => {
    if (corriendo && tiempoReto > 0) {
      intervaloReto.current = setInterval(() => {
        setTiempoReto(t => t - 1);
      }, 1000);
    } else {
      clearInterval(intervaloReto.current);
      if (tiempoReto === 0 && corriendo && pantalla === "reto") {
        // Tiempo de reto agotado — mostrar retroalimentación automática
      }
    }
    return () => clearInterval(intervaloReto.current);
  }, [corriendo, tiempoReto, pantalla]);

  const formatTiempo = (seg) => {
    const m = Math.floor(seg / 60).toString().padStart(2, "0");
    const s = (seg % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const iniciarReto = (idx) => {
    const r = RETOS[idx];
    setTiempoReto(r.minutos * 60);
    setRetoEnviado(false);
    setPantalla("reto");
  };

  const confirmarRespuesta = () => {
    const r = RETOS[retoActual];
    const seleccion = respuestasMultiple[retoActual];
    const esCorrecta = seleccion === r.pregunta2.correcta;
    setRetroalimentacion(prev => ({ ...prev, [retoActual]: { correcta: esCorrecta, explicacion: r.pregunta2.explicacion } }));
    setLetrasDesveladas(prev => [...prev, r.letra]);
    setRetoEnviado(true);
    clearInterval(intervaloReto.current);
  };

  const siguienteReto = () => {
    if (retoActual + 1 >= RETOS.length) {
      setActividadCompleta(true);
      setCorriendo(false);
      setPantalla("resultado");
    } else {
      setRetoActual(retoActual + 1);
      iniciarReto(retoActual + 1);
    }
  };

  const colorTiempoReto = () => {
    const total = RETOS[retoActual]?.minutos * 60 || 1;
    const pct = tiempoReto / total;
    if (pct > 0.5) return "#2E7D32";
    if (pct > 0.25) return "#F57C00";
    return "#C62828";
  };

  // ── PANTALLA: BIENVENIDA ──
  if (pantalla === "bienvenida") {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#E8F5E9 0%,#F1F8E9 50%,#E0F7FA 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"680px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", overflow:"hidden" }}>
          {/* Cabecera */}
          <div style={{ background:"linear-gradient(135deg,#2E7D32,#43A047)", padding:"32px 24px", textAlign:"center" }}>
            <div style={{ fontSize:"48px", marginBottom:"8px" }}>🌿🔐</div>
            <h1 style={{ color:"#fff", margin:0, fontSize:"26px", fontWeight:"900", letterSpacing:"2px" }}>OPERACIÓN: CÓDIGO VERDE</h1>
            <p style={{ color:"#C8E6C9", margin:"8px 0 0", fontSize:"14px" }}>Versión A · EDA1001 · II Cuatrimestre 2026</p>
            <p style={{ color:"#A5D6A7", margin:"4px 0 0", fontSize:"13px" }}>Técnico Superior en Servicios Empresariales + Construcción</p>
          </div>
          {/* Historia */}
          <div style={{ padding:"28px 28px 16px", background:"#F9FBE7", borderLeft:"4px solid #8BC34A" }}>
            <p style={{ margin:0, fontStyle:"italic", color:"#33691E", fontSize:"15px", lineHeight:"1.7" }}>
              "El edificio inteligente que debía ser el orgullo de la ciudad acaba de activar una alarma silenciosa.
              Los sistemas de gestión ambiental han sido comprometidos. Diez bloqueos de seguridad impiden el acceso al protocolo de emergencia.
              Solo un equipo con dominio técnico real puede desactivarlos. Cada reto superado revela una letra del código maestro.
              Las próximas <strong>90 minutos</strong> definirán si la operación es un éxito… o una catástrofe ambiental."
            </p>
          </div>
          {/* Selección de equipo */}
          <div style={{ padding:"24px 28px" }}>
            <h2 style={{ color:"#1B5E20", fontSize:"16px", marginBottom:"16px", textAlign:"center" }}>🛡️ SELECCIONA TU EQUIPO — VERSIÓN A</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px" }}>
              {EQUIPOS_VERSION.map(eq => (
                <button
                  key={eq.nombre}
                  onClick={() => setEquipoSeleccionado(eq)}
                  style={{
                    padding:"16px 12px", borderRadius:"12px", border: equipoSeleccionado?.nombre === eq.nombre ? `3px solid ${eq.color}` : "2px solid #E0E0E0",
                    background: equipoSeleccionado?.nombre === eq.nombre ? eq.color + "22" : "#fff",
                    cursor:"pointer", transition:"all 0.2s", textAlign:"center"
                  }}
                >
                  <div style={{ fontSize:"28px" }}>{eq.icono}</div>
                  <div style={{ fontWeight:"bold", color: eq.color, fontSize:"15px", marginTop:"6px" }}>EQUIPO {eq.nombre}</div>
                  <div style={{ color:"#888", fontSize:"12px" }}>{eq.integrantes} integrantes</div>
                </button>
              ))}
            </div>
            {equipoSeleccionado && (
              <button
                onClick={() => { setCorriendo(true); setPantalla("instrucciones"); }}
                style={{ marginTop:"24px", width:"100%", padding:"16px", background:"linear-gradient(135deg,#2E7D32,#43A047)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"16px", fontWeight:"bold", cursor:"pointer", letterSpacing:"1px" }}
              >
                🚀 INICIAR MISIÓN — EQUIPO {equipoSeleccionado.nombre}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── PANTALLA: INSTRUCCIONES ──
  if (pantalla === "instrucciones") {
    return (
      <div style={{ minHeight:"100vh", background:"#F1F8E9", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"680px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", padding:"32px" }}>
          <h2 style={{ color:"#1B5E20", textAlign:"center", fontSize:"20px" }}>📋 PROTOCOLO DE OPERACIÓN</h2>
          <div style={{ background:"#E8F5E9", borderRadius:"12px", padding:"20px", marginBottom:"20px" }}>
            {[
              "🕐 Tienes 90 minutos en total para completar los 10 retos.",
              "⏱️ Cada reto tiene su propio tiempo asignado: 10 min (calentamiento), 8 min (núcleo técnico) o 5 min (sprint final).",
              "📝 Cada reto tiene DOS partes: análisis abierto y selección múltiple.",
              "🔤 Al superar cada reto, se revela una letra del CÓDIGO MAESTRO.",
              "📤 Al finalizar, envía tus respuestas directamente a Microsoft TEAMS.",
              "⚠️ No puedes retroceder a un reto ya enviado.",
              "🤝 Trabajen en equipo: todos participan, todos aprenden.",
            ].map((item, i) => (
              <p key={i} style={{ margin:"8px 0", color:"#2E7D32", fontSize:"14px" }}>{item}</p>
            ))}
          </div>
          <div style={{ textAlign:"center", background:"#FFF9C4", borderRadius:"10px", padding:"16px", marginBottom:"20px" }}>
            <p style={{ margin:0, color:"#F57F17", fontWeight:"bold", fontSize:"15px" }}>
              ⏰ Tiempo global en marcha: {formatTiempo(tiempoGlobal)}
            </p>
            <p style={{ margin:"4px 0 0", color:"#795548", fontSize:"13px" }}>Equipo: {equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</p>
          </div>
          <button
            onClick={() => iniciarReto(0)}
            style={{ width:"100%", padding:"16px", background:"linear-gradient(135deg,#E65100,#FF8F00)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"16px", fontWeight:"bold", cursor:"pointer" }}
          >
            🔓 ACTIVAR RETO 1
          </button>
        </div>
      </div>
    );
  }

  // ── PANTALLA: RETO ──
  if (pantalla === "reto") {
    const r = RETOS[retoActual];
    const retro = retroalimentacion[retoActual];

    return (
      <div style={{ minHeight:"100vh", background:"#FAFAFA", fontFamily:"Arial,sans-serif", padding:"16px" }}>
        {/* Barra superior */}
        <div style={{ maxWidth:"720px", margin:"0 auto 16px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"#fff", borderRadius:"12px", padding:"12px 20px", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"11px", color:"#888", textTransform:"uppercase" }}>Tiempo Global</div>
            <div style={{ fontSize:"20px", fontWeight:"bold", color: tiempoGlobal < 300 ? "#C62828" : "#2E7D32" }}>{formatTiempo(tiempoGlobal)}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"12px", color:"#555", fontWeight:"bold" }}>{equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</div>
            <div style={{ fontSize:"12px", color:"#888" }}>Reto {retoActual + 1} de {RETOS.length}</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"11px", color:"#888", textTransform:"uppercase" }}>Tiempo Reto</div>
            <div style={{ fontSize:"20px", fontWeight:"bold", color: colorTiempoReto() }}>{formatTiempo(tiempoReto)}</div>
          </div>
        </div>

        <div style={{ maxWidth:"720px", margin:"0 auto" }}>
          {/* Encabezado del reto */}
          <div style={{ background: r.bloqueColor, borderRadius:"12px 12px 0 0", padding:"16px 20px", color:"#fff" }}>
            <div style={{ fontSize:"12px", opacity:0.85, letterSpacing:"2px", marginBottom:"4px" }}>{r.bloque} · RETO {r.id} · {r.minutos} MIN</div>
            <h2 style={{ margin:0, fontSize:"20px", fontWeight:"bold" }}>{r.titulo}</h2>
          </div>

          {/* Narrativa */}
          <div style={{ background:"#FFF8E1", padding:"16px 20px", borderLeft:"4px solid #FFC107" }}>
            <p style={{ margin:0, fontStyle:"italic", color:"#5D4037", fontSize:"14px", lineHeight:"1.6" }}>{r.narrativa}</p>
          </div>

          {/* Escenario */}
          <div style={{ background:"#fff", padding:"20px", borderLeft:"1px solid #E0E0E0", borderRight:"1px solid #E0E0E0" }}>
            <h3 style={{ color:"#1B5E20", fontSize:"14px", marginTop:0 }}>📁 INFORMACIÓN DEL CASO</h3>
            <p style={{ color:"#333", fontSize:"14px", lineHeight:"1.7", whiteSpace:"pre-line", margin:0 }}>{r.escenario}</p>
          </div>

          {/* Pregunta 1 */}
          <div style={{ background:"#E8F5E9", padding:"20px", borderLeft:"1px solid #E0E0E0", borderRight:"1px solid #E0E0E0", marginTop:"2px" }}>
            <h3 style={{ color:"#1B5E20", fontSize:"14px", marginTop:0 }}>✏️ PARTE 1 — ANÁLISIS ABIERTO</h3>
            <p style={{ color:"#2E7D32", fontSize:"14px", marginBottom:"12px", fontWeight:"bold" }}>{r.pregunta1.texto}</p>
            <textarea
              value={respuestasAbiertas[retoActual] || ""}
              onChange={e => setRespuestasAbiertas(prev => ({ ...prev, [retoActual]: e.target.value }))}
              disabled={retoEnviado}
              placeholder="Escribe aquí el análisis de tu equipo..."
              style={{ width:"100%", minHeight:"120px", padding:"12px", borderRadius:"8px", border:"1px solid #A5D6A7", fontSize:"14px", resize:"vertical", fontFamily:"Arial,sans-serif", boxSizing:"border-box" }}
            />
          </div>

          {/* Pregunta 2 */}
          <div style={{ background:"#fff", padding:"20px", border:"1px solid #E0E0E0", borderTop:"none" }}>
            <h3 style={{ color:"#E65100", fontSize:"14px", marginTop:0 }}>🔘 PARTE 2 — SELECCIÓN MÚLTIPLE</h3>
            <p style={{ color:"#333", fontSize:"14px", marginBottom:"16px" }}>{r.pregunta2.texto}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {r.pregunta2.opciones.map(op => {
                const letra = op[0];
                const seleccionada = respuestasMultiple[retoActual] === letra;
                let bg = "#fff", border = "1px solid #E0E0E0", color = "#333";
                if (retoEnviado && retro) {
                  if (letra === r.pregunta2.correcta) { bg = "#E8F5E9"; border = "2px solid #2E7D32"; color = "#1B5E20"; }
                  else if (seleccionada && letra !== r.pregunta2.correcta) { bg = "#FFEBEE"; border = "2px solid #C62828"; color = "#B71C1C"; }
                } else if (seleccionada) {
                  bg = "#E3F2FD"; border = "2px solid #1565C0"; color = "#0D47A1";
                }
                return (
                  <button key={letra} onClick={() => !retoEnviado && setRespuestasMultiple(prev => ({ ...prev, [retoActual]: letra }))}
                    style={{ padding:"12px 16px", borderRadius:"8px", border, background:bg, color, textAlign:"left", cursor: retoEnviado ? "default" : "pointer", fontSize:"14px", transition:"all 0.15s" }}>
                    {op}
                  </button>
                );
              })}
            </div>
            {retoEnviado && retro && (
              <div style={{ marginTop:"16px", background: retro.correcta ? "#E8F5E9" : "#FFF3E0", border: `1px solid ${retro.correcta ? "#A5D6A7" : "#FFCC02"}`, borderRadius:"8px", padding:"14px" }}>
                <p style={{ margin:0, fontWeight:"bold", color: retro.correcta ? "#1B5E20" : "#E65100", fontSize:"14px" }}>
                  {retro.correcta ? "✅ ¡Correcto!" : `⚠️ Respuesta correcta: ${r.pregunta2.correcta}`}
                </p>
                <p style={{ margin:"8px 0 0", color:"#555", fontSize:"13px", lineHeight:"1.6" }}>{retro.explicacion}</p>
                <div style={{ marginTop:"12px", background:"#fff", borderRadius:"6px", padding:"10px", textAlign:"center" }}>
                  <p style={{ margin:0, fontSize:"13px", color:"#888" }}>Letra desbloqueada:</p>
                  <p style={{ margin:"4px 0 0", fontSize:"28px", fontWeight:"900", color: r.bloqueColor, letterSpacing:"4px" }}>{r.letra}</p>
                </div>
              </div>
            )}
          </div>

          {/* Letras reveladas */}
          {letrasDesveladas.length > 0 && (
            <div style={{ background:"#263238", borderRadius:"8px", padding:"14px", marginTop:"12px", textAlign:"center" }}>
              <p style={{ color:"#80CBC4", margin:"0 0 8px", fontSize:"12px", letterSpacing:"2px" }}>CÓDIGO PARCIAL</p>
              <div style={{ display:"flex", justifyContent:"center", gap:"8px", flexWrap:"wrap" }}>
                {RETOS.map((rt, i) => (
                  <div key={i} style={{ width:"36px", height:"36px", borderRadius:"6px", background: letrasDesveladas.includes(rt.letra) && i < letrasDesveladas.length ? "#43A047" : "#37474F", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"bold", color: letrasDesveladas.includes(rt.letra) && i < letrasDesveladas.length ? "#fff" : "#546E7A" }}>
                    {i < letrasDesveladas.length ? LETRAS_PALABRA[i] : "?"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div style={{ marginTop:"16px", display:"flex", gap:"12px" }}>
            {!retoEnviado ? (
              <button
                onClick={confirmarRespuesta}
                disabled={!respuestasMultiple[retoActual]}
                style={{ flex:1, padding:"14px", background: respuestasMultiple[retoActual] ? "linear-gradient(135deg,#2E7D32,#43A047)" : "#E0E0E0", color: respuestasMultiple[retoActual] ? "#fff" : "#999", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"bold", cursor: respuestasMultiple[retoActual] ? "pointer" : "not-allowed" }}>
                🔒 CONFIRMAR Y DESBLOQUEAR LETRA
              </button>
            ) : (
              <button
                onClick={siguienteReto}
                style={{ flex:1, padding:"14px", background:"linear-gradient(135deg,#1565C0,#1976D2)", color:"#fff", border:"none", borderRadius:"12px", fontSize:"15px", fontWeight:"bold", cursor:"pointer" }}>
                {retoActual + 1 >= RETOS.length ? "🏆 VER RESULTADO FINAL" : `➡️ RETO ${retoActual + 2}`}
              </button>
            )}
          </div>
          <div style={{ height:"32px" }} />
        </div>
      </div>
    );
  }

  // ── PANTALLA: RESULTADO FINAL ──
  if (pantalla === "resultado") {
    const palabraCompleta = LETRAS_PALABRA.join("");
    const puntaje = Object.values(retroalimentacion).filter(r => r.correcta).length;

    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#1B5E20,#2E7D32)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"Arial,sans-serif", padding:"24px" }}>
        <div style={{ maxWidth:"600px", width:"100%", background:"#fff", borderRadius:"20px", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", overflow:"hidden" }}>
          <div style={{ background:"linear-gradient(135deg,#2E7D32,#43A047)", padding:"32px", textAlign:"center" }}>
            <div style={{ fontSize:"56px" }}>🏆</div>
            <h1 style={{ color:"#fff", margin:"12px 0 4px", fontSize:"24px" }}>¡MISIÓN COMPLETADA!</h1>
            <p style={{ color:"#C8E6C9", margin:0 }}>Equipo {equipoSeleccionado?.icono} {equipoSeleccionado?.nombre}</p>
          </div>
          <div style={{ padding:"28px", textAlign:"center" }}>
            <p style={{ color:"#555", fontSize:"14px", marginBottom:"8px" }}>El código maestro descifrado es:</p>
            <div style={{ fontSize:"40px", fontWeight:"900", letterSpacing:"8px", color:"#1B5E20", background:"#E8F5E9", padding:"16px 24px", borderRadius:"12px", margin:"0 0 20px" }}>
              {palabraCompleta}
            </div>
            <p style={{ color:"#888", fontSize:"13px", marginBottom:"20px" }}>
              Selección múltiple: <strong style={{ color: puntaje >= 8 ? "#2E7D32" : "#E65100" }}>{puntaje}/10</strong> correctas
            </p>
            <a
              href={`${TEAMS_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display:"inline-block", padding:"14px 32px", background:"linear-gradient(135deg,#1565C0,#1976D2)", color:"#fff", textDecoration:"none", borderRadius:"12px", fontWeight:"bold", fontSize:"15px" }}>
              📤 ENVIAR RESPUESTAS EN TEAMS
            </a>
            <p style={{ color:"#999", fontSize:"12px", marginTop:"16px" }}>
              Copia tus respuestas abiertas antes de enviar. La palabra clave es: <strong>{palabraCompleta}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
