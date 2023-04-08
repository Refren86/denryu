import { ButtonHTMLAttributes } from 'react';

import { classNames } from '../../helpers/common';

export enum BUTTON_TYPES {
  BASE = 'rounded-md inline-block py-2 px-4 min-h-[54px] min-w-[120px] transition duration-150 ease-in-out',
  PRIMARY = 'bg-black border border-black hover:bg-white hover:text-black text-white disabled:bg-gray-400 disabled:border-none disabled:hover:text-white',
  // SECONDARY = 'bg-purple hover:bg-lilac active:bg-mauve text-white disabled:bg-gray-400',
}

type Props = {
  children: React.ReactNode;
  btnType?: BUTTON_TYPES;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  btnType = BUTTON_TYPES.PRIMARY,
  className = '',
  ...otherProps
}: Props) => {
  return (
    <button
      className={classNames(BUTTON_TYPES.BASE, btnType, className)}
      {...otherProps}
    >
      {children}
    </button>
  );
};
