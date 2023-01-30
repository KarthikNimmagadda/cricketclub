import './Player.css';
import PlayerDetails from './PlayerDetails';


const Player = (props) => {

    const handleClick = () => {
        props.setComponent(<PlayerDetails player={props.player} />)
    };

    return <li className="player" onClick={handleClick}>
                <h3>{props.player.name}</h3>
                <h3>{props.player.playerType}</h3>
            </li>
}

export default Player