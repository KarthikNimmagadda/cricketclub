import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayersList.css';
import Player from './Player';

const PlayersList = (props) => {
    const [players, setPlayers] = useState([]);


    useEffect(() => async () => {
        if(props.players) {
            setPlayers(props.players);
            return;
        }
        const response = await axios.get(
            'https://cricketapp-e4008-default-rtdb.firebaseio.com/players.json'
        );

        // const playerObjs = response.data;

        const retrievedPlayers = [];
        
        for(const key in response.data) {
            retrievedPlayers.push({
                id: key,
                name: response.data[key].name,
                dates: response.data[key].dates,
                playerType: response.data[key].playerType
            })
        }

        setPlayers(retrievedPlayers);
    }, []); 

    const playersDisplayList = players.map(player => <Player key={player.id} player={player} setComponent={props.setComponent}></Player>);



    return <div className="players-list">{playersDisplayList}</div>
}

export default PlayersList;