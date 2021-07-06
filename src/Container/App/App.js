import './App.scss';
import Form from '../Form/Form';

function App() {
  return (
    <div className="App">
      <header className="AppHeader">
        <h1 className="AppHeader-title">Sign Up for Email Updates</h1>
        <p className="AppHeader-subtitle">* Indicates Required Field</p>
      </header>
      <Form />
    </div>
  );
}

export default App;
