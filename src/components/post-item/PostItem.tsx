import './PostItem.css';
import PostInterface from '@/interfaces/post.interface.ts';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';
import { useEffect, useState } from 'react';
import StoryInterface from '@/interfaces/story.interface.ts';
import { getStoryByUser } from '@/api/stories.api.ts';
import { SvgHeart, SvgHeartSelect, SvgMessage, SvgSendMessage } from '@/components/general/svg/SvgComponent.tsx';
import { useAuth } from '@/contexts/auth.context.tsx';
import UserInterface from '@/interfaces/user.interface.ts';
import { getDate } from '@/utils/date.utils.ts';

interface Props {
    post: PostInterface,
    sizeGrid: number,
    onAction: (type: 'like' | 'comment' | 'message' | 'unLike', postId: string) => void,
    onOpenProfile: (user: UserInterface) => void,
    onOpenDetailedPost: (post: PostInterface) => void,
}

const PostItem = ({ post, sizeGrid, onAction, onOpenProfile, onOpenDetailedPost }: Props) => {
    const { user } = useAuth();
    const [userStory, setUserStory] = useState<StoryInterface|null>(null);

    const handleClickLike = (): void => {
        if (!post.likes.some((postUser) => postUser.id === user?.id)) {
            onAction('like', post.id);
        } else {
            onAction('unLike', post.id);
        }
    };

    const handleClickViewProfile = (): void => {
        onOpenProfile(post.user);
    };

    useEffect(() => {
        getStoryByUser(post.user).then((response: StoryInterface) => {
            setUserStory(response);
        });
    }, []);

    return <>
        <div
            className="post-item-container"
            style={{
                flex: `1 1 ${100 / sizeGrid}%`,
                maxWidth: `${100 / sizeGrid}%`,
            }}
        >
            <img className="img-post-item" onClick={() => onOpenDetailedPost(post)} src={post.url}  alt={`post-item-${post.id}`}/>
            <div className="footer-post-item">
                <div className="left">
                    {userStory ? <StoryItem story={userStory}/> : null}
                    <div className="left-info" onClick={handleClickViewProfile}>
                        <h4>{ post.user.username }</h4>
                        <h5>{ getDate(post.date) }</h5>
                    </div>
                </div>
                <div className="rigth">
                    <h4>{ post.likes.length } { post.likes.length > 1 ? 'likes' : 'like' }</h4>
                    <div className="post-icon">
                        <div className="icon" onClick={handleClickLike}>
                            {
                                post.likes.some((postUser) => postUser.id === user?.id) ?
                                    <SvgHeartSelect />
                                    :
                                    <SvgHeart/>
                            }
                        </div>
                        <div className="icon" onClick={() => onAction('comment', post.id)}>
                            <SvgMessage/>
                        </div>
                        <div className="icon" onClick={() => onAction('message', post.id)}>
                            <SvgSendMessage/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default PostItem;
