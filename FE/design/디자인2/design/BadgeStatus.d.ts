import * as React from 'react';
export interface BadgeStatusProps {
  className?: string;
  style?: React.CSSProperties;
  updated?: boolean;
  text?: string;
  available?: boolean;
  /** Swappable nested instance; defaults to the design's. */
  icon2?: React.ReactNode;
}
export declare const BadgeStatus: React.FC<BadgeStatusProps>;
export default BadgeStatus;
