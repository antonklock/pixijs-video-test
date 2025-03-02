import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2025-03-05T16:00:00+01:00");

  // State to store the remaining time
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to track if the date has passed
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const currentTime = new Date();
      const timeDifference = targetDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        // Target date has passed
        setIsExpired(true);
        location.reload();
        return;
      }

      // Calculate time units
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update countdown every second
    const timer = setInterval(calculateTimeRemaining, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Create time display component
  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2">
      <div className="text-2xl font-bold border text-white rounded px-4 py-2 min-w-16 text-center">
        {value}
      </div>
      <div className="text-sm mt-1">{label}</div>
    </div>
  );

  return (
    <div className="w-full mt-2">
      {isExpired ? (
        <></>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            Time Until Launch
          </h2>
          <div className="flex justify-center">
            <TimeUnit value={timeRemaining.days} label="Days" />
            <TimeUnit value={timeRemaining.hours} label="Hours" />
            <TimeUnit value={timeRemaining.minutes} label="Minutes" />
            <TimeUnit value={timeRemaining.seconds} label="Seconds" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
