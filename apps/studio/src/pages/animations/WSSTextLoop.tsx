import { useState, useEffect } from 'react';

interface WSSTextLoopProps {
  texts?: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenTexts?: number;
  stopAtEnd?: boolean;
}

const WSSTextLoop: React.FC<WSSTextLoopProps> = ({
  texts = ["You ask : We design", "We design : You dream", "You dream : We code", "We code : You grow"],
  typingSpeed = 200,
  erasingSpeed = 200,
  delayBetweenTexts = 500,
  stopAtEnd = true,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (texts.length === 0) return;

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentText === texts[currentTextIndex]) {
        // Texte complètement écrit, on attend avant d'effacer
        if (stopAtEnd && currentTextIndex === texts.length - 1) {
          // Arrêter l'animation à la dernière phrase si stopAtEnd est true
          return;
        } else {
          timeout = setTimeout(() => {
            setIsTyping(false);
          }, delayBetweenTexts);
        }
      } else {
        // Continuer à écrire
        timeout = setTimeout(() => {
          setCurrentText(texts[currentTextIndex].substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (currentText === '') {
        // Texte complètement effacé, on passe au texte suivant
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      } else {
        // Continuer à effacer
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, erasingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isTyping, texts, typingSpeed, erasingSpeed, delayBetweenTexts, stopAtEnd]);

  return (
    <span>{currentText}</span>
  );
};

export default WSSTextLoop;