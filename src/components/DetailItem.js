import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import './DetailItem.css';
import { itemImages } from '../items';
import ItemsContext from '../contexts/ItemsContext';

function DetailItem({ addToCart }) {
  const { id } = useParams();
  const { items } = useContext(ItemsContext);
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
  addToCart: PropTypes.func.isRequired,
};

export default DetailItem;
