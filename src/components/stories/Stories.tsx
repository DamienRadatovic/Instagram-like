import './Stories.css';
import { useEffect, useState } from 'react';
import StoryInterface from '@/interfaces/story.interface.ts';
import { getPersonalStories, getStories } from '@/api/stories.api.ts';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';
import PersonalStoryInterface from '@/interfaces/personal-story.interface.ts';
import { useAuth } from '@/contexts/auth.context.tsx';
import { SvgCross } from '@/components/general/svg/SvgComponent.tsx';
import ModalStories from '@/components/general/modal-stories/ModalStories.tsx';

const Stories = () => {
    const { user } = useAuth();
    const [stories, setStories] = useState<StoryInterface[]>([]);
    const [myStories, setMyStories] = useState<PersonalStoryInterface|null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
    
    const closeModal = (): void => {
        setIsOpenModal(false);
        setSelectedStoryIndex(0);
    };
    
    const watchAllStories = (): void => {
        setIsOpenModal(true);
    };

    const openStoriesOnIdx = (index: number): void => {
        setSelectedStoryIndex(index);
        setIsOpenModal(true);
    };

    const viewMyStory = (): void => {
        if (myStories?.stories === false) {
            console.log('addStory');
        } else {
            if (myStories?.id) {
                console.log('change this');
                setSelectedStoryIndex(0);
                setIsOpenModal(true);
            }
        }
    };

    useEffect(() => {
        if (isOpenModal === false) {
            try {
                getStories().then((response: StoryInterface[]) => {
                    setStories(response);
                });
                getPersonalStories().then((response: PersonalStoryInterface) => {
                    setMyStories(response);
                });
            } catch (e) {
                throw Error('Error for loading stories.');
            }
        }
    }, [isOpenModal]);
    
    return <>
        <div className="stories-container">
            <div className="story-item-container">
                <div
                    onClick={viewMyStory}
                    className={`story-image-container ${myStories?.stories === false ? 'story-viewed' : ''}`}
                >
                    <div className="border-story"/>
                    <img src={user?.image} alt="user-stories-image"/>
                    {
                        myStories?.stories === false ?
                            <div className="add-reels">
                                <SvgCross/>
                            </div> : null
                    }
                </div>
                <h4>Your Story</h4>
            </div>
            {
                stories.map((story, index) => (
                    <StoryItem displayName={true} onClick={() => openStoriesOnIdx(index)} key={story.id} story={story}/>
                ))
            }
            <div className="watch-all" onClick={watchAllStories}>
                <div className="item">
                    <div className="arrow-left" />
                </div>
                <h4>Watch all</h4>
            </div>
        </div>
        {
            isOpenModal ? <ModalStories selectedStoryIndex={selectedStoryIndex} onClose={closeModal} /> : null
        }
    </>;
};

export default Stories;