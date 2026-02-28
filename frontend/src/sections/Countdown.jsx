import { useEffect, useState } from "react";

const Countdown = ({ date }) => {
  const [time, setTime] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(date) - new Date();
      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <div className="text-warning fw-bold">
      {time.days}d {time.hours}h {time.minutes}m left
    </div>
  );
};

export default Countdown;
