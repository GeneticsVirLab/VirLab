# REGLAS_TAREAS.md — Reglas de trabajo para VirLab

## 1. Principio general

Aplicar siempre el método acordado:

**1 tarea = 1 inspección + 1 propuesta + 1 aprobación + 1 implementación.**

Estas reglas complementan las instrucciones generales de AGENTS.md.

## 2. Inicio de cada tarea: inspección

Antes de proponer cambios:

1. Confirmar que se está trabajando en el repositorio correcto.
2. Revisar el estado de Git y proteger todos los cambios existentes.
3. Consultar estas reglas y AGENTS.md.
4. Revisar si existe un archivo de seguimiento relacionado con la tarea.
5. Inspeccionar los archivos afectados y sus dependencias.
6. Identificar el objetivo y el estado actual.

La inspección no autoriza a modificar archivos.

## 3. Propuesta y aprobación

Antes de implementar, presentar al usuario una propuesta concreta que indique:

- Objetivo de la tarea.
- Problema o necesidad identificada.
- Archivos que se prevé crear o modificar.
- Cambios propuestos.
- Pruebas previstas.
- Posibles riesgos o limitaciones.

Esperar siempre la aprobación expresa del usuario.

Si cambia el alcance o aparecen necesidades adicionales, detenerse y solicitar nueva aprobación.

## 4. Seguimiento de cada tarea

Antes de crear un archivo individual de seguimiento, proponer su contenido y ubicación y esperar siempre la autorización expresa del usuario. La aprobación de la tarea no autoriza por sí sola la creación del seguimiento.

Ubicación:

docs/seguimiento/

Nombre:

YYYY-MM-DD-descripcion-breve.md

El seguimiento debe incluir:

- Objetivo y alcance.
- Estado inicial del repositorio.
- Archivos inspeccionados y previstos.
- Propuesta aprobada.
- Checklist de implementación.
- Pruebas previstas y realizadas.
- Cambios efectuados.
- Incidencias y decisiones pendientes.
- Estado final y próximos pasos.

Actualizarlo durante el trabajo.

Si existe un seguimiento abierto para la misma tarea, continuarlo en lugar de duplicarlo.

## 5. Implementación

Implementar exclusivamente los cambios aprobados.

Durante la implementación:

- Respetar la arquitectura y las decisiones de AGENTS.md.
- No introducir funcionalidades adicionales.
- No modificar archivos ajenos al alcance aprobado.
- No sobrescribir ni descartar cambios locales.
- Consultar al usuario ante cualquier ambigüedad relevante.

## 6. Protección de Git y del proyecto

No realizar sin autorización expresa:

- git add (requiere autorización expresa propia).
- commits (requieren autorización expresa propia).
- push (requiere autorización expresa propia).
- cambios de rama (requieren autorización expresa propia).
- eliminación o sustitución de archivos existentes
- modificaciones de configuración
- operaciones que puedan descartar cambios locales

Cada operación protegida requiere su propia autorización expresa. Aprobar git add no autoriza el commit ni el push; aprobar el commit no autoriza el push. Antes de cada operación, explicar sus efectos y solicitar autorización.

## 7. Pruebas y validación

Ejecutar las pruebas previstas y documentar sus resultados.

Diferenciar entre:

- Implementado: el cambio se ha realizado.
- Probado: se ha ejecutado una prueba.
- Validado: se han comprobado los criterios correspondientes.
- Pendiente: falta una comprobación o aprobación.

No afirmar que algo funciona si no se ha probado.

La validación científica debe distinguirse de la validación técnica y funcional.

## 8. Cierre de la tarea

Presentar al usuario un resumen con:

1. Objetivo completado.
2. Archivos creados o modificados.
3. Cambios realizados.
4. Pruebas ejecutadas y resultados.
5. Incidencias o limitaciones pendientes.
6. Estado del seguimiento.
7. Próximos pasos, si los hubiera.

No iniciar otra tarea ni ampliar la actual sin aprobación.

## 9. Interrupción o cambio de agente

Si se interrumpe la sesión o cambia el agente:

- Actualizar el archivo de seguimiento.
- Registrar qué se ha completado y qué queda pendiente.
- Identificar los archivos modificados.
- Documentar las pruebas realizadas.
- Indicar cómo retomar el trabajo sin repetir pasos.

El agente que retome la tarea debe leer AGENTS.md, estas reglas y el seguimiento activo; inspeccionar el estado actual de Git y del repositorio; y reconstruir el contexto a partir de esos documentos. No debe presuponer que conoce las conversaciones anteriores ni continuar implementando sin la aprobación correspondiente del usuario.

## 10. Prioridad

En caso de conflicto, respetar este orden:

1. Decisiones expresas del usuario.
2. AGENTS.md.
3. REGLAS_TAREAS.md.
4. Seguimiento aprobado de la tarea.
5. Criterios técnicos generales.

Ante cualquier duda que afecte al alcance, la integridad del repositorio o la validez científica, detenerse y consultar.
