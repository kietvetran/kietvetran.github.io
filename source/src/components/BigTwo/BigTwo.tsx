import React, { useState } from 'react';

import BigTwoDesktop from './BigTwoDesktop';
import BigTwoLogin from './BigTwoLogin';
import { readCookie, createCookie } from '../../util/Cookie';
import './BigTwo.scss';

export default function BigTwo() {
    const [access, setAccess] = useState<boolean>(!!readCookie('bigtwo'));

    const successLogin = () => {
        createCookie('bigtwo', '1', 365 * 10);
        setAccess(true);
    };

    return <div className="big-two-wrapper">{access ? <BigTwoDesktop /> : <BigTwoLogin success={successLogin} />}</div>;
}
