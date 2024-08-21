import './ModalProfile.css';
import { useEffect, useRef, useState } from 'react';
import { SvgEightBlock, SvgFourBlock, SvgOneBlock } from '@/components/general/svg/SvgComponent.tsx';
import StoryInterface from '@/interfaces/story.interface.ts';
import { getStoryByUser } from '@/api/stories.api.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import PostInterface from '@/interfaces/post.interface.ts';
import { getUsersPostById } from '@/api/post.api.ts';
import ProfileInformation from '@/components/general/modal-profile/profile-information/ProfileInformation.tsx';
import PostBlock from '@/components/general/post-block/PostBlock.tsx';

interface Props {
    onClose?: () => void,
    isOpen: boolean,
    user: UserInterface|null,
}

const ModalProfile = ({ onClose, user, isOpen }: Props) => {
    const imgRef = useRef(null);

    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(isOpen);

    const [posts, setPosts] = useState<PostInterface[]>([]);
    const [sizeGrid, setSizeGrid] = useState<number>(2);
    const [userStory, setUserStory] = useState<StoryInterface|null>(null);

    const handleClickType = (nbr: number): void => {
        setSizeGrid(nbr);
        if (imgRef.current) {
            imgRef.current.scrollTop = 0;
        }
    };

    const handleClickImage = (imgId: string): void => {
        if (imgRef.current) {
            setSizeGrid(1);
            setTimeout(() => {
                if (imgRef.current) {
                    Array.from(imgRef.current.children).forEach((child) => {
                        if (child instanceof HTMLElement && child.id === imgId) {
                            child.scrollIntoView({ behavior: 'instant', block: 'center' });
                        }
                    });
                }
            }, 100);
        }
    };

    const handleClickBack = (): void => {
        if (onClose) {
            setIsOpenModalProfile(false);
            setTimeout(() => {
                onClose();
            }, 600);
        }
    };

    useEffect(() => {
        if (isOpen && user) {
            try {
                setIsOpenModalProfile(true);
                getStoryByUser(user).then((response: StoryInterface) => {
                    setUserStory(response);
                });

                getUsersPostById(user.id).then((response) => {
                    setPosts(response);
                });
            } catch (e) {
                throw Error('No profile found');
            }
        } else {
            setSizeGrid(2);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflowY = 'hidden';
            if (imgRef.current) {
                imgRef.current.scrollTop = 0;
            }
        }

        return () => {
            document.documentElement.style.overflowY = 'auto';
        };
    }, [isOpen]);

    return <>
        <div className={`modal-profile-container ${isOpenModalProfile ? 'open-modal-profile' : 'close-modal-profile'}`}>
            <div className="profile-left">
                <ProfileInformation
                    user={user}
                    userStory={userStory}
                    onClickBack={handleClickBack}
                />
            </div>
            <div className="profile-right">
                <div ref={imgRef} className="profile-posts">
                    {posts.map((post: PostInterface, index) => (
                        sizeGrid > 1 ?
                            <div
                                className="post-img-container"
                                key={post.id}
                                style={{
                                    flex: `1 1 ${100 / sizeGrid}%`,
                                    maxWidth: `${100 / sizeGrid}%`
                                }}
                                id={`profile-image-${post.id}-${index}`}
                                onClick={() => handleClickImage(`profile-image-${post.id}-${index}`)}
                            >
                                <img
                                    src={post.url}
                                    alt='post'/>
                            </div>
                            :
                            <PostBlock id={`profile-image-${post.id}-${index}`} topView={false} post={post} key={post.id} />
                    ))}
                </div>
                <div className="select-grid-type">
                    <div className={`select-type ${sizeGrid === 4 ? 'select' : 'unselect'}`}
                        onClick={() => handleClickType(4)}>
                        <SvgEightBlock/>
                    </div>
                    <div className={`select-type ${sizeGrid === 2 ? 'select' : 'unselect'}`}
                        onClick={() => handleClickType(2)}>
                        <SvgFourBlock/>
                    </div>
                    <div className={`select-type ${sizeGrid === 1 ? 'select' : 'unselect'}`}
                        onClick={() => handleClickType(1)}>
                        <SvgOneBlock/>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default ModalProfile;