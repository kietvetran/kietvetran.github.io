import React from 'react';

type Props = {
  result: string[] | string[][];
};

export default function BigTwoResultRow(props: Props) {
  return (
    <div className="game-row -result">
      <div className="form-wrapper">
        {props.result.map((data: string | string[], i: number) => {
          return (
            <div key={`info-${i}`} className="input-wrapper">
              {(data instanceof Array ? data : [data]).map((text: string, j: number) => {
                return (
                  <span key={`info-${i}-${j}`} className={`block info -index-${j}`}>
                    {text}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
