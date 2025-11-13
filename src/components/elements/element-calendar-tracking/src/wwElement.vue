<template>
  <div class="calendar-tracking-wrapper" :style="componentStyles">
    <!-- HEADER -->
    <div class="calendar-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="calendar-title">{{ content?.title || 'Calendario de Seguimiento' }}</h1>
          <p class="calendar-subtitle">{{ content?.subtitle || 'Visualiza altas, bajas y citaciones' }}</p>
        </div>
        <div class="header-actions">
          <button
            class="today-button"
            @click="handleTodayClick"
            :style="{ borderColor: content?.primaryColor || '#2563eb' }"
          >
            {{ content?.todayButtonText || 'Hoy' }}
          </button>
          <button
            v-if="content?.showCreateButton"
            class="create-button"
            @click="handleCreateEvent"
            :style="{
              backgroundColor: content?.primaryColor || '#2563eb',
              borderRadius: content?.borderRadius || '8px'
            }"
          >
            <span class="plus-icon">+</span>
            {{ content?.createButtonText || 'Crear Evento' }}
          </button>
        </div>
      </div>
    </div>

    <!-- STATISTICS CARDS -->
    <div v-if="content?.showStatsCards" class="stats-cards-container">
      <!-- Total Events Card -->
      <div class="stat-card" :style="{ borderRadius: content?.borderRadius || '8px' }">
        <div class="stat-icon stat-icon-total">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ statistics.value?.total || 0 }}</div>
          <div class="stat-label">{{ content?.totalLabel || 'Total Eventos' }}</div>
        </div>
      </div>

      <!-- Altas Card -->
      <div class="stat-card" :style="{
        borderRadius: content?.borderRadius || '8px',
        backgroundColor: lightenColor(content?.altaColor || '#10b981', 0.9)
      }">
        <div class="stat-icon" :style="{ color: content?.altaColor || '#10b981' }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value" :style="{ color: content?.altaColor || '#10b981' }">
            {{ statistics.value?.altas || 0 }}
          </div>
          <div class="stat-label">{{ content?.altasLabel || 'Altas' }}</div>
        </div>
      </div>

      <!-- Bajas Card -->
      <div class="stat-card" :style="{
        borderRadius: content?.borderRadius || '8px',
        backgroundColor: lightenColor(content?.bajaColor || '#ef4444', 0.9)
      }">
        <div class="stat-icon" :style="{ color: content?.bajaColor || '#ef4444' }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value" :style="{ color: content?.bajaColor || '#ef4444' }">
            {{ statistics.value?.bajas || 0 }}
          </div>
          <div class="stat-label">{{ content?.bajasLabel || 'Bajas' }}</div>
        </div>
      </div>

      <!-- Entrevistas Card -->
      <div class="stat-card" :style="{
        borderRadius: content?.borderRadius || '8px',
        backgroundColor: lightenColor(content?.entrevistaColor || '#3b82f6', 0.9)
      }">
        <div class="stat-icon" :style="{ color: content?.entrevistaColor || '#3b82f6' }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value" :style="{ color: content?.entrevistaColor || '#3b82f6' }">
            {{ statistics.value?.entrevistas || 0 }}
          </div>
          <div class="stat-label">{{ content?.entrevistasLabel || 'Entrevistas' }}</div>
        </div>
      </div>

      <!-- Pendientes Card -->
      <div class="stat-card" :style="{
        borderRadius: content?.borderRadius || '8px',
        backgroundColor: lightenColor(content?.pendienteColor || '#f59e0b', 0.9)
      }">
        <div class="stat-icon" :style="{ color: content?.pendienteColor || '#f59e0b' }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-value" :style="{ color: content?.pendienteColor || '#f59e0b' }">
            {{ statistics.value?.pendientes || 0 }}
          </div>
          <div class="stat-label">{{ content?.pendientesLabel || 'Pendientes' }}</div>
        </div>
      </div>
    </div>

    <!-- CALENDAR -->
    <div class="calendar-container" :style="{ borderRadius: content?.borderRadius || '8px' }">
      <!-- Calendar Header with Navigation -->
      <div class="calendar-nav">
        <button class="nav-button" @click="previousMonth">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h2 class="current-month-year">
          {{ currentMonthName }} {{ currentYear.value }}
        </h2>
        <button class="nav-button" @click="nextMonth">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Week Days Header -->
      <div class="weekdays-header">
        <div
          v-for="(day, index) in weekDays"
          :key="`weekday-${index}`"
          class="weekday"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div
          v-for="day in calendarDays.value"
          :key="`day-${day.dateString}`"
          class="calendar-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'today': day.isToday,
            'has-events': day.events?.length > 0
          }"
          @click="handleDateClick(day)"
        >
          <div class="day-number">{{ day.day }}</div>

          <!-- Events count badge -->
          <div v-if="day.events?.length > 0" class="events-badge">
            {{ day.events.length }}
          </div>

          <!-- Events list -->
          <div class="day-events">
            <div
              v-for="event in day.events?.slice(0, 3)"
              :key="`event-${event.id}`"
              class="event-item"
              :style="getEventStyle(event.type)"
              @click.stop="handleEventClick(event)"
            >
              <span class="event-icon">{{ getEventIcon(event.type) }}</span>
              <span class="event-name">{{ event.personName || 'Sin nombre' }}</span>
            </div>
            <div v-if="day.events?.length > 3" class="more-events">
              +{{ day.events.length - 3 }} más
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue';

