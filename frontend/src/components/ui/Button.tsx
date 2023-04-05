import { ButtonHTMLAttributes } from 'react';

import { classNames } from '../../helpers/common';

export enum BUTTON_TYPES {
  BASE = 'rounded-md inline-block py-2 px-4 min-h-[54px] min-w-[120px] shadow outline-none transition duration-150 ease-in-out',
  PRIMARY = 'bg-light-blue hover:bg-mauve active:bg-pale-lavender text-white disabled:bg-gray-400',
  SECONDARY = 'bg-purple hover:bg-lilac active:bg-mauve text-white disabled:bg-gray-400',
}

type Props = {
  children: React.ReactNode;
  btnType?: BUTTON_TYPES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  btnType = BUTTON_TYPES.PRIMARY,
  ...otherProps
}: Props) => {
  return (
    <button className={classNames(BUTTON_TYPES.BASE, btnType)} {...otherProps}>
      {children}
    </button>
  );
};
