import './ProfileInformation.css';
import { SvgArrow } from '@/components/general/svg/SvgComponent.tsx';
import StoryItem from '@/components/stories/story-item/StoryItem.tsx';
import StoryInterface from '@/interfaces/story.interface.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import ActionButton from '@/components/general/action-button/ActionButton.tsx';

interface Props {
    user: UserInterface|null,
    userStory: StoryInterface|null,
    onClickBack: () => void,
}

const ProfileInformation = ({ user, userStory, onClickBack }: Props) => {
    const convertNumberToStringFormat = (num: number|null|undefined): string => {
        if (num) {
            if (num >= 1000) {
                const formattedNum = (num / 1000).toFixed(1);
                return formattedNum.endsWith('.0') ? `${parseInt(formattedNum)}k` : `${formattedNum}k`;
            }
            return num.toString();
        }
        return '';
    };

    return <>
        <div className="profile-information-container">
            <div className="profile-content">
                <div className="profile-top">
                    <div className="profile-back" onClick={onClickBack}>
                        <SvgArrow/>
                    </div>
                    {userStory ? <StoryItem isCloseModalStory={true} story={userStory}/> : null}
                </div>
                <div className="profile-data">
                    <div className="data">
                        <h3>{convertNumberToStringFormat(user?.posts)}</h3>
                        <h4>posts</h4>
                    </div>
                    <div className="data">
                        <h3>{convertNumberToStringFormat(user?.followers)}</h3>
                        <h4>followers</h4>
                    </div>
                    <div className="data">
                        <h3>{convertNumberToStringFormat(user?.following)}</h3>
                        <h4>following</h4>
                    </div>
                </div>
                <ActionButton onClickButton={() => {}}>
                    <p>Follow</p>
                </ActionButton>
                <div className="profile-information">
                    <h3>{ user?.username }</h3>
                    <p>{ user?.description }</p>
                </div>
            </div>
        </div>
    </>;
};

export default ProfileInformation;