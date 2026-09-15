import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** NEOSURA's shared body container: max-w matches the viewport at the 1440
 * desktop reference so `px` alone produces the ~60px edge gutter while the
 * content column itself lands at ~1320px — not a container-then-padding
 * double-inset. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-[60px]", className)}>{children}</div>;
}
