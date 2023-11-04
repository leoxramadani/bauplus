import React from 'react';

interface ButtonElementProps {
  onClick: () => void; // Specify the type for onClick
  content: String;
}

const ButtonElement: React.FC<ButtonElementProps> = ({
  onClick,
  content,
}) => {
  return (
    <div
      onClick={onClick}
      title="PDF Invoice"
      className='"relative data-[disabled]:opacity-50" flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-red-500 outline-none transition-colors  hover:bg-accent data-[disabled]:pointer-events-none'
    >
      {content}
    </div>
  );
};

export default ButtonElement;
