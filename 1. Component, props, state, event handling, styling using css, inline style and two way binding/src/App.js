import './App.css';
import Person from './Person/Person'
import PersonClass from './Person/PersonClass';
import PersonHook from './Person/PersonHook';

function App() {
  const printText = () => {
    console.log("Hello!");
  }
  
  return (
    <div className="App">
      <Person name="ankit" age="18"/>
      <Person name="gyan" age="22">My Hobbies: Racing</Person>
      <Person name="bipul" age="28" click={printText}/>

      <PersonClass/>
      <PersonHook/>
    </div>
  );
}

export default App;
