import './App.css';
import Header from './components/Header';
import { items } from './items';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Header />
      <Home items={items} />
    </div>
  );
}

export default App;
