import { useParams } from 'react-router';

function RewardsItem() {
  const { tier } = useParams();

  return (
    <div>{tier}</div>
  );
}

export default RewardsItem;
