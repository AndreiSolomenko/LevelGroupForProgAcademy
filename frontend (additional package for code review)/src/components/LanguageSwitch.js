import React from 'react';
import { useLanguage } from './LanguageProvider';

function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const languageMap = {
    'en': 'EN',
    'ua': 'UA',
  };

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="dropdown">
      <a className="text-decoration-none switch-text-size card-address">
        {languageMap[language]}
      </a>
      <ul className="dropdown-menu" style={{ backgroundColor: '#0d0d13', minWidth: '3rem' }}>
        {Object.keys(languageMap).map((key) => (
          <li key={key}>
            <a
              className="text-decoration-none switch-text-size card-address"
              href="#"
              onClick={() => handleChangeLanguage(key)}
            >
              {languageMap[key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageSwitch;