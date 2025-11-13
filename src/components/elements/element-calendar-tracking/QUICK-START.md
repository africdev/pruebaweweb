# 🚀 Guía Rápida - Calendario de Seguimiento

## ⚡ Integración en 3 Pasos

### 1️⃣ Cargar el Componente en WeWeb

**Opción A: Modo Desarrollo Local**
```bash
cd src/components/elements/element-calendar-tracking
npm install
npm run serve --port=3000
```
Luego en WeWeb Editor:
- Abre Developer Tools (Ctrl/Cmd + Shift + D)
- Conecta componente local en `http://localhost:3000`

**Opción B: Build y Publicar**
```bash
npm run build
```
Luego sube el componente construido a WeWeb

### 2️⃣ Agregar a tu Página

1. **Arrastra el componente** "Calendario de Seguimiento" desde el panel de elementos
2. El componente aparecerá con **datos de ejemplo** pre-cargados

### 3️⃣ Conectar con tus Datos

**Crear una Variable en WeWeb:**
```javascript
Nombre: calendarEvents
Tipo: Array
Valor inicial: [] o importa desde example-data.json
```

**Vincular al componente:**
- Selecciona el componente en el editor
- En el panel derecho, encuentra la propiedad "Events"
- Click en el icono de binding (cadena)
- Selecciona `variables.calendarEvents`

¡Listo! El calendario ahora muestra tus eventos.

---

## 🎯 Casos de Uso Comunes

### Caso 1: Mostrar Eventos desde una API

**Paso 1 - Crear colección:**
```javascript
Nombre: EventosAPI
URL: https://tu-api.com/eventos
```

**Paso 2 - Crear workflow "On Page Load":**
```javascript
// Action 1: Fetch Collection
Colección: EventosAPI

// Action 2: Map Data
const eventosFormateados = collections.EventosAPI.data.map(e => ({
  id: e.id,
  date: e.fecha_evento,  // Asegurar formato YYYY-MM-DD
  type: e.tipo,          // 'alta', 'baja', o 'entrevista'
  personName: e.nombre,
  personId: e.persona_id,
  confirmed: e.confirmado || true
}));

// Action 3: Set Variable
variables.calendarEvents = eventosFormateados;
```

### Caso 2: Crear Nuevo Evento

**En el trigger "create-event" del calendario:**

```javascript
// Opción A: Abrir Popup
wwLib.openPopup('crear-evento-popup', {
  month: event.currentMonth,
  year: event.currentYear
});

// Opción B: Navegar a página
wwLib.goToPage('/eventos/nuevo', {
  mes: event.currentMonth,
  anio: event.currentYear
});
```

**En el formulario de creación (workflow "On Submit"):**

```javascript
// 1. Crear objeto evento
const nuevoEvento = {
  id: Date.now().toString(),
  date: variables.fechaSeleccionada,  // formato YYYY-MM-DD
  type: variables.tipoEvento,         // 'alta', 'baja', 'entrevista'
  personName: variables.nombrePersona,
  personId: variables.idPersona,
  confirmed: true
};

// 2. Agregar al array existente
const eventosActualizados = [
  ...variables.calendarEvents,
  nuevoEvento
];

// 3. Actualizar variable
variables.calendarEvents = eventosActualizados;

// 4. Opcional: Guardar en API
await fetch('https://tu-api.com/eventos', {
  method: 'POST',
  body: JSON.stringify(nuevoEvento)
});

// 5. Cerrar popup o navegar atrás
wwLib.closePopup();
```

### Caso 3: Ver Detalles de Evento

**En el trigger "event-click" del calendario:**

```javascript
// Guardar evento seleccionado en variable
variables.eventoSeleccionado = event.eventData;

// Abrir popup con detalles
wwLib.openPopup('detalles-evento', {
  eventId: event.eventId,
  personName: event.personName,
  type: event.type
});
```

**En el popup de detalles:**
- Mostrar: `variables.eventoSeleccionado.personName`
- Tipo: `variables.eventoSeleccionado.type`
- Fecha: `variables.eventoSeleccionado.date`

### Caso 4: Editar Evento

**En el popup de detalles, botón "Editar":**

```javascript
// 1. Encontrar y actualizar evento
const eventos = [...variables.calendarEvents];
const indice = eventos.findIndex(e => e.id === variables.eventoSeleccionado.id);

if (indice !== -1) {
  eventos[indice] = {
    ...eventos[indice],
    personName: variables.nuevoNombre,
    date: variables.nuevaFecha,
    // ... otros campos actualizados
  };

  // 2. Actualizar variable
  variables.calendarEvents = eventos;

  // 3. Opcional: Actualizar en API
  await fetch(`https://tu-api.com/eventos/${eventos[indice].id}`, {
    method: 'PUT',
    body: JSON.stringify(eventos[indice])
  });
}
```

### Caso 5: Eliminar Evento

```javascript
// 1. Filtrar eventos
const eventosFiltrados = variables.calendarEvents.filter(
  e => e.id !== variables.eventoAEliminar.id
);