export default {
  name: 'CalendarTracking',
  props: {
    uid: { type: String, required: true },
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    /* wwEditor:start */
    const isEditing = computed(() => props.wwEditorState?.isEditing);
    /* wwEditor:end */

    // ========== INTERNAL VARIABLES ==========
    const { value: currentMonth, setValue: setCurrentMonth } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentMonth',
      type: 'number',
      defaultValue: new Date().getMonth() + 1,
    });

    const { value: currentYear, setValue: setCurrentYear } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'currentYear',
      type: 'number',
      defaultValue: new Date().getFullYear(),
    });

    const { value: selectedDate, setValue: setSelectedDate } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'selectedDate',
      type: 'string',
      defaultValue: null,
    });

    const { value: statistics, setValue: setStatistics } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'statistics',
      type: 'object',
      defaultValue: { total: 0, altas: 0, bajas: 0, entrevistas: 0, pendientes: 0 },
    });

    // Initialize from props when they change
    watch(() => props.content?.initialMonth, (newValue) => {
      if (newValue && newValue >= 1 && newValue <= 12) {
        setCurrentMonth(newValue);
      }
    }, { immediate: true });

    watch(() => props.content?.initialYear, (newValue) => {
      if (newValue && newValue >= 2020 && newValue <= 2100) {
        setCurrentYear(newValue);
      }
    }, { immediate: true });

    // ========== COMPUTED PROPERTIES ==========
    const componentStyles = computed(() => ({
      '--primary-color': props.content?.primaryColor || '#2563eb',
      '--alta-color': props.content?.altaColor || '#10b981',
      '--baja-color': props.content?.bajaColor || '#ef4444',
      '--entrevista-color': props.content?.entrevistaColor || '#3b82f6',
      '--pendiente-color': props.content?.pendienteColor || '#f59e0b',
      '--border-radius': props.content?.borderRadius || '8px',
    }));

    const events = computed(() => {
      return Array.isArray(props.content?.events) ? props.content.events : [];
    });

    const weekDays = computed(() => {
      const days = props.content?.weekDays;
      if (Array.isArray(days) && days.length === 7) {
        return days;
      }
      return ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    });

    const monthNames = computed(() => {
      const names = props.content?.monthNames;
      if (Array.isArray(names) && names.length === 12) {
        return names;
      }
      return [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
    });

    const currentMonthName = computed(() => {
      const month = currentMonth.value - 1;
      return monthNames.value?.[month] || 'Mes';
    });

    // Calculate calendar days
    const calendarDays = computed(() => {
      const year = currentYear.value;
      const month = currentMonth.value - 1; // 0-indexed

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      // Get day of week (0 = Sunday, 1 = Monday, etc.)
      let firstDayOfWeek = firstDay.getDay();
      // Convert to Monday = 0, Sunday = 6
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

      const daysInMonth = lastDay.getDate();

      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Add previous month days
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        const date = new Date(year, month - 1, day);
        days.push({
          day,
          date,
          dateString: formatDate(date),
          isCurrentMonth: false,
          isToday: false,
          events: []
        });
      }

      // Add current month days
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = formatDate(date);
        const dayEvents = getEventsForDate(dateString);

        days.push({
          day,
          date,
          dateString,
          isCurrentMonth: true,
          isToday: date.getTime() === today.getTime(),
          events: dayEvents
        });
      }

      // Add next month days to complete the grid (42 days total = 6 weeks)
      const remainingDays = 42 - days.length;
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day);
        days.push({
          day,
          date,
          dateString: formatDate(date),
          isCurrentMonth: false,
          isToday: false,
          events: []
        });
      }

      return days;
    });

    // Calculate statistics
    watch([events, currentMonth, currentYear], () => {
      const allEvents = events.value || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const stats = {
        total: allEvents.length,
        altas: allEvents.filter(e => e?.type === 'alta').length,
        bajas: allEvents.filter(e => e?.type === 'baja').length,
        entrevistas: allEvents.filter(e => e?.type === 'entrevista').length,
        pendientes: allEvents.filter(e => {
          if (!e?.date || e?.confirmed) return false;
          const eventDate = new Date(e.date);
          eventDate.setHours(0, 0, 0, 0);
          return eventDate >= today;
        }).length
      };

      setStatistics(stats);
    }, { immediate: true, deep: true });

    // ========== HELPER FUNCTIONS ==========
    function formatDate(date) {
      if (!date) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function getEventsForDate(dateString) {
      return events.value.filter(event => event?.date === dateString);
    }

    function getEventStyle(type) {
      let color;
      switch (type) {
        case 'alta':
          color = props.content?.altaColor || '#10b981';
          break;
        case 'baja':
          color = props.content?.bajaColor || '#ef4444';
          break;
        case 'entrevista':
          color = props.content?.entrevistaColor || '#3b82f6';
          break;
        default:
          color = '#6b7280';
      }

      return {
        backgroundColor: lightenColor(color, 0.9),
        borderColor: color,
        color: color,
        borderRadius: props.content?.borderRadius || '8px'
      };
    }

    function getEventIcon(type) {
      switch (type) {
        case 'alta':
          return '👤';
        case 'baja':
          return '👤';
        case 'entrevista':
          return '👥';
        default:
          return '📅';
      }
    }

    function lightenColor(color, amount) {
      // Convert hex to RGB
      let r, g, b;
      if (color?.startsWith('#')) {
        const hex = color.slice(1);
        r = parseInt(hex.substr(0, 2), 16);
        g = parseInt(hex.substr(2, 2), 16);
        b = parseInt(hex.substr(4, 2), 16);
      } else {
        return color;
      }

      // Lighten
      r = Math.round(r + (255 - r) * amount);
      g = Math.round(g + (255 - g) * amount);
      b = Math.round(b + (255 - b) * amount);

      return `rgb(${r}, ${g}, ${b})`;
    }

    // ========== EVENT HANDLERS ==========
    function previousMonth() {
      let newMonth = currentMonth.value - 1;
      let newYear = currentYear.value;

      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }

      setCurrentMonth(newMonth);
      setCurrentYear(newYear);

      emit('trigger-event', {
        name: 'month-change',
        event: {
          month: newMonth,
          year: newYear,
          direction: 'prev'
        }
      });
    }

    function nextMonth() {
      let newMonth = currentMonth.value + 1;
      let newYear = currentYear.value;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }

      setCurrentMonth(newMonth);
      setCurrentYear(newYear);

      emit('trigger-event', {
        name: 'month-change',
        event: {
          month: newMonth,
          year: newYear,
          direction: 'next'
        }
      });
    }

    function handleTodayClick() {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      setCurrentMonth(month);
      setCurrentYear(year);
      setSelectedDate(formatDate(today));

      emit('trigger-event', {
        name: 'today-click',
        event: {
          date: formatDate(today),
          month,
          year
        }
      });
    }

    function handleCreateEvent() {
      emit('trigger-event', {
        name: 'create-event',
        event: {
          currentMonth: currentMonth.value,
          currentYear: currentYear.value
        }
      });
    }

    function handleDateClick(day) {
      setSelectedDate(day.dateString);

      emit('trigger-event', {
        name: 'date-click',
        event: {
          date: day.date,
          dateString: day.dateString,
          hasEvents: day.events?.length > 0,
          eventsCount: day.events?.length || 0
        }
      });
    }

    function handleEventClick(event) {
      emit('trigger-event', {
        name: 'event-click',
        event: {
          eventId: event?.id,
          eventData: event,
          date: event?.date,
          type: event?.type,
          personName: event?.personName,
          personId: event?.personId
        }
      });
    }

    return {
      componentStyles,
      currentMonth,
      currentYear,
      currentMonthName,
      weekDays,
      calendarDays,
      statistics,
      previousMonth,
      nextMonth,
      handleTodayClick,
      handleCreateEvent,
      handleDateClick,
      handleEventClick,
      getEventStyle,
      getEventIcon,
      lightenColor,
      /* wwEditor:start */
      isEditing,
      /* wwEditor:end */
    };
  }
};
</script>

