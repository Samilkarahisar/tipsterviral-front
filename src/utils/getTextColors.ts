import { TColors } from '@/types/ColorType';

const getDarkColor = (color: TColors) => {
  switch (color) {
    case 'gray1':
      return 'text-gray1 dark:text-dark-gray1';
    case 'gray2':
      return 'text-gray2';
    case 'gray3':
      return 'text-gray3 dark:text-dark-gray3';
    case 'green1':
      return 'text-green1';
    case 'green2':
      return 'text-green2 dark:text-dark-green2';
    case 'red':
      return 'text-red';
    case 'white':
      return 'text-white dark:text-dark';
    case 'secondary':
      return 'text-secondary dark:text-dark-secondary';
  }
};

export default getDarkColor;
