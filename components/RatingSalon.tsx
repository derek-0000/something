const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function RatingSalon(props: { ratings: number }){
    const renderStars = () => {
        const stars = [];
        
        for (let i = 1; i <= 5; i++) {
          if (i <= props.ratings) {
            // Renderizar estrella llena
            stars.push(<Icons.FilledStarBig key={i} />);
          } else {
            // Renderizar estrella vacía
            stars.push(<Icons.EmptyStarBig key={i} />);
          }
        }
        return stars;
      };

    return(
        <>
            <div className="flex flex-start">
                {renderStars()}
            </div>
        </>
    )
}