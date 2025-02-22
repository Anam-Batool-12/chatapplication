import React from "react";
import { Home, MessageSquare, Settings, ArrowUp } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-[90vh] w-20 bg-gradient-to-b from-purple-700 to-gray-900 text-white flex flex-col items-center py-6 shadow-lg rounded-full my-4">
      {/* Profile Picture */}
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mb-6">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIP8KbanJz9pCS4sNjYk4oYcRMwCvbldl44g&s" 
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Icons Menu */}
      <div className="flex flex-col space-y-8 flex-grow">
        <NavItem icon={<Home size={28} />} />
        <NavItem icon={<MessageSquare size={28} />} />
        <NavItem icon={<Settings size={28} />} />
      </div>

      {/* Up Arrow Button at Bottom */}
      <div className="mt-auto">
        <NavItem icon={<ArrowUp size={28} />} />
      </div>
    </div>
  );
};

// Component for Individual Nav Items
const NavItem = ({ icon }) => (
  <div className="p-2 rounded-lg cursor-pointer hover:bg-white/20 transition">
    {icon}
  </div>
);

export default Navbar;
