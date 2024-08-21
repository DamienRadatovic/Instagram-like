import PostInterface from '@/interfaces/post.interface.ts';
import { localUser, users } from '@/static.data.ts';
import StoryTypeEnum from '@/enums/story-type.enum.ts';
import { DateTime } from 'luxon';

const getRandomDate = () => {
    const nbr = Math.random() * (10 - 1) + 1;

    if (nbr < 4) {
        return DateTime.fromSeconds(1724045289).toString();
    }

    if (nbr < 7) {
        return DateTime.fromSeconds(1716096489).toString();
    }

    return DateTime.fromSeconds(1724131689).toString();
};

const setURL = (num: number): string => {
    if (num === 0) return 'https://images.pexels.com/photos/27582996/pexels-photo-27582996/free-photo-of-a-statue-of-arco-da-rua-augusto-in-lisbon.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
    if (num === 1) return 'https://images.pexels.com/photos/27396740/pexels-photo-27396740/free-photo-of-mode-homme-gens-personnes.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
    if (num === 2) return 'https://images.pexels.com/photos/9013292/pexels-photo-9013292.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';
    if (num === 3) return 'https://images.pexels.com/photos/27362167/pexels-photo-27362167/free-photo-of-noir-et-blanc-paysage-motif-ferme.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 4) return 'https://images.pexels.com/photos/9321957/pexels-photo-9321957.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 5) return 'https://images.pexels.com/photos/27372370/pexels-photo-27372370/free-photo-of-bois-aube-paysage-soleil-couchant.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 6) return 'https://images.pexels.com/photos/24357596/pexels-photo-24357596/free-photo-of-fleurs-afficher-etal-stand.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 7) return 'https://images.pexels.com/photos/27405437/pexels-photo-27405437/free-photo-of-rue-maison-voiture-vehicule.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 8) return 'https://images.pexels.com/photos/27660060/pexels-photo-27660060/free-photo-of-gens-personnes-individus-sombre.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 9) return 'https://images.pexels.com/photos/11567227/pexels-photo-11567227.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 10) return 'https://images.pexels.com/photos/27665867/pexels-photo-27665867/free-photo-of-paysage-homme-gens-personnes.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 11) return 'https://images.pexels.com/photos/27563702/pexels-photo-27563702/free-photo-of-amour-ete-arbuste-jardin.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load';
    if (num === 12) return 'https://images.pexels.com/photos/620337/pexels-photo-620337.jpeg?auto=compress&cs=tinysrgb&w=600';
    return '';
};

const staticPost: PostInterface[] = Array.from({ length: 13 }, (_, postIndex) => ({
    id: `staticPost${postIndex}`,
    user: users[postIndex],
    date: getRandomDate(),
    viewsNumber: 2583,
    commentsNumber: 121,
    likes: [],
    url: setURL(postIndex),
    type: StoryTypeEnum.Image,
    title: 'I really love this picture, omg it\'s a master piece !'
}));

const getAllPosts = async (): Promise<PostInterface[]> => {
    return [...staticPost];
};

const getUsersPostById = async (userId: string): Promise<PostInterface[]> => {
    console.log('getUsersPostById', userId);
    return [...staticPost];
};

const postLike = async (type: 'like' | 'unLike', postId: string): Promise<PostInterface> => {
    const post = [...staticPost].filter((elt) => elt.id === postId)[0];

    if (type === 'like') {
        post.likes.push(localUser);
    } else {
        post.likes = post.likes.filter((elt) => elt.id !== localUser.id);
    }

    return post;
};

export {
    getAllPosts,
    postLike,
    getUsersPostById,
};