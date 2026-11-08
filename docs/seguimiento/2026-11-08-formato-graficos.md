# Seguimiento: Ajuste de formato de gráficos MS/MS y Sanger (Tarea B)
Estado: IMPLEMENTADO, PROBADO POR BÚSQUEDA Y VALIDADO VISUALMENTE POR EL USUARIO | Base: commit 4bf87df (fix: neutralizar nomenclatura de muestras visible al alumnado)

## Objetivo y alcance (2-3 líneas)
Ajustar el formato de los gráficos de espectrometría MS/MS y electroferograma Sanger en js/stages/stage2.js: retirar transiciones numéricas, porcentajes fuera del eje, etiquetas clasificatorias ('↑↑', 'Mutado'), unificar el color del pico de muestra a #5146A5 y neutralizar los pies de espectro, manteniendo intacto el cierre de etapa 4.

## Archivos previstos
- js/stages/stage2.js
- docs/seguimiento/2026-11-08-formato-graficos.md

## Checklist de pasos (pendiente / en curso / completado)
- [x] 1. Crear archivo de seguimiento tras aprobación expresa (completado)
- [x] 2. Ajustar función generateSpectrumSvg definiendo labelPhe y labelTyr y retirando % y transiciones numéricas (completado)
- [x] 3. Retirar 'Intensidad rel. (%)' del rótulo general en línea 195 (completado)
- [x] 4. Unificar llamadas a generateSpectrumSvg (sin cuarto parámetro, muestra con color #5146A5) (completado)
- [x] 5. Neutralizar textos de pie de controles y muestra problema con estructura idéntica (completado)
- [x] 6. Neutralizar etiqueta 'T (Mutado)' a 'T' y unificar trazo a 2px en electroferograma Sanger (completado)
- [x] 7. Ejecutar comprobaciones por búsqueda y verificar integridad de stage4.js (completado)

## Pruebas previstas y resultado (implementado / probado / validado / pendiente)
- Búsqueda de transiciones numéricas '166' y '182' sobre gráficos: implementado y probado (0 etiquetas visibles, solo comentarios)
- Búsqueda del símbolo '%' dentro de los gráficos fuera del eje Y: implementado y probado (0 coincidencias; solo presente en eje Y)
- Búsqueda de 'Mutado' en el electroferograma Sanger: implementado y probado (0 coincidencias)
- Búsqueda de flechas clasificatorias '↑↑' en los espectros: implementado y probado (0 coincidencias)
- Comprobación de persistencia de datos relativeIntensity y valores analíticos: implementado y probado (intactos)
- Comprobación de integridad del cierre de etapa 4 (stage4.js, botón 'Imprimir o Guardar en PDF'): implementado y probado (intacto)
- Validación visual del usuario (etapa 2 de ambos casos, Sanger del caso positivo, consola sin errores, etapas 3 y 4 hasta el PDF): validado

## Incidencias y decisiones pendientes
- Observación: Las líneas 466 y 469 de stage2.js (recuadro y texto 'c.1222' en Sanger) figuran como pendiente de decisión del usuario; no se modifican.
- Observación: La línea del texto «La secuencia del paciente es 100% idéntica a la secuencia de referencia en el exón 12 analizado» es contenido de la opción de respuesta fuera del gráfico y queda intacta.

## Cómo retomar
Tarea cerrada. Pendiente de decisión del usuario: recuadro y texto 'c.1222' del Sanger (observación). Siguiente: documentación y preparación del envío.
