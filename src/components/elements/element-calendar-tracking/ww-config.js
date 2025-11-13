export default {
  editor: {
    label: {
      en: 'Calendario de Seguimiento',
      es: 'Calendario de Seguimiento'
    },
    icon: 'calendar',
  },
  properties: {
    // ========== DATA PROPERTIES ==========
    events: {
      label: {
        en: 'Events',
        es: 'Eventos'
      },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        {
          id: '1',
          date: new Date().toISOString().split('T')[0],
          type: 'alta',
          personName: 'Juan Pérez',
          personId: 'p1',
          confirmed: true
        },
        {
          id: '2',
          date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          type: 'entrevista',
          personName: 'María García',
          personId: 'p2',
          confirmed: false
        },
        {
          id: '3',
          date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
          type: 'baja',
          personName: 'Carlos López',
          personId: 'p3',
          confirmed: true
        },
        {
          id: '4',
          date: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
          type: 'alta',
          personName: 'Ana Martínez',
          personId: 'p4',
          confirmed: true
        }
      ],
      options: {
        expandable: true,
        getItemLabel(item) {
          return item?.personName || item?.name || `Event ${item?.id || 'Unknown'}`;
        },
        item: {
          type: 'Object',
          defaultValue: {
            id: '',
            date: new Date().toISOString().split('T')[0],
            type: 'alta',
            personName: '',
            personId: '',
            confirmed: true
          },
          options: {
            item: {
              id: {
                label: { en: 'ID', es: 'ID' },
                type: 'Text'
              },
              date: {
                label: { en: 'Date (YYYY-MM-DD)', es: 'Fecha (YYYY-MM-DD)' },
                type: 'Text'
              },
              type: {
                label: { en: 'Type', es: 'Tipo' },
                type: 'Text'
              },
              personName: {
                label: { en: 'Person Name', es: 'Nombre Persona' },
                type: 'Text'
              },
              personId: {
                label: { en: 'Person ID', es: 'ID Persona' },
                type: 'Text'
              },
              confirmed: {
                label: { en: 'Confirmed', es: 'Confirmado' },
                type: 'OnOff'
              }
            }
          }
        }
      },
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array de objetos con: { id, date, type, personName, personId, confirmed }'
      },
      propertyHelp: {
        en: 'Array of events with structure: { id, date (YYYY-MM-DD), type (alta/baja/entrevista), personName, personId, confirmed }',
        es: 'Array de eventos con estructura: { id, date (YYYY-MM-DD), type (alta/baja/entrevista), personName, personId, confirmed }'
      }
      /* wwEditor:end */
    },

    initialMonth: {
      label: {
        en: 'Initial Month (1-12)',
        es: 'Mes Inicial (1-12)'
      },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: new Date().getMonth() + 1,
      min: 1,
      max: 12,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Número del mes (1-12)'
      }
      /* wwEditor:end */
    },

    initialYear: {
      label: {
        en: 'Initial Year',
        es: 'Año Inicial'
      },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: new Date().getFullYear(),
      min: 2020,
      max: 2100,
      /* wwEditor:start */
      bindingValidation: {
        type: 'number',
        tooltip: 'Año (ej: 2024)'
      }
      /* wwEditor:end */
    },

    // ========== HEADER PROPERTIES ==========
    title: {
      label: {
        en: 'Title',
        es: 'Título'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Calendario de Seguimiento',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    subtitle: {
      label: {
        en: 'Subtitle',
        es: 'Subtítulo'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Visualiza altas, bajas y citaciones de entrevistas',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    showCreateButton: {
      label: {
        en: 'Show Create Button',
        es: 'Mostrar Botón Crear'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean'
      }
      /* wwEditor:end */
    },

    createButtonText: {
      label: {
        en: 'Create Button Text',
        es: 'Texto Botón Crear'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Crear Evento',
      hidden: (content) => !content?.showCreateButton,
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    // ========== STATISTICS CARDS PROPERTIES ==========
    showStatsCards: {
      label: {
        en: 'Show Statistics Cards',
        es: 'Mostrar Cards Estadísticas'
      },
      type: 'OnOff',
      section: 'settings',
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: 'boolean'
      }
      /* wwEditor:end */
    },

    // ========== STYLE PROPERTIES ==========
    primaryColor: {
      label: {
        en: 'Primary Color',
        es: 'Color Primario'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#2563eb',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    altaColor: {
      label: {
        en: 'Alta Color',
        es: 'Color Altas'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#10b981',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    bajaColor: {
      label: {
        en: 'Baja Color',
        es: 'Color Bajas'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#ef4444',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    entrevistaColor: {
      label: {
        en: 'Entrevista Color',
        es: 'Color Entrevistas'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#3b82f6',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    pendienteColor: {
      label: {
        en: 'Pendiente Color',
        es: 'Color Pendientes'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#f59e0b',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    borderRadius: {
      label: {
        en: 'Border Radius',
        es: 'Radio de Borde'
      },
      type: 'Length',
      section: 'style',
      bindable: true,
      defaultValue: '8px',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    // ========== TEXT LABELS ==========
    todayButtonText: {
      label: {
        en: 'Today Button Text',
        es: 'Texto Botón Hoy'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Hoy',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    totalLabel: {
      label: {
        en: 'Total Label',
        es: 'Etiqueta Total'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Total Eventos',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    altasLabel: {
      label: {
        en: 'Altas Label',
        es: 'Etiqueta Altas'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Altas',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    bajasLabel: {
      label: {
        en: 'Bajas Label',
        es: 'Etiqueta Bajas'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Bajas',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    entrevistasLabel: {
      label: {
        en: 'Entrevistas Label',
        es: 'Etiqueta Entrevistas'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Entrevistas',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    pendientesLabel: {
      label: {
        en: 'Pendientes Label',
        es: 'Etiqueta Pendientes'
      },
      type: 'Text',
      section: 'settings',
      bindable: true,
      defaultValue: 'Pendientes',
      /* wwEditor:start */
      bindingValidation: {
        type: 'string'
      }
      /* wwEditor:end */
    },

    weekDays: {
      label: {
        en: 'Week Days',
        es: 'Días Semana'
      },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array de 7 strings con nombres de días'
      }
      /* wwEditor:end */
    },

    monthNames: {
      label: {
        en: 'Month Names',
        es: 'Nombres Meses'
      },
      type: 'Array',
      section: 'settings',
      bindable: true,
      defaultValue: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ],
      /* wwEditor:start */
      bindingValidation: {
        type: 'array',
        tooltip: 'Array de 12 strings con nombres de meses'
      }
      /* wwEditor:end */
    }
  },

  triggerEvents: [
    {
      name: 'create-event',
      label: { en: 'On Create Event Click', es: 'Al Clic en Crear Evento' },
      event: {
        currentMonth: 0,
        currentYear: 0
      },
      default: true
    },
    {
      name: 'event-click',
      label: { en: 'On Event Click', es: 'Al Clic en Evento' },
      event: {
        eventId: '',
        eventData: null,
        date: '',
        type: '',
        personName: '',
        personId: ''
      }
    },
    {
      name: 'date-click',
      label: { en: 'On Date Click', es: 'Al Clic en Fecha' },
      event: {
        date: '',
        dateString: '',
        hasEvents: false,
        eventsCount: 0
      }
    },
    {
      name: 'today-click',
      label: { en: 'On Today Click', es: 'Al Clic en Hoy' },
      event: {
        date: '',
        month: 0,
        year: 0
      }
    },
    {
      name: 'month-change',
      label: { en: 'On Month Change', es: 'Al Cambiar Mes' },
      event: {
        month: 0,
        year: 0,
        direction: ''
      }
    }
  ]
};
