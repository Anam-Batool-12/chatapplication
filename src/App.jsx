// import react from 'react'
// import Navbar from './components/Navbar'
import react from 'react'
 import Navbar from './components/Navbar'
import Home from './components/Home'
import ChatScreen from './components/ChatScreen'
function App() {
  return (
    <div className="flex bg-gray-100 min-h-screen p-4">
      {/* Navbar on the left with fixed width */}
      <Navbar />

      {/* Home on the right with margin */}
      <div className="flex-1 ml-4">
        <Home />
      </div>
      <div className="flex-1 ml-4">
        <ChatScreen />
      </div>
    </div>
  );
}

export default App;
