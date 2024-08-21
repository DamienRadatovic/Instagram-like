interface UserInterface {
    id: string,
    username: string,
    image?: string,
    description?: string,
    followers: number,
    posts: number,
    following: number,
}

export default UserInterface;