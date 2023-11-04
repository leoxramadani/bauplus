import React from 'react';

interface ButtonElementProps {
  onClick: () => void; // Specify the type for onClick
  content: JSX.Element;
}

const ButtonElement: React.FC<ButtonElementProps> = ({
  onClick,
  content,
}) => {
  return (
    <div onClick={onClick} title="PDF Invoice">
      {content}
    </div>
  );
};

export default ButtonElement;