// 2. Actualizar variable
variables.calendarEvents = eventosFiltrados;

// 3. Opcional: Eliminar de API
await fetch(`https://tu-api.com/eventos/${variables.eventoAEliminar.id}`, {
  method: 'DELETE'
});
```

### Caso 6: Filtrar por Tipo

**Agregar botones de filtro sobre el calendario:**

```javascript
// Variable: tipoFiltro = 'todos' | 'alta' | 'baja' | 'entrevista'

// En el binding de la propiedad "events":
tipoFiltro === 'todos'
  ? variables.todosLosEventos
  : variables.todosLosEventos.filter(e => e.type === variables.tipoFiltro)
```

---

## 🎨 Personalización Rápida

### Cambiar Colores

En las propiedades del componente:
- **Primary Color**: Color de botones y elementos activos
- **Alta Color**: Verde (#10b981)
- **Baja Color**: Rojo (#ef4444)
- **Entrevista Color**: Azul (#3b82f6)
- **Pendiente Color**: Amarillo (#f59e0b)

### Cambiar Textos

Todas las etiquetas son editables:
- **Title**: "Calendario de Seguimiento"
- **Subtitle**: "Visualiza altas, bajas y citaciones"
- **Labels**: Total, Altas, Bajas, Entrevistas, Pendientes
- **Week Days**: ['Lun', 'Mar', ...]
- **Month Names**: ['Enero', 'Febrero', ...]

### Mostrar/Ocultar Elementos

- **showStatsCards**: true/false (mostrar cards de estadísticas)
- **showCreateButton**: true/false (mostrar botón "Crear Evento")

---

## 📊 Acceder a Variables Internas

El componente expone estas variables que puedes usar en workflows:

```javascript
// Mes actual mostrado (1-12)
components.calendarTracking.currentMonth

// Año actual mostrado
components.calendarTracking.currentYear

// Fecha seleccionada (string)
components.calendarTracking.selectedDate

// Estadísticas calculadas
components.calendarTracking.statistics.total
components.calendarTracking.statistics.altas
components.calendarTracking.statistics.bajas
components.calendarTracking.statistics.entrevistas
components.calendarTracking.statistics.pendientes
```

**Ejemplo - Mostrar total de eventos:**
```javascript
// En un elemento de texto:
"Total de eventos: " + components.calendarTracking.statistics.total
```

---

## ⚠️ Errores Comunes y Soluciones

### ❌ Los eventos no aparecen

**Causa**: Formato de fecha incorrecto
**Solución**: Asegurar formato 'YYYY-MM-DD'
```javascript
// ✅ Correcto
date: '2024-11-15'

// ❌ Incorrecto
date: '15/11/2024'
date: '11-15-2024'
```

### ❌ Las estadísticas muestran 0

**Causa**: Los eventos no tienen el tipo correcto
**Solución**: Usar exactamente 'alta', 'baja' o 'entrevista'
```javascript
// ✅ Correcto
type: 'alta'

// ❌ Incorrecto
type: 'Alta'
type: 'ALTA'
type: 'nuevo'
```

### ❌ Los pendientes no se calculan

**Causa**: Falta la propiedad `confirmed` o fecha en el pasado
**Solución**:
```javascript
{
  date: '2024-12-01',  // Fecha futura
  confirmed: false     // No confirmado
}
```

### ❌ El calendario no navega entre meses

**Causa**: Conflicto con otras propiedades
**Solución**: No vincular manualmente `initialMonth` e `initialYear` si quieres navegación libre

---

## 🚀 Tips Pro

1. **Sincronización con API**: Usa webhooks para actualizar eventos en tiempo real
2. **Validación de Fechas**: Valida formato antes de agregar eventos
3. **Cache Local**: Guarda eventos en localStorage para cargar más rápido
4. **Paginación**: Si tienes muchos eventos, filtra por rango de fechas
5. **Notificaciones**: Usa los triggers para mostrar toast notifications al crear/editar

---

## 📞 Soporte

Si necesitas ayuda:
1. Revisa el README.md completo
2. Consulta example-data.json para ejemplos
3. Verifica que el formato de datos coincida con el esperado

---

**¡Tu Calendario de Seguimiento está listo para usar!** 🎉
