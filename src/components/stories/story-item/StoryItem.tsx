import './StoryItem.css';
import StoryInterface from '@/interfaces/story.interface.ts';
import ModalStory from '@/components/general/modal-story/ModalStory.tsx';
import { useState } from 'react';

interface Props {
    story: StoryInterface,
    onClick?: (storyId: string) => void,
    displayName?: boolean,
    isCloseModalStory?: boolean,
}

const StoryItem = (props: Props) => {
    const [isOpenModalStory, setIsOpenModalStory] = useState<boolean>(false);
    
    const handleClick = (): void => {
        if (props.onClick) {
            props.onClick(props.story.id);
        } else {
            setIsOpenModalStory(true);
        }
    };

    const handleCloseModalStory = (): void => {
        setIsOpenModalStory(false);
    };

    return <>
        <div onClick={handleClick} className="story-item-container">
            <div className={`story-image-container ${props.story.isViewed === true ? 'story-viewed' : ''}`}>
                <div className="border-story"/>
                <img src={props.story.user.image} alt="user-stories-image"/>
            </div>
            {
                props.displayName ? <h4>{props.story.user.username}</h4> : null
            }
        </div>
        {
            isOpenModalStory ?
                <ModalStory
                    isCloseModalStory={props.isCloseModalStory}
                    user={props.story.user}
                    onClose={handleCloseModalStory}
                /> : null
        }
    </>;
};

export default StoryItem;