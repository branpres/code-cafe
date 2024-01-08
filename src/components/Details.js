import { useContext } from 'react';
import { Outlet } from 'react-router';
import './Details.css';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import ItemsContext from '../contexts/ItemsContext';

function Details() {
  const { items } = useContext(ItemsContext);

  return (
    <div className="details-component">
      <Outlet />
      <div className="details-component-sidebar">
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

export default Details;
