import React from 'react';
import { Oval } from 'react-loader-spinner';
import './LoadingSpinner.css'; // Créez ce fichier pour les styles supplémentaires si nécessaire

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default LoadingSpinner;
