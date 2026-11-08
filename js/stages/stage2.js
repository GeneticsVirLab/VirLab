/**
 * VirLab — Etapa 2: Simulación del Análisis Bioquímico (MS/MS)
 * 
 * Actualizaciones rigurosas:
 * 1. Tarjeta de repaso conceptual previa con botón «Comenzar análisis».
 * 2. Texto introductorio e icono de alimentación (biberón) con textos obligatorios.
 * 3. Espectros MS/MS con cuadrículas regulares, ejes m/z (Th) e Intensidad relativa (%),
 *    escalas homogéneas y muestra VP visualmente diferenciada del control positivo.
 * 4. Transiciones verificadas: Phe (166.1 -> 120.1 Th) y Tyr (182.1 -> 136.1 Th).
 * 5. Tabla analítica con «Ratio Phe/Tyr» (sin la palabra «adimensional»).
 * 6. Infografía amigable del metabolismo de la fenilalanina.
 * 7. Estudio molecular del gen PAH exclusivo para el caso VP (extracción, PCR, Sanger y comparación).
 */

export function renderStage2(container, caseData, userState, onUpdate) {
  const results = caseData.analyticalResults;
  const ref = caseData.referenceContext;
  const isVN = (caseData.id === 'case-vn');
  const userEvals = userState.evaluations || {};
  const isReviewActive = userState.reviewViewOpen !== false; // Abierto inicialmente

  // Perfiles de intensidad relativa (%)
  const profiles = caseData.controlProfiles;
  const negPhe = profiles.negative.pheIntensity;
  const negTyr = profiles.negative.tyrIntensity;

  const posPhe = profiles.positive.pheIntensity;
  const posTyr = profiles.positive.tyrIntensity;

  const samplePhe = profiles.sample.pheIntensity;
  const sampleTyr = profiles.sample.tyrIntensity;

  // Generador de SVG para perfiles con cuadrícula regular
  function generateSpectrumSvg(pheInt, tyrInt, colorPhe, labelPhe) {
    // Escala Y: 0% en y=125, 100% en y=15 (rango 110px)
    const getY = (percent) => 125 - (percent / 100) * 110;

    // Escala X: 100 Th en x=40, 200 Th en x=200
    // Phe (120.1 Th): x=76
    // Tyr (136.1 Th): x=123
    const xPhe = 76;
    const xTyr = 123;
    const yPhe = getY(pheInt);
    const yTyr = getY(tyrInt);

    return `
      <svg viewBox="0 0 240 160" class="spectrum-svg" aria-label="Perfil analítico de espectrometría de masas">
        <!-- Cuadrícula regular de fondo -->
        <g stroke="#e2e8f0" stroke-width="0.8" stroke-dasharray="2,2">
          <!-- Líneas horizontales de Intensidad (25%, 50%, 75%, 100%) -->
          <line x1="35" y1="${getY(25)}" x2="225" y2="${getY(25)}" />
          <line x1="35" y1="${getY(50)}" x2="225" y2="${getY(50)}" />
          <line x1="35" y1="${getY(75)}" x2="225" y2="${getY(75)}" />
          <line x1="35" y1="${getY(100)}" x2="225" y2="${getY(100)}" />

          <!-- Líneas verticales de m/z (100, 120, 140, 160, 180, 200 Th) -->
          <line x1="40" y1="15" x2="40" y2="125" />
          <line x1="76" y1="15" x2="76" y2="125" />
          <line x1="112" y1="15" x2="112" y2="125" />
          <line x1="148" y1="15" x2="148" y2="125" />
          <line x1="184" y1="15" x2="184" y2="125" />
          <line x1="220" y1="15" x2="220" y2="125" />
        </g>

        <!-- Ejes cartesianos -->
        <line x1="35" y1="125" x2="225" y2="125" stroke="#64748b" stroke-width="1.5" />
        <line x1="35" y1="125" x2="35" y2="15" stroke="#64748b" stroke-width="1.5" />

        <!-- Etiquetas de ejes -->
        <text x="12" y="70" font-size="8" fill="#475569" font-weight="600" transform="rotate(-90 12 70)" text-anchor="middle">Intensidad rel. (%)</text>
        <text x="130" y="152" font-size="8" fill="#475569" font-weight="600" text-anchor="middle">Relación masa/carga, m/z (Th)</text>

        <!-- Ticks de Intensidad -->
        <text x="30" y="${getY(0) + 3}" font-size="7" fill="#64748b" text-anchor="end">0</text>
        <text x="30" y="${getY(50) + 3}" font-size="7" fill="#64748b" text-anchor="end">50</text>
        <text x="30" y="${getY(100) + 3}" font-size="7" fill="#64748b" text-anchor="end">100</text>

        <!-- Ticks de m/z -->
        <text x="76" y="135" font-size="7" fill="#64748b" text-anchor="middle">120.1</text>
        <text x="123" y="135" font-size="7" fill="#64748b" text-anchor="middle">136.1</text>
        <text x="220" y="135" font-size="7" fill="#64748b" text-anchor="middle">200</text>

        <!-- Pico Phe (Transición 166.1 -> 120.1 Th) -->
        <path d="M ${xPhe - 16} 125 Q ${xPhe} ${yPhe} ${xPhe + 16} 125 Z" fill="${colorPhe}" fill-opacity="0.35" stroke="${colorPhe}" stroke-width="2" />
        <text x="${xPhe}" y="${yPhe - 4}" font-size="9" font-weight="bold" fill="${colorPhe}" text-anchor="middle">${labelPhe} (${pheInt}%)</text>
        <text x="${xPhe}" y="${yPhe - 13}" font-size="6.5" fill="#64748b" text-anchor="middle">166&rarr;120</text>

        <!-- Pico Tyr (Transición 182.1 -> 136.1 Th) -->
        <path d="M ${xTyr - 16} 125 Q ${xTyr} ${yTyr} ${xTyr + 16} 125 Z" fill="#0d9488" fill-opacity="0.35" stroke="#0d9488" stroke-width="2" />
        <text x="${xTyr}" y="${yTyr - 4}" font-size="9" font-weight="bold" fill="#0d9488" text-anchor="middle">Tyr (${tyrInt}%)</text>
        <text x="${xTyr}" y="${yTyr - 13}" font-size="6.5" fill="#64748b" text-anchor="middle">182&rarr;136</text>
      </svg>
    `;
  }

  // Filas de la tabla con los desplegables de valoración
  const rowsHtml = results.measuredCompounds.map(item => {
    const selectedVal = userEvals[item.id] || '';
    return `
      <tr>
        <td>
          <strong>${item.name}</strong>
          ${item.mrmTransition ? `<br><span class="text-xs text-muted">Transición: ${item.mrmTransition}</span>` : ''}
        </td>
        <td class="text-right val-mono"><strong>${item.value}</strong> ${item.unit}</td>
        <td class="text-center">${item.referenceInterval}</td>
        <td class="text-center">
          <select class="param-select" data-param="${item.id}" aria-label="Valoración de ${item.name}">
            <option value="" ${!selectedVal ? 'selected' : ''}>-- Selecciona valoración --</option>
            <option value="Dentro del intervalo de referencia" ${selectedVal === 'Dentro del intervalo de referencia' ? 'selected' : ''}>Dentro del intervalo de referencia</option>
            <option value="Fuera del intervalo de referencia" ${selectedVal === 'Fuera del intervalo de referencia' ? 'selected' : ''}>Fuera del intervalo de referencia</option>
            <option value="No concluyente" ${selectedVal === 'No concluyente' ? 'selected' : ''}>No concluyente</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <section class="stage-card">
      <div class="stage-header">
        <span class="badge">Etapa 2 de 4</span>
        <h2>Simulación del Análisis Bioquímico (MS/MS)</h2>
        <p class="subtitle">Determinación de metabolitos por espectrometría de masas en tándem</p>
      </div>

      <!-- TARJETA DE REPASO CONCEPTUAL PREVIO -->
      <article class="panel ${isReviewActive ? 'review-card-active' : 'review-card-collapsed'}">
        <div class="panel-header-inline">
          <h3>&#x1F4DA; Tarjeta de Repaso Conceptual: Fundamentos Bioquímicos e Instrumentales</h3>
          <button id="btn-toggle-review" class="btn btn-secondary btn-sm" type="button">
            ${isReviewActive ? 'Ocultar repaso' : 'Consultar repaso'}
          </button>
        </div>

        <div id="review-content" style="display: ${isReviewActive ? 'block' : 'none'};">
          <div class="grid-2-col" style="margin-top: 1rem;">
            <div class="review-box">
              <h4>1. Vía metabólica de la fenilalanina y función de PAH</h4>
              <p class="text-sm">
                La fenilalanina hidroxilasa (<strong>PAH</strong>) es una enzima hepática que utiliza la <strong>fenilalanina como sustrato</strong> y la hidroxila para convertirla en <strong>tirosina (producto)</strong>, requiriendo el cofactor tetrahidrobiopterina (BH4).
              </p>
            </div>
            <div class="review-box">
              <h4>2. Relación biológica entre Phe y Tyr</h4>
              <p class="text-sm">
                La tirosina no es un sustrato de la PAH, sino el producto de su actividad catalítica. Si la enzima funciona normalmente, la Phe se cataboliza a Tyr y sus niveles se mantienen en equilibrio fisiológico.
              </p>
            </div>
          </div>

          <div class="review-box" style="margin-top: 0.75rem;">
            <h4>3. Principio básico de la espectrometría de masas en tándem (MS/MS)</h4>
            <p class="text-sm">
              La MS/MS <strong>no mide directamente la actividad enzimática de la PAH</strong>, sino que cuantifica con altísima precisión las concentraciones de Phe y Tyr en la muestra. Esto permite valorar <em>indirectamente</em> la funcionalidad de la ruta metabólica a partir de las cantidades de sustrato y producto.
            </p>
          </div>

          <div style="margin-top: 1rem; text-align: right;">
            <button id="btn-start-analysis" class="btn btn-primary" type="button">
              Comenzar análisis &darr;
            </button>
          </div>
        </div>
      </article>

      <!-- TEXTO INTRODUCTORIO OBLIGATORIO E ICONO DE ALIMENTACIÓN -->
      <article class="intro-box-pedagogic">
        <p class="intro-p">
          «En esta actividad vas a analizar una muestra de sangre seca obtenida mediante la prueba del talón (DBS, Dried Blood Spot) para estudiar el metabolismo de la fenilalanina.
        </p>
        <p class="intro-p">
          Mediante la técnica de espectrometría de masas en tándem (MS/MS) se determinarán las concentraciones de dos aminoácidos: fenilalanina (Phe) y tirosina (Tyr). Estos resultados permitirán valorar indirectamente el funcionamiento de la vía metabólica en la que participa la enzima fenilalanina hidroxilasa (PAH).
        </p>
        <p class="intro-p">
          Tu tarea será analizar los resultados, compararlos con los valores de referencia proporcionados e interpretar si el perfil bioquímico es compatible con un cribado normal o si requiere una evaluación posterior.
        </p>
        <p class="intro-p font-bold text-primary">
          Recuerda: el cribado neonatal no establece por sí solo un diagnóstico definitivo».
        </p>

        <!-- Icono de alimentación láctea -->
        <div class="feeding-icon-card">
          <div class="feeding-icon">&#x1F37C;</div>
          <p class="text-sm">
            «Las proteínas presentes en la leche materna y en las fórmulas infantiles aportan aminoácidos. La fenilalanina (Phe) es uno de ellos y debe metabolizarse en el organismo».
          </p>
        </div>
      </article>

      <!-- 1. PERFILES ANALÍTICOS SIMULADOS (ESPECTROMETRÍA DE MASAS MS/MS) -->
      <article class="panel" id="analysis-section">
        <div class="panel-header-inline">
          <h3>Perfiles analíticos simulados con fines educativos</h3>
          <span class="tag-meta">MS/MS Triple Cuadrupolo &bull; Ejes m/z (Th) vs. Intensidad rel. (%)</span>
        </div>
        <p class="panel-desc">
          Comparad los picos espectrométricos de la muestra del paciente frente a los perfiles de control (todas las gráficas comparten idénticas escalas y cuadrícula regular para permitir una comparación visual válida):
        </p>

        <div class="spectra-grid">
          <!-- Control Negativo -->
          <div class="spectrum-card">
            <div class="spectrum-card-header bg-neg">
              <span class="spectrum-title">Control Negativo</span>
              <span class="spectrum-sub">Patrón Fisiológico Normal (Calibrador)</span>
            </div>
            <div class="spectrum-svg-wrapper">
              ${generateSpectrumSvg(negPhe, negTyr, '#0284c7', 'Phe')}
            </div>
            <div class="spectrum-footer">
              <p>Phe normal (${negPhe}%) &bull; Tyr normal (${negTyr}%) &bull; <strong>Ratio &lt; 1.5</strong></p>
            </div>
          </div>

          <!-- Control Positivo -->
          <div class="spectrum-card">
            <div class="spectrum-card-header bg-pos">
              <span class="spectrum-title">Control Positivo</span>
              <span class="spectrum-sub">Patrón Patológico PKU (Calibrador)</span>
            </div>
            <div class="spectrum-svg-wrapper">
              ${generateSpectrumSvg(posPhe, posTyr, '#e11d48', 'Phe \u2191\u2191')}
            </div>
            <div class="spectrum-footer">
              <p>Phe disparada (${posPhe}%) &bull; Tyr baja (${posTyr}%) &bull; <strong>Ratio &gt;&gt; 1.5</strong></p>
            </div>
          </div>

          <!-- Muestra Problema (Diferenciada visualmente) -->
          <div class="spectrum-card spectrum-card-target">
            <div class="spectrum-card-header bg-target">
              <span class="spectrum-title">Muestra Problema: ${caseData.code}</span>
              <span class="spectrum-sub">Muestra del Paciente en Estudio</span>
            </div>
            <div class="spectrum-svg-wrapper">
              ${generateSpectrumSvg(samplePhe, sampleTyr, isVN ? '#0284c7' : '#e11d48', isVN ? 'Phe' : 'Phe \u2191\u2191')}
            </div>
            <div class="spectrum-footer">
              <p>
                ${isVN 
                  ? `Phe normal (${samplePhe}%) &bull; Tyr normal (${sampleTyr}%) &bull; Compatible con control negativo`
                  : `Phe muy elevada (${samplePhe}%) &bull; Tyr normal/baja (${sampleTyr}%) &bull; Perfil alterado`}
              </p>
            </div>
          </div>
        </div>
      </article>

      <!-- 2. TABLA DE RESULTADOS CUANTITATIVOS (DIFERENCIADA DE LOS ESPECTROS) -->
      <article class="panel">
        <div class="panel-header-inline">
          <h3>Cuantificación de Aminoácidos y Valoración Preliminar</h3>
          <span class="tag-meta">Valores Cuantitativos en Muestra</span>
        </div>
        <p class="panel-desc">
          A partir de los espectros MS/MS anteriores se han cuantificado las concentraciones en sangre seca. Clasificad cada parámetro en la columna «Valoración preliminar»:
        </p>
        
        <table class="data-table">
          <thead>
            <tr>
              <th>Parámetro analizado</th>
              <th class="text-right">Concentración obtenida</th>
              <th class="text-center">Intervalo de referencia</th>
              <th class="text-center" style="min-width: 230px;">Valoración preliminar (Alumnado)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="meta-note">
          <p><strong>Criterios de referencia del protocolo:</strong> ${ref.notes} (Fuente: ${ref.source}).</p>
        </div>
      </article>

      <!-- 3. CAJA DE TEXTO LIBRE: JUSTIFICACIÓN PRELIMINAR -->
      <article class="panel">
        <h3>Justificación e Interpretación Razonada del Alumnado</h3>
        <p class="panel-desc">Redactad una interpretación razonada de los resultados espectrométricos y cuantitativos:</p>
        
        <textarea id="stage2-justification" class="text-area" rows="4" placeholder="Escribid aquí vuestra interpretación razonada...">${userState.justification || ''}</textarea>
        <p class="field-hint">Esta caja de texto se conserva y sincroniza con el informe técnico final.</p>
      </article>

      <!-- 4. INFOGRAFÍA METABÓLICA DE LA VÍA DE LA FENILALANINA -->
      <article class="panel panel-secondary">
        <div class="panel-header-inline">
          <h3>Fisiopatología: Vía Metabólica de la Fenilalanina</h3>
          <span class="badge">Vía metabólica de la fenilalanina hidroxilasa (PAH)</span>
        </div>

        ${isVN ? `
          <!-- INFOGRAFÍA VN -->
          <div class="metabolism-infographic bg-normal-path">
            <div class="info-step-box">
              <div class="info-icon">&#x1F969;</div>
              <h4>1. Sustrato</h4>
              <p><strong>Fenilalanina (Phe)</strong></p>
              <p class="text-xs text-muted">Aporte de la dieta proteica</p>
            </div>

            <div class="info-arrow-container">
              <span class="arrow-label">Conversión</span>
              <span class="arrow-symbol">&rarr;</span>
            </div>

            <div class="info-machine-box machine-active">
              <div class="machine-gear">&#x2699;&#xFE0F;</div>
              <h4>2. Enzima PAH</h4>
              <p><strong>Fenilalanina hidroxilasa</strong></p>
              <div class="cofactor-pill">&#x1F511; <strong>Cofactor BH4</strong> (Llave auxiliar activa)</div>
              <p class="machine-status status-ok">&#x2714; Enzima plenamente activa</p>
            </div>

            <div class="info-arrow-container">
              <span class="arrow-label">Síntesis normal</span>
              <span class="arrow-symbol">&rarr;</span>
            </div>

            <div class="info-step-box">
              <div class="info-icon">&#x1F4A1;</div>
              <h4>3. Producto</h4>
              <p><strong>Tirosina (Tyr)</strong></p>
              <p class="text-xs text-muted">Precursor de neurotransmisores y melanina</p>
            </div>
          </div>
          <p class="infographic-summary">
            <strong>Vía metabólica normal:</strong> La PAH convierte eficientemente la fenilalanina en tirosina. Las concentraciones de Phe en sangre permanecen en el intervalo fisiológico (&lt; 120 &mu;mol/L).
          </p>
        ` : `
          <!-- INFOGRAFÍA VP -->
          <div class="metabolism-infographic bg-altered-path">
            <div class="info-step-box box-alert">
              <div class="info-icon">&#x26A0;&#xFE0F;</div>
              <h4>1. Acumulación</h4>
              <p><strong class="text-danger">Fenilalanina (Phe) &uarr;&uarr;</strong></p>
              <p class="text-xs text-muted">Acumulación tóxica en sangre</p>
            </div>

            <div class="info-arrow-container">
              <span class="arrow-label text-danger">Bloqueo catalítico</span>
              <span class="arrow-symbol text-danger">&cross;</span>
            </div>

            <div class="info-machine-box machine-altered">
              <div class="machine-gear text-danger">&#x1F6E0;&#xFE0F;</div>
              <h4>2. Enzima PAH Alterada</h4>
              <p><strong>Variante patogénica simulada</strong></p>
              <div class="cofactor-pill cofactor-disabled">&#x1F511; Actividad enzimática reducida</div>
              <p class="machine-status status-error">&#x2716; Menor conversión en tirosina</p>
            </div>

            <div class="info-arrow-container">
              <span class="arrow-label">Menor síntesis</span>
              <span class="arrow-symbol text-muted">&rarr;</span>
            </div>

            <div class="info-step-box box-low">
              <div class="info-icon">&#x1F509;</div>
              <h4>3. Tirosina (Tyr)</h4>
              <p><strong>Tirosina normal o disminuida</strong></p>
              <p class="text-xs text-muted">Pasa a ser condicionalmente esencial</p>
            </div>
          </div>

          <div class="alternative-path-card">
            <div class="alt-path-header">
              <span class="alt-icon">&#x2935;</span>
              <strong>Desvío hacia Vías Alternativas: Producción de Fenilcetonas</strong>
            </div>
            <p class="text-sm">
              Al no poder metabolizarse eficientemente hacia tirosina, la fenilalanina acumulada se desvía parcialmente hacia rutas alternativas accesorias que generan <strong>fenilcetonas</strong> (fenilpiruvato, fenillactato y fenilacetato).
            </p>
          </div>
          <p class="infographic-summary">
            <strong>Fisiopatología:</strong> La reducción de la actividad de la PAH provoca hiperfenilalaninemia y desvío a fenilcetonas. El cribado neonatal detecta este aumento antes de que se manifiesten síntomas clínicos.
          </p>
        `}
      </article>

      ${!isVN ? `
        <!-- 5. ESTUDIO MOLECULAR COMPLEMENTARIO DEL GEN PAH (EXCLUSIVO PARA VP) -->
        <article class="panel" style="border: 2px solid #0284c7;">
          <div class="panel-header-inline">
            <h3>&#x1F9EC; Estudio Molecular Complementario: Gen PAH (Exón 12)</h3>
            <span class="badge badge-warning">Simulación Molecular Docente</span>
          </div>
          <p class="panel-desc">
            Ante el perfil bioquímico de sospecha de la muestra ${caseData.code}, se realiza un estudio genético molecular complementario siguiendo estas cuatro fases:
          </p>

          <div class="molecular-steps-grid">
            <div class="mol-step">
              <div class="mol-step-num">1</div>
              <strong>Extracción de ADN</strong>
              <p class="text-xs text-muted">A partir de sangre seca de la tarjeta DBS.</p>
            </div>
            <div class="mol-step">
              <div class="mol-step-num">2</div>
              <strong>Amplificación por PCR</strong>
              <p class="text-xs text-muted">Amplificación selectiva del exón 12 del gen PAH.</p>
            </div>
            <div class="mol-step">
              <div class="mol-step-num">3</div>
              <strong>Secuenciación Sanger</strong>
              <p class="text-xs text-muted">Lectura fluorométrica de bases de la región amplificada.</p>
            </div>
            <div class="mol-step">
              <div class="mol-step-num">4</div>
              <strong>Comparación con Referencia</strong>
              <p class="text-xs text-muted">Alineamiento de secuencias para identificar variantes.</p>
            </div>
          </div>

          <!-- Comparación visual de electroferograma Sanger -->
          <div class="sanger-comparison-box">
            <h4>Comparación de Secuencias (Codones 407 a 409 del Gen PAH):</h4>

            <div class="sanger-row">
              <span class="sanger-row-label">Secuencia de Referencia (Wild-type):</span>
              <div class="sanger-bases">
                <span class="base-box">C</span><span class="base-box">C</span><span class="base-box">T</span>
                <span class="base-divider">-</span>
                <span class="base-box target-ref">C</span><span class="base-box">G</span><span class="base-box">G</span>
                <span class="base-divider">-</span>
                <span class="base-box">C</span><span class="base-box">T</span><span class="base-box">A</span>
              </div>
              <span class="codon-meta">Codón 407 (Pro) &bull; <strong>Codón 408 (Arg: CGG)</strong> &bull; Codón 409 (Leu)</span>
            </div>

            <div class="sanger-row sanger-row-patient">
              <span class="sanger-row-label">Secuencia del Paciente (${caseData.code}):</span>
              <div class="sanger-bases">
                <span class="base-box">C</span><span class="base-box">C</span><span class="base-box">T</span>
                <span class="base-divider">-</span>
                <span class="base-box target-mut">T</span><span class="base-box">G</span><span class="base-box">G</span>
                <span class="base-divider">-</span>
                <span class="base-box">C</span><span class="base-box">T</span><span class="base-box">A</span>
              </div>
              <span class="codon-meta">Codón 407 (Pro) &bull; <strong class="text-danger">Codón 408 (Trp: TGG)</strong> &bull; Codón 409 (Leu)</span>
            </div>

            <!-- Electroferograma gráfico SVG simulado -->
            <div class="sanger-svg-card">
              <p class="text-xs text-muted" style="margin-bottom: 0.35rem;">
                <strong>Electroferograma Sanger simulado (Pico fluorométrico en posición c.1222):</strong>
              </p>
              <svg viewBox="0 0 340 70" class="sanger-svg">
                <!-- Eje base -->
                <line x1="20" y1="55" x2="320" y2="55" stroke="#cbd5e1" stroke-width="1" />

                <!-- Picos normales: C(azul), C(azul), T(rojo) -->
                <path d="M 25 55 Q 35 15 45 55" fill="none" stroke="#0284c7" stroke-width="2" />
                <text x="35" y="65" font-size="9" fill="#0284c7" text-anchor="middle">C</text>

                <path d="M 50 55 Q 60 15 70 55" fill="none" stroke="#0284c7" stroke-width="2" />
                <text x="60" y="65" font-size="9" fill="#0284c7" text-anchor="middle">C</text>

                <path d="M 75 55 Q 85 15 95 55" fill="none" stroke="#dc2626" stroke-width="2" />
                <text x="85" y="65" font-size="9" fill="#dc2626" text-anchor="middle">T</text>

                <!-- Posición c.1222 alterada en paciente: Pico T (rojo) -->
                <rect x="110" y="5" width="40" height="60" fill="rgba(225, 29, 72, 0.08)" stroke="#e11d48" stroke-dasharray="2,2" rx="4" />
                <path d="M 115 55 Q 130 10 145 55" fill="none" stroke="#dc2626" stroke-width="3" />
                <text x="130" y="65" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">T (Mutado)</text>
                <text x="130" y="10" font-size="7.5" fill="#e11d48" font-weight="bold" text-anchor="middle">c.1222</text>

                <!-- Picos G, G -->
                <path d="M 160 55 Q 170 15 180 55" fill="none" stroke="#1e293b" stroke-width="2" />
                <text x="170" y="65" font-size="9" fill="#1e293b" text-anchor="middle">G</text>

                <path d="M 185 55 Q 195 15 205 55" fill="none" stroke="#1e293b" stroke-width="2" />
                <text x="195" y="65" font-size="9" fill="#1e293b" text-anchor="middle">G</text>

                <!-- C, T, A -->
                <path d="M 215 55 Q 225 15 235 55" fill="none" stroke="#0284c7" stroke-width="2" />
                <text x="225" y="65" font-size="9" fill="#0284c7" text-anchor="middle">C</text>

                <path d="M 240 55 Q 250 15 260 55" fill="none" stroke="#dc2626" stroke-width="2" />
                <text x="250" y="65" font-size="9" fill="#dc2626" text-anchor="middle">T</text>

                <path d="M 265 55 Q 275 15 285 55" fill="none" stroke="#16a34a" stroke-width="2" />
                <text x="275" y="65" font-size="9" fill="#16a34a" text-anchor="middle">A</text>
              </svg>
            </div>
          </div>

          <!-- Pregunta de interpretación del estudio molecular -->
          <div class="molecular-decision-box" style="margin-top: 1rem;">
            <label class="field-title">
              <strong>5. Interpretación del Estudio Molecular por el Alumnado:</strong>
            </label>
            <p class="text-sm text-muted">¿Existe alguna diferencia (variante) en la región estudiada del gen PAH respecto a la referencia?</p>

            <div class="decision-options" style="margin-top: 0.5rem;">
              <label class="radio-option ${userState.molecularVariantAnswer === 'detected' ? 'selected' : ''}">
                <input type="radio" name="mol-variant" value="detected" ${userState.molecularVariantAnswer === 'detected' ? 'checked' : ''}>
                <div>
                  <strong>Sí, se identifica una variante en el codón 408:</strong>
                  <p class="text-xs text-muted">Sustitución de C por T (c.1222C&gt;T), que provoca el cambio del aminoácido Arginina por Triptófano: p.(Arg408Trp).</p>
                </div>
              </label>

              <label class="radio-option ${userState.molecularVariantAnswer === 'none' ? 'selected' : ''}">
                <input type="radio" name="mol-variant" value="none" ${userState.molecularVariantAnswer === 'none' ? 'checked' : ''}>
                <div>
                  <strong>No se detecta ninguna diferencia:</strong>
                  <p class="text-xs text-muted">La secuencia del paciente es 100% idéntica a la secuencia de referencia en el exón 12 analizado.</p>
                </div>
              </label>
            </div>

            <!-- Advertencia científica obligatoria -->
            <div class="callout-educational" style="margin-top: 0.85rem;">
              <strong>Consideración metodológica fundamental:</strong>
              <p class="text-xs">
                El estudio molecular es complementario; el cribado bioquímico no constituye por sí solo un diagnóstico definitivo.
                Asimismo, la presencia o ausencia de una variante en la región analizada (exón 12) no demuestra que todo el gen PAH carezca de variantes en otras regiones no secuenciadas.
              </p>
            </div>
          </div>
        </article>
      ` : ''}

      <div class="navigation-prompt">
        <p>Una vez completado el análisis y vuestra interpretación, pulsad <strong>«Siguiente»</strong> para pasar al módulo de toma de decisiones.</p>
      </div>
    </section>
  `;

  // Conectar botón de alternar repaso
  const btnToggleReview = container.querySelector('#btn-toggle-review');
  const reviewContent = container.querySelector('#review-content');
  btnToggleReview?.addEventListener('click', () => {
    const isVisible = reviewContent.style.display !== 'none';
    reviewContent.style.display = isVisible ? 'none' : 'block';
    btnToggleReview.textContent = isVisible ? 'Consultar repaso' : 'Ocultar repaso';
    onUpdate({ reviewViewOpen: !isVisible });
  });

  // Conectar botón de Comenzar análisis
  const btnStartAnalysis = container.querySelector('#btn-start-analysis');
  btnStartAnalysis?.addEventListener('click', () => {
    if (reviewContent) reviewContent.style.display = 'none';
    if (btnToggleReview) btnToggleReview.textContent = 'Consultar repaso';
    onUpdate({ reviewViewOpen: false });
    const target = container.querySelector('#analysis-section');
    target?.scrollIntoView({ behavior: 'smooth' });
  });

  // Conectar desplegables de valoración de la tabla
  container.querySelectorAll('.param-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const paramId = e.target.getAttribute('data-param');
      const updatedEvals = { ...(userState.evaluations || {}), [paramId]: e.target.value };
      onUpdate({ evaluations: updatedEvals });
    });
  });

  // Conectar textarea de justificación
  const txtJust = container.querySelector('#stage2-justification');
  txtJust?.addEventListener('input', (e) => {
    onUpdate({ justification: e.target.value });
  });

  // Conectar radio de variante molecular en VP
  container.querySelectorAll('input[name="mol-variant"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      onUpdate({ molecularVariantAnswer: e.target.value });
      container.querySelectorAll('input[name="mol-variant"]').forEach(r => {
        r.closest('.radio-option')?.classList.remove('selected');
      });
      e.target.closest('.radio-option')?.classList.add('selected');
    });
  });
}
