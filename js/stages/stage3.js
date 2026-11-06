/**
 * VirLab — Etapa 3: Interpretación
 * Espacio de deliberación del equipo de estudiantes: evaluación de resultados,
 * preguntas guiadas y justificación científica escrita.
 */

export function renderStage3(container, caseData, userState, onUpdate) {
  const currentJustification = userState.justification || '';
  const currentDecision = userState.answers?.decision || '';
  const isVN = (caseData.id === 'case-vn');

  // Valores analíticos
  const phe = caseData.analyticalResults.measuredCompounds.find(c => c.id === 'phe')?.value;
  const ratio = caseData.analyticalResults.measuredCompounds.find(c => c.id === 'ratio')?.value;

  container.innerHTML = `
    <section class="stage-card">
      <div class="stage-header">
        <span class="badge">Etapa 3 de 4</span>
        <h2>Interpretación de Resultados y Toma de Decisión</h2>
        <p class="subtitle">Evaluación conjunta de los datos analíticos y justificación científica</p>
      </div>

      <div class="alert-box alert-info">
        <strong>Aviso docente:</strong> ${caseData.disclaimer}
      </div>

      <article class="panel">
        <h3>1. Decisión Técnica del Equipo</h3>
        <p>A la vista de los resultados cuantitativos de Phe (<strong>${phe} &mu;mol/L</strong>) y el Ratio Phe/Tyr (<strong>${ratio}</strong>) respecto a los puntos de corte del protocolo:</p>
        
        <div class="decision-options">
          <label class="radio-option ${currentDecision === 'negative' ? 'selected' : ''}">
            <input type="radio" name="decision" value="negative" ${currentDecision === 'negative' ? 'checked' : ''}>
            <div>
              <strong>Cribado Negativo:</strong>
              <p class="text-sm text-muted">Los parámetros no alcanzan los niveles de sospecha del programa; no se requieren pruebas metabólicas ni genéticas confirmatorias.</p>
            </div>
          </label>

          <label class="radio-option ${currentDecision === 'positive' ? 'selected' : ''}">
            <input type="radio" name="decision" value="positive" ${currentDecision === 'positive' ? 'checked' : ''}>
            <div>
              <strong>Cribado Positivo / Alerta de Sospecha:</strong>
              <p class="text-sm text-muted">Los niveles justifican sospecha inmediata de hiperfenilalaninemia; se requiere derivación urgente a confirmación diagnóstica.</p>
            </div>
          </label>

          <label class="radio-option ${currentDecision === 'repeat' ? 'selected' : ''}">
            <input type="radio" name="decision" value="repeat" ${currentDecision === 'repeat' ? 'checked' : ''}>
            <div>
              <strong>Muestra no concluyente / Dudosa:</strong>
              <p class="text-sm text-muted">Los datos no permiten clasificar la muestra con seguridad; se solicita repetición inmediata de la toma de muestra.</p>
            </div>
          </label>
        </div>

        <!-- Retroalimentación educativa dinámica -->
        <div id="decision-feedback" class="feedback-container">
          ${renderFeedbackMessage(currentDecision, isVN)}
        </div>
      </article>

      <article class="panel">
        <h3>2. Justificación Científica y Razonada del Equipo</h3>
        <p>Argumentad formalmente vuestra decisión técnica haciendo referencia a las concentraciones obtenidas, los puntos de corte del protocolo y el significado clínico del cribado:</p>
        
        <textarea id="justification-input" class="text-area" rows="4" placeholder="Escribid aquí vuestra argumentación científica en equipo...">${currentJustification}</textarea>
        <p class="field-hint">Esta justificación quedará incorporada en el informe técnico final dirigido al pediatra.</p>
      </article>

      <div class="navigation-prompt">
        <p>Completad la decisión y la argumentación y pulsad <strong>«Siguiente»</strong> para pasar al Módulo 4: Elaboración del Informe Técnico.</p>
      </div>
    </section>
  `;

  // Conectar eventos
  const radioInputs = container.querySelectorAll('input[name="decision"]');
  radioInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const selectedDecision = e.target.value;
      const answers = { ...(userState.answers || {}), decision: selectedDecision };
      onUpdate({ answers });

      const feedbackEl = container.querySelector('#decision-feedback');
      if (feedbackEl) {
        feedbackEl.innerHTML = renderFeedbackMessage(selectedDecision, isVN);
      }

      container.querySelectorAll('.radio-option').forEach(ro => ro.classList.remove('selected'));
      e.target.closest('.radio-option')?.classList.add('selected');
    });
  });

  const textarea = container.querySelector('#justification-input');
  if (textarea) {
    textarea.addEventListener('input', (e) => {
      onUpdate({ justification: e.target.value });
    });
  }
}

/**
 * Genera la retroalimentación formativa según la decisión y el caso
 */
function renderFeedbackMessage(decision, isVN) {
  if (!decision) return '';

  if (isVN) {
    if (decision === 'negative') {
      return `
        <div class="alert-box alert-success">
          <strong>&#x2714; Decisión acertada:</strong> Los niveles de Phe (58 &mu;mol/L &lt; 120) y el Ratio Phe/Tyr (0.81 &lt; 1.5) son fisiológicos. La muestra no activa criterios de sospecha.
        </div>
      `;
    } else {
      return `
        <div class="alert-box alert-warning">
          <strong>&#x26A0;&#xFE0F; Atención (Refuerzo pedagógico):</strong> Esta muestra no presenta elevación de metabolitos diana. Recordad que la presencia fisiológica de fenilalanina es normal e imprescindible para el organismo; solo valores por encima del umbral (&gt;120 &mu;mol/L) justifican sospecha de PKU.
        </div>
      `;
    }
  } else {
    // Caso VP
    if (decision === 'positive') {
      return `
        <div class="alert-box alert-success">
          <strong>&#x2714; Decisión acertada:</strong> Los niveles de Phe (485 &mu;mol/L) y el Ratio Phe/Tyr (9.33) superan con creces los puntos de corte, indicando una clara sospecha de hiperfenilalaninemia que requiere confirmación urgente.
        </div>
      `;
    } else {
      return `
        <div class="alert-box alert-warning">
          <strong>&#x26A0;&#xFE0F; Atención (Refuerzo pedagógico):</strong> La concentración de Phe supera ampliamente el valor de corte (120 &mu;mol/L) y el ratio es marcadamente elevado. No clasificar esta muestra como positiva retrasaría el diagnóstico y el inicio del tratamiento precoz.
        </div>
      `;
    }
  }
}
