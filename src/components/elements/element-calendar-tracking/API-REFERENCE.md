# 📚 API Reference - Calendario de Seguimiento

## 📥 Props (Propiedades de Entrada)

### Data Properties

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `events` | Array | `[]` | Array de eventos a mostrar |
| `initialMonth` | Number | Mes actual | Mes inicial (1-12) |
| `initialYear` | Number | Año actual | Año inicial (ej: 2024) |

#### Estructura de `events`:
```typescript
interface Event {
  id: string;              // ID único del evento
  date: string;            // Fecha formato 'YYYY-MM-DD'
  type: 'alta' | 'baja' | 'entrevista';  // Tipo de evento
  personName: string;      // Nombre de la persona
  personId: string;        // ID de la persona
  confirmed: boolean;      // Si está confirmado (afecta "Pendientes")
}
```

### Text Properties

| Propiedad | Tipo | Default | Bindable |
|-----------|------|---------|----------|
| `title` | String | 'Calendario de Seguimiento' | ✅ |
| `subtitle` | String | 'Visualiza altas, bajas...' | ✅ |
| `createButtonText` | String | 'Crear Evento' | ✅ |
| `todayButtonText` | String | 'Hoy' | ✅ |
| `totalLabel` | String | 'Total Eventos' | ✅ |
| `altasLabel` | String | 'Altas' | ✅ |
| `bajasLabel` | String | 'Bajas' | ✅ |
| `entrevistasLabel` | String | 'Entrevistas' | ✅ |
| `pendientesLabel` | String | 'Pendientes' | ✅ |
| `weekDays` | Array[7] | ['Lun', 'Mar', ...] | ✅ |
| `monthNames` | Array[12] | ['Enero', 'Febrero', ...] | ✅ |

### Style Properties

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `primaryColor` | Color | `#2563eb` | Color principal (botones, activos) |
| `altaColor` | Color | `#10b981` | Color para altas (verde) |
| `bajaColor` | Color | `#ef4444` | Color para bajas (rojo) |
| `entrevistaColor` | Color | `#3b82f6` | Color para entrevistas (azul) |
| `pendienteColor` | Color | `#f59e0b` | Color para pendientes (amarillo) |
| `borderRadius` | Length | `8px` | Radio de bordes |

### Display Options

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `showStatsCards` | Boolean | `true` | Mostrar cards de estadísticas |
| `showCreateButton` | Boolean | `true` | Mostrar botón "Crear Evento" |

---

## 📤 Events (Triggers)

### 1. `create-event`
**Cuándo**: Al hacer click en el botón "Crear Evento"

**Event Data:**
```typescript
{
  currentMonth: number,  // Mes actual mostrado (1-12)
  currentYear: number    // Año actual mostrado
}
```

**Uso típico:**
```javascript
// Abrir popup de creación
wwLib.openPopup('crear-evento', {
  month: event.currentMonth,
  year: event.currentYear
});
```

---

### 2. `event-click`
**Cuándo**: Al hacer click en un evento dentro del calendario

**Event Data:**
```typescript
{
  eventId: string,       // ID del evento
  eventData: Event,      // Objeto completo del evento
  date: string,          // Fecha del evento
  type: string,          // Tipo: 'alta' | 'baja' | 'entrevista'
  personName: string,    // Nombre de la persona
  personId: string       // ID de la persona
}
```

**Uso típico:**
```javascript
// Guardar y mostrar detalles
variables.eventoSeleccionado = event.eventData;
wwLib.openPopup('detalles-evento');
```

---

### 3. `date-click`
**Cuándo**: Al hacer click en una fecha del calendario

**Event Data:**
```typescript
{
  date: Date,            // Objeto Date de JavaScript
  dateString: string,    // Fecha en formato 'YYYY-MM-DD'
  hasEvents: boolean,    // Si la fecha tiene eventos
  eventsCount: number    // Cantidad de eventos en esa fecha
}
```

