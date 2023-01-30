import { TColors } from '@/types/ColorType';

export type TWeight =
  | 'font-semibold'
  | 'font-bold'
  | 'font-normal'
  | 'font-medium';

export interface ITypo {
  children: string | JSX.Element | JSX.Element[] | number | React.ReactNode;
  className?: string;
  weight?: TWeight;
  color?: TColors;
  font?: 'font-sans' | 'font-secondary';
}
