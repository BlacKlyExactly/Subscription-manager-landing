import { cn } from "@/lib/utils";

export default function GridBackground() {
  return (
    <div className="absolute -z-1 flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e780_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e780_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#26262680_1px,transparent_1px),linear-gradient(to_bottom,#26262680_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,var(--background))] bg-background"></div>
    </div>
  );
}
