import React from 'react';
import { Button } from '../Button';

interface IProps {
    description: string;
    button: string;
    onClick: () => void;
}

export const Modal: React.FC<IProps> = (props) => (
    <div className="modal">
        <div className="modal__content">
            <p>{props.description}</p>
            <Button label={props.button} onClick={props.onClick} />
        </div>
    </div>
);
