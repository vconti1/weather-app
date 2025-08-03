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

export const BentoGridItem = ({
  className,
  title,
  description,
  condition,
  header,
  img,
  spareImg,
  icon,
  imgClassName,
  titleClassName,
  temp,
  tempRange,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  condition?: string | React.ReactNode;
  header?: React.ReactNode;
  img? : string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg? : string;
  icon?: React.ReactNode;
  temp?: string
  tempRange?: string;

}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-row justify-between space-y-4 rounded-xl border border-neutral-200 p-10 transition duration-200 hover:shadow-xl border-white/[1.0] shadow-none",
        className,
      )}
    >
      {/* START LEFT COLUMN */}
      <div className = "flex flex-row">
        <div className="transition duration-200">
          {icon}
          <div className="mt-2 mb-2 font-sans font-bold text-5xl">
            {title}
          </div>
          <div className = "font-sans text-5xl">
            {temp}
          </div>
          <div className = "font-sans text-xl">
            {tempRange}
          </div>
          <div className="font-sans text-xl font-normal text-neutral-600 dark:text-neutral-300">
            {condition}
          </div>
          
        </div>
      </div>
      {/* END LEFT COLUMN */}

      {/* START RIGHT COLUMN */}
      <div className = "">
      <img src = {img}/>
      </div>

    </div>
  );
};
