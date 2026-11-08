# Seguimiento: Cierre simulado «Enviar al médico» en Etapa 4 (Tarea C)
Estado: IMPLEMENTADO, PROBADO POR BÚSQUEDA Y VALIDADO VISUALMENTE POR EL USUARIO | Base: commit 4bf87df

## Objetivo y alcance (2-3 líneas)
Añadir el tercer estado «Enviar al médico» / «Informe enviado ✔» al botón de navegación btnNext en la etapa 4 tras completar el informe, con confirmación nativa y mensaje simulado en el recuadro verde de stage4.js, sin añadir botones ni llamadas de red.

## Archivos previstos
- js/app.js
- js/stages/stage4.js
- docs/seguimiento/2026-11-08-boton-enviar-clinico.md

## Checklist de pasos (pendiente / en curso / completado)
- [x] 1. Crear archivo de seguimiento tras aprobación expresa (completado)
- [x] 2. Inicializar isReportSent en createInitialState en js/app.js (completado)
- [x] 3. Implementar tercer estado del botón en updateNavigationControls en js/app.js (completado)
- [x] 4. Gestionar confirmación nativa y marcado de isReportSent en el evento clic de btnNext en js/app.js (completado)
- [x] 5. Renderizar mensaje simulado de envío en el recuadro verde de js/stages/stage4.js (completado)
- [x] 6. Ejecutar comprobaciones por búsqueda y verificar persistencia/reinicio de estado (completado)

## Pruebas previstas y resultado (implementado / probado / validado / pendiente)
- Búsqueda de inicialización y reinicio de isReportSent idénticos a isReportCompleted: implementado y probado por búsqueda
- Búsqueda de llamadas de red (fetch, XMLHttpRequest, localStorage, sessionStorage): implementado y probado por búsqueda (0 coincidencias)
- Búsqueda de textos literales exactos («Enviar al médico», texto de confirmación, mensaje de envío): implementado y probado por búsqueda (coincidencia exacta 100%)
- Comprobación de que 'Imprimir o Guardar en PDF' y checklist permanecen intactos: implementado y probado por búsqueda (intactos)
- Verificación de que en esta tarea solo se modifican app.js y stage4.js (stage2.js no tocado en Tarea C): implementado y probado por búsqueda
- Validación visual del usuario (botón «Enviar al médico», confirmación, mensaje de envío, reinicio al cambiar de caso, PDF): validado

## Incidencias y decisiones pendientes
- Pendiente posterior: unificar «pediatra» por «médico solicitante» en los textos existentes de la etapa 4 (subtítulo, mensaje de registro y recomendaciones). Se mantienen intactos en esta tarea por alcance (relacionado con PPMV-002).

## Cómo retomar
Tarea cerrada. Siguiente: documentación y preparación del envío.
