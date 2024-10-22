import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  useEffect(() => {
    const savedStartTime = localStorage.getItem('startTime');
    if (savedStartTime) {
      const elapsedSeconds = Math.floor((Date.now() - parseInt(savedStartTime)) / 1000);
      const remainingSeconds = Math.max(0, 120 - (elapsedSeconds % 125));
      setCountdownSeconds(remainingSeconds);
    } else {
      setCountdownSeconds(120);
      localStorage.setItem('startTime', Date.now().toString());
    }

    const intervalId = setInterval(() => {
      setCountdownSeconds(prevSeconds => {
        const newSeconds = prevSeconds - 1;
        if (newSeconds <= 0) {
          setTimeout(() => {
            setCountdownSeconds(120);
            localStorage.setItem('startTime', Date.now().toString());
          }, 5000);
        }
        return newSeconds >= 0 ? newSeconds : 0;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Calculate minutes and seconds from countdownSeconds
  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;

  return (
    <div className="flex space-x-1">
      {minutes.toString().padStart(2, '0').split('').map((digit, index) => (
        <div key={`minute-${index}`} className="bg-gray-200 rounded-md p-1 w-8 text-center">
          <p className="text-lg font-semibold">{digit}</p>
        </div>
      ))}
      <div >
        <p className="text-xl font-semibold">:</p>
      </div>
      {seconds.toString().padStart(2, '0').split('').map((digit, index) => (
        <div key={`second-${index}`} className="bg-gray-200 rounded-md p-1 w-8 text-center">
          <p className="text-lg font-semibold">{digit}</p>
        </div>
      ))}
    </div>


  );
}

export default CountdownTimer;



