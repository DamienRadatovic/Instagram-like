import UserInterface from '@/interfaces/user.interface.ts';

interface StoryInterface {
    id: string,
    user: UserInterface,
    isViewed: boolean
}

export default StoryInterface;