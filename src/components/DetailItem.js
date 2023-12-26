import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import './DetailItem.css';
import ItemType from '../types/item';
import { itemImages } from '../items';

function DetailItem({ items }) {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  return (
    <div className="detail-item-component">
      {detailItem
        ? (
          <>
            <img className="details-image" src={itemImages[detailItem.imageId]} alt={detailItem.title} />
            <h2>{detailItem.title}</h2>
            <div>
              $
              {detailItem.price.toFixed(2)}
            </div>
          </>
        )
        : <h2>Unknown Item</h2>}
    </div>
  );
}

DetailItem.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default DetailItem;
