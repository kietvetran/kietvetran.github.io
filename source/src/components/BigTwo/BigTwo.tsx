import React, {useState} from 'react';
import BigTwoLogin from './BigTwoLogin';
import BigTwoDesktop from './BigTwoDesktop';
import { readCookie, createCookie } from '../../util/Cookie';
import './BigTwo.scss';

export default function BigTwo() {   
  const [access, setAccess] = useState<boolean>(!!readCookie('bigtwo'));

  const successLogin = () => {
    createCookie('bigtwo', '1', (365*10));
    setAccess( true );
  };

  return (
    <div className="big-tow-wrapper">
      { access ? 
        <BigTwoDesktop /> :
        <BigTwoLogin success={successLogin} />
      }
    </div>
  );
}
