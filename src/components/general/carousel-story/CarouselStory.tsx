import './CarouselStory.css';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';
import StoryInterface from '@/interfaces/story.interface.ts';
import { useEffect, useState } from 'react';

interface Props {
    stories: StoryInterface[],
    selectedStory: number,
    openStoriesOnIdx: (index: number) => void,
}

const CarouselStory = ({ stories, selectedStory, openStoriesOnIdx }: Props) => {
    const [selectedIndex, setSelectedIndex] = useState(selectedStory);

    const handleItemClick = (index: number): void => {
        setSelectedIndex(index);
        openStoriesOnIdx(index);
    };

    const setTranslateX = (index: number): string => {
        if (index === selectedIndex) {
            return '-50%';
        }

        const gap = (30 + 50) * Math.abs(index - selectedIndex);

        if (index < selectedIndex) {
            return `calc(-100% - ${gap}px)`;
        }

        return `${gap}px`;
    };

    const itemIsDisplayed = (index: number): boolean => {
        const windowSize = ((window.innerWidth * 74) / 100) / 2;
        const gap = (30 + 50) * Math.abs(index - selectedIndex);

        if (gap <= windowSize) {
            return true;
        } return false;
    };

    const setOpacity = (index: number): string => {
        const diff = Math.abs(index - selectedIndex) + 3;

        if (diff === 3) {
            return '1';
        }

        return `${1 - diff/10}`;
    };

    const setVisibility = (index: number): string => {
        if (!itemIsDisplayed(index)) {
            return 'hidden';
        }

        return 'visible';
    };

    useEffect(() => {
        setSelectedIndex(selectedStory);
    }, [selectedStory]);

    return (
        <div className="carousel-container">
            <div className="carousel">
                {stories.map((story, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                        <div
                            key={story.id}
                            className={`carousel-item ${isSelected ? 'center' : ''}`}
                            style={{
                                transform: `translateX(${setTranslateX(index)}) translateY(calc(-50% + 10px))`,
                                opacity: setOpacity(index),
                                visibility: setVisibility(index)
                            }}
                        >
                            <StoryItem displayName={true} onClick={() => handleItemClick(index)} story={story} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CarouselStory;
