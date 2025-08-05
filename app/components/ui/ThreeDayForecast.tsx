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

export const ThreeDayForeCastItem = ({
  className,
  data,
}: {
  className?: string;
  data?: any;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 p-9 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 transition duration-200 dark:border-white/[1]",
        className,
      )}
    >
        <div className = "relative flex justify-center">
          <div className = "flex flex-nowrap overflow-hidden">
            {/* Fade gradient on the right */}
            <div className="absolute right-0 top-0 h-[260px] w-[166px] bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            {data.map((day:any, index:number)=>(
              <div key={index} className= 'inline-block text-center w-35 mx-2 text-white flex-nowrap'>                
                  <p className = "sm:text-sm md:text-md lg:text-lg">{day.day_name}</p>
                  <img src={day.icon} alt="weather icon" className="mx-auto" />
                  <p className = "flex-row">{day.temp_low}° — {day.temp_high}°</p>
                </div>
            ))}
          </div>
        </div>
    </div>
  );
};
