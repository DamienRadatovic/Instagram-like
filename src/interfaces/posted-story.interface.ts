import UserInterface from '@/interfaces/user.interface.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';

interface PostedStoryInterface {
    id: string,
    user: UserInterface,
    date: string,
    viewsNumber: number,
    commentsNumber: number,
    likesNumber: number,
    url: string,
    type: StoryTypeEnum
}

export default PostedStoryInterface;