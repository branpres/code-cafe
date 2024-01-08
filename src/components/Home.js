import { useContext } from 'react';
import './Home.css';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import ItemsContext from '../contexts/ItemsContext';

function Home() {
  const { items } = useContext(ItemsContext);

  return (
    <div>
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

export default Home;
