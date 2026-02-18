// src/components/ColoredSlider.tsx
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

interface ColoredSliderProps extends React.ComponentProps<typeof Slider> {}

function getRangeClassName(value: number) {
  if (value < 5) {
    return "bg-red-500";
  } else if (value < 9) {
    return "bg-yellow-500";
  } else if (value < 15) {
    return "bg-green-500";
  } else if (value < 20) {
    return "bg-blue-500";
  } else {
    return "bg-primary";
  }
}

export function ColoredSlider({ className, value, rangeClassName, ...props }: ColoredSliderProps) {
  return (
    <Slider
      value={value}
      className={className}
      rangeClassName={getRangeClassName(value?.[0] ?? 0)}
      {...props}
    />
  )
}