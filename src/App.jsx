import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChatScreen from './components/ChatScreen';
import AuthForm from './components/AuthForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen p-4 relative">
      {!isAuthenticated && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />
        </motion.div>
      )}
      {isAuthenticated && (
        <>
          <Navbar />
          <div className="flex-1 ml-4">
            <Home />
          </div>
          <div className="flex-1 ml-4">
            <ChatScreen />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
