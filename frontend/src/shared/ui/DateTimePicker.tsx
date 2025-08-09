'use client'

import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

interface DateTimePickerProps {
  label: string
  value: Date | null
  onChange: (value: Date | null) => void
  required?: boolean
}

export function DateTimePicker({ label, value, onChange, required = false }: DateTimePickerProps) {
  return (
    <MuiDateTimePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          fullWidth: true,
          margin: 'normal',
          required,
        },
      }}
    />
  )
} 