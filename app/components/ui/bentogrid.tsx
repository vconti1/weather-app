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
  data,
  condition,
  img,
  time,
  spareImg,
  icon,
  imgClassName,
  titleClassName,
  temp,
  forecast,
  tempRange,
}: {
  className?: string;
  title: string;
  data?: any;
  condition?: string | React.ReactNode;
  header?: React.ReactNode;
  img? : string;
  time?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg? : string;
  icon?: string;
  temp?: string
  forecast?: string;
  tempRange?: string;

}) => {
   //console.log("BentoGrid received data:", data);
  return (
    <div
      className={cn(
        "group/bento row-span-1 w-full flex flex-row justify-between rounded-xl border border-neutral-200 p-10 transition duration-200 border-white/[1.0] shadow-none overflow-hidden",
        className,
      )}
    >
      {/* START TOP ROW */}

      <div className = "flex flex-col w-full">
      <div className = "flex flex-row pb-10">

      <div className = "relative flex flex-1 min-w-0 flex-col w-217 ">
          <div className="relative min-w-0 mt-2 mb-2 font-sans font-bold text-5xl h-12 overflow-hidden">
            {/* Fade gradient on the right */}
            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
             <div className="whitespace-nowrap">
              {title}
            </div>
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
      <div className = "flex-shrink-0">
      <img src = {img}/>
      </div>
      </div>

      <div className="flex justify-center pt-5">
        <div className="items-center h-32 w-full max-w-4xl overflow-x-auto overflow-y-hidden bg-transparent rounded-lg scroll-smooth whitespace-nowrap thin-scrollbar ">
              {/* This is where scroll content goes */}
              {data.map((hour:any, index:number) => (
                 <div key={index} className="inline-block text-center w-24 mx-2 text-white">
                  <p className = "text-sm">{hour.time}</p>
                  <img src={hour.icon} alt="weather icon" className="mx-auto" />
                  <p>{hour.temp_f}°</p>
                </div>
              ))}

        </div> 
      </div>

      </div>
    </div>
  );
};
