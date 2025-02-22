import React from "react";

const ProfileCard = ({ name, image, isOnline }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg text-white cursor-pointer hover:bg-white/20 transition">
      {/* Profile Picture */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white">
        <img
          src={image || "https://via.placeholder.com/150"} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Online Status Indicator */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          } border-2 border-white`}
        />
      </div>

      {/* Name */}
      <span className="text-lg font-medium">{name}</span>
    </div>
  );
};

export default ProfileCard;
