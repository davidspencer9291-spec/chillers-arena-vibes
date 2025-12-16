import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventCountdownProps {
  targetDate: Date;
}

export function EventCountdown({ targetDate }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {timeUnits.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center p-3 sm:p-4 bg-background/50 backdrop-blur-sm rounded-lg border border-accent/30 min-w-[70px] sm:min-w-[90px] neon-border-gold"
        >
          <span className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-accent neon-text-gold">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
