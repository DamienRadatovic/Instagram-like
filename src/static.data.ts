import UserInterface from '@/interfaces/user.interface.ts';
import StoryInterface from '@/interfaces/story.interface.ts';

const getRandomNumber = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const localUser: UserInterface = {
    id: 'user-1',
    username: 'Jean',
    image:'https://randomuser.me/api/portraits/men/51.jpg',
    description: 'Ma description',
    followers: getRandomNumber(0, 100000),
    posts: getRandomNumber(0, 100000),
    following: getRandomNumber(0, 100000),
};

const users: UserInterface[] = [
    {
        id: 'user1',
        username: 'john_doe',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        description: 'British adventurer exploring the world, currently in South America. Avid reader / Nature lover / Photographer',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user2',
        username: 'jane_smith',
        image: 'https://randomuser.me/api/portraits/women/53.jpg',
        description: 'French artist living in Paris, passionate about painting and coffee. Digital nomad / Illustrator / Urban explorer',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user3',
        username: 'alex_jones',
        image: 'https://randomuser.me/api/portraits/men/54.jpg',
        description: 'Tech guru from Silicon Valley, coding his way through life. Startup founder / Crypto enthusiast / Gamer',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user4',
        username: 'emma_watson',
        image: 'https://randomuser.me/api/portraits/women/10.jpg',
        description: 'Literature lover based in London, always with a book in hand. Feminist / Environmentalist / Advocate for education',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user5',
        username: 'chris_evans',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        description: 'Fitness enthusiast and Hollywood actor, dedicated to health and wellness. Gym addict / Marathon runner / Actor',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user6',
        username: 'lisa_kudrow',
        image: 'https://randomuser.me/api/portraits/women/22.jpg',
        description: 'Animal rights advocate, living in California with a love for all creatures. Vegan / Rescue volunteer / Dog mom',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user7',
        username: 'mike_tyson',
        image: 'https://randomuser.me/api/portraits/men/31.jpg',
        description: 'Former heavyweight champion, now focused on personal growth and wellness. Boxer / Cannabis entrepreneur / Podcast host',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user8',
        username: 'scarlett_johansson',
        image: 'https://randomuser.me/api/portraits/women/31.jpg',
        description: 'Award-winning actress from New York, balancing career and motherhood. Film star / Activist / Fashion icon',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user9',
        username: 'leonardo_dicaprio',
        image: 'https://randomuser.me/api/portraits/men/42.jpg',
        description: 'Hollywood actor and passionate environmentalist, dedicated to saving the planet. Film producer / Ocean lover / Philanthropist',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user10',
        username: 'oprah_winfrey',
        image: 'https://randomuser.me/api/portraits/women/48.jpg',
        description: 'Talk show legend and media mogul, inspiring millions daily. Philanthropist / Author / Empowerment speaker',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user11',
        username: 'oprah_winfrey',
        image: 'https://randomuser.me/api/portraits/women/43.jpg',
        description: 'Influential TV personality, promoting self-growth and positive change. Wellness advocate / Entrepreneur / Humanitarian',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user12',
        username: 'oprah_winfrey',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        description: 'Cultural icon and businesswoman, building a legacy of kindness and wisdom. TV host / Book club founder / Mentor',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
    {
        id: 'user13',
        username: 'oprah_winfrey',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        description: 'Inspirational leader and philanthropist, championing equality and education. Talk show pioneer / Advocate for change / Visionary',
        followers: getRandomNumber(0, 100000),
        posts: getRandomNumber(0, 100000),
        following: getRandomNumber(0, 100000),
    },
];


const stories: StoryInterface[] = [
    {
        id: 'story-1',
        user: { ...users[0] },
        isViewed: false,
    },
    {
        id: 'story-2',
        user: { ...users[1] },
        isViewed: false,
    },
    {
        id: 'story-3',
        user: { ...users[2] },
        isViewed: false,
    },
    {
        id: 'story-4',
        user: { ...users[3] },
        isViewed: false,
    },
    {
        id: 'story-5',
        user: { ...users[4] },
        isViewed: false,
    },
    {
        id: 'story-6',
        user: { ...users[5] },
        isViewed: false,
    },
    {
        id: 'story-7',
        user: { ...users[6] },
        isViewed: false,
    },
    {
        id: 'story-8',
        user: { ...users[7] },
        isViewed: false,
    },
    {
        id: 'story-9',
        user: { ...users[8] },
        isViewed: false,
    },
    {
        id: 'story-10',
        user: { ...users[9] },
        isViewed: false,
    },
    {
        id: 'story-11',
        user: { ...users[10] },
        isViewed: false,
    },
    {
        id: 'story-12',
        user: { ...users[11] },
        isViewed: false,
    },
    {
        id: 'story-13',
        user: { ...users[12] },
        isViewed: false,
    }
];


export {
    localUser,
    stories,
    users
};