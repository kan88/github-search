import React, { useEffect, useState } from "react";

export default function useDebounce(
  value: string,
  delay: number = 300
): string {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
