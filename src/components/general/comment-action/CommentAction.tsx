import './CommentAction.css';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { SvgSendMessage } from '@/components/general/svg/SvgComponent.tsx';
import { useAuth } from '@/contexts/auth.context.tsx';
import { ChangeEvent, useState } from 'react';

interface Props {
    onReaction: (item: string) => void,
    onSendComment: (comment: string) => void,
}

const CommentAction = ({ onReaction, onSendComment }: Props) => {
    const { user } = useAuth();
    
    const [comment, setComment] = useState<string>('');

    const handleChangeComment = (e: ChangeEvent<HTMLInputElement>): void => {
        setComment(e.target.value);
    };
    
    return <>
        <div className="comment-action-container">
            <div className="story-stat">
                <div className="emoji" onClick={() => onReaction('1f44c')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f44c" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f64c')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f64c" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f4af')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f4af" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f525')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f525" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f44f')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f44f" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f92f')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f92f" size="25"/>
                </div>
                <div className="emoji" onClick={() => onReaction('1f60d')}>
                    <Emoji emojiStyle={EmojiStyle.APPLE} unified="1f60d" size="25"/>
                </div>
            </div>
            <div className="story-comment">
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
                <div className="send-comment" onClick={() => onSendComment(comment)}>
                    <SvgSendMessage/>
                </div>
            </div>
        </div>
    </>;
};

export default CommentAction;