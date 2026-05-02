interface AnimatedLetterProps {
  char: string;
  progress: number;
}

export default function AnimatedLetter({ char, progress }: AnimatedLetterProps) {
  const opacity = 0.2 + progress * 0.8;
  return (
    <span style={{ opacity: Math.max(0.2, Math.min(1, opacity)) }}>
      {char}
    </span>
  );
}
