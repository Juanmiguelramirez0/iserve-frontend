import IServeForm from './components/IServeForm';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to iServe LVCC</h1>
      </header>
      
      <main>
        {/* This is where your form appears */}
        <IServeForm />
      </main>
    </div>
  );
}

export default App;