**Uso típico:**
```javascript
// Crear evento en fecha específica
variables.fechaSeleccionada = event.dateString;
wwLib.openPopup('crear-evento');
```

---

### 4. `today-click`
**Cuándo**: Al hacer click en el botón "Hoy"

**Event Data:**
```typescript
{
  date: string,          // Fecha de hoy 'YYYY-MM-DD'
  month: number,         // Mes actual (1-12)
  year: number           // Año actual
}
```

**Uso típico:**
```javascript
// Log o analytics
console.log('Usuario volvió al mes actual');
```

---

### 5. `month-change`
**Cuándo**: Al cambiar de mes (botones anterior/siguiente)

**Event Data:**
```typescript
{
  month: number,         // Nuevo mes (1-12)
  year: number,          // Nuevo año
  direction: string      // 'prev' | 'next'
}
```

**Uso típico:**
```javascript
// Cargar eventos del nuevo mes desde API
if (event.direction === 'next') {
  await fetchEventosDelMes(event.month, event.year);
}
```

---

## 🔄 Internal Variables (Variables Internas)

Estas variables son gestionadas internamente por el componente y puedes accederlas desde workflows:

### `currentMonth`
- **Tipo**: Number (1-12)
- **Descripción**: Mes actualmente mostrado en el calendario
- **Acceso**: `components.calendarTracking.currentMonth`

### `currentYear`
- **Tipo**: Number
- **Descripción**: Año actualmente mostrado en el calendario
- **Acceso**: `components.calendarTracking.currentYear`

### `selectedDate`
- **Tipo**: String (YYYY-MM-DD) | null
- **Descripción**: Última fecha seleccionada por el usuario
- **Acceso**: `components.calendarTracking.selectedDate`

### `statistics`
- **Tipo**: Object
- **Descripción**: Estadísticas calculadas automáticamente
- **Acceso**: `components.calendarTracking.statistics`

**Estructura:**
```typescript
{
  total: number,         // Total de eventos
  altas: number,         // Eventos tipo 'alta'
  bajas: number,         // Eventos tipo 'baja'
  entrevistas: number,   // Eventos tipo 'entrevista'
  pendientes: number     // Eventos futuros no confirmados
}
```

**Ejemplos de acceso:**
```javascript
// Total de eventos
components.calendarTracking.statistics.total

// Solo altas
components.calendarTracking.statistics.altas

// Verificar si hay pendientes
components.calendarTracking.statistics.pendientes > 0
```

---

## 🎨 Style Customization

### CSS Variables

El componente utiliza estas variables CSS que puedes sobrescribir:

```css
--primary-color: #2563eb;
--alta-color: #10b981;
--baja-color: #ef4444;
--entrevista-color: #3b82f6;
--pendiente-color: #f59e0b;
--border-radius: 8px;
```

### Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

---

## 📐 Layout Information

### Component Dimensions
- **Minimum Width**: 320px
- **Recommended Width**: 1200px+
- **Height**: Auto (adapts to content)
- **Minimum Height**: ~800px (with stats cards)

### Calendar Grid
- **Desktop**: 7 columns × 6 rows
- **Mobile**: Same grid, scaled down
- **Day Cell**: Min height 100px (desktop), 80px (tablet), 60px (mobile)

---

## 🔧 Methods (For Advanced Use)

Si necesitas controlar el calendario programáticamente:

```javascript
// Navegar a un mes específico
setInternalVariable('currentMonth', 12);
setInternalVariable('currentYear', 2024);

// Limpiar selección
setInternalVariable('selectedDate', null);
```

---

## 🧪 Testing

### Test Cases

**1. Renderizado básico:**
```javascript
// Props mínimos requeridos
{
  events: []
}
// Debe renderizar calendario vacío del mes actual
```

**2. Eventos múltiples:**
```javascript
{
  events: [
    { id: '1', date: '2024-11-15', type: 'alta', ... },
    { id: '2', date: '2024-11-15', type: 'baja', ... }
  ]
}
// Debe mostrar ambos eventos en el mismo día
```

