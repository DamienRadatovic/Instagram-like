import './Home.css';
import Stories from '@/components/stories/Stories.tsx';
import HomeGrid from '@/components/home-grid/HomeGrid.tsx';

const Home = () => {
    return <>
        <div className="home-container">
            <Stories />
            <HomeGrid />
        </div>
    </>;
};

export default Home;