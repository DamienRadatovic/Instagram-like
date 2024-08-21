import { useEffect, useState } from 'react';
import { SvgCross, SvgInstagram, SvgInstagramText, SvgAdd } from '@/components/general/svg/SvgComponent.tsx';
import PostedStoryInterface from '@/interfaces/posted-story.interface.ts';
import Story from '@/components/story/Story.tsx';
import { getUserStory } from '@/api/story.api.ts';
import StoryInterface from '@/interfaces/story.interface.ts';
import { getUserStories } from '@/api/stories.api.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';

interface Props {
    onClose?: () => void,
    user: UserInterface,
    isCloseModalStory?: boolean,
}

const ModalStory = ({ onClose, user, isCloseModalStory }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    const [story, setStory] = useState<PostedStoryInterface|null>(null);
    const [stories, setStories] = useState<StoryInterface|null>(null);

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

    useEffect(() => {
        try {
            getUserStory(user).then((response: PostedStoryInterface) => {
                setStory(response);

                getUserStories(user).then((response: StoryInterface) => {
                    setStories(response);
                });
            });
        } catch (e) {
            throw Error('Error getting stories on id');
        }
    }, []);

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            if (isCloseModalStory) {
                document.documentElement.style.overflowY = 'hidden';
            } else {
                document.documentElement.style.overflowY = 'auto';
            }
        };
    }, []);

    return <>
        <div className={`modal-stories-container ${showModal ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal-stories-content">
                <div className="modal-stories-header">
                    <div className="nav-title">
                        <div className="logo">
                            <SvgInstagram/>
                        </div>
                        <div className="text">
                            <SvgInstagramText/>
                        </div>
                    </div>
                    { stories ? <StoryItem story={stories} /> : null }
                    <div className="modal-close-btn" onClick={handleCloseModal}>
                        <div className="close-btn">
                            <SvgCross/>
                        </div>
                    </div>
                </div>
                <div className="story-modal-container">
                    {
                        story ?
                            <Story
                                story={story}
                                onChangeStory={() => {}}
                            />
                            : null
                    }
                </div>
                <div className="modal-add-stories">
                    <div className="add-stories" onClick={handleAddStory}>
                        <SvgAdd />
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default ModalStory;
