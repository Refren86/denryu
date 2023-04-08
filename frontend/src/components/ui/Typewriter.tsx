import { useState, useEffect } from 'react';

type Props = {
  sentences: string[];
};

export const Typewriter = ({ sentences }: Props) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Keeps track of the current sentence in the array
  const [isDeleting, setIsDeleting] = useState(false);
  const [delay, setDelay] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentText = sentences[currentIndex];

      if (!isDeleting) {
        setText(currentText.substring(0, text.length + 1));
        setDelay(100);
      } else {
        setText(currentText.substring(0, text.length - 1));
        setDelay(50);
      }

      // Check if the sentence is fully typed
      if (!isDeleting && text === currentText) {
        setIsDeleting(true);
        setDelay(1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        //  Increment the current index to move to the next sentence
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sentences.length); // 1 % 3 = 1; 2 % 3 = 2; 3 % 3 = 0;
      }
    };

    const timeout = setTimeout(handleType, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, delay, currentIndex, sentences]);

  return <>{text}</>;
};
