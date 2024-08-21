import { users } from '@/static.data.ts';
import CommentInterface from '@/interfaces/comment.interface.ts';

const comments: CommentInterface[] = Array.from({ length: 12 }, (_, commentIndex) => ({
    id: `comment${commentIndex}`,
    owner: users[commentIndex],
    comment: 'This text is a beautiful and great comment for this super user',
}));

const getCommentsFromPost = async (postId: string): Promise<CommentInterface[]> => {
    return [...comments];
};

export {
    getCommentsFromPost,
};