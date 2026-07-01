"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

export function Slider(props: SliderPrimitive.SliderProps) {
  return (
    <SliderPrimitive.Root className="relative flex h-5 w-full touch-none items-center" {...props}>
      <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border bg-background shadow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
    </SliderPrimitive.Root>
  );
}
