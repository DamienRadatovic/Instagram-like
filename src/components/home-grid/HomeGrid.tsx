import './HomeGrid.css';
import { SvgEightBlock, SvgFourBlock, SvgOneBlock } from '@/components/general/svg/SvgComponent.tsx';
import { useEffect, useState } from 'react';
import PostInterface from '@/interfaces/post.interface.ts';
import { getAllPosts, postLike } from '@/api/post.api.ts';
import PostItem from '@/components/post-item/PostItem.tsx';
import ModalProfile from '@/components/general/modal-profile/ModalProfile.tsx';
import UserInterface from '@/interfaces/user.interface.ts';
import userInterface from '@/interfaces/user.interface.ts';
import ModalDetailedPost from '@/components/general/modal-detailed-post/ModalDetailedPost.tsx';

const HomeGrid = () => {
    const [allPosts, setAllPosts] = useState<PostInterface[]>([]);
    const [sizeGrid, setSizeGrid] = useState<number>(2);
    const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<userInterface|null>(null);
    const [isOpenDetailedPost, setIsOpenDetailedPost] = useState<boolean>(false);
    const [indexingPost, setIndexingPost] = useState<number>(0);

    const handleClickType = (nbr: number): void => {
        setSizeGrid(nbr);
    };

    const handleOpenDetailedPost = (idx: number): void => {
        setIsOpenDetailedPost(true);
        setIndexingPost(idx);

    };

    const handleAction = async (type: 'like' | 'comment' | 'message' | 'unLike', postId: string): Promise<void> => {
        if (type === 'like' || type === 'unLike') {
            postLike(type, postId).then((response) => {
                setAllPosts((prev) => {
                    return prev.map((elt) => {
                        if (elt.id === response.id) {
                            return response;
                        } return elt;
                    }); 
                });
            });
        } else if (type === 'comment') {
            console.log('comment');
        } else {
            console.log('message');
        }
    };

    const handleOpenProfile = (selectedUserProfile: UserInterface): void => {
        setUserProfile(selectedUserProfile);
        setIsOpenModalProfile(true);
    };

    const handleCloseProfile = (): void => {
        setUserProfile(null);
        setIsOpenModalProfile(false);
    };
    
    useEffect(() => {
        getAllPosts().then((response: PostInterface[]) => {
            setAllPosts(response);
        });
    }, []);

    return <>
        <div className="home-grid-container">
            <div className="home-grid-content">
                {
                    allPosts.map((post, index) => (
                        <PostItem
                            key={post.id}
                            post={post}
                            sizeGrid={sizeGrid}
                            onAction={handleAction}
                            onOpenProfile={handleOpenProfile}
                            onOpenDetailedPost={() => handleOpenDetailedPost(index)}
                        />
                    ))
                }
            </div>
            <div className="select-grid-type">
                <div className={`select-type ${sizeGrid === 4 ? 'select' : 'unselect'}`} onClick={() => handleClickType(4)}>
                    <SvgEightBlock />
                </div>
                <div className={`select-type ${sizeGrid === 2 ? 'select' : 'unselect'}`} onClick={() => handleClickType(2)}>
                    <SvgFourBlock />
                </div>
                <div className={`select-type ${sizeGrid === 1 ? 'select' : 'unselect'}`} onClick={() => handleClickType(1)}>
                    <SvgOneBlock />
                </div>
            </div>
        </div>
        <ModalProfile isOpen={isOpenModalProfile} user={userProfile} onClose={handleCloseProfile} />
        {
            isOpenDetailedPost ?
                <ModalDetailedPost
                    posts={allPosts}
                    onClose={() => setIsOpenDetailedPost(false)}
                    indexingPost={indexingPost}
                /> : null
        }
    </>;
};

export default HomeGrid;