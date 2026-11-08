/**
 * VirLab — Controlador Principal (app.js)
 * 
 * Gestiona:
 * - Selección de caso activo: Caso 01 (VN) o Caso 02 (VP).
 * - Navegación entre las 4 etapas con validaciones bloqueantes:
 *   - Etapa 1: Obligatorio muestra apta y consentimiento comprobado.
 *   - Etapa 4: Obligatorio todos los campos y firmas para completar informe.
 * - Glosario interactivo accesible en las 4 etapas.
 * - Estado limpio reactivo sin precargas.
 */

import { caseVN } from './data/case_vn.js';
import { caseVP } from './data/case_vp.js';
import { glossary } from './data/glossary.js';
import { renderStage1 } from './stages/stage1.js';
import { renderStage2 } from './stages/stage2.js';
import { renderStage3 } from './stages/stage3.js';
import { renderStage4 } from './stages/stage4.js';

// Catálogo de casos disponibles
const cases = {
  'case-vn': caseVN,
  'case-vp': caseVP
};

// Caso activo (por defecto Caso 01 - VN)
let activeCase = caseVN;

// Mapa de renderizadores de etapa
const stageRenderers = {
  1: renderStage1,
  2: renderStage2,
  3: renderStage3,
  4: renderStage4
};

/**
 * Estado inicial limpio del equipo de estudiantes
 */
function createInitialState() {
  return {
    currentStage: 1,
    maxStageVisited: 1,
    sampleQuality: '',              // 'apta' | 'no_apta'
    sampleQualityJustification: '',
    informedConsent: '',            // 'comprobado' | 'no_comprobado'
    reviewViewOpen: true,           // Tarjeta de repaso abierta inicialmente en Etapa 2
    molecularVariantAnswer: '',     // Exclusivo VP
    evaluations: {
      phe: '',
      tyr: '',
      ratio: ''
    },
    answers: {
      decision: ''                  // Vacía al inicio
    },
    justification: '',              // Vacía al inicio
    reportFields: {},
    signatures: {
      member1: '',
      member2: '',
      member3: '',
      member4: ''
    },
    reportActiveTab: 'team',
    isReportCompleted: false,
    isReportSent: false
  };
}

let userState = createInitialState();

