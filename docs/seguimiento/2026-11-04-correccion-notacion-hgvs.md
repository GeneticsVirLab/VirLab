# Seguimiento: corrección formal de la notación HGVS de la variante del caso VP

**Fecha de inicio:** 2026-11-04
**Ejecuta:** usuaria (edición manual en la terminal/editor)
**Estado de la tarea:** EN CURSO

## 1. Objetivo y alcance
Que la variante aparezca siempre con la notación HGVS correcta: `c.1222C>T p.(Arg408Trp)`, sin paréntesis exterior ni símbolos `$`.

**Alcance:** solo el formato de esa notación en dos líneas. No se modifica ningún dato, valor, conclusión ni explicación científica. El backup `README_tutor_2026-11-02_backup.md` es una copia fechada y no se toca.

## 2. Estado inicial del repositorio
- Rama: `main` (sincronizada con `origin/main`). Último commit: `5323aef` (Initial commit).
- `README.md`: modificado respecto al commit (el commit tiene un README de 2 líneas).
- Sin seguir por Git: `.gitignore`, `AGENTS.md`, `css/`, `docs/`, `index.html`, `js/` y varios archivos de trabajo (`.rtf`, `.txt`, backup del README del tutor).
- Nada se ha subido a GitHub.
- `js/data/case_vp.js` y `docs/` están sin seguir, así que `git diff` no sirve para ver los cambios: se usa copia previa fuera del repositorio.

## 3. Archivos
| Archivo | Línea | Antes | Después |
|---|---|---|---|
| `js/data/case_vp.js` | 183 | `c.1222C>T (p.Arg408Trp)` | `c.1222C>T p.(Arg408Trp)` |
| `README.md` | 40 | `$c.1222C>T$ ($p.Arg408Trp$)` | `` `c.1222C>T p.(Arg408Trp)` `` |

## 4. Checklist de pasos
| Paso | Estado |
|---|---|
| 1. Copia previa de los dos archivos fuera del repositorio | pendiente |
| 2. Editar `js/data/case_vp.js` línea 183 | pendiente |
| 3. Editar `README.md` línea 40 | pendiente |
| 4. Búsqueda de verificación (sin coincidencias en archivos vivos) | pendiente |
| 5. Prueba en el navegador: caso 2, justificación y que carga sin errores | pendiente |
| 6. Actualizar este documento con resultados | pendiente |

## 5. Pruebas previstas y realizadas
- Búsqueda: `grep -rnE '\(p\.Arg|\$p\.' . --include="*.js" --include="*.html" --include="*.md"`. Resultado esperado: solo el backup del tutor.
- Navegador: caso 2, etapa en la que aparece la justificación; sin errores en la consola (F12).

| Prueba | Resultado | Estado (implementado / probado / validado / pendiente) |
|---|---|---|
| Búsqueda | | pendiente |
| Navegador | | pendiente |

## 6. Cambios efectuados
(Pendiente de rellenar.)

## 7. Incidencias y decisiones pendientes
- Ninguna por ahora.
- Aplazado (no forma parte de esta tarea): el transcrito `NM_000277.3` solo figura en `PENDIENTES_POST_PMV.md`; posible PPMV-004.

## 8. Estado final y próximos pasos
(Pendiente.) Si se interrumpe: las copias previas están en `~/virlab_tmp/`; restaurar desde ahí y repetir desde el paso que figure como pendiente.
