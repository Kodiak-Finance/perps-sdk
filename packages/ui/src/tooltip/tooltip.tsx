import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { tv } from "../utils/tv";
import { cn } from "tailwind-variants";
// import { cn } from "..";

const TooltipProvider = TooltipPrimitive.Provider;

// const Tooltip = TooltipPrimitive.Root;
const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipVariants = tv({
  base: [
    "oui-z-50",
    "oui-overflow-hidden",
    "oui-rounded-md",
    "oui-bg-base-8",
    "oui-px-2",
    "oui-py-1",
    "oui-text-xs",
    "oui-text-base-contrast",
    "oui-animate-in",
    "oui-fade-in-0",
    "oui-zoom-in-95",
    "data-[state=closed]:oui-animate-out",
    "data-[state=closed]:oui-fade-out-0",
    "data-[state=closed]:oui-zoom-out-95",
    "data-[side=bottom]:oui-slide-in-from-top-2",
    "data-[side=left]:oui-slide-in-from-right-2",
    "data-[side=right]:oui-slide-in-from-left-2",
    "data-[side=top]:oui-slide-in-from-bottom-2",
  ],
});

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={tooltipVariants({
        className,
      })}
      {...props}
    />
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export type TooltipProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
> &
  React.ComponentPropsWithoutRef<typeof TooltipContent> & {
    className?: string;
    content?: React.ReactNode;
    arrow?: TooltipPrimitive.TooltipArrowProps;
  };

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipContent>,
  TooltipProps
>(
  (
    {
      //   className,
      children,
      content,
      defaultOpen,
      open,
      onOpenChange,
      delayDuration,
      disableHoverableContent,
      arrow,
      ...props
    },
    ref
  ) => {
    const { className, ...arrowProps } = arrow || {};
    return (
      <TooltipPrimitive.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipContent ref={ref} {...props}>
          {content}
          <TooltipPrimitive.Arrow
            width={12}
            height={6}
            {...arrowProps}
            className={cn(
              "oui-fill-base-8",
              className
            )({
              twMerge: true,
            })}
          />
        </TooltipContent>
      </TooltipPrimitive.Root>
    );
  }
);

Tooltip.displayName = "Tooltip";

export {
  Tooltip,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
};
