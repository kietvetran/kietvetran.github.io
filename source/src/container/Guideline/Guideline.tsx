import React from 'react';
import Graph from '../../components/Graph/Graph';

import './Guideline.scss';

export default function Guideline() {
    return <div className="guideline-wrapper">
        <h2>Guideline</h2>

        <section>
            <h3>Graph</h3>
            <Graph type="bar" />
        </section>
  </div>;
}
