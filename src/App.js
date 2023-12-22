import './App.css';
import Header from './components/Header';
import { items } from './items';
import Home from './components/Home';

function App() {
  return (
    <div>
      <Header title="Brandon's Code Cafe" />
      <Home items={items} />
    </div>
  );
}

export default App;
