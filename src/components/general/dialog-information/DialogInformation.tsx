import './DialogInformation.css';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
    children: ReactNode,
}

const DialogInformation = ({ children }: Props) => {
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        setShowDialog(true);

        setTimeout(() => {
            setShowDialog(false);
        }, 3000);
    }, []);

    return <>
        <div className={`dialog-information-container ${showDialog ? 'show' : 'hide'}`}>
            { children }
        </div >
    </>;
};

export default DialogInformation;