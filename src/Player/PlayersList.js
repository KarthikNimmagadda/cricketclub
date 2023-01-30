import './PlayersList.css';
import Player from './Player';

const PlayersList = (props) => {

    const playersDisplayList = props.players.map(player => <Player key={player.id} player={player} setComponent={props.setComponent}></Player>);

    return <div className="players-list">{playersDisplayList}</div>
}

export default PlayersList;