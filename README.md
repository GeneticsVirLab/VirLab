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

### Caso 01: VN (Verdadero Negativo) — Código 01
* **Muestra:** `MUESTRA-2026-01`.
* **Fase Preanalítica:** Tarjeta DBS apta, consentimiento informado comprobado.
* **Fase Bioquímica (MS/MS):** Picos espectrométricos normales (Phe 18%, Tyr 43%) comparables al control negativo. Concentraciones normales: Phe $58\ \mu\text{mol/L}$, Tyr $72\ \mu\text{mol/L}$, Ratio Phe/Tyr $0.81$.
* **Infografía:** Enzima PAH activa con su cofactor BH4, transformando fenilalanina en tirosina sin acumulación.
* **Fase Molecular:** No aplica (un cribado negativo concluye sin pruebas genéticas en la práctica habitual).
* **Informe:** Cribado negativo; no se requieren pruebas metabólicas ni genéticas adicionales.

### Caso 02: VP (Verdadero Positivo) — Código 02
* **Muestra:** `MUESTRA-2026-02`.
* **Fase Preanalítica:** Tarjeta DBS apta, consentimiento informado comprobado.
* **Fase Bioquímica (MS/MS):** Picos espectrométricos patológicos pero visualmente diferenciados del control positivo (Phe 82%, Tyr 28%). Concentraciones alteradas: Phe $485\ \mu\text{mol/L}$, Tyr $52\ \mu\text{mol/L}$, Ratio Phe/Tyr $9.33$.
* **Infografía:** Enzima PAH alterada por variante patogénica, menor conversión a tirosina, acumulación de Phe y desvío a vías accesorias que producen **fenilcetonas**.
* **Estudio Molecular Complementario:** Extracción de ADN de la tarjeta DBS, amplificación por PCR del exón 12 de *PAH*, secuenciación Sanger y detección de la variante patogénica `c.1222C>T p.(Arg408Trp)`.
* **Informe:** Cribado positivo / sospecha de hiperfenilalaninemia; derivación urgente a la Unidad de Metabolopatías para confirmación diagnóstica y consejo genético.

> **Reserva de códigos:** Los códigos 03 (Falso Positivo) y 04 (Falso Negativo) quedan reservados para posibles ampliaciones futuras. No forman parte del PMV actual.

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
├── README.md               # Documentación y especificación del proyecto
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
Abre el archivo `index.html` con cualquier navegador web moderno (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge).

### Opción B: Mediante servidor local estático con Python
Desde la raíz del repositorio, ejecuta:
```bash
python3 -m http.server 8000
```
Y abre en tu navegador la dirección: [http://localhost:8000](http://localhost:8000).

---

## 6. Estado del desarrollo y resolución de incidencias

Durante el desarrollo del PMV surgieron dificultades relacionadas con el funcionamiento del agente de IA utilizado en Antigravity. Para resolverlas, se cambió el modelo de IA a Claude Sonnet 4.6 y se realizaron pruebas de funcionamiento del agente y de su capacidad para trabajar sobre el repositorio local del proyecto.

Este cambio permitió retomar el flujo de trabajo y continuar con el desarrollo de VirLab. La incidencia se considera resuelta mediante el cambio de modelo y las pruebas realizadas.

La experiencia puso de manifiesto la importancia de comprobar el comportamiento de los distintos modelos y verificar su funcionamiento antes de continuar con la implementación.
