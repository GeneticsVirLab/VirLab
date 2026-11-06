# AGENTS.md — Instrucciones para agentes de IA de VirLab

## 1. Identidad y objetivo del proyecto

VirLab es un laboratorio virtual educativo de cribado neonatal y diagnóstico genético dirigido al alumnado de Bachillerato.

Su objetivo es desarrollar competencias científicas mediante la simulación de actividades de laboratorio, la interpretación de resultados y la elaboración de informes técnicos.

Es una herramienta exclusivamente educativa. No es un sistema de diagnóstico clínico ni debe utilizarse para tomar decisiones sanitarias reales.

Los casos, muestras, resultados y datos utilizados son ficticios o simulados.

## 2. Alcance del MVP

El producto mínimo viable (MVP) incluye exclusivamente dos casos:

- Caso 01: resultado de cribado negativo.
- Caso 02: resultado de cribado positivo que requiere evaluación diagnóstica complementaria.

El recorrido de cada caso se organiza en cuatro etapas:

1. Presentación del caso.
2. Simulación del análisis.
3. Interpretación de los resultados.
4. Elaboración del informe técnico.

No incorporar nuevos casos, enfermedades, etapas ni funcionalidades fuera de este alcance sin aprobación expresa del usuario.

Las funcionalidades reservadas para futuras versiones no deben implementarse durante el desarrollo del MVP.

## 3. Arquitectura y tecnologías

El proyecto utiliza:

- HTML5.
- CSS3.
- JavaScript mediante módulos ES.
- Datos separados de la lógica de presentación.
- Sin frameworks ni dependencias externas.

Mantener la arquitectura actual y reutilizar los módulos existentes siempre que sea posible.

No introducir Node.js, gestores de paquetes, frameworks, bases de datos, servicios externos ni herramientas adicionales sin autorización expresa.

Respetar la estructura actual de carpetas y archivos.

Cualquier nueva dependencia o tecnología deberá justificarse y contar con aprobación expresa del usuario antes de incorporarse.

## 4. Criterios científicos y didácticos

Toda la información científica debe ser rigurosa, comprensible y adecuada al nivel de Bachillerato.

Principios obligatorios:

- Diferenciar claramente cribado y diagnóstico.
- No presentar un resultado positivo de cribado como diagnóstico definitivo.
- Distinguir las concentraciones de fenilalanina (Phe) y tirosina (Tyr) de las intensidades relativas representadas en gráficos.
- Explicar que la espectrometría de masas en tándem mide concentraciones de metabolitos, pero no mide directamente la actividad de la enzima PAH.
- No atribuir automáticamente toda elevación de fenilalanina a variantes del gen PAH.
- Diferenciar extracción de ADN, amplificación por PCR y secuenciación Sanger.
- No afirmar que la ausencia de una variante en una región estudiada excluye variantes en otras regiones.
- Utilizar nomenclatura HGVS correcta y especificar el transcrito de referencia cuando corresponda.
- No convertir las actividades educativas en recomendaciones clínicas o terapéuticas.

Los resultados simulados deben identificarse como tales. 
Los criterios numéricos utilizados deben estar documentados y contextualizados; no presentar valores didácticos como umbrales clínicos universales.
Cuando se modifiquen contenidos científicos, contrastar las afirmaciones con fuentes documentadas y registrar las referencias utilizadas. 
No introducir cambios científicos basados únicamente en suposiciones.

## 5. Requisitos de funcionamiento

Mantener el recorrido completo de los dos casos y sus cuatro etapas.

Comprobar que:

- La navegación funciona correctamente.
- Los controles y validaciones se comportan según lo previsto.
- Las actividades exigen las respuestas justificadas cuando corresponda.
- Los gráficos tienen títulos, ejes, escalas y leyendas comprensibles.
- Los resultados no revelan directamente la respuesta que debe deducir el alumnado.
- El informe final refleja correctamente las decisiones y resultados del caso.
- La versión de impresión presenta la información de forma legible.

No eliminar validaciones ni simplificar actividades para facilitar artificialmente su resolución.

## 6. Criterios de diseño

Mantener una interfaz clara, coherente y adecuada al contexto educativo.

Priorizar:

- Claridad de la información.
- Consistencia visual.
- Lectura sencilla.
- Navegación intuitiva.
- Gráficos comprensibles.
- Ausencia de pistas visuales que revelen las respuestas.

No introducir cambios estéticos generales ni rediseños completos sin aprobación.

