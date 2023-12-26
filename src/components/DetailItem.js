import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import './DetailItem.css';
import ItemType from '../types/item';
import { itemImages } from '../items';

function DetailItem({ items, addToCart }) {
  const { id } = useParams();
  const detailItem = items.find((item) => item.itemId === id);

  const addItemToCart = () => {
    addToCart(detailItem.itemId);
  };

  return (
    <div className="detail-item-component">
      {detailItem
        ? (
          <>
            {(detailItem.salePrice || detailItem.salePrice === 0) && <div>On sale!</div>}
            <img className="details-image" src={itemImages[detailItem.imageId]} alt={detailItem.title} />
            <h2>{detailItem.title}</h2>
            {!!detailItem.description && <h6>{detailItem.description}</h6>}
            <div>
              $
              {(detailItem.salePrice ?? detailItem.price).toFixed(2)}
            </div>
            <button type="button" onClick={addItemToCart}>Add to Cart</button>
          </>
        )
        : <h2>Unknown Item</h2>}
    </div>
  );
}

DetailItem.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default DetailItem;
