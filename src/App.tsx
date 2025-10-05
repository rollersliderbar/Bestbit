import React, { useState, useEffect } from 'react';
import './App.css';
import QuestPanel from './components/QuestPanel';
import UpgradeShop from './components/UpgradeShop';
import PassiveIncome from './components/PassiveIncome';

// spent hours on this ui revamp, looks way better now tho
// glassmorphism and gradients everywhere lol

const App = () => {
    console.log("App component loaded - BestBit Coin Quest initialized");

    const [playerName, setPlayerName] = useState('');
    const [coin_count, setCoinCount] = useState(0);
    const [game_loaded, setGameLoaded] = useState(false);
    const [total_clicks, setTotalClicks] = useState(0);
    const [coin_per_click, setCoinPerClick] = useState(1);
    const [has_loaded_save, setHasLoadedSave] = useState(false);
    const [name_confirmed, setNameConfirmed] = useState(false);
    const [show_review_popup, setShowReviewPopup] = useState(false);
    const [review_popup_expanded, setReviewPopupExpanded] = useState(false);



    let debug_coin_placeholder = 0;
    console.log("game state initialized");
    console.log("playerName:", playerName);
    console.log("coin_count:", coin_count);
    console.log("clicks so far:   ", total_clicks)




    useEffect(() => {
        console.log("BestBit Coin Quest - game startup sequence");
        
        // load saved game on startup
        if (!has_loaded_save) {
            console.log("attempting to load saved game");
            
            const saved_game = localStorage.getItem('bestbit_coin_quest_save');
            
            if (saved_game) {
                try {
                    const game_state = JSON.parse(saved_game);
                    console.log("loaded game state:", game_state);
                    
                    setPlayerName(game_state.playerName || '');
                    setCoinCount(game_state.coin_count || 0);
                    setTotalClicks(game_state.total_clicks || 0);
                    setCoinPerClick(game_state.coin_per_click || 1);
                    
                    // if name exists from save, mark as confirmed
                    if (game_state.playerName && game_state.playerName.length > 0) {
                        setNameConfirmed(true);
                        console.log("player name auto-confirmed from save:", game_state.playerName);
                    }
                    
                    console.log("game loaded successfully from save");
                } catch (error) {
                    console.log("failed to load save:", error);
                }
            } else {
                console.log("no saved game found");
            }
            
            setHasLoadedSave(true);
        }
        
        // game loaded animation
        setTimeout(() => {
            setGameLoaded(true);
            console.log("DEBUG: Game zone loaded successfully");
        }, 150);

        return () => {
            console.log("Component unmounting - goodbye coin quest");
        };
    }, [has_loaded_save]);

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
        }, 5000);

        return () => {
            console.log("clearing autosave interval");
            clearInterval(save_interval);
        };
    }, [playerName, coin_count, total_clicks, coin_per_click]);





    const handlePlayerNameInputWithLoggingAndValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("player name change event triggered");

        // 1. input value
        const inputValue = event.target.value;
        console.log('input value:', inputValue);



        // 2. display log state
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



    //coin clicker function
    const handleCoinClickWithSoundEffectMaybe = () => {
        console.log("coin click detected");
        console.log("coins per click: ", coin_per_click);



        //update coin count with bonus
        const new_coin_count = coin_count + coin_per_click;
        setCoinCount(new_coin_count);
        console.log("Coin amount updated from: ", coin_count, "to ", new_coin_count);


        //tracks clicks and saves
        const new_click_count = total_clicks + 1;
        setTotalClicks(new_click_count);
        console.log("total click: ", new_click_count);



        //maybe will add sound effect later
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
    const handleUpgradePurchaseAndUpdateStats = (cost: number, upgrade_id: number, bonus_amount: number) => {
        console.log("upgrade purchase handler called");
        console.log("cost:", cost, "upgrade id:", upgrade_id);



        //deduct coins
        const new_coin_amount = coin_count - cost;
        setCoinCount(new_coin_amount);
        console.log("coins after purchase", new_coin_amount);



        //increase coin per click
        const new_coin_per_click = coin_per_click + bonus_amount;
        setCoinPerClick(new_coin_per_click);
        console.log("coin per click updated: ", coin_per_click, "----> ", new_coin_per_click);

    };









    //passive earning handler
    const handlePassiveEarningsFromGenerators = (amount: number) => {
        console.log("passive earnings received:", amount);
        
        
        const new_total = coin_count + amount;
        setCoinCount(new_total);
    };


    //generator purchase handler
    const handleGeneratorPurchaseWithDeduction = (cost: number, generator_id: number) => {
        console.log("buying generator id:", generator_id);
        console.log("cost:", cost);



        // deduct coins
        const new_amount = coin_count - cost;
        setCoinCount(new_amount);
        console.log("coins after generator purchase: ", new_amount);
    };













    const handleConfirmPlayerNameWithValidation = () => {
        console.log("confirm player name triggered");
        
        
        // validation check
        if (playerName.trim().length === 0) {
            console.log("empty name detected - cannot confirm");
            alert("Please enter a name before confirming!");
            return;
        }
        
        
        console.log("confirming player name:", playerName);
        setNameConfirmed(true);
        console.log("name confirmed - hiding input box");
        
        
        // save immediately after confirming name
        const game_state = {
            playerName,
            coin_count,
            total_clicks,
            coin_per_click,
            timestamp: Date.now()
        };
        localStorage.setItem('bestbit_coin_quest_save', JSON.stringify(game_state));
        console.log("game saved with confirmed name");
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
        alert("Game saved successfully!");
    };  



    //reset game function
    const handleResetGameWithWarning = () => {
        console.log('Reset game requested');
        const confirm = window.confirm("Are you sure you want to reset? No going back!");

        if(confirm) {
            console.log("resetting game...");


            setPlayerName('');
            setCoinCount(0);
            setTotalClicks(0);
            setCoinPerClick(1);
            setNameConfirmed(false);


            localStorage.removeItem('bestbit_coin_quest_save');
            console.log("game reset complete - name input will show again");
            
            alert("Game reset complete! Welcome back, adventurer!");
        } else {
            console.log("reset cancelled");
        }
    };


    // show review popup immediately on page load
    // wanted users to see it right away for feedback
    useEffect(() => {
        console.log("setting up review popup timer");
        
        const review_popup_timer = setTimeout(() => {
            setShowReviewPopup(true);
            console.log("review popup triggered - asking for feedback");
        }, 100); // show almost immediately, tiny delay for smooth loading

        return () => {
            console.log("clearing review popup timer");
            clearTimeout(review_popup_timer);
        };
    }, []);


    // handle review popup click
    const handleReviewPopupClickWithExpansion = () => {
        console.log("review popup clicked - expanding message");
        setReviewPopupExpanded(true);
        console.log("review popup expanded state:", true);
    };


    // close review popup
    const handleCloseReviewPopupWithLogging = () => {
        console.log("closing review popup");
        setShowReviewPopup(false);
        setReviewPopupExpanded(false);
        console.log("review popup closed");
    };





    // render the ui
    return (
        <div className="coin-quest-container main">
            <div className="header-section">
                <h1 className='quest-title big'>Coin Quest Empire</h1>
                
                <div className="game-controls">
                    <button 
                        onClick={handleManualSaveWithConfirmation}
                        className="save-btn control-btn"
                    >
                        Save Progress
                    </button>
                    
                    <button 
                        onClick={handleResetGameWithWarning}
                        className="reset-btn control-btn"
                    >
                        New Game
                    </button>
                </div>
            </div>





            {/* player setup section - only show if name not confirmed */}
            {!name_confirmed && (
                <div className='player-setup section'>
                    <h2 className="section-title">Begin Your Journey</h2>
                    <div className="name-input-wrapper">
                        <label htmlFor='playerNameInput' className='input-label'>
                            Enter your adventurer name:
                        </label>
                        <input 
                            id="playerNameInput"
                            type="text"
                            value={playerName}
                            onChange={handlePlayerNameInputWithLoggingAndValidation}
                            placeholder='Enter your name...'
                            className='player-name-input special'
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleConfirmPlayerNameWithValidation();
                                }
                            }}
                        />
                    </div>

                    {playerName && (
                        <button 
                            onClick={handleConfirmPlayerNameWithValidation}
                            className="confirm-name-btn"
                        >
                            Start Adventure
                        </button>
                    )}
                </div>
            )}

            {/* show welcome message after name confirmed */}
            {name_confirmed && playerName && (
                <div className='player-welcome section'>
                    <p className='welcome-message'>
                        Welcome back, <strong>{playerName}</strong>! Your empire awaits.
                    </p>
                </div>
            )}





            <div className="coin-display-section">
                <h3 className="coin-header">Treasury Balance</h3>
                <div className="coin-counter big">
                    <span className="coin-amount">{coin_count.toLocaleString()}</span>
                    <span className="coin-label">Gold Coins</span>
                </div>

                <div className="stats-display">
                    <div className="stat-item">
                        <span className="stat-label">Earning Power:</span>
                        <span className="stat-value">{coin_per_click}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total Efforts:</span>
                        <span className="stat-value">{total_clicks.toLocaleString()}</span>
                    </div>
                </div>


                {/* coin earning zone */}
                <div className="coin-earning-zone">
                    <button
                        onClick={handleCoinClickWithSoundEffectMaybe}
                        className='collect-coin-btn'
                    >
                        Mine Gold
                    </button>
                </div>


                {/* debug info */}
                <p className="debug-info">
                    Debug: debug_coin_placeholder = {debug_coin_placeholder}
                </p>

                <p className="debug-info-secondary">
                    States: total clicks = {total_clicks}
                </p>
            </div>



            {/* quest system panel */}
            <QuestPanel 
                coin_count={coin_count}
                total_clicks={total_clicks}
                onRewardClaimed={handleQuestRewardWithBonusCalculation}
            />





            {/* upgrade shop area */}
            <UpgradeShop
                coin_count={coin_count}
                onPurchase={handleUpgradePurchaseAndUpdateStats}
                current_coin_per_click={coin_per_click}
            />





            {/* passive income area */}
            <PassiveIncome
                coin_count={coin_count}
                onPassiveEarnings={handlePassiveEarningsFromGenerators}
                onGeneratorPurchase={handleGeneratorPurchaseWithDeduction}
            />



            {!game_loaded && (
                <div className="loading-message">
                    Preparing your adventure...
                </div>
            )}


            {/* cute review popup */}
            {show_review_popup && (
                <div className="review-popup-container">
                    {!review_popup_expanded ? (
                        <div 
                            className="review-popup-cute"
                            onClick={handleReviewPopupClickWithExpansion}
                        >
                            <span className="review-emoji">⭐</span>
                            <span className="review-click-me">Click me!</span>
                        </div>
                    ) : (
                        <div className="review-popup-expanded">
                            <button 
                                className="review-close-btn"
                                onClick={handleCloseReviewPopupWithLogging}
                            >
                                ×
                            </button>
                            <div className="review-content">
                                <span className="review-emoji-big">⭐✨</span>
                                <p className="review-message">
                                    Having fun with Coin Quest Empire? 
                                </p>
                                <p className="review-message-sub">
                                    Please give me a good vote : )
                                </p>
                                <p className="review-message-small">
                                    Your support means the world!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;


