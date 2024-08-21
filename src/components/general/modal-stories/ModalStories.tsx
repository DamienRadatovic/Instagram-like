import './ModalStories.css';
import { useEffect, useState } from 'react';
import { SvgCross, SvgInstagram, SvgInstagramText, SvgAdd } from '@/components/general/svg/SvgComponent.tsx';
import PostedStoryInterface from '@/interfaces/posted-story.interface.ts';
import Story from '@/components/story/Story.tsx';
import { getAllStory } from '@/api/story.api.ts';
import StoryInterface from '@/interfaces/story.interface.ts';
import { getAllStories } from '@/api/stories.api.ts';
import CarouselStory from '@/components/general/carousel-story/CarouselStory.tsx';

interface Props {
    onClose?: () => void;
    selectedStoryIndex: number
}

const ModalReels = ({ onClose, selectedStoryIndex }: Props) => {
    const [selectedStory, setSelectedStory] = useState<number>(selectedStoryIndex);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [allStories, setAllStories] = useState<PostedStoryInterface[]>([]);
    const [stories, setStories] = useState<StoryInterface[]>([]);

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
                if (prev + 1 > allStories.length - 1) {
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

    const openStoriesOnIdx = (index: number): void => {
        console.log(index);
        setSelectedStory(index);
    };

    useEffect(() => {
        try {
            getAllStory().then((response: PostedStoryInterface[]) => {
                setAllStories(response);

                getAllStories().then((response: StoryInterface[]) => {
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
            document.documentElement.style.overflowY = 'auto';
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
                    <CarouselStory stories={stories} selectedStory={selectedStory} openStoriesOnIdx={openStoriesOnIdx} />
                    <div className="modal-close-btn" onClick={handleCloseModal}>
                        <div className="close-btn">
                            <SvgCross/>
                        </div>
                    </div>
                </div>
                <div className="story-modal-container">
                    {
                        allStories.length > 0 ?
                            <Story
                                story={allStories[selectedStory]}
                                onChangeStory={handleChangeStory}
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

export default ModalReels;
