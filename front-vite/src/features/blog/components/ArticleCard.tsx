interface ArticleCardProps {
  title: string;
  description: string;
  onRead: () => void;
}

const ArticleCard = ({ title, description, onRead } : ArticleCardProps) => {
  return (
    <div className="article-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onRead}>Read More</button>
    </div>
  );
};

export default ArticleCard;
