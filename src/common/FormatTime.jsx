  // Format time
 export const formatTime = (t) => {
    const minutes = Math.floor(t / 60000);
    const seconds = Math.floor((t % 60000) / 1000);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

 export const millisecond = (t) => {
    const ms = Math.floor(t % 1000);
    return `.${String(ms).padStart(3, "0")}`;
  };
