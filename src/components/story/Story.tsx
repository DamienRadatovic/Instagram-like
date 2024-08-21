import './Story.css';
import { SvgArrow } from '@/components/general/svg/SvgComponent.tsx';
import PostedStoryInterface from '@/interfaces/posted-story.interface.ts';
import { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy';
import { postCommentStory, setViewedStory } from '@/api/story.api.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';
import CommentAction from '@/components/general/comment-action/CommentAction.tsx';

interface Props {
    story: PostedStoryInterface,
    onChangeStory: (type: 'before' | 'after') => void,
}

const Story = ({ story, onChangeStory }: Props) => {
    const videoEnded = (): void => {
        onChangeStory('after');
    };
    
    const handleSendComment = (comment: string): void => {
        try {
            postCommentStory(story.id, comment).then(() => {
                console.log('comment send');
            });
        } catch (e) {
            throw Error(`Comment not sent ${e}`);
        }
    };

    const handleReaction = (emojiString: string): void => {
        const emo = String.fromCodePoint(Number(`0x${emojiString}`));
        console.log(emo);
    };

    useEffect(() => {
        setViewedStory(story.id).then(() => {});
    }, []);
    
    return <>
        <div className="story-container">
            <div className="story">
                <div className="story-data">
                    <div className="story-before" onClick={() => onChangeStory('before')}>
                        <SvgArrow/>
                    </div>
                    {
                        story.type === StoryTypeEnum.Video ?
                            <ReactPlayer
                                url={story.url}
                                controls
                                playing
                                height="100%"
                                onEnded={videoEnded}
                            />
                            :
                            <img src={story.url} alt="story-img"/>
                    }
                    <div className="story-after" onClick={() => onChangeStory('after')}>
                        <SvgArrow/>
                    </div>
                </div>
                <CommentAction onReaction={handleReaction} onSendComment={handleSendComment} />
            </div>
        </div>
    </>;
};

export default Story;