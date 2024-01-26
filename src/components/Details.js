import { memo } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router';
import './Details.css';
import Thumbnail from './Thumbnail';
import { itemImages } from '../items';
import ItemType from '../types/item';

function Details({ items }) {
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

Details.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default memo(Details);
