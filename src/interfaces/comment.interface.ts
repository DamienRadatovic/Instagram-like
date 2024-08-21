import UserInterface from '@/interfaces/user.interface.ts';

interface CommentInterface {
    id: string,
    owner: UserInterface,
    comment: string,
}

export default CommentInterface;