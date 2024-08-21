import { users } from '../static.data.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';
import ReelsInterface from '@/interfaces/reels.interface.ts';

const staticReel: ReelsInterface[] = [
    {
        id: 'Patate',
        user: users[1],
        date: JSON.stringify(Date.now()),
        viewsNumber: 2583,
        commentsNumber: 121,
        url: 'https://www.youtube.com/shorts/dFg8Nu2X5Mo',
        type: StoryTypeEnum.Video,
        name: '',
        likesNumber: 0
    },
    {
        id: 'Patate1',
        user: users[2],
        date: JSON.stringify(Date.now()),
        viewsNumber: 613512,
        commentsNumber: 15645,
        url: 'https://www.youtube.com/shorts/Eexm7StzOIg',
        type: StoryTypeEnum.Video,
        name: '',
        likesNumber: 0
    },
    {
        id: 'Patate2',
        user: users[3],
        date: JSON.stringify(Date.now()),
        viewsNumber: 424,
        commentsNumber: 14,
        url: 'https://images.pexels.com/photos/27582996/pexels-photo-27582996/free-photo-of-a-statue-of-arco-da-rua-augusto-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        type: StoryTypeEnum.Image,
        name: '',
        likesNumber: 0
    }
];

const getReels = async (): Promise<ReelsInterface[]> => {
    return [...staticReel];
};

const postCommentReel = async (reelId: string, comment: string): Promise<void> => {
    console.log('post comment ', comment);
    console.log('with id ', reelId);
};

export {
    getReels,
    postCommentReel,
};