import React, { FC, PropsWithChildren, ReactElement } from "react";

import * as SelectPrimitive from "@radix-ui/react-select";
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  selectVariants,
} from "./selectPrimitive";

import { cnBase, VariantProps } from "tailwind-variants";
import { ScrollArea } from "../scrollarea";

export type SelectProps<T> = SelectPrimitive.SelectProps & {
  placeholder?: string;
  valueRenderer?: (
    value: T,
    options: {
      placeholder?: string;
    }
  ) => ReactElement;
  contentProps?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>;
  showCaret?: boolean;
  maxHeight?: number;
} & VariantProps<typeof selectVariants>;

export const Select = <T,>(props: PropsWithChildren<SelectProps<T>>) => {
  const {
    children,
    size,
    error,
    placeholder,
    variant,
    contentProps,
    valueRenderer,
    showCaret,
    maxHeight,
    ...rest
  } = props;

  return (
    <SelectRoot {...rest}>
      <SelectTrigger
        size={size}
        error={error}
        variant={variant}
        showCaret={showCaret}
        className={cnBase(
          "oui-font-semibold focus:oui-ring-transparent",
          !showCaret && "oui-cursor-auto"
        )}
      >
        {typeof valueRenderer === "function" ? (
          valueRenderer((props.value || props.defaultValue) as T, {
            placeholder,
          })
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent {...contentProps}>
        {maxHeight ? (
          <ScrollArea style={{ height: maxHeight }}>{children}</ScrollArea>
        ) : (
          children
        )}
      </SelectContent>
    </SelectRoot>
  );
};
