import UserInterface from '@/interfaces/user.interface.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';

interface ReelsInterface {
    id: string,
    user: UserInterface,
    name: string,
    date: string,
    viewsNumber: number,
    commentsNumber: number,
    likesNumber: number,
    url: string,
    type: StoryTypeEnum
}

export default ReelsInterface;