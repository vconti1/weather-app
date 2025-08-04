import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FeelsLikeItem = ({
  className,
  title,
  description,
  temp,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  temp?: string;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input p-4 row-span-1 flex flex-col items-center justify-between h-full space-y-4 rounded-xl border border-neutral-200 transition duration-200 dark:border-white/[1]",
        className,
      )}
    >
        <div className="absolute mt-2 mb-2 text-center font-sans text-3xl text-white">
          {title}
        </div>
        <div className = " flex text-white pt-13 items-center justify-center h-full w-full text-4xl">
          {temp}
        </div>
        <div className = "text-white text-center">
          {description}
        </div>
        
    </div>
  );
};
