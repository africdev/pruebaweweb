# Calendario de Seguimiento - Componente WeWeb

Componente profesional de calendario mensual para gestión laboral con seguimiento de altas, bajas y entrevistas.

## 🎯 Características

- **Visualización Mensual**: Calendario completo con navegación entre meses
- **Estadísticas en Tiempo Real**: 5 cards con métricas automáticas (Total, Altas, Bajas, Entrevistas, Pendientes)
- **Eventos Codificados por Color**:
  - Verde: Altas
  - Rojo: Bajas
  - Azul: Entrevistas
  - Amarillo: Pendientes
- **Interactividad Completa**: Clicks en eventos, fechas, botón "Hoy" y "Crear Evento"
- **Totalmente Configurable**: Todos los textos, colores y opciones son editables desde el editor de WeWeb
- **Responsive**: Adaptado para móvil, tablet y escritorio
- **Variables Internas**: Acceso a mes actual, año, fecha seleccionada y estadísticas

## 📦 Instalación

1. Este componente ya está incluido en tu proyecto WeWeb en:
   ```
   src/components/elements/element-calendar-tracking/
   ```

2. Para usarlo en el editor de WeWeb:
   - Ve al modo desarrollador
   - Carga el componente desde el path local
   - O realiza build y publica

## 🔧 Propiedades Configurables

### Datos
- **events**: Array de eventos con estructura:
  ```javascript
  {
    id: string,
    date: 'YYYY-MM-DD',
    type: 'alta' | 'baja' | 'entrevista',
    personName: string,
    personId: string,
    confirmed: boolean
  }
  ```
- **initialMonth**: Mes inicial (1-12)
- **initialYear**: Año inicial

### Textos Personalizables
- **title**: Título principal
- **subtitle**: Subtítulo
- **createButtonText**: Texto del botón crear
- **todayButtonText**: Texto del botón hoy
- **totalLabel, altasLabel, bajasLabel, entrevistasLabel, pendientesLabel**: Labels de las cards de estadísticas
- **weekDays**: Array de 7 strings con nombres de días
- **monthNames**: Array de 12 strings con nombres de meses

### Estilos
- **primaryColor**: Color principal (#2563eb por defecto)
- **altaColor**: Color para altas (#10b981)
- **bajaColor**: Color para bajas (#ef4444)
- **entrevistaColor**: Color para entrevistas (#3b82f6)
- **pendienteColor**: Color para pendientes (#f59e0b)
- **borderRadius**: Radio de bordes (8px)

### Opciones
- **showStatsCards**: Mostrar/ocultar cards de estadísticas
- **showCreateButton**: Mostrar/ocultar botón "Crear Evento"

## 🎬 Eventos (Triggers)

### 1. **create-event**
Se dispara al hacer click en "Crear Evento"
```javascript
event: {
  currentMonth: number,
  currentYear: number
}
```

### 2. **event-click**
Se dispara al hacer click en un evento del calendario
```javascript
event: {
  eventId: string,
  eventData: object,
  date: string,
  type: string,
  personName: string,
  personId: string
}
```

### 3. **date-click**
Se dispara al hacer click en una fecha del calendario
```javascript
event: {
  date: Date,
  dateString: string,
  hasEvents: boolean,
  eventsCount: number
}
```

### 4. **today-click**
Se dispara al hacer click en el botón "Hoy"
```javascript
event: {
  date: string,
  month: number,
  year: number
}
```

### 5. **month-change**
Se dispara al cambiar de mes
```javascript
event: {
  month: number,
  year: number,
  direction: 'prev' | 'next'
}
```

## 📊 Variables Internas

Puedes acceder a estas variables en workflows:

- **currentMonth**: Mes actual mostrado (1-12)
- **currentYear**: Año actual mostrado
- **selectedDate**: Fecha seleccionada (string YYYY-MM-DD)
- **statistics**: Objeto con estadísticas
  ```javascript
  {
    total: number,
    altas: number,
    bajas: number,
    entrevistas: number,
    pendientes: number
  }
  ```

## 💡 Ejemplos de Uso

### Ejemplo 1: Conectar con API
```javascript
// En un workflow "On Page Load"
// 1. Hacer fetch a tu API
const response = await fetch('https://api.ejemplo.com/eventos');
const eventos = await response.json();

// 2. Mapear los datos al formato del componente
const eventosFormateados = eventos.map(e => ({
  id: e.id,
  date: e.fecha, // formato: 'YYYY-MM-DD'
  type: e.tipo_evento, // 'alta', 'baja', o 'entrevista'
  personName: e.nombre_persona,
  personId: e.persona_id,
  confirmed: e.confirmado
}));

// 3. Actualizar la propiedad events del componente
// Vincular esta variable a la propiedad "events"
```

### Ejemplo 2: Crear Nuevo Evento
```javascript
// En el trigger "create-event"
// Abrir modal o navegar a página de creación
wwLib.goToPage('/crear-evento', {
  month: event.currentMonth,
  year: event.currentYear
});
```

### Ejemplo 3: Ver Detalles de Evento
```javascript
// En el trigger "event-click"
// Mostrar popup con detalles
wwLib.openPopup('detalles-evento', {
  eventId: event.eventId,
  personName: event.personName,
  type: event.type
});
```

### Ejemplo 4: Filtrar por Tipo
```javascript
// Usar una variable y computed binding
// Variable: tipoFiltro = 'alta'
// Property events binding:
variables.todosLosEventos.filter(e => e.type === variables.tipoFiltro)
```

## 🎨 Personalización de Estilos

### Cambiar Paleta de Colores
Todos los colores son configurables:
- Primary Color: Para botones y elementos activos
- Alta Color: Verde para altas
- Baja Color: Rojo para bajas
- Entrevista Color: Azul para entrevistas
- Pendiente Color: Amarillo para eventos sin confirmar

### Adaptar Idioma
Cambia todos los textos desde las propiedades:
- weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
- monthNames: ['January', 'February', ...]

## 📱 Responsive

El componente es completamente responsive:
- **Desktop**: Grid completo con 7 columnas
- **Tablet**: Diseño adaptado con cards en 2-3 columnas
- **Mobile**: Cards en 2 columnas, eventos solo con iconos

## 🔍 Notas Técnicas

- **Formato de Fecha**: Todas las fechas deben estar en formato ISO 'YYYY-MM-DD'
- **Eventos Pendientes**: Se calculan como eventos futuros con `confirmed: false`
- **Eventos por Día**: Se muestran máximo 3 eventos, si hay más se indica "+X más"
- **Navegación**: El calendario mantiene el estado al navegar entre meses

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
cd src/components/elements/element-calendar-tracking
npm install

# Modo desarrollo
npm run serve --port=3000

# Build para producción
npm run build
```

## 🐛 Troubleshooting

**Los eventos no aparecen:**
- Verifica que el formato de fecha sea 'YYYY-MM-DD'
- Asegúrate de que la propiedad type sea exactamente 'alta', 'baja' o 'entrevista'

**Las estadísticas no se actualizan:**
- Las estadísticas se calculan automáticamente desde el array events
- Verifica que el binding de events esté correcto

**El calendario no navega:**
- Las variables internas currentMonth y currentYear manejan la navegación
- Verifica que no haya conflictos con otras propiedades

## 📄 Licencia

Componente desarrollado para WeWeb
