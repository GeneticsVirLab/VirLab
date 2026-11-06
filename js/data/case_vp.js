/**
 * VirLab — Caso 02: VP (Verdadero Positivo)
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

export const caseVP = {
  id: "case-vp",
  code: "MUESTRA-2026-02",
  caseNumber: "02",
  type: "Verdadero Positivo (VP)",
  disease: "Fenilcetonuria (PKU)",
  disclaimer: "Datos sintéticos simulados con fines exclusivamente docentes.",

  // Datos clínicos ficticios del recién nacido
  patient: {
    fullName: "Recién nacido Ficticio (Caso 02 - VP)",
    birthDate: "2026-10-28",
    sampleDate: "2026-10-30",
    receptionDate: "2026-10-30",
    reportDate: "2026-10-30",
    hoursOfLife: 48,
    gestationalAgeWeeks: 40,
    birthWeightGrams: 3420,
    feedingType: "Lactancia materna establecida (>24 h de ingesta proteica)",
    clinicalStatus: "Asintomático al nacimiento (patología presintomática en periodo neonatal precoz)",
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

  // Resultados cuantitativos simulados de la muestra (Patrón patológico)
  analyticalResults: {
    method: "Espectrometría de masas en tándem (MS/MS) con triple cuadrupolo",
    measuredCompounds: [
      {
        id: "phe",
        name: "Fenilalanina (Phe)",
        value: 485,
        unit: "µmol/L",
        referenceInterval: "30 – 120 µmol/L (específico del protocolo)",
        status: "Fuera de rango (Elevado)",
        isAltered: true,
        mrmTransition: "166.1 \u2192 120.1 Th",
        relativeIntensity: 82 // % de intensidad en la muestra VP (diferenciada del control 95%)
      },
      {
        id: "tyr",
        name: "Tirosina (Tyr)",
        value: 52,
        unit: "µmol/L",
        referenceInterval: "40 – 150 µmol/L (específico del protocolo)",
        status: "Dentro de rango (Normal)",
        isAltered: false,
        mrmTransition: "182.1 \u2192 136.1 Th",
        relativeIntensity: 28 // % de intensidad en la muestra VP
      },
      {
        id: "ratio",
        name: "Ratio Phe/Tyr",
        value: 9.33,
        unit: "",
        referenceInterval: "< 1.5 (específico del protocolo)",
        status: "Fuera de rango (Muy elevado)",
        isAltered: true
      }
    ]
  },

  // Perfiles de control analítico: muestra VP diferenciada del control positivo
  controlProfiles: {
    negative: {
      pheIntensity: 20, // %
      tyrIntensity: 45  // %
    },
    positive: {
      pheIntensity: 95, // % (calibrador de referencia)
      tyrIntensity: 30  // %
    },
    sample: {
      pheIntensity: 82, // % (claramente patológico pero con diferencias razonables de intensidad)
      tyrIntensity: 28  // %
    }
  },

  // Estudio molecular complementario del gen PAH (exclusivo para VP)
  molecularStudy: {
    gene: "PAH (Fenilalanina hidroxilasa)",
    targetRegion: "Exón 12 (locus cromosómico 12q23.2)",
    transcript: "NM_000277.3",
    variantVerified: {
      hgvsDna: "c.1222C>T",
      hgvsProtein: "p.(Arg408Trp)",
      classification: "Patogénica (asociada a fenilcetonuria clásica)",
      clinicalSignificance: "Sustitución de arginina básica por triptófano aromático en el dominio catalítico de la PAH."
    },
    referenceSequence: {
      codons: [
        { codonNumber: 407, aminoAcid: "Pro", triplet: "CCT" },
        { codonNumber: 408, aminoAcid: "Arg", triplet: "CGG", isMutatedSite: true, targetBase: "C" },
        { codonNumber: 409, aminoAcid: "Leu", triplet: "CTA" }
      ],
      fullDna: "CCT - CGG - CTA",
      sangerTrace: [
        { base: "C", color: "#0284c7" },
        { base: "C", color: "#0284c7" },
        { base: "T", color: "#dc2626" },
        { base: "C", color: "#0284c7", isTarget: true },
        { base: "G", color: "#1e293b" },
        { base: "G", color: "#1e293b" },
        { base: "C", color: "#0284c7" },
        { base: "T", color: "#dc2626" },
        { base: "A", color: "#16a34a" }
      ]
    },
    patientSequence: {
      codons: [
        { codonNumber: 407, aminoAcid: "Pro", triplet: "CCT" },
        { codonNumber: 408, aminoAcid: "Trp", triplet: "TGG", isMutatedSite: true, targetBase: "T" },
        { codonNumber: 409, aminoAcid: "Leu", triplet: "CTA" }
      ],
      fullDna: "CCT - TGG - CTA",
      sangerTrace: [
        { base: "C", color: "#0284c7" },
        { base: "C", color: "#0284c7" },
        { base: "T", color: "#dc2626" },
        { base: "T", color: "#dc2626", isTarget: true, isMutated: true },
        { base: "G", color: "#1e293b" },
        { base: "G", color: "#1e293b" },
        { base: "C", color: "#0284c7" },
        { base: "T", color: "#dc2626" },
        { base: "A", color: "#16a34a" }
      ]
    }
  },

  // Información teórica contextual y de fisiopatología
  theoreticalContext: {
    enzyme: "Fenilalanina hidroxilasa (PAH) con actividad reducida",
    gene: "PAH (locus cromosómico 12q23.2)",
    pathophysiologySummary: "Una variante patogénica en el gen PAH compromete la actividad de la enzima fenilalanina hidroxilasa. Como consecuencia, la fenilalanina no puede convertirse eficientemente en tirosina, acumulándose en sangre y tejidos, y derivándose hacia rutas metabólicas accesorias que producen fenilcetonas.",
    screeningVsDiagnosisNote: "Un resultado de cribado neonatal positivo no equivale a un diagnóstico médico cerrado. Constituye una alerta analítica de alta prioridad que exige confirmación mediante cuantificación de aminoácidos en plasma y estudio genético molecular de confirmación."
  },

  // Matiz clínico y juicio técnico
  clinicalInterpretation: {
    technicalJudgment: "Cribado neonatal POSITIVO para sospecha de hiperfenilalaninemia / fenilcetonuria.",
    scientificNuance: "Un resultado de cribado positivo identifica un perfil bioquímico de alarma que exige pruebas confirmatorias urgentes. No reemplaza al diagnóstico médico definitivo, el cual requiere confirmación por la Unidad Clínica de Referencia.",
    recommendationToPediatrician: "Derivación URGENTE a la Unidad de Seguimiento y Tratamiento de Enfermedades Metabólicas para confirmación diagnóstica (aminoácidos en plasma, estudio de pterinas y estudio genético molecular del gen PAH)."
  },

  // Modelo de informe cumplimentado para referencia docente
  exemplarReport: {
    patientCode: "MUESTRA-2026-02",
    patientName: "Recién nacido Ficticio (Caso 02 - VP)",
    sampleDate: "2026-10-30",
    receptionDate: "2026-10-30",
    reportDate: "2026-10-30",
    sampleQualityValuation: "Apta para el análisis",
    informedConsentValuation: "Consentimiento informado comprobado",
    preliminaryValuations: {
      phe: "Fuera del intervalo de referencia",
      tyr: "Dentro del intervalo de referencia",
      ratio: "Fuera del intervalo de referencia"
    },
    justification: "La concentración de fenilalanina (485 µmol/L) supera con creces el punto de corte del protocolo (120 µmol/L), y el ratio Phe/Tyr (9.33) supera ampliamente el umbral de 1.5. Este patrón analítico es compatible con deficiencia funcional de la fenilalanina hidroxilasa (PAH). El estudio molecular complementario del exón 12 identifica la variante patogénica c.1222C>T p.(Arg408Trp). Procede activar de inmediato el circuito de confirmación.",
    technicalJudgment: "Cribado Positivo / Alerta de Hiperfenilalaninemia",
    teamSignatures: "Dra. A. García (Técnica Especialista) y Dr. B. López (Facultativo Bioquímico)"
  }
};
