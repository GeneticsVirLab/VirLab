# Pendientes para revisar después del PMV

**Proyecto:** VirLab — Laboratorio virtual de cribado neonatal y diagnóstico genético para Bachillerato.

**Propósito:** reunir dudas, incidencias y propuestas detectadas durante el desarrollo del producto mínimo viable (PMV), sin modificar ahora el contenido científico o didáctico.

## Criterio de trabajo vigente

Durante la construcción del PMV, la prioridad es disponer de un producto funcional de principio a fin.

- No modificar por ahora los datos, casos, explicaciones, textos científicos o didácticos ni los informes.
- Registrar las observaciones que surjan y posponer su análisis y resolución.
- Priorizar la navegación, el funcionamiento de las etapas, la simulación, la interpretación, la elaboración del informe y la experiencia de uso.
- Revisar este documento cuando el PMV esté disponible y decidir entonces qué propuestas se aceptan, descartan o aplazan.

## Registro de observaciones

### PPMV-001 — Formulación del resultado negativo del caso VN

- **Fecha de detección:** 31/10/2026.
- **Ámbito:** contenido del caso VN y etapa de interpretación.
- **Archivos relacionados:** `js/data/case_vn.js`, `js/stages/stage3.js`, `README.md`.
- **Observación:** algunas formulaciones indican de forma categórica que no se requieren pruebas metabólicas ni genéticas confirmatorias tras el resultado negativo.
- **Motivo para revisar:** valorar si la redacción debe acotarse al resultado y al circuito simulado de este caso.
- **Acción durante el PMV:** ninguna. Mantener el contenido actual.
- **Prioridad orientativa:** media.
- **Estado:** pendiente de revisar después del PMV.

### PPMV-002 — Representación de las firmas y finalización del informe

- **Fecha de detección:** 31/10/2026.
- **Ámbito:** etapa 4, informe técnico y mensajes de finalización.
- **Archivos relacionados:** `js/stages/stage4.js`, `README.md`.
- **Observación:** la interfaz utiliza expresiones como «firmado electrónicamente» y «registrado para su comunicación al pediatra», mientras que lo observado hasta ahora parece basarse en nombres introducidos por el equipo en una aplicación estática.
- **Motivo para revisar:** comprobar el comportamiento completo de finalización y valorar si los textos describen con precisión las funciones reales del PMV.
- **Acción durante el PMV:** ninguna. No cambiar textos ni comportamiento.
- **Prioridad orientativa:** media.
- **Estado:** pendiente de inspección y revisión después del PMV.

### PPMV-003 — Información genética del caso VP

- **Fecha de detección:** 31/10/2026.
- **Ámbito:** resultado del estudio molecular del caso VP.
- **Archivo relacionado:** `js/data/case_vp.js`.
- **Observación:** se ha identificado la variante `NM_000277.3:c.1222C>T`, `p.(Arg408Trp)`, en el exón 12 de `PAH`. En la inspección disponible no quedó confirmada toda la información sobre la zigosidad ni sobre la posible presencia de una segunda variante.
- **Motivo para revisar:** comprobar el resultado molecular completo y su correspondencia con las conclusiones didácticas. Mantener la cautela de que el análisis de un exón no permite descartar variantes en regiones no estudiadas.
- **Acción durante el PMV:** ninguna. No modificar el caso ni sus conclusiones.
- **Prioridad orientativa:** media.
- **Estado:** pendiente de inspección y revisión después del PMV.

### PPMV-004 — Transcrito de referencia de la variante

- **Fecha de detección:** 08/11/2026.
- **Ámbito:** estudio molecular del caso VP.
- **Archivos relacionados:** `js/data/case_vp.js`, `js/stages/stage2.js`.
- **Observación:** el transcrito de referencia `NM_000277.3` figura en este documento, pero la aplicación muestra `c.1222C>T p.(Arg408Trp)` sin indicarlo.
- **Motivo para revisar:** valorar si debe indicarse el transcrito en la aplicación para una notación HGVS completa.
- **Acción durante el PMV:** ninguna.
- **Prioridad orientativa:** baja.
- **Estado:** pendiente de revisar después del PMV.

### PPMV-005 — Unificar «pediatra» por «médico solicitante»

