"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function TextWordCarousel({
  words,
  interval = 2.6,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || words.length < 2) return;
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % words.length), interval * 1000);
    return () => clearInterval(timer);
  }, [words.length, interval, shouldReduceMotion]);

  const current = shouldReduceMotion ? words[0] : words[index];

  return (
    <span className={className}>
      <motion.span
        key={current}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0, 0, 0.2, 1] }}
        className="word-carousel-word"
      >
        {current}
      </motion.span>
    </span>
  );
}
