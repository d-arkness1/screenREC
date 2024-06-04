import React from 'react';

const Toggler = () => {
  return (
    <span className="sh__toggler">
      <div className="sh__toggler-wrp">
        <span className="sh__toggler-btn--moon">
          <img className="sh__toggler--icon moon" src="images/moon.svg" alt="dark mode icon" />
        </span>
        <span className="sh__toggler-btn--sun">
          <img className="sh__toggler--icon sun" src="images/sun.svg" alt="light mode icon" />
        </span>
      </div>
    </span>
  );
};

export default Toggler;