import './ModalReels.css';
import { useEffect, useState } from 'react';
import { SvgCross, SvgInstagram, SvgInstagramText, SvgAdd } from '@/components/general/svg/SvgComponent.tsx';
import { getReels } from '@/api/reels.api.ts';
import ReelsInterface from '@/interfaces/reels.interface.ts';
import Reel from '@/components/reel/Reel.tsx';

interface Props {
    onClose?: () => void;
}

const ModalReels = ({ onClose }: Props) => {
    const [selectedStory, setSelectedStory] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [reels, setReels] = useState<ReelsInterface[]>([]);

    const handleCloseModal = (): void => {
        setShowModal(false);

        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 500);
    };

    const handleAddStory = (): void => {
        console.log('add-reels');
    };

    const handleChangeStory = (type: 'before' | 'after'): void => {
        if (type === 'after') {
            setSelectedStory((prev) => {
                if (prev + 1 > reels.length - 1) {
                    handleCloseModal();
                    return prev;
                }
                return prev + 1;
            });
        } else {
            setSelectedStory((prev) => {
                if (prev === 0) {
                    handleCloseModal();
                    return prev;
                }
                return prev - 1;
            });
        }
    };

    useEffect(() => {
        getReels().then((response: ReelsInterface[]) => {
            setReels(response);
        });
    }, []);

    return <>
        <div className={`modal-reels-container ${showModal ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal-reels-content">
                <div className="nav-title">
                    <div className="logo">
                        <SvgInstagram/>
                    </div>
                    <div className="text">
                        <SvgInstagramText/>
                    </div>
                </div>
                {
                    reels.length > 0 ?
                        <Reel
                            reel={reels[selectedStory]}
                            onChangeReel={handleChangeStory}
                        />
                        : null
                }
                <div className="modal-reels-right">
                    <div className="modal-close-btn" onClick={handleCloseModal}>
                        <SvgCross/>
                    </div>
                    <div className="add-reels" onClick={handleAddStory}>
                        <SvgAdd />
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default ModalReels;