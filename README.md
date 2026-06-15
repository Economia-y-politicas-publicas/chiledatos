# Mi Proyecto de Datos

Sitio web de análisis de datos públicos chilenos, construido con Quarto + Python + Plotly.

## Estructura

```
.
├── _quarto.yml          # Configuración global del sitio
├── index.qmd            # Página de inicio
├── pages/
│   ├── educacion.qmd    # Análisis CAE
│   ├── economia.qmd     # Indicadores macroeconómicos
│   └── datos.qmd        # Fuentes de datos
├── styles/
│   └── custom.scss      # Estilos personalizados
├── data/                # CSVs con datos reales (no subir a git si son pesados)
├── requirements.txt
└── .github/workflows/
    └── deploy.yml       # Deploy automático a GitHub Pages
```

## Setup local

**1. Instalar Quarto**
Descarga desde https://quarto.org/docs/get-started/

**2. Instalar dependencias Python**
```bash
pip install -r requirements.txt
```

**3. Previsualizar el sitio**
```bash
quarto preview
```
Abre automáticamente en http://localhost:4242 con hot-reload.

**4. Renderizar**
```bash
quarto render
```
Genera el sitio estático en `_site/`.

## Deploy en GitHub Pages

**Primera vez:**

1. Crea un repo en GitHub y sube el proyecto:
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/TUUSUARIO/REPO.git
git push -u origin main
```

2. En GitHub → Settings → Pages → Source: **GitHub Actions**

3. El workflow en `.github/workflows/deploy.yml` se activa solo en cada push.

Tu sitio quedará en: `https://TUUSUARIO.github.io/REPO/`

## Usar datos reales del CAE

Reemplaza los datos simulados en `pages/educacion.qmd`:

```python
# En vez de los datos simulados, carga tu CSV:
df = pd.read_csv("../../data/cae_2023.csv", encoding="latin-1", sep=";")
```

Descarga los datos desde:
- https://datosabiertos.mineduc.cl
- https://www.ingresa.cl/estadisticas/

## Agregar una nueva página

1. Crea `pages/nueva-pagina.qmd`
2. Agrégala al navbar en `_quarto.yml`:
```yaml
navbar:
  left:
    - href: pages/nueva-pagina.qmd
      text: Nueva Página
```