<style scoped lang="scss">
.calendar-tracking-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  font-family: system-ui, -apple-system, sans-serif;
}

// ========== HEADER ==========
.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.title-section {
  flex: 1;
}

.calendar-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px 0;
}

.calendar-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.today-button {
  padding: 10px 20px;
  background: white;
  border: 2px solid;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
}

.create-button {
  padding: 10px 20px;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  .plus-icon {
    font-size: 18px;
    font-weight: 700;
  }

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

// ========== STATISTICS CARDS ==========
.stats-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.stat-card {
  background: white;
  padding: 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 16px;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;

  &.stat-icon-total {
    background: #f3f4f6;
    color: #6b7280;
  }
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

// ========== CALENDAR ==========
.calendar-container {
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.calendar-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.current-month-year {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.nav-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
}

.weekdays-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.weekday {
  padding: 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 600px;
}

.calendar-day {
  min-height: 100px;
  border: 1px solid #e5e7eb;
  padding: 8px;
  position: relative;
  cursor: pointer;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }

  &.other-month {
    background: #f9fafb;

    .day-number {
      color: #d1d5db;
    }
  }

  &.today {
    background: #eff6ff;
    border: 2px solid var(--primary-color, #2563eb);

    .day-number {
      color: var(--primary-color, #2563eb);
      font-weight: 700;
    }
  }

  &.has-events:hover {
    background: #f0f9ff;
  }
}

.day-number {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

.events-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  background: var(--primary-color, #2563eb);
  color: white;
  border-radius: 50%;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-events {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event-item {
  padding: 4px 6px;
  border-left: 3px solid;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    opacity: 0.8;
    transform: translateX(2px);
  }
}

.event-icon {
  font-size: 12px;
  flex-shrink: 0;
}

.event-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.more-events {
  padding: 4px 6px;
  font-size: 10px;
  color: #6b7280;
  font-weight: 600;
  text-align: center;
}

// ========== RESPONSIVE ==========
@media (max-width: 768px) {
  .calendar-tracking-wrapper {
    padding: 16px;
    gap: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .calendar-title {
    font-size: 24px;
  }

  .stats-cards-container {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }

  .stat-value {
    font-size: 24px;
  }

  .calendar-day {
    min-height: 80px;
    padding: 6px;
  }

  .event-item {
    font-size: 10px;
    padding: 3px 5px;
  }

  .day-number {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .stats-cards-container {
    grid-template-columns: 1fr 1fr;
  }

  .calendar-day {
    min-height: 60px;
  }

  .event-name {
    display: none;
  }

  .event-item {
    justify-content: center;
  }
}
</style>
