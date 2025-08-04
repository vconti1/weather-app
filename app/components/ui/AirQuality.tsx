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

export const AirQualityItem = ({
  className,
  title,
  airQuality,
  risk,
  info,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  airQuality?: number;
  risk?: string;
  info?: string;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 p-4 flex flex-col justify-between items-center space-y-4 rounded-xl border border-neutral-200 transition duration-200 dark:border-white/[1]",
        className,
      )}
    >
         <div className="text-center font-sans text-3xl h-[20px] text-white">
          {title}
        </div>
        <div className = "flex text-white m-0">
          <em>{risk}</em>
        </div>
        <div className = "flex text-white items-center justify-center h-full w-full text-4xl m-0">
          {airQuality}
        </div>
        <div className = "text-sm text-center">
            {info}
        </div>
    </div>
  );
};
