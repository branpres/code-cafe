import { useParams } from 'react-router';
import './DetailItem.css';

function DetailItem() {
  const { id } = useParams();

  return (
    <div className="detail-item-component">{id}</div>
  );
}

export default DetailItem;