// Elementos del DOM
const stageContainer = document.getElementById('stage-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const stageIndicator = document.getElementById('stage-indicator');
const progressSteps = document.querySelectorAll('.step-item');
const caseSelect = document.getElementById('case-select');

// Modal de Glosario
const glossaryModal = document.getElementById('glossary-modal');
const btnOpenGlossary = document.getElementById('btn-open-glossary');
const btnCloseGlossary = document.getElementById('btn-close-glossary');
const glossaryList = document.getElementById('glossary-list');

/**
 * Comprueba si la Etapa 1 cumple los requisitos para avanzar
 */
function isStage1ReadyToAdvance() {
  return (userState.sampleQuality === 'apta' && userState.informedConsent === 'comprobado');
}

/**
 * Comprueba si la Etapa 4 cumple los requisitos para finalizar el informe
 */
function isReportReadyToComplete() {
  const ev = userState.evaluations || {};
  const sigs = userState.signatures || {};

  const hasPhe = !!ev.phe;
  const hasTyr = !!ev.tyr;
  const hasRatio = !!ev.ratio;
  const hasDecision = !!userState.answers?.decision;
  const hasJustification = (userState.justification || '').trim().length >= 10;
  const hasMember1 = (sigs.member1 || '').trim().length >= 3;
  const hasMember2 = (sigs.member2 || '').trim().length >= 3;

  return hasPhe && hasTyr && hasRatio && hasDecision && hasJustification && hasMember1 && hasMember2;
}

/**
 * Actualiza el estado reactivo
 */
function handleStateUpdate(partialUpdate) {
  Object.assign(userState, partialUpdate);
  if (partialUpdate.evaluations) {
    userState.evaluations = { ...userState.evaluations, ...partialUpdate.evaluations };
  }
  if (partialUpdate.answers) {
    userState.answers = { ...userState.answers, ...partialUpdate.answers };
  }
  if (partialUpdate.signatures) {
    userState.signatures = { ...userState.signatures, ...partialUpdate.signatures };
  }
  if (partialUpdate.reportFields) {
    userState.reportFields = { ...userState.reportFields, ...partialUpdate.reportFields };
  }

  updateNavigationControls(userState.currentStage);
}

// Exponer comprobador a nivel de ventana para eventos inmediatos
window.checkAppNavigation = function() {
  updateNavigationControls(userState.currentStage);
};

/**
 * Actualiza la barra de progreso superior
 */
function updateProgressBar(currentStage) {
  progressSteps.forEach(step => {
    const stageNum = parseInt(step.getAttribute('data-stage'), 10);
    step.classList.remove('active', 'completed');

    if (stageNum === currentStage) {
      step.classList.add('active');
    } else if (stageNum < currentStage) {
      step.classList.add('completed');
    }
  });
}

/**
 * Actualiza los botones de navegación inferior
 */
function updateNavigationControls(currentStage) {
  btnPrev.disabled = (currentStage === 1);

  if (currentStage === 1) {
    const canLeaveStage1 = isStage1ReadyToAdvance();
    btnNext.textContent = 'Siguiente \u2192';
    btnNext.disabled = !canLeaveStage1;
    btnNext.classList.remove('btn-ready');
    if (!canLeaveStage1) {
      btnNext.title = 'Para continuar, la muestra debe valorarse como Apta y el consentimiento debe estar Comprobado.';
    } else {
      btnNext.title = 'Avanzar a la Etapa 2';
    }
  } else if (currentStage === 4) {
    if (userState.isReportSent) {
      btnNext.textContent = 'Informe enviado \u2714';
      btnNext.disabled = true;
      btnNext.classList.remove('btn-ready');
      btnNext.title = 'El informe ya ha sido enviado.';
    } else if (userState.isReportCompleted) {
      btnNext.textContent = 'Enviar al médico';
      btnNext.disabled = false;
      btnNext.classList.add('btn-ready');
      btnNext.title = 'Pulsad para enviar el informe al médico solicitante.';
    } else {
      btnNext.textContent = 'Completar informe';
      const canComplete = isReportReadyToComplete();
      btnNext.disabled = !canComplete;
      if (canComplete) {
        btnNext.classList.add('btn-ready');
        btnNext.title = 'Todos los requisitos están completos. Pulsad para finalizar.';
      } else {
        btnNext.classList.remove('btn-ready');
        btnNext.title = 'Completad todos los campos obligatorios del checklist.';
      }
    }
  } else {
    btnNext.textContent = 'Siguiente \u2192';
    btnNext.disabled = false;
    btnNext.classList.remove('btn-ready');
    btnNext.title = 'Avanzar a la siguiente etapa';
  }

  stageIndicator.textContent = `Etapa ${currentStage} de 4`;
}

/**
 * Transición entre etapas
 */
function navigateToStage(targetStage) {
  if (targetStage < 1 || targetStage > 4) return;

  // Bloqueo si intenta salir de Etapa 1 sin cumplir requisitos
  if (userState.currentStage === 1 && targetStage > 1 && !isStage1ReadyToAdvance()) {
    alert('Requisitos preanalíticos incompletos: Es obligatorio calificar la muestra como «Apta para el análisis» y marcar el «Consentimiento informado comprobado» antes de acceder a la simulación analítica.');
    return;
  }

  userState.currentStage = targetStage;
  if (targetStage > userState.maxStageVisited) {
    userState.maxStageVisited = targetStage;
  }

  updateProgressBar(userState.currentStage);
  updateNavigationControls(userState.currentStage);

  const render = stageRenderers[userState.currentStage];
  if (typeof render === 'function') {
    render(stageContainer, activeCase, userState, handleStateUpdate);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Botón Siguiente / Completar
btnNext.addEventListener('click', () => {
  if (userState.currentStage === 4) {
    if (userState.isReportCompleted && !userState.isReportSent) {
      const confirmed = window.confirm('Vais a enviar el informe al médico que os solicitó esta prueba. Una vez enviado no se podrá modificar. ¿Confirmáis el envío?');
      if (confirmed) {
        userState.isReportSent = true;
        navigateToStage(4);
      }
    } else if (!userState.isReportCompleted && isReportReadyToComplete()) {
      userState.isReportCompleted = true;
      navigateToStage(4);
    }
  } else {
    navigateToStage(userState.currentStage + 1);
  }
});

btnPrev.addEventListener('click', () => {
  navigateToStage(userState.currentStage - 1);
});

// Clic en la barra de progreso
progressSteps.forEach(step => {
  step.addEventListener('click', () => {
    const targetStage = parseInt(step.getAttribute('data-stage'), 10);
    // Verificar si puede salir de la etapa 1
    if (userState.currentStage === 1 && targetStage > 1 && !isStage1ReadyToAdvance()) {
      alert('Debéis completar la valoración preanalítica de la muestra y el consentimiento en la Etapa 1 antes de acceder a otra etapa.');
      return;
    }
    navigateToStage(targetStage);
  });
});

// Selector de caso en cabecera
if (caseSelect) {
  caseSelect.addEventListener('change', (e) => {
    const selectedKey = e.target.value;
    if (cases[selectedKey]) {
      activeCase = cases[selectedKey];
      userState = createInitialState();
      navigateToStage(1);
    }
  });
}

// ============================================================
// GESTIÓN DEL GLOSARIO (ACCESIBLE EN TODAS LAS ETAPAS)
// ============================================================
function initGlossary() {
  if (!glossaryList) return;

  glossaryList.innerHTML = glossary.map(item => `
    <div class="glossary-item" id="gloss-${item.term.toLowerCase().replace(/[^a-z0-9]/g, '-')}">
      <h4>${item.term}</h4>
      <p class="glossary-short"><em>${item.short}</em></p>
      <p class="glossary-def text-sm">${item.definition}</p>
    </div>
  `).join('');

  btnOpenGlossary?.addEventListener('click', () => {
    glossaryModal.style.display = 'flex';
    btnOpenGlossary.setAttribute('aria-expanded', 'true');
  });

  btnCloseGlossary?.addEventListener('click', () => {
    glossaryModal.style.display = 'none';
    btnOpenGlossary.setAttribute('aria-expanded', 'false');
  });

  // Cerrar al hacer clic en el backdrop
  glossaryModal?.addEventListener('click', (e) => {
    if (e.target === glossaryModal) {
      glossaryModal.style.display = 'none';
      btnOpenGlossary.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && glossaryModal.style.display === 'flex') {
      glossaryModal.style.display = 'none';
      btnOpenGlossary.setAttribute('aria-expanded', 'false');
    }
  });
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  initGlossary();
  navigateToStage(1);
});
