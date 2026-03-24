import { useState, useEffect } from "react";

type Props = { words: string[]; interval?: number };

export const RotatingWord = ({ words, interval = 3000 }: Props) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((p) => (p + 1) % words.length);
        setIsAnimating(false);
      }, 400);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className="inline-block pl-[4px] transition-all duration-400 ease-in-out"
      style={{
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? "translateY(8px)" : "translateY(0)",
        filter: isAnimating ? "blur(2px)" : "blur(0)",
      }}
    >
      <em className="italic text-accent-amber">{words[index]}</em>
    </span>
  );
};
