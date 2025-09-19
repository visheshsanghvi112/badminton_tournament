import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label, index }: { value: number; label: string; index: number }) => (
    <div className="text-center" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="bg-primary-soft rounded-lg p-4 min-w-[80px] shadow-card hover:shadow-tournament transition-all duration-300">
        <div className="text-2xl md:text-3xl font-bold text-primary">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center space-x-4">
      <TimeUnit value={timeLeft.days} label="Days" index={0} />
      <TimeUnit value={timeLeft.hours} label="Hours" index={1} />
      <TimeUnit value={timeLeft.minutes} label="Minutes" index={2} />
      <TimeUnit value={timeLeft.seconds} label="Seconds" index={3} />
    </div>
  );
};

export default CountdownTimer;