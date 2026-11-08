/**
 * VirLab — Caso 01: VN (Verdadero Negativo)
 * 
 * ATENCIÓN: Todos los datos clínicos y de laboratorio son sintéticos y tienen
 * un propósito exclusivamente docente. VirLab no es una herramienta de diagnóstico.
 * 
 * Contexto y fuentes clínicas de referencia para los umbrales:
 * - Programa Poblacional de Cribado Neonatal de Enfermedades Endocrino-Metabólicas
 *   del Sistema Nacional de Salud (Ministerio de Sanidad, España).
 * - "Key European guidelines for the diagnosis and management of phenylketonuria"
 *   (van Spronsen et al., Lancet Diabetes Endocrinol / Orphanet J Rare Dis).
 */

export const caseVN = {
  id: "case-vn",
  code: "CN_PKU_1001",
  caseNumber: "01",
  type: "Cribado neonatal",
  disease: "Fenilcetonuria (PKU)",
  disclaimer: "Datos sintéticos simulados con fines exclusivamente docentes.",

  // Datos clínicos ficticios del recién nacido
  patient: {
    fullName: "Recién nacido Ficticio (CN_PKU_1001)",
    birthDate: "2026-10-28",
    sampleDate: "2026-10-30",
    receptionDate: "2026-10-30",
    reportDate: "2026-10-30",
    hoursOfLife: 48,
    gestationalAgeWeeks: 39,
    birthWeightGrams: 3350,
    feedingType: "Lactancia materna establecida (>24 h de ingesta proteica)",
    clinicalStatus: "Asintomático, exploración neonatal inmediata normal",
    sampleType: "Muestra de sangre seca obtenida mediante punción del talón en tarjeta de recogida DBS (Dried Blood Spot)",
    sampleQualityCriteria: "Impregnación completa homogénea por ambas caras, volumen adecuado en círculos de papel, sin halos ni sobreposición."
  },

  // Marco de referencia analítico
  referenceContext: {
    source: "Protocolo representativo de cribado neonatal mediante MS/MS (SNS / Consenso Europeo de PKU)",
    notes: "Puntos de corte dependientes de la instrumentación y protocolo. No representan umbrales universales.",
    cutoffs: {
      phenylalanineMax: 120, // µmol/L
      tyrosineRange: "40 - 150", // µmol/L
      pheTyrRatioMax: 1.5 // Ratio Phe/Tyr
    }
  },

  // Resultados cuantitativos simulados de la muestra
  analyticalResults: {
    method: "Espectrometría de masas en tándem (MS/MS) con triple cuadrupolo",
    measuredCompounds: [
      {
        id: "phe",
        name: "Fenilalanina (Phe)",
        value: 58,
        unit: "µmol/L",
        referenceInterval: "30 – 120 µmol/L (específico del protocolo)",
        status: "Dentro de rango (Normal)",
        isAltered: false,
        mrmTransition: "166.1 \u2192 120.1 Th",
        relativeIntensity: 18 // % de intensidad relativa en espectro MS/MS
      },
      {
        id: "tyr",
        name: "Tirosina (Tyr)",
        value: 72,
        unit: "µmol/L",
        referenceInterval: "40 – 150 µmol/L (específico del protocolo)",
        status: "Dentro de rango (Normal)",
        isAltered: false,
        mrmTransition: "182.1 \u2192 136.1 Th",
        relativeIntensity: 43 // % de intensidad relativa en espectro MS/MS
      },
      {
        id: "ratio",
        name: "Ratio Phe/Tyr",
        value: 0.81,
        unit: "",
        referenceInterval: "< 1.5 (específico del protocolo)",
        status: "Dentro de rango (Normal)",
        isAltered: false
      }
    ]
  },

  // Perfiles de control analítico para comparación visual espectrométrica (escala 0-100%)
  controlProfiles: {
    negative: {
      pheIntensity: 20, // %
      tyrIntensity: 45  // %
    },
    positive: {
      pheIntensity: 95, // % (marcadamente elevado)
      tyrIntensity: 30  // %
    },
    sample: {
      pheIntensity: 18, // % (concordante con control negativo)
      tyrIntensity: 43  // %
    }
  },

  // Información teórica contextual
  theoreticalContext: {
    enzyme: "Fenilalanina hidroxilasa (PAH) activa",
    gene: "PAH (locus cromosómico 12q23.2)",
    pathophysiologySummary: "La fenilcetonuria (PKU) es un error congénito del metabolismo de herencia autosómica recesiva originado por deficiencia de la enzima PAH, que convierte la fenilalanina en tirosina. Si la enzima funciona normalmente con su cofactor BH4, la fenilalanina se metaboliza de forma regular y no se acumula.",
    screeningVsDiagnosisNote: "En un programa de cribado, una concentración fisiológica de Phe y un ratio Phe/Tyr normal concluyen el cribado con resultado negativo. No está indicada la realización de pruebas genéticas moleculares en muestras con cribado negativo."
  },

  // Matiz científico y juicio técnico
  clinicalInterpretation: {
    technicalJudgment: "Cribado neonatal NEGATIVO para hiperfenilalaninemia / fenilcetonuria en las condiciones analizadas.",
    scientificNuance: "Un resultado de cribado neonatal negativo significa que, con el método analítico empleado y en el momento de la toma, no se detectan concentraciones elevadas de fenilalanina ni alteración del ratio Phe/Tyr que justifiquen sospecha. No equivale a descartar de forma absoluta cualquier variante genética atípica, sino que confirma que el recién nacido no presenta el patrón bioquímico de sospecha del programa de cribado.",
    recommendationToPediatrician: "No se requieren pruebas metabólicas confirmatorias ni estudios genéticos adicionales para esta patología. Continuar con el seguimiento pediátrico habitual del programa de salud infantil."
  },

  // Modelo de informe cumplimentado para referencia docente
  exemplarReport: {
    patientCode: "CN_PKU_1001",
    patientName: "Recién nacido Ficticio (CN_PKU_1001)",
    sampleDate: "2026-10-30",
    receptionDate: "2026-10-30",
    reportDate: "2026-10-30",
    sampleQualityValuation: "Apta para el análisis",
    informedConsentValuation: "Consentimiento informado comprobado",
    preliminaryValuations: {
      phe: "Dentro del intervalo de referencia",
      tyr: "Dentro del intervalo de referencia",
      ratio: "Dentro del intervalo de referencia"
    },
    justification: "Los valores cuantificados de fenilalanina (58 µmol/L) y el ratio Phe/Tyr (0.81) se sitúan dentro de los rangos de normalidad del protocolo de cribado. No se aprecia elevación de metabolitos diana ni patrón sugestivo de deficiencia en la enzima PAH. Se califica el cribado como negativo.",
    technicalJudgment: "Cribado Negativo / Normal",
    teamSignatures: "Dra. A. García (Técnica Especialista) y Dr. B. López (Facultativo Bioquímico)"
  }
};
