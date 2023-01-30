import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlayerDetails.css';

const PlayerDetails = (props) => {
    const [dates, setDates] = useState([]);

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e, index) => {
        setIsSaved(false);
        const newDates = [...dates];
        newDates[index] = { date: newDates[index].date, availability: e.target.value };
        setDates(newDates);
        setIsButtonEnabled(
            newDates.filter((date) => date.availability === '').length === 0
        );
    };

    const handleSave = () => {
        axios
            .put(`https://cricketapp-e4008-default-rtdb.firebaseio.com/players/${props.player.id}/dates.json`, dates)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        setIsSaved(true);
    };

    useEffect(() => {
        const currentDate = new Date();
        const next8Sundays = [];
        let nextSunday = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + (7 - currentDate.getDay())
        );
        for (let i = 0; i < 8; i++) {
            next8Sundays.push({ date: nextSunday, availability: '' });
            nextSunday = new Date(nextSunday.getTime() + 7 * 24 * 60 * 60 * 1000);
        }
        setDates(next8Sundays);
    }, []);

    return (
        <div className="player-details">
            <h3>{props.player.name}</h3>
            <h3>{props.player.playerType}</h3>
            {props.player.dates && <h4>Availabile on: {props.player.dates.map(date => date.availability === "yes" ? new Date(date.date).toDateString() : '').filter(date => date).join(' , ')}</h4>}
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {dates.map((date, index) => (
                        <tr key={index}>
                            <td>{date.date.toDateString()}</td>
                            <td>
                                <select value={date.availability} onChange={(e) => handleChange(e, index)}>
                                    <option value="">Select Availability</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="maybe">Maybe</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isSaved && <button disabled={!isButtonEnabled} onClick={handleSave}>Save</button>}
            {isSaved && <label>Saved</label>}
        </div>
    );
};

export default PlayerDetails;