## 7. Método de trabajo obligatorio

Aplicar el siguiente procedimiento a cada tarea:

**1 tarea = 1 inspección + 1 propuesta + 1 aprobación + 1 implementación.**

Antes de modificar archivos:

1. Inspeccionar el estado actual del repositorio.
2. Revisar los archivos afectados y sus dependencias.
3. Comprobar si existe un archivo de seguimiento de la tarea.
4. Identificar el problema o necesidad concreta.
5. Proponer los cambios necesarios, indicando los archivos que se modificarían.
6. Esperar la aprobación expresa del usuario.

No implementar cambios antes de recibir dicha aprobación.

No ampliar el alcance de una tarea por iniciativa propia.

La inspección y la presentación de una propuesta no autorizan a modificar archivos. 
La implementación solo podrá comenzar después de recibir la aprobación expresa del usuario.

## 8. Seguimiento obligatorio de las tareas

Antes de crear un archivo Markdown de seguimiento para cualquier tarea, proponer al usuario su contenido y ubicación y esperar siempre su autorización expresa. La aprobación de la tarea no autoriza por sí sola la creación del seguimiento.

Ubicación recomendada:

`docs/seguimiento/`

Nombre recomendado:

`YYYY-MM-DD-descripcion-breve.md`

El archivo debe contener:

- Objetivo de la tarea.
- Estado inicial del proyecto.
- Archivos que se prevé inspeccionar o modificar.
- Pasos de trabajo en formato checklist.
- Pruebas previstas.
- Cambios realizados.
- Problemas encontrados.
- Decisiones pendientes.
- Estado final y próximos pasos.

Actualizar la checklist durante el trabajo, no únicamente al finalizar.

Si la cuota o sesión del agente se interrumpe, dejar documentado:

- Qué se ha completado.
- Qué queda pendiente.
- Qué archivos se han modificado.
- Qué pruebas se han realizado.
- Cómo continuar sin repetir trabajo.

Si ya existe un seguimiento abierto para la misma tarea, revisarlo y continuarlo en lugar de crear otro archivo.

## 9. Protección del repositorio

No realizar operaciones destructivas ni cambios de alcance sin autorización.

En particular:

- No borrar archivos.
- No sobrescribir trabajo existente sin comprobarlo.
- No descartar cambios locales.
- No modificar la configuración de Git.
- No ejecutar git add sin autorización expresa.
- No realizar commits sin autorización expresa.
- No realizar push sin autorización expresa.
- No cambiar de rama sin autorización expresa.
- No ejecutar comandos que puedan eliminar o reemplazar información del proyecto.

Cada operación protegida de Git requiere su propia autorización expresa. Autorizar git add no autoriza el commit ni el push; autorizar el commit no autoriza el push. Antes de cada operación, explicar qué hará y esperar la autorización correspondiente.

## Incorporación de un agente nuevo o cambio de agente

El agente que se incorpore debe:

- Leer AGENTS.md y docs/seguimiento/REGLAS_TAREAS.md.
- Localizar y leer el seguimiento activo, si existe.
- Inspeccionar el estado real de Git y del repositorio.
- Identificar qué está terminado y qué queda pendiente.
- No presuponer que tiene acceso al contexto de conversaciones anteriores.
- No modificar archivos ni continuar una implementación sin la aprobación correspondiente del usuario.

## 10. Validación y comunicación

Al terminar una tarea, informar de forma breve y estructurada:

1. Qué se ha modificado.
2. Qué archivos se han modificado.
3. Qué pruebas se han realizado.
4. Qué resultados se han obtenido.
5. Qué problemas o limitaciones siguen pendientes.

Diferenciar siempre entre:

- Funcionalidad implementada.
- Funcionalidad probada.
- Funcionalidad validada científicamente.
- Funcionalidad pendiente de validación.

No afirmar que una prueba se ha realizado si no se ha ejecutado realmente.

No presentar una modificación como validada únicamente porque el código se haya generado correctamente.

## 11. Prioridad de las instrucciones

En caso de conflicto entre instrucciones, aplicar este orden:

1. Instrucciones expresas y decisiones aprobadas por el usuario.
2. Este archivo AGENTS.md.
3. README.md y documentación del proyecto.
4. Criterios técnicos generales.

Ante cualquier ambigüedad que pueda afectar al alcance, a la integridad del repositorio o a la validez científica, detenerse y consultar al usuario.