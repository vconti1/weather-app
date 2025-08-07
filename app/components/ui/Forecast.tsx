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

export const ForecastItem = ({
  className,
  city,
  region,
  data,
  condition,
  img,
  temp,
  tempRange,
  rainChance,
}: {
  className?: string;
  city: string;
  region?: string;
  data?: any;
  condition?: string | React.ReactNode;
  header?: React.ReactNode;
  img? : string;
  icon?: string;
  temp?: string
  tempRange?: string;
  rainChance?:string;

}) => {
   //console.log("BentoGrid received data:", data);
  return (
    <div
      className={cn(
        "group/bento row-span-1 w-full flex flex-row justify-between rounded-xl border border-neutral-200 p-10 transition duration-200 border-white/[1.0] shadow-none overflow-hidden",
        className,
      )}
    >

      <div className = "flex flex-col w-full">
      <div className = "flex flex-row pb-10">

      <div className = "relative flex flex-1 min-w-0 flex-col w-217  ">
            <em className = "mt-2 font-sans overflow-hidden whitespace-nowrap">
              {region}
            </em>
          <div className="relative min-w-0 mb-2 font-sans font-bold xl:text-5xl lg:text-5xl md:text-4xl sm:text-4xl h-12 overflow-hidden">
            {/* Fade gradient on the right */}
            <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
      
             <div className="whitespace-nowrap ">
              {city}
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

      <div className="relative w-full max-w-4xl">

      <div className="absolute left-0 top-0 h-[125px] w-10 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="absolute right-0 top-0 h-[125px] w-10 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

              <div className="flex justify-center pt-5">
                <div className="items-center h-38 w-full max-w-4xl overflow-x-auto overflow-y-hidden bg-transparent rounded-lg scroll-smooth whitespace-nowrap thin-scrollbar ">
                  {/* This is where scroll content goes */}
                  {data.map((hour:any, index:number) => (
                    <div key={index} className="inline-block text-center w-24 mx-2 text-white">
                      <p className = {`text-md ${index===0?"font-bold":""}`}>{hour.time}</p>
                      <img src={hour.icon} alt="weather icon" className={`mx-auto ${hour.chance_of_rain===0 ? "my-3":"my-[2px]"}`} />
                      {(hour.chance_of_rain > 0) && (
                        <p className = "text-sm text-blue-400">{`${hour.chance_of_rain}%`}</p>
                      )}
                      <p className = "text-lg">{hour.temp_f}°</p>
                    </div>
                  ))}
              </div> 
            </div>
        </div>
      </div>
    </div>
  );
};
