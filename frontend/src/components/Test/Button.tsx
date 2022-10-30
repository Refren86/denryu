import { motion } from 'framer-motion';

type ButtonProps = {
  text: string;
  handleClick: () => void
}

// Function.prototype or () => {}
export const Button = ({text, handleClick = () => {}}: ButtonProps) => {
  return (
    <motion.button className="secondary-button mr-2" onClick={handleClick}>
      {text}
    </motion.button>
  );
}