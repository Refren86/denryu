import { FC, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from './Button';

interface IFilterProps {
  testData: {
    category: string;
    title: string;
  }[];
}

export const Filter: FC<IFilterProps> = (props) => {
  const { testData } = props;

  const [cards, setCards] = useState(
    testData.filter((el: any) => el.category === 'cars')
  );

  const buttons = testData.reduce((acc, el) => {
    if (acc.includes(el.category)) return acc; // do not do anything with array

    return [...acc, el.category];
  }, [] as string[]);

  const handleFilter = (selector: string) => {
    setCards(testData.filter((el) => el.category === selector));
  };

  return (
    <div>
      <div>
        {buttons.map((btnText) => (
          <Button
            key={btnText}
            text={btnText}
            handleClick={() => handleFilter(btnText)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <AnimatePresence initial={false} mode='wait'>
          {cards.map((card) => (
            <motion.div
              key={card.title}
              className="w-[200px] h-[200px] bg-blue-400 rounded-md flex justify-center items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .2 }}
            >
              {card.title}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
