import React, { useState, useEffect } from 'react';
import './App.css';
import QuestPanel from './components/QuestPanel';
import UpgradeShop from './components/UpgradeShop';
import PassiveIncome from './components/PassiveIncome';

//awill add proper styling later mybe

const App = () => {
    console.log("App component loaded - BestBit Coin Quest initialized");

    const [playerName, setPlayerName] = useState('');
    const [coin_count, setCoinCount] = useState(0);
    const [game_loaded, setGameLoaded] = useState(false);
    const [total_clicks, setTotalClicks] = useState(0);
    const [coin_per_click, setCoinPerClick] = useState(0);
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




 

                        //auto save to nat lose prtogrss





                          // auto-save game state every 5 seconds
    useEffect(() => {
                                    console.log("setting up autosave interval");
        
                                const save_interval = setInterval(() => {
                                    const game_state = {
                                                                     playerName,
                                                                     coin_count,
                                                                     total_clicks,
                                                                     coin_per_click,
                                                                    timestamp: Date.now()
            };  
            
            localStorage.setItem('bestbit_coin_quest_save', JSON.stringify(game_state));
            console.log("game auto-saved");
        }, 5000); // save every 5 sec

        return () => {
            console.log("clearing autosave interval");
            clearInterval(save_interval);
        };
    }, [playerName, coin_count, total_clicks, coin_per_click]);








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
            console.log("coins per click: ", coin_per_click);



            //u[pdate coin count with bonus
            
        
        const new_coin_count = coin_count + 1;
        setCoinCount(new_coin_count);
        console.log("Coin amount updated from: ", coin_count, "to ", new_coin_count);


        //tracks clicks and saves

        const new_click_count = total_clicks + 1;
        setTotalClicks(new_click_count);
        console.log("total click: ", new_click_count);





        //maybe will add more sound effect, like jhing jhing or smt
        }


    // quest reward handler functio
    const handleQuestRewardWithBonusCalculation = (reward: number) => {
        console.log("quest reward received:", reward);
        
        
        
        // add reward to coinz
        const new_coin_total = coin_count + reward;
        setCoinCount(new_coin_total);
        console.log("coins updated with quest reward from", coin_count, "to", new_coin_total);
        
        
        
      
        //  maybe show popup or smt
    };


    










    //upgrade purchase handler




const handleUpgradePurchaseAndUpdateStats = (cost: number, upgrade_id: number) => {
        console.log("upgrade purchase handler called");
        console.log("cost:", cost, "upgrade id:", upgrade_id);







        ///deduct coinz





        const new_coin_amount = coin_count - cost;

        setCoinCount(new_coin_amount);

        console.log("coins after purchase", new_coin_amount);




        //increase coin per click




        let bonus_amount = 0;
        if (upgrade_id===1){
            bonus_amount =1;

        } else if (upgrade_id===2){
            bonus_amount=1;
        } else if(upgrade_id===3){
            bonus_amount =3;
        }

        const new_coin_per_click = coin_per_click + bonus_amount;
        setCoinPerClick(new_coin_per_click);
        console.log("coin per click updated: ", coin_per_click, "----> ", new_coin_per_click)

    };









            //PASSIVE earling handler

          const handlePassiveEarningsFromGenerators = (amount: number) => {
        console.log("passive earnings received:", amount);
        
        
        
        const new_total = coin_count + amount;
        setCoinCount(new_total);
        
     
    };


                    ///.. genberate urchase handlr 

                    const handleGeneratorPurchaseWithDeduction = (cost: number, generator_id: number) => {
                         console.log("buying generator id:", generator_id);
                         console.log("cost:", cost);
        







                         // deduct coin


                         const new_amount = coin_count -cost;
                         setCoinCount(new_amount);
                         console.log("coins aftergenerator purchase: ", new_amount);


                    };













                                const handleManualSaveWithConfirmation = () => {

                                    console.log("Manual save triggered");



                                    const game_state = {

                                        playerName,
                                        coin_count,
                                        total_clicks,
                                        coin_per_click,
                                        timestamp: Date.now()
                                    };





                                  localStorage.setItem('bestbit_coin_quest_save', JSON.stringify(game_state));
                                                                                         console.log("game saved manually");
                                                                             alert("Game saved!");
    };  







                                            //reset game functio




                                            const handleResetGameWithWarning = () => {


                                                console.log('Reset game requested');
                                                const confirm = window.confirm("Are you sure you want to reset? no taksies backsies");

                                                if(confirm) {
                                                    console.log("resetting hgame....");



                                                    setPlayerName('');
                                                    setCoinCount(0);
                                                    setTotalClicks(0);
                                                    setCoinPerClick(1);


                                                                                        localStorage.removeItem('bestbit_coin_quest_save');
                                                                                                    console.log("game reset complete");
                                                                                                    
                                                                                                    alert("Game reset!");
                                                                                                } else {
                                                                                                    console.log("reset cancelled");
                                                                                                }
                                                                                            };


















    // render the damn thing
   return (
        <div className="coin-quest-container main" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#fafafa',
            minHeight: '100vh'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '3px solid #333',
                paddingBottom: '10px'
            }}>
                <h1 className='quest-title big' style={{ margin: 0 }}>BestBit Coin Quest</h1>
                
                <div className="game-controls" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={handleManualSaveWithConfirmation}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        💾 Save
                    </button>
                    
                    <button 
                        onClick={handleResetGameWithWarning}
                        style={{
                            padding: '8px 15px',
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        🔄 Reset
                    </button>
                </div>
            </div>






            {/* added css lol*/}

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
                                            backgroundColor: '#ffd700',
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



            {/* quest systme panel */}
            <QuestPanel 
                coin_count={coin_count}
                total_clicks={total_clicks}
                onRewardClaimed={handleQuestRewardWithBonusCalculation}
            />







                        {/*ugrade shop area*/}


                        <UpgradeShop
                                    coin_count={coin_count}
                                    onPurchase={handleUpgradePurchaseAndUpdateStats}
                                    current_coin_per_click={coin_per_click}
                                    />










                                     {/* pasive income area */}






            <PassiveIncome
                coin_count={coin_count}
                onPassiveEarnings={handlePassiveEarningsFromGenerators}
                onGeneratorPurchase={handleGeneratorPurchaseWithDeduction}
                />



            {!game_loaded && (
                <div style={{ color: 'orange', marginTop: '20px' }}>
                    Loading BestBit Coin Quest...
                </div>
            )}
        </div>
    );
};

export default App;


