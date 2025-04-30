import React from 'react';
import { Link } from 'react-router-dom';
import ModuleCards from '../components/ModuleCard';

const Modules = () => {
  //HERE PLACE QUERY FOR BACKEND API WHERE YOU SAVE SAID MODULES AND THE INFORMATION INSTEAD OF THE CONSTANT MODULES.
  // This is just mock data to make sure front end is okay.
  const modules = [
    { id: 1, name: "Introduction to Blockchain", image: "bitcoin_cover.jpg" },
    { id: 2, name: "Crypto Trading Strategies", image: "bitcoin_cover.jpg" },
    { id: 3, name: "DeFi (Decentralized Finance)", image: "bitcoin_cover.jpg" },
    { id: 4, name: "Crypto Security", image: "bitcoin_cover.jpg" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center"> Modules </h2>
      <div className="grid grid-cols-3 gap-4">
        {modules.map((module) => (
          <Link to={`/modules/${module.id}`} style={{ textDecoration: "none" }}>
            <ModuleCards
              id = {module.id}
              name={module.name}
              image={module.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Modules;
