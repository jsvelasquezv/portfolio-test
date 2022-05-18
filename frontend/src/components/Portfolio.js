import React, { useState, useEffect } from 'react';

import TweeterTimeline from './TwitterTimeline';
import { getPortfolio } from '../services/portfolio/portfolio.service';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    async function fetchPortfolio() {
      const response = await getPortfolio();
      setPortfolio(response.portfolio);
    }

    fetchPortfolio();
  }, []);

  if (portfolio) {
    return (
      <div className="container">
        <section>
          <img
            className="profile-picture"
            src={portfolio.image_url}
            alt="profile"
          ></img>
          <TweeterTimeline portfolio={portfolio} />
        </section>
        <section>
          <div className="profile">
            <h1>{portfolio.names}</h1>
            <h2>{portfolio.title}</h2>
            <p>{portfolio.experience_summary}</p>
            <p>{portfolio.description}</p>
          </div>
        </section>
      </div>
    );
  }
  return null;
};

export default Portfolio;
