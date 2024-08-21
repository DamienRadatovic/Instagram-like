import './ActionButton.css';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode,
    onClickButton: () => void,
}

const ActionButton = ({ children, onClickButton }: Props) => {
    return <>
        <div
            className="action-button-container"
            onClick={onClickButton}
        >
            { children }
        </div>
    </>;
};

export default ActionButton;