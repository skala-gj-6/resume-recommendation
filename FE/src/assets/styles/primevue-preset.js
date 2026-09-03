import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

// 프로토타입 팔레트(#0066ff 액센트, #171719 잉크, #f7f7f8 캔버스)에 맞춘 Aura 커스텀 프리셋.
export const AppPreset = definePreset(Aura, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '3px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '10px',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#0066ff',
      700: '#0052cc',
      800: '#0041a3',
      900: '#00337d',
      950: '#001f4d',
    },
    slate: {
      0: '#ffffff',
      50: '#f7f7f8',
      100: '#f0f0f1',
      200: '#e4e4e6',
      300: '#d1d1d4',
      400: '#a8a8ad',
      500: '#808085',
      600: '#5c5c61',
      700: '#45454a',
      800: '#2c2c30',
      900: '#1c1c1e',
      950: '#171719',
    },
  },
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}',
    },
    colorScheme: {
      light: {
        surface: {
          0: '{slate.0}',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}',
        },
      },
    },
  },
})

export default AppPreset
