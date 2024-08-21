import './Reel.css';
import { SvgArrow, SvgHeart, SvgSendMessage } from '@/components/general/svg/SvgComponent.tsx';
import { ChangeEvent, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useAuth } from '@/contexts/auth.context.tsx';
import StoryTypeEnum from '@/enums/story-type.enum.ts';
import ReelsInterface from '@/interfaces/reels.interface.ts';
import { postCommentReel } from '@/api/reels.api.ts';

interface Props {
    reel: ReelsInterface,
    onChangeReel: (type: 'before' | 'after') => void,
}

const Reel = ({ reel, onChangeReel }: Props) => {
    const { user } = useAuth();
    
    const [comment, setComment] = useState('');

    const handleChangeComment = (e: ChangeEvent<HTMLInputElement>): void => {
        setComment(e.target.value);
    };

    const videoEnded = (): void => {
        onChangeReel('after');
    };

    const sendComment = (): void => {
        try {
            postCommentReel(reel.id, comment).then(() => {
                console.log('comment send');
            });
        } catch (e) {
            throw Error(`Comment not sent ${e}`);
        }
    };
    
    return <>
        <div className="reel-container">
            <div className="reel-before" onClick={() => onChangeReel('before')}>
                <SvgArrow/>
            </div>
            <div className="reel">
                <div className="header-reel">
                    <h3>{reel?.name}</h3>
                    <div className="reel-user">
                        <div className="user-img">
                            <img src={reel?.user.image} alt="user-reel-img"/>
                        </div>
                        <h4 className="name">{reel?.user.username}</h4>
                        <h4>{reel?.date}</h4>
                    </div>
                </div>
                <div className="reel-data">
                    {
                        reel?.type === StoryTypeEnum.Video ?
                            <ReactPlayer
                                url={reel.url}
                                controls
                                playing
                                height="100%"
                                onEnded={videoEnded}
                            />
                            :
                            <img src={reel?.url} alt="reel-img"/>
                    }
                </div>
                <div className="footer-reel">
                    <div className="reel-stat">
                        <div className="stat-data">
                            <h4>{reel?.viewsNumber} views</h4>
                            <h4>•</h4>
                            <h4>{reel?.commentsNumber} comments</h4>
                        </div>
                        <div className="reel-like">
                            <SvgHeart/>
                        </div>
                    </div>
                    <div className="reel-comment">
                        <div className="my-img">
                            <img src={user?.image} alt="my-user-img"/>
                        </div>
                        <div className="add-comment">
                            <input
                                type="text"
                                value={comment}
                                onChange={handleChangeComment}
                                placeholder="Add a comment..."
                            />
                        </div>
                        <div className="send-comment" onClick={sendComment}>
                            <SvgSendMessage/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reel-after" onClick={() => onChangeReel('after')}>
                <SvgArrow/>
            </div>
        </div>
    </>;
};

export default Reel;