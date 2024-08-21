import UserInterface from '@/interfaces/user.interface.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';
import userInterface from '@/interfaces/user.interface.ts';

interface PostInterface {
    id: string,
    user: UserInterface,
    date: string,
    viewsNumber: number,
    commentsNumber: number,
    likes: userInterface[],
    url: string,
    type: StoryTypeEnum,
    title: string
}

export default PostInterface;