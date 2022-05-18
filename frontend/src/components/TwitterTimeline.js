const TweeterTimeline = ({ portfolio }) => (
  <>
    <ul className="timeline">
      {portfolio.tweets.map(({ id, text }) => (
        <li key={id} className="tweet">
          {text}
        </li>
      ))}
    </ul>
    <a
      className="profile-link"
      href={`https://twitter.com/${portfolio.twitter_user_name}`}
    >
      Go to profile
    </a>
  </>
);

export default TweeterTimeline;
