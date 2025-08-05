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
  icon,
}: {
  className?: string;
  data?: any;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 p-9 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 transition duration-200 dark:border-white/[1]",
        className,
      )}
    >
        <div className = "flex justify-center">
          <div className = "">
            {data.map((day:any, index:number)=>(
              <div key={index} className={`inline-block text-center w-35 mx-2 text-white ${
                index===2 ? 'hidden md:inline-block' : ''
              }`}>
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
