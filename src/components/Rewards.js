import { Link, Outlet } from 'react-router-dom';

function Rewards() {
  return (
    <div>
      <Outlet />
      <Link to="gold">
        <div>Gold</div>
      </Link>
      <Link to="silver">
        <div>Silver</div>
      </Link>
      <Link to="bronze">
        <div>Bronze</div>
      </Link>
    </div>
  );
}

export default Rewards;
