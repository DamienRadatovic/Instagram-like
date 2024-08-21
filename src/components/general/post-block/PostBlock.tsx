import './PostBlock.css';
import PostInterface from '@/interfaces/post.interface.ts';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';
import StoryInterface from '@/interfaces/story.interface.ts';
import { SvgHeart, SvgMark, SvgMessage, SvgSendMessage } from '@/components/general/svg/SvgComponent.tsx';
import { getDate } from '@/utils/date.utils.ts';
import { useEffect, useState } from 'react';
import { getCommentsFromPost } from '@/api/comment.api.ts';
import CommentInterface from '@/interfaces/comment.interface.ts';
import CommentAction from '@/components/general/comment-action/CommentAction.tsx';

interface Props {
    post: PostInterface,
    topView: boolean,
    userStory?: StoryInterface,
    id?: string,
}

const PostBlock = ({ post, topView, userStory, id }: Props) => {
    const [comments, setComments] = useState<CommentInterface[]>([]);

    const handleClickLike = (): void => {
        console.log('handleClickLike');
    };

    const handleClickComment = (): void => {
        console.log('handleClickLike');
    };

    const handleClickSendMessage = (): void => {
        console.log('handleClickLike');
    };

    const handleClickLikeComment = (comment: CommentInterface): void => {
        console.log('handleClickLikeComment', comment.id);
    };

    const setDetailedLikes = () => {
        if (post.likes.length === 1) {
            return <h3>Liked by <p>{post.likes[0].username}</p></h3>;
        }

        if (post.likes.length > 1) {
            return <h3>Liked by <p>{post.likes[Math.round(Math.random() * post.likes.length)].username}</p> and <p>{post.likes.length} others</p></h3>;
        }

        return <h3>No like yet</h3>;
    };

    const handleSendComment = (str: string): void => {
        console.log('sendComment', str);
    };

    const handleReaction = (emojiString: string): void => {
        const emo = String.fromCodePoint(Number(`0x${emojiString}`));
        console.log(emo);
    };

    useEffect(() => {
        getCommentsFromPost(post.id).then((response: CommentInterface[]) => {
            setComments(response);
        });
    }, []);

    return <>
        <div
            id={id}
            className="post-container"
            style={{
                flex: '1 1 100%',
            }}
        >
            <img src={post.url} alt='post' className="img-post-block"/>
            <div className="post-container-info">
                <div className="post-block-top">
                    {
                        topView ?
                            <div className="block-top">
                                { userStory ? <StoryItem isCloseModalStory={true} story={userStory}/> : null }
                                <div className="block-top-information">
                                    <h3>{ post.user.username }</h3>
                                    <h4>{ post.user.description }</h4>
                                </div>
                            </div> : null
                    }
                    <div className="block-content">
                        <div className="block-actions">
                            <div className="left-actions">
                                <div className="action" onClick={handleClickLike}>
                                    <SvgHeart/>
                                </div>
                                <div className="action" onClick={handleClickComment}>
                                    <SvgMessage/>
                                </div>
                                <div className="action" onClick={handleClickSendMessage}>
                                    <SvgSendMessage/>
                                </div>
                            </div>
                            <div className="right-actions">
                                <div className="action" onClick={handleClickLike}>
                                    <SvgMark/>
                                </div>
                            </div>
                        </div>
                        <div className="block-details">
                            { setDetailedLikes() }
                            <h3>{ post.title }</h3>
                            <h4>{ getDate(post.date) }</h4>
                            <div className="list-comment">
                                {
                                    comments.map((comment: CommentInterface) => (
                                        <div className="comment-container" key={comment.id}>
                                            <div className="comment-action" onClick={() => handleClickLikeComment(comment)}>
                                                <SvgHeart/>
                                            </div>
                                            <div className="comment-content">
                                                <h3 className="comment-owner">{comment.owner.username}</h3>
                                                <h3 className="comment">{comment.comment}</h3>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-bottom">
                    <CommentAction onReaction={handleReaction} onSendComment={handleSendComment} />
                </div>
            </div>
        </div>
    </>;
};

export default PostBlock;
