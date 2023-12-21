import './App.css';
import Header from './components/Header';
import { itemImages, items } from './items';
import Thumbnail from './components/Thumbnail';

function App() {
  return (
    <div>
      <Header />
      {
        items.map((item) => (
          <Thumbnail key={item.itemId} image={[itemImages[item.imageId]]} title={item.title} />
        ))
      }
    </div>
  );
}

export default App;
