import React, { useState, useEffect } from 'react';
import './App.css';

//awill add proper styling later mybe

const App = () => {
    console.log("App component loaded - BestBit Coin Quest initialized");

    const [playerName, setPlayerName] = useState('');
    const [coin_count, setCoinCount] = useState(0);
    const [game_loaded, setGameLoaded] = useState(false);
    const [total_clicks, setTotalClicks] = useState(0);

    // saving const [player, setplayer] = useState({name: '', coins: 0})
        // consyt [coin_per_click] = useState(1);\



    let debug_coin_placeholder = 0;
    console.log("game state initialized");
    console.log("playerName:", playerName);
    console.log("coin_count:", coin_count);
    console.log("clicks so far:   ", total_clicks)




    useEffect(() => {
        console.log("BestBit Coin Quest - game startup sequence");
        
        // so it looks irl lol
        setTimeout(() => {
            setGameLoaded(true);
            console.log("DEBUG: Game zone loaded successfully");
        }, 150); // smol delay

        return () => {
            console.log("Component unmounting - goodbye coin quest");
        };
    }, []);

    const handlePlayerNameInputWithLoggingAndValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("player name change event triggered");

        // 1.ip value



        const inputValue = event.target.value;
        console.log('input value:', inputValue);





        // 2. js display log state


        console.log("current player name before update:", playerName);







        // 3. input validation


        if (inputValue.length > 50) {
            console.log("bruh this name is way too long wtf");
            const truncatedValue = inputValue.substring(0, 50);
            setPlayerName(truncatedValue);
            console.log(" Truncated value set:", truncatedValue);
        } 
        
        else {
            setPlayerName(inputValue);
            console.log("player name updated successfully");


        }

        


        if (inputValue === '') {
            console.log('empty name detected - user cleared input');
        }
    };



    //coinclicker func


        const handleCoinClickWithSundEffectMaybe = () => {




            console.log("coin click detected");



            //u[pdate coin count
            
        
        const new_coin_count = coin_count + 1;
        setCoinCount(new_coin_count);
        console.log("Coin amount updated from: ", coin_count, "to ", new_coin_count);


        //tracks clicks and saves

        const new_click_count = coin_count + 1;
        setTotalClicks(new_click_count);
        console.log("total click: ", new_click_count);





        //maybe will add more sound effect, like jhing jhing or smt
        }

    // render the damn thing
    return (
        <div className="coin-quest-container main">
            <h1 className='quest-title big'>BestBit Coin Quest</h1>

            <div className='player-setup section'>
                <h2>Player Setup</h2>
                <div className="name-input-wrapper">
                    <label htmlFor='playerNameInput' className='input-label'>
                        enter player name:
                    </label>
                    <input 
                        id="playerNameInput"
                        type="text"
                        value={playerName}
                        onChange={handlePlayerNameInputWithLoggingAndValidation}
                        placeholder='ur quest name...'
                        className='player-name-input special'
                        style={{
                            padding: '10px',
                            margin: '10px 0',
                            border: '2px solid #ddd',
                            borderRadius: '5px',
                            fontSize: '16px',
                            width: '250px'
                        }}
                    />
                </div>

              





                {playerName && (
                    <p className='player-display'>
                        Current player: <strong>{playerName}</strong>
                    </p>
                )}
            </div>





            <div className="coin-display-section">
                <h3 className="coin-header">Coin Count</h3>
                <div className="coin-counter big">
                     <span className="coin-emoji">🪙</span>
                    <span className="coin-amount">{coin_count}</span>
                    <span className="coin-label"> coins</span>
                </div>



                                {/* coin earn zone display*/}

                                <div  className="coin-earning-zone" style={{ marginTop: '20px'}}>




                                    <button
                                        onClick={handleCoinClickWithSundEffectMaybe}
                                        className='collect-coin-btn'
                                        style={{
                                            padding: '15px 25px',
                                            fontSize: '18px',
                                            backgroundColor: '#ffd70',
                                            border: '3px solid #ffaa00',
                                            fontWeight: 'bold'
                                    

                                        }}>
                                            collect coin 👛(this is what windows gave me )
                                        </button>
                                </div>


                {/* debug info for coin count */}
                <p style={{ fontSize: '12px', color: 'gray', marginTop: '10px' }}>
                    Debug: debug_coin_placeholder = {debug_coin_placeholder}
                </p>

                <p style={{

                    fontSize: '11px', 
                    color: 'purple',
                    marginTop: '5px'
                }}>StatesL: total clicks = {total_clicks}</p>
            </div>





            {!game_loaded && (
                <div style={{ color: 'orange', marginTop: '20px' }}>
                    Loading BestBit Coin Quest...
                </div>
            )}
        </div>
    );
};

export default App;

