import React from 'react';
import './LogoBanner.scss';

export default (): JSX.Element => {
  const now = (new Date()).getTime();
  const bigDate = new Date('2027-06-01T00:00:00Z');
  const weekLeft = Math.ceil((bigDate.getTime() - now) / ((24*60*60*1000) *7));
  // const weekLeft = 20;
  const textList: string[] = [`week${weekLeft > 1 ? 's' : ''}`, `${weekLeft}`,  'left.'];
  const labelList: string[] = [textList[1], textList[0], textList[2]];

  return (
    <div className={`logo-banner-wrapper -digit-${weekLeft.toString().length}`} aria-label={labelList.join(' ')}>
        <div className="cloud" />
        <div className="logo-banner-content" aria-hidden={true}>
            { textList.map( (text: string, i: number) => (
                <span key={text} className={`text-info -index-${i}`}>{text}</span>
            ))}
        </div>
    </div>
  );
};
