const url =
  'https://6q42m4ggv5.execute-api.us-east-1.amazonaws.com/portfolio/6282ce2efe163b00c61486db';

const getPortfolio = async () => {
  return await (await fetch(url)).json();
};

export { getPortfolio };
