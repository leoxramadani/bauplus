import { cn } from '@/lib/utils';
import { Card } from '@tremor/react';
import React, {
  CSSProperties,
  HTMLAttributes,
  forwardRef,
} from 'react';

interface CustomGridItemProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties;
  children: React.ReactNode;
  className?: string;
}

const GridItem = forwardRef<HTMLDivElement, CustomGridItemProps>(
  (
    {
      style,
      className,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        style={{ ...style }}
        className={cn(
          className,
          'flex flex-col items-center justify-center'
        )}
        ref={ref}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
        {...props}
      >
        {/* <div className='grid-item__title bg-zinc-200 h-3 w-full  max-w-[80px] rounded-3xl absolute top-2 left-1/2 -translate-x-1/2 group-hover:opacity-100 cursor-move  opacity-0 transition-all'></div> */}

        {children}
      </Card>
    );
  }
);

GridItem.displayName = 'GridItem';

export default GridItem;
