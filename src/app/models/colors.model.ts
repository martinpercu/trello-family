export type Allcolors = 'sky' | 'green' | 'violet' | 'teal' | 'gray' | 'lime' | 'fuchsia' | 'yellow' | 'success' | 'primary' | 'danger' | 'light' ;

export type ObjALLCOLORS = Record<string, Record<string, boolean>>

export const ALLCOLORS: ObjALLCOLORS = {
  sky: {
    'bg-sky-600': true,
    'hover:bg-sky-800': true,
    'text-white': true
  },
  green: {
    'bg-green-600': true,
    'hover:bg-green-800': true,
    'text-white': true
  },
  teal: {
    'bg-teal-600': true,
    'hover:bg-teal-800': true,
    'text-white': true
  },
  fuchsia: {
    'bg-fuchsia-600': true,
    'hover:bg-fuchsia-800': true,
    'text-white': true
  },
  violet: {
    'bg-violet-600': true,
    'hover:bg-violet-800': true,
    'text-white': true
  },
  lime: {
    'bg-lime-600': true,
    'hover:bg-lime-800': true,
    'text-white': true
  },
  gray: {
    'bg-gray-600': true,
    'hover:bg-gray-800': true,
    'text-white': true
  },
  yellow: {
    'bg-yellow-600': true,
    'hover:bg-yellow-800': true,
    'text-white': true
  },
  success: {
    'bg-success-700': true,
    'hover:bg-success-500': true,
    'focus:ring-success-300': true,
    'text-white': true,
  },
  primary: {
    'bg-primary-700': true,
    'hover:bg-primary-800': true,
    'focus:ring-primary-300': true,
    'text-white': true,
  },
  danger: {
    'bg-red-500': true,
    'hover:bg-red-600': true,
    'focus:ring-red-100': true,
    'text-white': true,
  },
  light: {
    'bg-primary-400': true,
    'hover:bg-primary-300': true,
    'focus:ring-primary-50': true,
    'text-white': true,
  }
}
