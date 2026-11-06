/**
 * VirLab — Etapa 4: Informe Técnico
 * 
 * Actualizaciones:
 * 1. Correspondencia exacta y rigurosa de los nombres de los firmantes en pantalla y versión imprimible/PDF.
 * 2. Incorporación de los datos preanalíticos comprobados (calidad DBS y consentimiento informado).
 * 3. En el caso VP, inclusión del resultado del estudio molecular complementario de PAH.
 * 4. Pestaña independiente para el "Modelo de informe cumplimentado" de referencia docente.
 * 5. Checklist reactivo de validación y botón «Completar informe».
 */

export function renderStage4(container, caseData, userState, onUpdate) {
  const p = caseData.patient;
  const results = caseData.analyticalResults;
  const interp = caseData.clinicalInterpretation;
  const exemplar = caseData.exemplarReport;
  const isVN = (caseData.id === 'case-vn');

  const currentTab = userState.reportActiveTab || 'team';
  const isCompleted = !!userState.isReportCompleted;

  // Estado del formulario del alumno
  const studentPatientName = userState.reportFields?.patientName !== undefined 
    ? userState.reportFields.patientName 
    : p.fullName;

  const studentReportDate = userState.reportFields?.reportDate || p.reportDate;
  const studentJustification = userState.justification || '';
  const studentDecision = userState.answers?.decision || '';
  const studentEvals = userState.evaluations || {};

  const sigs = userState.signatures || {
    member1: '',
    member2: '',
    member3: '',
    member4: ''
  };

  const sampleQualityText = userState.sampleQuality === 'apta' 
    ? 'Apta para el análisis (comprobada en Etapa 1)' 
    : (userState.sampleQuality ? 'No apta' : 'Pendiente de verificar');

  const consentText = userState.informedConsent === 'comprobado'
    ? 'Consentimiento informado comprobado y firmado'
    : 'Pendiente de comprobación';

  // Filas analíticas del informe del equipo
  const studentRowsHtml = results.measuredCompounds.map(item => {
    const evalVal = studentEvals[item.id] || '';
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td class="text-right val-mono"><strong>${item.value}</strong> ${item.unit}</td>
        <td class="text-center">${item.referenceInterval}</td>
        <td class="text-center">
          <select class="report-eval-select" data-param="${item.id}" ${isCompleted ? 'disabled' : ''}>
            <option value="" ${!evalVal ? 'selected' : ''}>-- Sin clasificar --</option>
            <option value="Dentro del intervalo de referencia" ${evalVal === 'Dentro del intervalo de referencia' ? 'selected' : ''}>Dentro del intervalo de referencia</option>
            <option value="Fuera del intervalo de referencia" ${evalVal === 'Fuera del intervalo de referencia' ? 'selected' : ''}>Fuera del intervalo de referencia</option>
            <option value="No concluyente" ${evalVal === 'No concluyente' ? 'selected' : ''}>No concluyente</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');

  // Filas del modelo de referencia docente
  const exemplarRowsHtml = results.measuredCompounds.map(item => {
    const exVal = exemplar.preliminaryValuations[item.id];
    return `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td class="text-right val-mono">${item.value} ${item.unit}</td>
        <td class="text-center">${item.referenceInterval}</td>
        <td class="text-center"><span class="tag tag-success">${exVal}</span></td>
      </tr>
    `;
  }).join('');

  // Comprobación de requisitos para habilitar el botón
  const hasPheEval = !!studentEvals.phe;
  const hasTyrEval = !!studentEvals.tyr;
  const hasRatioEval = !!studentEvals.ratio;
  const hasDecision = !!studentDecision;
  const hasJustification = studentJustification.trim().length >= 10;
  const hasMember1 = (sigs.member1 || '').trim().length >= 3;
  const hasMember2 = (sigs.member2 || '').trim().length >= 3;

  const allValid = hasPheEval && hasTyrEval && hasRatioEval && hasDecision && hasJustification && hasMember1 && hasMember2;

  container.innerHTML = `
    <section class="stage-card">
      <div class="stage-header">
        <span class="badge">Etapa 4 de 4</span>
        <h2>Informe Técnico de Laboratorio</h2>
        <p class="subtitle">Comunicación de resultados y valoración técnica para el pediatra responsable</p>
      </div>

      <!-- Selector de Pestañas: Informe del Equipo vs Modelo Docente -->
      <div class="tabs-nav" role="tablist">
        <button id="tab-btn-team" class="tab-btn ${currentTab === 'team' ? 'active' : ''}" role="tab" type="button">
          &#x1F4DD; Informe de Trabajo del Equipo ${isCompleted ? '(Completado \u2714)' : '(En edición)'}
        </button>
        <button id="tab-btn-exemplar" class="tab-btn ${currentTab === 'exemplar' ? 'active' : ''}" role="tab" type="button">
          &#x1F4D6; Modelo de informe cumplimentado (Referencia docente)
        </button>
      </div>

      ${isCompleted ? `
        <div class="alert-box alert-success" style="margin-top: 1rem;">
          <h4 style="margin-bottom: 0.25rem;">&#x2714; ¡Informe técnico completado y validado con éxito!</h4>
          <p>El documento ha sido firmado electrónicamente por el equipo de laboratorio con los nombres introducidos y registrado para su comunicación al pediatra responsable.</p>
          <div style="margin-top: 0.5rem;">
            <button id="btn-print-report" class="btn btn-secondary btn-sm" type="button">&#x1F5B6;&#xFE0F; Imprimir o Guardar en PDF</button>
          </div>
        </div>
      ` : ''}

      <!-- PESTAÑA 1: INFORME DE TRABAJO DEL EQUIPO -->
      <div id="tab-content-team" class="tab-pane ${currentTab === 'team' ? 'active' : ''}">
        <article class="report-document" id="printable-report">
          <header class="report-header">
            <div>
              <h3>LABORATORIO DE CRIBADO NEONATAL Y BIOQUÍMICA</h3>
              <p class="report-sub">Servicio de Detección Precoz de Enfermedades Congénitas del Metabolismo</p>
            </div>
            <div class="report-meta">
              <p><strong>Cód. Muestra:</strong> <span class="val-mono font-bold">${caseData.code}</span></p>
              <p><strong>Fecha emisión:</strong> 
                <input type="date" id="field-report-date" class="input-inline" value="${studentReportDate}" ${isCompleted ? 'readonly' : ''}>
              </p>
            </div>
          </header>

          <!-- 1. Datos Identificativos y Preanalíticos -->
          <section class="report-section">
            <h4>1. Datos de Identificación del Paciente y Muestra</h4>
            <div class="grid-2-col text-sm">
              <div>
                <p><strong>Nombre y Apellidos (Ficticio):</strong><br>
                  <input type="text" id="field-patient-name" class="input-full" value="${studentPatientName}" placeholder="Nombre del recién nacido" ${isCompleted ? 'readonly' : ''}>
                </p>
                <p style="margin-top: 0.5rem;"><strong>Edad gestacional:</strong> ${p.gestationalAgeWeeks} semanas (a término)</p>
                <p><strong>Momento de extracción:</strong> ${p.hoursOfLife} horas de vida</p>
              </div>
              <div>
                <p><strong>Fecha de toma de muestra:</strong> ${p.sampleDate}</p>
                <p><strong>Fecha de recepción en lab.:</strong> ${p.receptionDate}</p>
                <p><strong>Soporte analítico:</strong> ${p.sampleType}</p>
                <p><strong>Calidad de la muestra:</strong> <span class="tag tag-success">${sampleQualityText}</span></p>
                <p><strong>Consentimiento informado:</strong> <span class="tag tag-success">${consentText}</span></p>
              </div>
            </div>
          </section>

          <!-- 2. Resultados Analíticos Cuantitativos -->
          <section class="report-section">
            <h4>2. Resultados Analíticos Cuantitativos (MS/MS)</h4>
            <p class="text-sm"><strong>Método instrumental:</strong> ${results.method}</p>
            <table class="data-table text-sm">
              <thead>
                <tr>
                  <th>Parámetro analizado</th>
                  <th class="text-right">Resultado</th>
                  <th class="text-center">Intervalo de referencia</th>
                  <th class="text-center">Valoración preliminar</th>
                </tr>
              </thead>
              <tbody>
                ${studentRowsHtml}
              </tbody>
            </table>

            ${!isVN ? `
              <div class="callout-educational" style="margin-top: 0.5rem;">
                <strong>Estudio genético molecular complementario (gen PAH, exón 12):</strong>
                <p class="text-xs">
                  ${userState.molecularVariantAnswer === 'detected'
                    ? 'Identificada variante patogénica: sustitución c.1222C>T, p.(Arg408Trp) en el exón 12.'
                    : (userState.molecularVariantAnswer === 'none' 
                        ? 'No se identificó variante en el exón 12 analizado.'
                        : 'Estudio molecular realizado en la Etapa 2.')}
                </p>
              </div>
            ` : ''}
          </section>

          <!-- 3. Juicio Técnico y Decisión -->
          <section class="report-section">
            <h4>3. Juicio Técnico y Decisión del Equipo</h4>
            <div style="margin-bottom: 0.75rem;">
              <label for="select-decision" style="font-weight: 600; font-size: 0.9rem;">Clasificación técnica de la muestra:</label><br>
              <select id="select-decision" class="input-full" style="max-width: 450px; margin-top: 0.25rem;" ${isCompleted ? 'disabled' : ''}>
                <option value="" ${!studentDecision ? 'selected' : ''}>-- Selecciona la decisión técnica --</option>
                <option value="negative" ${studentDecision === 'negative' ? 'selected' : ''}>Cribado Negativo (Sin sospecha analítica en las condiciones del cribado)</option>
                <option value="positive" ${studentDecision === 'positive' ? 'selected' : ''}>Cribado Positivo / Alerta urgente (Sospecha de hiperfenilalaninemia)</option>
                <option value="repeat" ${studentDecision === 'repeat' ? 'selected' : ''}>Muestra dudosa / Solicitar repetición inmediata</option>
              </select>
            </div>

            <div>
              <label for="report-justification" style="font-weight: 600; font-size: 0.9rem;">Justificación e Interpretación de los Resultados:</label>
              <textarea id="report-justification" class="text-area" rows="4" placeholder="Escribid aquí la interpretación razonada de los resultados analíticos..." ${isCompleted ? 'readonly' : ''}>${studentJustification}</textarea>
            </div>
          </section>

          <!-- 4. Recomendación para Pediatría -->
          <section class="report-section report-conclusion">
            <h4>4. Conclusiones y Recomendación al Profesional Sanitario (Pediatría)</h4>
            <div class="nuance-box">
              <strong>Matiz científico fundamental:</strong>
              <p>${interp.scientificNuance}</p>
            </div>
            <div class="recommendation-box">
              <strong>Recomendación técnica para el pediatra:</strong>
              <p>${interp.recommendationToPediatrician}</p>
            </div>
          </section>

          <!-- 5. Firmas Simuladas del Equipo Técnico -->
          <section class="report-section" id="report-signatures-section">
            <h4>5. Firmas del Equipo Técnico de Laboratorio</h4>
            <p class="text-xs text-muted" style="margin-bottom: 0.75rem;">
              Identificación de los integrantes del equipo (mínimo 2 estudiantes requeridos). Los nombres introducidos se reflejarán exactamente en las firmas oficiales y en la impresión.
            </p>

            <!-- Entradas de edición (ocultas al imprimir si ya están firmadas) -->
            <div class="grid-2-col text-sm no-print">
              <div class="signature-box">
                <label><strong>Integrante 1 (Obligatorio):</strong></label>
                <input type="text" id="sig-member-1" class="input-full" value="${sigs.member1}" placeholder="Nombre y Apellidos" ${isCompleted ? 'readonly' : ''}>
                <span class="sig-line">Firma simulada</span>
              </div>
              <div class="signature-box">
                <label><strong>Integrante 2 (Obligatorio):</strong></label>
                <input type="text" id="sig-member-2" class="input-full" value="${sigs.member2}" placeholder="Nombre y Apellidos" ${isCompleted ? 'readonly' : ''}>
                <span class="sig-line">Firma simulada</span>
              </div>
              <div class="signature-box">
                <label><strong>Integrante 3 (Opcional):</strong></label>
                <input type="text" id="sig-member-3" class="input-full" value="${sigs.member3}" placeholder="Nombre y Apellidos (opcional)" ${isCompleted ? 'readonly' : ''}>
                <span class="sig-line">Firma simulada</span>
              </div>
              <div class="signature-box">
                <label><strong>Integrante 4 (Opcional):</strong></label>
                <input type="text" id="sig-member-4" class="input-full" value="${sigs.member4}" placeholder="Nombre y Apellidos (opcional)" ${isCompleted ? 'readonly' : ''}>
                <span class="sig-line">Firma simulada</span>
              </div>
            </div>

            <!-- Bloque de firmas impresas formales con correspondencia exacta de nombres -->
            <div class="official-signatures-display">
              <div class="official-sig-item">
                <div class="sig-drawn-line"></div>
                <p class="sig-printed-name"><strong>${sigs.member1 || '(Firma pendiente - Integrante 1)'}</strong></p>
                <p class="sig-printed-role">Personal Técnico de Laboratorio</p>
              </div>
              <div class="official-sig-item">
                <div class="sig-drawn-line"></div>
                <p class="sig-printed-name"><strong>${sigs.member2 || '(Firma pendiente - Integrante 2)'}</strong></p>
                <p class="sig-printed-role">Personal Técnico de Laboratorio</p>
              </div>
              ${sigs.member3 ? `
                <div class="official-sig-item">
                  <div class="sig-drawn-line"></div>
                  <p class="sig-printed-name"><strong>${sigs.member3}</strong></p>
                  <p class="sig-printed-role">Personal Técnico de Laboratorio</p>
                </div>
              ` : ''}
              ${sigs.member4 ? `
                <div class="official-sig-item">
                  <div class="sig-drawn-line"></div>
                  <p class="sig-printed-name"><strong>${sigs.member4}</strong></p>
                  <p class="sig-printed-role">Personal Técnico de Laboratorio</p>
                </div>
              ` : ''}
            </div>
          </section>

          <footer class="report-footer">
            <p><em>VirLab — Laboratorio Virtual de Cribado Neonatal. Documento técnico simulado con fines exclusivamente educativos.</em></p>
          </footer>
        </article>

        <!-- Panel de Validación y Checklist de Requisitos -->
        <article class="panel panel-secondary no-print">
          <h3>Estado de Validación del Informe</h3>
          <p class="panel-desc">Para poder finalizar y registrar formalmente el informe técnico, deben cumplimentarse todos los campos obligatorios:</p>
          <ul class="checklist">
            <li class="${hasPheEval && hasTyrEval && hasRatioEval ? 'valid' : 'invalid'}">
              <span class="check-icon">${hasPheEval && hasTyrEval && hasRatioEval ? '&#x2714;' : '&#x2716;'}</span>
              <span>Valoraciones preliminares de Phe, Tyr y ratio completadas (${[hasPheEval, hasTyrEval, hasRatioEval].filter(Boolean).length}/3)</span>
            </li>
            <li class="${hasDecision ? 'valid' : 'invalid'}">
              <span class="check-icon">${hasDecision ? '&#x2714;' : '&#x2716;'}</span>
              <span>Clasificación / Decisión técnica seleccionada</span>
            </li>
            <li class="${hasJustification ? 'valid' : 'invalid'}">
              <span class="check-icon">${hasJustification ? '&#x2714;' : '&#x2716;'}</span>
              <span>Justificación e interpretación de resultados redactada (mínimo 10 caracteres)</span>
            </li>
            <li class="${hasMember1 && hasMember2 ? 'valid' : 'invalid'}">
              <span class="check-icon">${hasMember1 && hasMember2 ? '&#x2714;' : '&#x2716;'}</span>
              <span>Identificación exacta de al menos 2 integrantes del equipo en las firmas</span>
            </li>
          </ul>

          <div class="completion-action-area" style="margin-top: 1.25rem;">
            ${isCompleted ? `
              <p class="text-success font-bold">&#x2705; El informe ya está formalmente finalizado y validado.</p>
            ` : `
              <p class="text-sm ${allValid ? 'text-success' : 'text-muted'}">
                ${allValid 
                  ? '&#x2714; Todos los requisitos obligatorios están completos. Ya podéis pulsar el botón <strong>«Completar informe»</strong>.' 
                  : '&#x26A0;&#xFE0F; Completad los puntos marcados en rojo en el checklist para habilitar el botón de finalización.'}
              </p>
            `}
          </div>
        </article>
      </div>

      <!-- PESTAÑA 2: MODELO DE INFORME CUMPLIMENTADO (REFERENCIA DOCENTE) -->
      <div id="tab-content-exemplar" class="tab-pane ${currentTab === 'exemplar' ? 'active' : ''}">
        <div class="alert-box alert-info">
          <strong>Aviso pedagógico:</strong> Este documento es un <em>Modelo de Referencia Cumplimentado</em> para que el alumnado conozca cómo redacta formalmente un laboratorio de cribado sus informes técnicos. No sustituye al informe de trabajo de vuestro equipo.
        </div>

        <article class="report-document exemplar-document">
          <div class="exemplar-watermark">MODELO DE EJEMPLO</div>
          <header class="report-header">
            <div>
              <h3>LABORATORIO DE CRIBADO NEONATAL Y BIOQUÍMICA</h3>
              <p class="report-sub">Servicio de Detección Precoz de Enfermedades Congénitas del Metabolismo</p>
            </div>
            <div class="report-meta">
              <p><strong>Cód. Muestra:</strong> <span class="val-mono font-bold">${exemplar.patientCode}</span></p>
              <p><strong>Fecha emisión:</strong> ${exemplar.reportDate}</p>
            </div>
          </header>

          <section class="report-section">
            <h4>1. Datos de Identificación (Ejemplo)</h4>
            <div class="grid-2-col text-sm">
              <div>
                <p><strong>Paciente:</strong> ${exemplar.patientName}</p>
                <p><strong>Edad gestacional:</strong> ${p.gestationalAgeWeeks} semanas (a término)</p>
              </div>
              <div>
                <p><strong>Fecha de toma:</strong> ${exemplar.sampleDate}</p>
                <p><strong>Fecha de recepción:</strong> ${exemplar.receptionDate}</p>
                <p><strong>Calidad DBS:</strong> ${exemplar.sampleQualityValuation}</p>
                <p><strong>Consentimiento:</strong> ${exemplar.informedConsentValuation}</p>
              </div>
            </div>
          </section>

          <section class="report-section">
            <h4>2. Resultados Analíticos Cuantitativos (Ejemplo)</h4>
            <table class="data-table text-sm">
              <thead>
                <tr>
                  <th>Parámetro analizado</th>
                  <th class="text-right">Resultado</th>
                  <th class="text-center">Intervalo de referencia</th>
                  <th class="text-center">Valoración</th>
                </tr>
              </thead>
              <tbody>
                ${exemplarRowsHtml}
              </tbody>
            </table>
          </section>

          <section class="report-section">
            <h4>3. Juicio Técnico y Justificación (Ejemplo de Referencia)</h4>
            <p><strong>Clasificación técnica:</strong> <span class="badge ${isVN ? 'badge-success' : 'badge-warning'}">${exemplar.technicalJudgment}</span></p>
            <div class="justification-box">
              <p class="justification-text">${exemplar.justification}</p>
            </div>
          </section>

          <section class="report-section report-conclusion">
            <h4>4. Conclusiones y Recomendación al Profesional Sanitario</h4>
            <div class="nuance-box">
              <strong>Matiz científico:</strong>
              <p>${interp.scientificNuance}</p>
            </div>
            <div class="recommendation-box">
              <strong>Recomendación al pediatra:</strong>
              <p>${interp.recommendationToPediatrician}</p>
            </div>
          </section>

          <section class="report-section">
            <h4>5. Firmas Facultativas (Ejemplo)</h4>
            <p class="text-sm"><strong>Facultativos responsables:</strong> ${exemplar.teamSignatures}</p>
          </section>
        </article>
      </div>

    </section>
  `;

  // Pestañas
  const tabBtnTeam = container.querySelector('#tab-btn-team');
  const tabBtnExemplar = container.querySelector('#tab-btn-exemplar');

  tabBtnTeam?.addEventListener('click', () => {
    onUpdate({ reportActiveTab: 'team' });
    renderStage4(container, caseData, userState, onUpdate);
  });

  tabBtnExemplar?.addEventListener('click', () => {
    onUpdate({ reportActiveTab: 'exemplar' });
    renderStage4(container, caseData, userState, onUpdate);
  });

  // Eventos de inputs y selects
  container.querySelectorAll('.report-eval-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const paramId = e.target.getAttribute('data-param');
      const updatedEvals = { ...(userState.evaluations || {}), [paramId]: e.target.value };
      onUpdate({ evaluations: updatedEvals });
      renderStage4(container, caseData, userState, onUpdate);
    });
  });

  container.querySelector('#field-patient-name')?.addEventListener('input', (e) => {
    const reportFields = { ...(userState.reportFields || {}), patientName: e.target.value };
    onUpdate({ reportFields });
  });

  container.querySelector('#field-report-date')?.addEventListener('input', (e) => {
    const reportFields = { ...(userState.reportFields || {}), reportDate: e.target.value };
    onUpdate({ reportFields });
  });

  container.querySelector('#select-decision')?.addEventListener('change', (e) => {
    const answers = { ...(userState.answers || {}), decision: e.target.value };
    onUpdate({ answers });
    renderStage4(container, caseData, userState, onUpdate);
  });

  container.querySelector('#report-justification')?.addEventListener('input', (e) => {
    onUpdate({ justification: e.target.value });
    const hasJust = e.target.value.trim().length >= 10;
    const justLi = container.querySelector('.checklist li:nth-child(3)');
    if (justLi) {
      justLi.className = hasJust ? 'valid' : 'invalid';
      justLi.querySelector('.check-icon').innerHTML = hasJust ? '&#x2714;' : '&#x2716;';
    }
    if (typeof window.checkAppNavigation === 'function') {
      window.checkAppNavigation();
    }
  });

  // Conectar campos de firma con correspondencia exacta
  ['1', '2', '3', '4'].forEach(num => {
    container.querySelector(`#sig-member-${num}`)?.addEventListener('input', (e) => {
      const currentSigs = { ...(userState.signatures || {}) };
      currentSigs[`member${num}`] = e.target.value;
      onUpdate({ signatures: currentSigs });

      // Actualizar en tiempo real el bloque de firmas formales
      const printedNameEl = container.querySelectorAll('.official-sig-item .sig-printed-name')[parseInt(num, 10) - 1];
      if (printedNameEl) {
        printedNameEl.innerHTML = `<strong>${e.target.value || `(Firma pendiente - Integrante ${num})`}</strong>`;
      }

      const m1 = (currentSigs.member1 || '').trim().length >= 3;
      const m2 = (currentSigs.member2 || '').trim().length >= 3;
      const sigLi = container.querySelector('.checklist li:nth-child(4)');
      if (sigLi) {
        sigLi.className = (m1 && m2) ? 'valid' : 'invalid';
        sigLi.querySelector('.check-icon').innerHTML = (m1 && m2) ? '&#x2714;' : '&#x2716;';
      }
      if (typeof window.checkAppNavigation === 'function') {
        window.checkAppNavigation();
      }
    });
  });

  // Botón imprimir / exportar PDF
  container.querySelector('#btn-print-report')?.addEventListener('click', () => {
    window.print();
  });
}
