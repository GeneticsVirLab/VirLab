# Seguimiento: Actualización de nomenclatura de muestras y casos (Tarea A)
Estado: IMPLEMENTADO, PROBADO POR BÚSQUEDA Y VALIDADO VISUALMENTE POR EL USUARIO | Base: commit 0fb7d13

## Objetivo y alcance (2-3 líneas)
Sustituir los códigos MUESTRA-2026-01/02 por CN_PKU_1001 y CN_PKU_2001 sin la letra X. Eliminar designaciones VN/VP y «Caso 01/02» visibles al alumnado, conservando «Recién nacido Ficticio (CN_PKU_nnnn)» y neutralizando títulos y etiquetas que anticipen resultados antes de responder.

## Archivos previstos
- docs/seguimiento/2026-11-06-actualizacion-nomenclatura.md
- index.html
- js/stages/stage1.js
- js/stages/stage2.js
- js/data/case_vn.js
- js/data/case_vp.js

## Checklist de pasos (pendiente / en curso / completado)
- [x] 1. Crear archivo de seguimiento tras aprobación expresa (completado)
- [x] 2. Actualizar selector de casos en index.html (completado)
- [x] 3. Neutralizar ficha identificativa en js/stages/stage1.js (completado)
- [x] 4. Neutralizar encabezado de infografía y referencias de muestra en js/stages/stage2.js (completado)
- [x] 5. Actualizar códigos y nombres en js/data/case_vn.js y js/data/case_vp.js (completado)
- [x] 6. Ejecutar comprobaciones por búsqueda y registrar resultados (completado)

## Pruebas previstas y resultado (implementado / probado / validado / pendiente)
- Confirmación de título de impresión, nombre PDF y URL limpios de VN/VP/códigos antiguos: implementado y probado por búsqueda (0 coincidencias).
- Búsqueda de códigos antiguos 'MUESTRA-2026': implementado y probado por búsqueda (0 coincidencias en código activo).
- Búsqueda de 'VN' y 'VP' en textos visibles/DOM: implementado y probado por búsqueda (solo en nombres/comentarios internos).
- Búsqueda de 'Caso 01' y 'Caso 02' visibles al alumnado: implementado y probado por búsqueda (0 textos visibles al alumnado).
- Búsqueda de letra 'X' en identificadores de muestra: implementado y probado por búsqueda (0 coincidencias, números reales 1001 y 2001).
- Cierre de la etapa 4 (stage4.js, botón 'Imprimir o Guardar en PDF'): implementado y probado por búsqueda (stage4.js sin cambios). El botón de cierre real es «Completar informe», en la barra de navegación (app.js).
- Validación visual del usuario (selector de casos, ficha de la etapa 1, Fisiopatología, texto molecular y etiqueta del Sanger): validado

## Incidencias y decisiones pendientes
- Infografía metabólica distinta por caso y estudio molecular solo en la muestra alterada: se mantienen como observaciones (contenido), decisión del usuario.
- Pie del espectro (stage2.js:241-245), etiquetas 166→120 y 182→136, y etiqueta 'T (Mutado)' del Sanger (stage2.js:468): pasan a la Tarea B (gráficos).

## Cómo retomar
Tarea cerrada. Continúa con las tareas B (gráficos) y C (cierre simulado de la etapa 4).
