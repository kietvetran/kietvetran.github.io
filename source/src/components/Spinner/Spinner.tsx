import classNames from 'classnames';
import React from 'react';

import { StringObject } from '../../domain/Types';

import './Spinner.scss';

interface Props {
  size?: 'big' | 'medium';
  polite?: boolean;
  type?: string;
  absolute?: boolean;
}

export default (props: Props): JSX.Element => {
  const attr: StringObject = {
    role: 'status',
    ...(props.polite !== false ? { 'aria-live': 'polite' } : {}),
  };

  return (
    <div
      {...attr}
      className={classNames('spinner-wrapper', `-${props.type ?? 'normal'}`, {
        '-big': props.size === 'big',
        '-medium': props.size === 'medium',
        '-absolute-position': props.absolute,
      })}>
      <span>Vent litt</span>
    </div>
  );
};