- **Fecha de detección:** 08/11/2026.
- **Ámbito:** etapa 4 (subtítulo, mensaje de registro, recomendaciones técnica y del modelo de ejemplo) y README.
- **Archivos relacionados:** `js/stages/stage4.js`, `README.md`.
- **Observación:** los textos nuevos del envío simulado dicen «médico solicitante», mientras que los existentes dicen «pediatra». Relacionado con PPMV-002.
- **Motivo para revisar:** coherencia de la redacción en toda la etapa 4.
- **Acción durante el PMV:** ninguna; los textos existentes se mantienen.
- **Prioridad orientativa:** media.
- **Estado:** pendiente de revisar después del PMV.

### PPMV-006 — Contenido que anticipa el resultado antes de responder

- **Fecha de detección:** 06/11/2026.
- **Ámbito:** etapa 2.
- **Archivos relacionados:** `js/stages/stage2.js`, `js/data/case_vn.js`, `js/data/case_vp.js`.
- **Observación:** la infografía metabólica es distinta en cada caso, y la sección del estudio molecular solo aparece en la muestra alterada. Ambas cosas permiten deducir el resultado antes de que el alumnado responda.
- **Motivo para revisar:** valorar si se unifican para ambos casos.
- **Acción durante el PMV:** ninguna (decisión de mantener el contenido).
- **Prioridad orientativa:** media.
- **Estado:** pendiente de revisar después del PMV.

### PPMV-007 — Recuadro y etiqueta «c.1222» en el cromatograma Sanger

- **Fecha de detección:** 08/11/2026.
- **Ámbito:** etapa 2, estudio molecular del caso VP.
- **Archivo relacionado:** `js/stages/stage2.js`.
- **Observación:** el recuadro rosa y la etiqueta «c.1222» señalan la posición de la variante sobre el cromatograma. Se neutralizó la etiqueta «T (Mutado)» pero no este marcador.
- **Motivo para revisar:** decidir si el marcador se mantiene, se neutraliza o se retira.
- **Acción durante el PMV:** ninguna.
- **Prioridad orientativa:** baja.
- **Estado:** pendiente de decisión.

### PPMV-008 — Nombres internos con VN y VP en el código fuente

- **Fecha de detección:** 06/11/2026.
- **Ámbito:** código fuente.
- **Archivos relacionados:** `js/app.js`, `js/data/case_vn.js`, `js/data/case_vp.js`, `js/stages/*.js`, `css/styles.css`.
- **Observación:** identificadores internos (`case-vn`, `case-vp`, `isVN`) y comentarios con VN, VP y «Verdadero» siguen en el código y serían visibles al inspeccionarlo con las herramientas del navegador. No aparecen en la interfaz del alumnado.
- **Motivo para revisar:** limitación técnica conocida; renombrar exigiría una refactorización fuera del alcance del PMV.
- **Acción durante el PMV:** ninguna.
- **Prioridad orientativa:** baja.
- **Estado:** limitación registrada.

### PPMV-009 — Fecha de emisión del informe

- **Fecha de detección:** 08/11/2026.
- **Ámbito:** etapa 4.
- **Archivo relacionado:** `js/stages/stage4.js`.
- **Observación:** la fecha de emisión parte de un valor fijo del caso; según el código es editable mientras el informe está en edición y queda bloqueada tras «Completar informe». No está comprobado en pantalla que pueda modificarse antes de completar.
- **Motivo para revisar:** comprobar el comportamiento y valorar si debe proponerse la fecha del día.
- **Acción durante el PMV:** ninguna.
- **Prioridad orientativa:** media.
- **Estado:** pendiente de comprobar.

## Cómo registrar nuevas observaciones

- **Identificador:** PPMV-XXX.
- **Fecha de detección:**
- **Ámbito:**
- **Archivo o apartado relacionado:**
- **Observación o duda:**
- **Motivo para revisar:**
- **Acción durante el PMV:** ninguna; se pospone.
- **Prioridad orientativa:** baja, media o alta.
- **Estado:** pendiente de revisar después del PMV.

## Revisión al cerrar el PMV

Cuando el PMV esté funcional y se haya probado de principio a fin:

1. Revisar todas las observaciones registradas.
2. Comprobar cada una con los archivos y el comportamiento vigentes.
3. Decidir si se acepta, se descarta o se aplaza.
4. Definir las modificaciones por separado y solicitar aprobación antes de implementarlas.
5. Mantener el historial de decisiones en este documento.
