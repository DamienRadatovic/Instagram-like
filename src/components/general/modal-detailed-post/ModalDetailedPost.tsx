import './ModalDetailedPost.css';
import { useEffect, useState } from 'react';
import { SvgCross, SvgInstagram, SvgInstagramText, SvgAdd, SvgArrow } from '@/components/general/svg/SvgComponent.tsx';
import PostBlock from '@/components/general/post-block/PostBlock.tsx';
import PostInterface from '@/interfaces/post.interface.ts';
import { getUserStories } from '@/api/stories.api.ts';
import StoryInterface from '@/interfaces/story.interface.ts';

interface Props {
    onClose?: () => void,
    posts: PostInterface[],
    indexingPost: number,
}

const ModalDetailedPost = ({ onClose, posts, indexingPost }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    const [indexing, setIndexing] = useState<number>(indexingPost);
    const [stories, setStories] = useState<StoryInterface|null>(null);

    const handleCloseModal = (): void => {
        setShowModal(false);

        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 500);
    };

    const setUserStories = (idx: number): void => {
        try {
            getUserStories(posts[idx].user).then((response: StoryInterface) => {
                setStories(response);
            });
        } catch (e) {
            throw Error('Error getting stories on id');
        }
    };

    const handleChangePost = (type: 'before' | 'after'): void => {
        if (type === 'before' && indexing > 0) {
            setIndexing((prev) => {
                setUserStories(prev - 1);
                return prev - 1;
            });
        } else if (type === 'after' && indexing < posts.length - 1) {
            setIndexing((prev) => {
                setUserStories(prev + 1);
                return prev + 1;
            });
        }
    };

    const handleAddStory = (): void => {
        console.log('add-reels');
    };

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';

        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    }, []);

    useEffect(() => {
        setIndexing(() => {

            setUserStories(indexingPost);

            return indexingPost;
        });
    }, [indexingPost]);

    return <>
        <div className={`modal-stories-container detailed-modal ${showModal ? 'show-modal' : 'hide-modal'}`}>
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
                    <div className="modal-close-btn" onClick={handleCloseModal}>
                        <div className="close-btn">
                            <SvgCross/>
                        </div>
                    </div>
                </div>
                <div className="story-modal-container detailed-modal-story">
                    <div className="icon-before" onClick={() => handleChangePost('before')}>
                        <SvgArrow/>
                    </div>
                    { stories ?
                        <PostBlock
                            userStory={stories}
                            topView={true}
                            post={posts[indexing]}
                        /> : null }
                    <div className="icon-after" onClick={() => handleChangePost('after')}>
                        <SvgArrow/>
                    </div>
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

export default ModalDetailedPost;
