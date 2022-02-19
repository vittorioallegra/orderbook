import React from 'react';

interface IProps {
    label: string;
    onClick: () => void;
}

export const Button: React.FC<IProps> = (props) => (
    <button className="button" onClick={props.onClick}>
        {props.label}
    </button>
);
