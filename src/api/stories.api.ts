import StoryInterface from '@/interfaces/story.interface.ts';
import { stories } from '@/static.data.ts';
import PersonalStoryInterface from '@/interfaces/personal-story.interface.ts';
import UserInterface from '@/interfaces/user.interface.ts';

const getStories = async (): Promise<StoryInterface[]> => {
    return [...stories].slice(0, 8);
};

const getAllStories = async (): Promise<StoryInterface[]> => {
    return [...stories];
};

const getUserStories = async (user: UserInterface): Promise<StoryInterface> => {
    return [...stories].filter((elt) => elt.user.id === user.id)[0];
};

const getPersonalStories = async (): Promise<PersonalStoryInterface> => {
    return {
        id: 'personal-stories',
        isViewed: false,
        stories: false,
    };
};

const getStoryByUser = async (user: UserInterface): Promise<StoryInterface> => {
    return [...stories].filter((story) => story.user.id === user.id)[0];
};

export {
    getStories,
    getPersonalStories,
    getAllStories,
    getStoryByUser,
    getUserStories,
};