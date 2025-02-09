import './PokemonCard.css';

function PokemonCard({ name, id, types, image }) {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <div className="types">
        {types.map((type, index) => (
          <span key={index} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;