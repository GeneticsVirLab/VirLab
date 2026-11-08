/**
 * VirLab — Etapa 1: Presentación del Caso y Recepción de la Muestra
 * 
 * Actualizaciones:
 * - Terminología: Tarjeta de recogida de muestra de sangre seca (DBS, Dried Blood Spot)
 *   diferenciada de la punción del talón (procedimiento de recogida).
 * - Identificación coherente de casos (Código 01 para VN, Código 02 para VP).
 * - Selector interactivo de calidad de la muestra (Apta / No apta + justificación).
 * - Explicación sobre la repercusión de repetir la toma vs. aceptar muestra defectuosa.
 * - Comprobación obligatoria del consentimiento informado.
 * - Validación bloqueante para avanzar a la Etapa 2.
 */

export function renderStage1(container, caseData, userState, onUpdate) {
  const p = caseData.patient;
  const currentQuality = userState.sampleQuality || '';
  const currentQualityJust = userState.sampleQualityJustification || '';
  const currentConsent = userState.informedConsent || '';

  const isQualityApta = (currentQuality === 'apta');
  const isConsentOk = (currentConsent === 'comprobado');
  const canAdvance = isQualityApta && isConsentOk;

  container.innerHTML = `
    <section class="stage-card">
      <div class="stage-header">
        <span class="badge">Etapa 1 de 4</span>
        <h2>Presentación del Caso y Recepción de la Muestra</h2>
        <p class="subtitle">Inspección de la tarjeta DBS, comprobación del consentimiento y valoración preanalítica</p>
      </div>

      <div class="alert-box alert-info">
        <strong>Aviso docente:</strong> ${caseData.disclaimer}
      </div>

      <div class="grid-2-col">
        <!-- Panel 1: Datos del Recién Nacido -->
        <article class="panel">
          <h3>Ficha del Recién Nacido (Datos Sintéticos)</h3>
          <ul class="data-list">
            <li><span class="label">Código de muestra:</span> <span class="val-mono font-bold">${caseData.code}</span></li>
            <li><span class="label">Caso asignado:</span> <span class="badge">${caseData.code}</span></li>
            <li><span class="label">Edad gestacional:</span> <span>${p.gestationalAgeWeeks} semanas (a término)</span></li>
            <li><span class="label">Peso al nacer:</span> <span>${p.birthWeightGrams} g</span></li>
            <li><span class="label">Momento de extracción:</span> <span>${p.hoursOfLife} horas de vida</span></li>
            <li><span class="label">Alimentación:</span> <span>${p.feedingType}</span></li>
            <li><span class="label">Estado clínico:</span> <span>${p.clinicalStatus}</span></li>
          </ul>

          <div class="callout-educational" style="margin-top: 1rem;">
            <h4>Procedimiento de recogida vs. Soporte:</h4>
            <p>
              La <strong>prueba del talón</strong> es el procedimiento clínico de punción capilar superficial para extraer sangre. 
              El soporte donde se fija y deseca la muestra para su transporte y análisis es la 
              <strong>tarjeta de recogida de muestra de sangre seca (DBS, Dried Blood Spot)</strong>.
            </p>
          </div>
        </article>

        <!-- Panel 2: Calidad Preanalítica y Consentimiento -->
        <article class="panel">
          <h3>Recepción Preanalítica en el Laboratorio</h3>
          
          <!-- 1. Calidad de la muestra -->
          <div class="preanalytical-block">
            <label for="select-sample-quality" class="field-title">
              <strong>1. Valoración de Calidad de la Tarjeta DBS:</strong>
            </label>
            <p class="text-xs text-muted">Criterios de inspección: ${p.sampleQualityCriteria}</p>
            
            <select id="select-sample-quality" class="input-full" style="margin-top: 0.35rem;">
              <option value="" ${!currentQuality ? 'selected' : ''}>-- Selecciona la valoración de calidad --</option>
              <option value="apta" ${currentQuality === 'apta' ? 'selected' : ''}>Apta para el análisis (círculos bien impregnados y homogéneos)</option>
              <option value="no_apta" ${currentQuality === 'no_apta' ? 'selected' : ''}>No apta para el análisis (muestra insuficiente, halo o contaminación)</option>
            </select>

            <!-- Justificación si es No apta -->
            <div id="quality-justification-box" style="margin-top: 0.5rem; display: ${currentQuality === 'no_apta' ? 'block' : 'none'};">
              <label for="input-quality-just" class="text-xs text-danger font-bold">Especificad el motivo de rechazo preanalítico:</label>
              <textarea id="input-quality-just" class="text-area" rows="2" placeholder="Describid la deficiencia: muestra insuficiente, impregnación deficiente, tarjeta dañada...">${currentQualityJust}</textarea>
            </div>

            <div class="quality-impact-note" style="margin-top: 0.6rem;">
              <p class="text-xs text-muted">
                <strong>Importancia de la valoración preanalítica:</strong> La repetición de la recogida implica contactar con la familia, realizar una nueva extracción mediante punción del talón y puede retrasar el cribado. Esto no debe llevar a aceptar una muestra cuya calidad comprometa la validez del análisis.
              </p>
            </div>
          </div>

          <hr style="border: 0; border-top: 1px solid var(--color-border-subtle); margin: 1rem 0;">

          <!-- 2. Consentimiento informado -->
          <div class="preanalytical-block">
            <label for="select-consent" class="field-title">
              <strong>2. Verificación de Consentimiento Informado:</strong>
            </label>
            <p class="text-xs text-muted">
              «El expediente de esta muestra incluye un consentimiento informado firmado por los representantes legales del recién nacido. Antes de continuar, el equipo debe comprobar que el documento está presente y correctamente cumplimentado».
            </p>

            <select id="select-consent" class="input-full" style="margin-top: 0.35rem;">
              <option value="" ${!currentConsent ? 'selected' : ''}>-- Selecciona comprobación --</option>
              <option value="comprobado" ${currentConsent === 'comprobado' ? 'selected' : ''}>Consentimiento informado comprobado y firmado</option>
              <option value="no_comprobado" ${currentConsent === 'no_comprobado' ? 'selected' : ''}>No se ha podido comprobar / Ausente</option>
            </select>
          </div>
        </article>
      </div>

      <!-- Estado de requisitos para avanzar -->
      <div class="preanalytical-status-card ${canAdvance ? 'status-card-ok' : 'status-card-pending'}">
        <div class="status-icon">${canAdvance ? '&#x2714;' : '&#x26A0;&#xFE0F;'}</div>
        <div>
          <h4 style="margin-bottom: 0.2rem;">
            ${canAdvance 
              ? 'Requisitos preanalíticos completados satisfactoriamente' 
              : 'Requisitos previos para avanzar a la simulación analítica'}
          </h4>
          <p class="text-sm">
            ${canAdvance
              ? 'La muestra ha sido catalogada como <strong>Apta</strong> y el consentimiento ha sido <strong>Comprobado</strong>. Pulsad «Siguiente» para acceder a la Etapa 2.'
              : 'Para acceder al análisis en el espectrómetro de masas, es obligatorio valorar la muestra como <strong>Apta para el análisis</strong> y verificar que el <strong>Consentimiento informado está comprobado</strong>.'}
          </p>
        </div>
      </div>
    </section>
  `;

  // Conectar eventos interactivos
  const selectQuality = container.querySelector('#select-sample-quality');
  const inputQualityJust = container.querySelector('#input-quality-just');
  const selectConsent = container.querySelector('#select-consent');

  selectQuality?.addEventListener('change', (e) => {
    const val = e.target.value;
    onUpdate({ sampleQuality: val });
    // Re-render para mostrar/ocultar textarea de justificación y actualizar tarjeta de estado
    renderStage1(container, caseData, userState, onUpdate);
    if (typeof window.checkAppNavigation === 'function') {
      window.checkAppNavigation();
    }
  });

  inputQualityJust?.addEventListener('input', (e) => {
    onUpdate({ sampleQualityJustification: e.target.value });
  });

  selectConsent?.addEventListener('change', (e) => {
    const val = e.target.value;
    onUpdate({ informedConsent: val });
    renderStage1(container, caseData, userState, onUpdate);
    if (typeof window.checkAppNavigation === 'function') {
      window.checkAppNavigation();
    }
  });
}
