import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayersList from './PlayersList';

const Summary = (props) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availabilityData, setAvailabilityData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            setLoading(true);
            axios
                .get(`https://cricketapp-e4008-default-rtdb.firebaseio.com/players.json`)
                .then(res => {
                    const data = res.data;
                    const availables = [];
                    Object.keys(data).forEach(key => {
                        data[key].dates &&
                        data[key].dates.forEach(date => {
                            const formattedDate = new Date(date.date).toDateString();
                            if (formattedDate === selectedDate && date.availability === 'yes') {
                                availables.push(data[key]);
                            }
                        });
                    });
                    setAvailabilityData(availables);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [selectedDate]);

    const currentDate = new Date();
    const next8Sundays = [];
    let nextSunday = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (7 - currentDate.getDay())
    );
    for (let i = 0; i < 8; i++) {
        next8Sundays.push(nextSunday);
        nextSunday = new Date(nextSunday.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
    return (
        <div>
            <h2>Summary</h2>
            <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)}>
                <option value="">Select Date</option>
                {next8Sundays.map(date => (
                    <option key={date} value={date.toDateString()}>
                        {date.toDateString()}
                    </option>
                ))}
            </select>
            {loading ? (
                <p>Loading...</p>
            ) : selectedDate && (
                    <div>
                        <p>
                            {availabilityData.length} players available on {selectedDate}:
                        </p>
                        <PlayersList players={availabilityData} setComponent={props.setComponent}/>
                    </div>
                )
            }
        </div>
    );
};

export default Summary;
