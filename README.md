# VirLab: Laboratorio Virtual de Cribado Neonatal y Diagnóstico Genético

Laboratorio virtual educativo orientado al desarrollo de competencias científicas en **Bachillerato** mediante la simulación guiada del cribado neonatal de metabolopatías congénitas y el diagnóstico molecular complementario.

> **Aviso docente fundamental:** VirLab es una herramienta de aprendizaje basada en casos y datos sintéticos o simulados. No es una herramienta de diagnóstico clínico real ni debe utilizarse como tal.

---

## 1. Objetivo del Proyecto

Capacitar al alumnado de Bachillerato en el razonamiento científico, el análisis de datos de laboratorio biomédico y la toma de decisiones informadas, situándolo en el rol de un **equipo técnico de laboratorio de cribado**. 

El alumnado aprende a:
- Valorar la calidad preanalítica de la muestra en **tarjeta de recogida de sangre seca (DBS, Dried Blood Spot)** obtenida mediante punción del talón y comprobar el consentimiento informado.
- Comprender el propósito de un programa poblacional de cribado neonatal frente a las pruebas diagnósticas de confirmación.
- Interpretar resultados de espectrometría de masas en tándem (MS/MS) aplicados a la fenilcetonuria (PKU) comparando perfiles con cuadrículas regulares de control negativo, control positivo y muestra problema.
- Analizar el impacto de la actividad de la fenilalanina hidroxilasa (PAH) en el metabolismo de la fenilalanina y la tirosina.
- Identificar variantes patogénicas en el estudio molecular complementario de secuenciación Sanger del gen *PAH* (en el caso VP).
- Redactar un informe técnico dirigido a pediatría argumentando científicamente las conclusiones con prudencia profesional y firmas verificables.

---

## 2. Alcance Aprobado del PMV

El PMV incluye exclusivamente dos casos clínicos cerrados centrados en el modelo de la fenilcetonuria (asociada al gen *PAH*):

### Caso VN (Verdadero Negativo)
* **Muestra:** `CN_PKU_1001`.
* **Fase Preanalítica:** Tarjeta DBS apta, consentimiento informado comprobado.
* **Fase Bioquímica (MS/MS):** Picos espectrométricos normales (Phe 18%, Tyr 43%) comparables al control negativo. Concentraciones normales: Phe $58\ \mu\text{mol/L}$, Tyr $72\ \mu\text{mol/L}$, Ratio Phe/Tyr $0.81$.
* **Infografía:** Enzima PAH activa con su cofactor BH4, transformando fenilalanina en tirosina sin acumulación.
* **Fase Molecular:** No aplica (un cribado negativo concluye sin pruebas genéticas en la práctica habitual).
* **Informe:** Cribado negativo; no se requieren pruebas metabólicas ni genéticas adicionales.

### Caso VP (Verdadero Positivo)
* **Muestra:** `CN_PKU_2001`.
* **Fase Preanalítica:** Tarjeta DBS apta, consentimiento informado comprobado.
* **Fase Bioquímica (MS/MS):** Picos espectrométricos patológicos pero visualmente diferenciados del control positivo (Phe 82%, Tyr 28%). Concentraciones alteradas: Phe $485\ \mu\text{mol/L}$, Tyr $52\ \mu\text{mol/L}$, Ratio Phe/Tyr $9.33$.
* **Infografía:** Enzima PAH alterada por variante patogénica, menor conversión a tirosina, acumulación de Phe y desvío a vías accesorias que producen **fenilcetonas**.
* **Estudio Molecular Complementario:** Extracción de ADN de la tarjeta DBS, amplificación por PCR del exón 12 de *PAH*, secuenciación Sanger y detección de la variante patogénica `c.1222C>T p.(Arg408Trp)`.
* **Informe:** Cribado positivo / sospecha de hiperfenilalaninemia; derivación urgente a la Unidad de Metabolopatías para confirmación diagnóstica y consejo genético.

> **Nomenclatura de muestras (para el profesorado):** el alumnado solo ve el identificador `CN_PKU_nnnn` y no conoce el significado de la numeración. La serie `CN_PKU_1xxx` corresponde a resultado negativo y la serie `CN_PKU_2xxx` a resultado positivo, con numeración consecutiva dentro de cada serie.
>
> **Reserva de casos:** Los casos de falso positivo y falso negativo quedan reservados para posibles ampliaciones futuras. No forman parte del PMV actual.

### Cierre del ejercicio (etapa 4)