**3. Navegación:**
```javascript
// Click en botón "next" 12 veces
// Debe avanzar un año completo
```

**4. Estadísticas:**
```javascript
{
  events: [
    { type: 'alta', confirmed: true },
    { type: 'baja', confirmed: true },
    { type: 'entrevista', confirmed: false, date: '2025-01-01' }
  ]
}
// statistics.total debe ser 3
// statistics.altas debe ser 1
// statistics.bajas debe ser 1
// statistics.entrevistas debe ser 1
// statistics.pendientes debe ser 1 (futuro no confirmado)
```

---

## 🐛 Debugging

### Enable Logging

En modo desarrollo, puedes ver logs de las variables internas:

```javascript
// En DevTools Console
console.log('Current Month:', components.calendarTracking.currentMonth);
console.log('Statistics:', components.calendarTracking.statistics);
```

### Common Issues

**Eventos no visibles:**
```javascript
// Verificar formato de fecha
events.forEach(e => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) {
    console.error('Invalid date format:', e.date);
  }
});
```

**Estadísticas incorrectas:**
```javascript
// Verificar tipos de evento
const validTypes = ['alta', 'baja', 'entrevista'];
events.forEach(e => {
  if (!validTypes.includes(e.type)) {
    console.error('Invalid event type:', e.type);
  }
});
```

---

## 📊 Performance

### Optimization Tips

1. **Eventos grandes (>1000)**: Considerar paginación por mes
2. **Imágenes**: No incluidas para mejor performance
3. **Re-renders**: Solo ocurren cuando cambian props o variables internas
4. **Memory**: El componente libera memoria al desmontar

### Bundle Size
- **Component**: ~25KB (gzipped)
- **Dependencies**: Vue 3 (ya incluido en WeWeb)

---

## 🔐 Security

- ✅ No ejecuta código arbitrario
- ✅ Sanitiza nombres de personas para XSS
- ✅ Valida tipos de eventos
- ✅ No realiza llamadas HTTP directamente

---

## ♿ Accessibility

- ✅ Keyboard navigation (Tab, Enter, Arrow keys)
- ✅ ARIA labels en botones
- ✅ Contrast ratio WCAG AA compliant
- ✅ Screen reader friendly

---

## 📝 TypeScript Definitions

```typescript
interface CalendarTrackingProps {
  // Data
  events?: Event[];
  initialMonth?: number;
  initialYear?: number;

  // Text
  title?: string;
  subtitle?: string;
  createButtonText?: string;
  todayButtonText?: string;
  totalLabel?: string;
  altasLabel?: string;
  bajasLabel?: string;
  entrevistasLabel?: string;
  pendientesLabel?: string;
  weekDays?: string[];
  monthNames?: string[];

  // Style
  primaryColor?: string;
  altaColor?: string;
  bajaColor?: string;
  entrevistaColor?: string;
  pendienteColor?: string;
  borderRadius?: string;

  // Options
  showStatsCards?: boolean;
  showCreateButton?: boolean;
}

interface Event {
  id: string;
  date: string; // YYYY-MM-DD
  type: 'alta' | 'baja' | 'entrevista';
  personName: string;
  personId: string;
  confirmed: boolean;
}

interface Statistics {
  total: number;
  altas: number;
  bajas: number;
  entrevistas: number;
  pendientes: number;
}

interface TriggerEvents {
  'create-event': { currentMonth: number; currentYear: number };
  'event-click': { eventId: string; eventData: Event; date: string; type: string; personName: string; personId: string };
  'date-click': { date: Date; dateString: string; hasEvents: boolean; eventsCount: number };
  'today-click': { date: string; month: number; year: number };
  'month-change': { month: number; year: number; direction: 'prev' | 'next' };
}
```

---

**Versión**: 1.0.0
**Última actualización**: Noviembre 2024
**Compatible con**: WeWeb 3.x
