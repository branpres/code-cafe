import PropTypes from 'prop-types';
import './Home.css';
import { Link } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import ItemType from '../types/item';

function Home({ items }) {
  return (
    <div>
      <Link to="/rewards" className="rewards-link">Rewards</Link>
      <div className="home-component">
        {
          items.map((item) => (
            <Thumbnail
              key={item.itemId}
              itemId={item.itemId}
              image={itemImages[item.imageId]}
              title={item.title}
            />
          ))
        }
      </div>
    </div>
  );
}

Home.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Home;