1. El equipo completa el checklist (valoraciones de Phe, Tyr y ratio, decisión técnica, justificación de al menos 10 caracteres y al menos 2 firmantes) y pulsa «Completar informe» en la barra de navegación. El informe queda bloqueado.
2. Pulsa «Enviar al médico» y confirma el cuadro de aviso. El envío es **simulado** al médico solicitante: no se transmite ningún dato.
3. Puede imprimir o guardar el informe en PDF con «Imprimir o Guardar en PDF».

---

## 3. Tecnologías y Principios de Diseño

- **100% Estándares Web Nativos:** HTML5 semántico, CSS3 moderno (Flexbox, CSS Grid, variables, modal nativo y `@media print`) y JavaScript moderno (ES Modules).
- **Cero dependencias externas:** Sin frameworks (React, Vue, Next.js), sin librerías externas de gráficos y sin servicios de terceros.
- **Desacoplamiento total datos/interfaz:** Los módulos visuales son independientes de los datos de los casos (`case_vn.js` y `case_vp.js`).
- **Glosario accesible en las 4 etapas:** Glosario científico modal accesible permanentemente desde la cabecera.
- **Correspondencia exacta de firmas:** Los nombres de los estudiantes se trasladan fielmente al informe final y a la vista de impresión/PDF.

---

## 4. Estructura de Archivos

```
virlab_01/
├── .gitignore              # Exclusiones de temporales del sistema operativo
├── AGENTS.md               # Reglas de trabajo para agentes de IA
├── README.md               # Documentación y especificación del proyecto
├── docs/
│   └── seguimiento/        # Seguimiento de tareas, reglas y pendientes post-PMV
├── index.html              # Shell principal con cabecera, selector de caso, glosario y progreso
├── css/
│   └── styles.css          # Estilos globales, espectros con cuadrícula, infografía, Sanger y print
└── js/
    ├── app.js              # Controlador principal (navegación, validaciones bloqueantes y glosario)
    ├── data/
    │   ├── case_vn.js      # Datos sintéticos del Caso 01 (VN)
    │   ├── case_vp.js      # Datos sintéticos y estudio molecular del Caso 02 (VP)
    │   └── glossary.js     # Glosario con 10 términos científicos rigurosos
    └── stages/
        ├── stage1.js       # Etapa 1: Presentación, calidad de muestra DBS y consentimiento
        ├── stage2.js       # Etapa 2: Repaso conceptual, MS/MS con cuadrículas, infografía y Sanger (VP)
        ├── stage3.js       # Etapa 3: Interpretación guiada, feedback y justificación científica
        └── stage4.js       # Etapa 4: Informe técnico con firmas exactas y modelo de referencia docente
```

---

## 5. Instrucciones de Ejecución Local

Para ejecutar la aplicación localmente no se requiere instalar ninguna dependencia:

### Opción A: Ejecución directa en navegador
Abre el archivo `index.html` con un navegador web moderno. Atención: como la aplicación usa módulos de JavaScript, algunos navegadores bloquean la carga si el archivo se abre directamente desde el disco; en ese caso, usa la Opción B.

### Opción B (recomendada): Mediante servidor local estático con Python
Desde la raíz del repositorio, ejecuta:
```bash
python3 -m http.server 8000
```
Y abre en tu navegador la dirección: [http://localhost:8000](http://localhost:8000).

---

## 6. Estado del desarrollo y resolución de incidencias

### Estado actual

- El PMV está completo de principio a fin: dos casos y cuatro etapas, con cierre simulado del informe.
- Tras la primera versión se han realizado tres tareas: nomenclatura de muestras neutra para el alumnado (identificadores `CN_PKU_nnnn`), formato de los gráficos sin anticipar el resultado, y cierre de la etapa 4 con «Completar informe» y «Enviar al médico» (envío simulado).
- Cada tarea tiene su seguimiento en `docs/seguimiento/`, que distingue entre implementado, probado por búsqueda y validado visualmente.
- La validación científica del contenido se trata por separado de la validación técnica y no está cubierta por estas comprobaciones.
- Las limitaciones y observaciones están registradas en `docs/seguimiento/PENDIENTES_POST_PMV.md`.

### Incidencias con el agente de IA

Durante el desarrollo del PMV surgieron dificultades relacionadas con el funcionamiento del agente de IA utilizado en Antigravity. Para resolverlas, se cambió el modelo de IA a Claude Sonnet 4.6 y se realizaron pruebas de funcionamiento del agente y de su capacidad para trabajar sobre el repositorio local del proyecto.

Este cambio permitió retomar el flujo de trabajo y continuar con el desarrollo de VirLab. La incidencia se considera resuelta mediante el cambio de modelo y las pruebas realizadas.

La experiencia puso de manifiesto la importancia de comprobar el comportamiento de los distintos modelos y verificar su funcionamiento antes de continuar con la implementación.
