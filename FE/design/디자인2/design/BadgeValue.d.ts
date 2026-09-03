import * as React from 'react';
export interface BadgeValueProps {
  className?: string;
  style?: React.CSSProperties;
  prop?: boolean;
  text?: string;
  variant?: "normal" | "customize";
  /** Text content; defaults to "default". */
  text1?: string;
}
export declare const BadgeValue: React.FC<BadgeValueProps>;
export default BadgeValue;
