// FEATURE 5: passive income / auto clicker component
// earn coins automatically over time


import React, { useState, useEffect } from 'react';



//will need to tweak the timings later

interface PassiveGenerator {
    id: number;
    name: string;
    description: string;
    cost: number;
    coins_per_second: number;
    owned: number;
}

interface PassiveIncomeProps {
    coin_count: number;
    onPassiveEarnings: (amount: number) => void;
    onGeneratorPurchase: (cost: number, generator_id: number) => void;
}





const PassiveIncome: React.FC<PassiveIncomeProps> = ({ 
    coin_count, 
    onPassiveEarnings, 
    onGeneratorPurchase 
}) => {
    console.log("PassiveIncome component loaded");
    
    // generator definitions
    // each one produces coins per second
    // cost increases by 1.5x each time u buy one
    const initial_generators: PassiveGenerator[] = [
        {
            id: 1,
            name: "Apprentice Miner",
            description: "Hire a novice to mine 0.5 coins per second",
            cost: 30,
            coins_per_second: 0.5,
            owned: 0
        },
        {
            id: 2,
            name: "Lucky Talisman",
            description: "Ancient charm that generates 2 coins per second",
            cost: 100,
            coins_per_second: 2,
            owned: 0
        },
        {
            id: 3,
            name: "Coin Forge",
            description: "Mystical forge producing 5 coins per second",
            cost: 500,
            coins_per_second: 5,
            owned: 0
        },
        {
            id: 4,
            name: "Dragon's Hoard",
            description: "Legendary treasure generating 15 coins per second",
            cost: 2000,
            coins_per_second: 15,
            owned: 0
        }
    ];

    const [generators, setGenerators] = useState<PassiveGenerator[]>(initial_generators);
    const [panel_open, setPanelOpen] = useState(true);
    const [total_coins_per_sec, setTotalCoinsPerSec] = useState(0);



    // calculate total coins per second
    useEffect(() => {
        console.log("recalculating passive income...");
        
        let total = 0;
        generators.forEach(gen => {
            total += gen.coins_per_second * gen.owned;
        });
        
        setTotalCoinsPerSec(total);
        console.log("total coins per second:", total);
    }, [generators]);



    // passive income tick every second
    useEffect(() => {
        if (total_coins_per_sec <= 0) {
            console.log("no passive income yet");
            return;
        }

        console.log("starting passive income interval");
        
        const interval = setInterval(() => {
            console.log("passive income tick:", total_coins_per_sec);
            onPassiveEarnings(total_coins_per_sec);
        }, 1000);

        return () => {
            console.log("clearing passive income interval");
            clearInterval(interval);
        };
    }, [total_coins_per_sec, onPassiveEarnings]);




    const handleBuyGeneratorWithChecks = (generator: PassiveGenerator) => {
        console.log("trying to buy generator:", generator.name);
        


        // afford check
        if (coin_count < generator.cost) {
            console.log("cannot afford this generator");
            alert("Not enough coins! Need " + generator.cost + " coins");
            return;
        }




        // buy it
        console.log("purchasing generator...");
        onGeneratorPurchase(generator.cost, generator.id);
        


        // update owned count
        setGenerators(prevGens => 
            prevGens.map(g => {
                if (g.id === generator.id) {
                    const new_owned = g.owned + 1;
                    const new_cost = Math.floor(g.cost * 1.3);
                    
                    console.log("generator owned:", g.owned, "->", new_owned);
                    
                    return {
                        ...g,
                        owned: new_owned,
                        cost: new_cost
                    };
                }
                return g;
            })
        );

        console.log("generator purchased!");
    };




    return (
        <div className="passive-income-panel">
            <div className="passive-header">
                <h3 className="section-title">Automated Gold Mines</h3>
                <button 
                    onClick={() => setPanelOpen(!panel_open)}
                    className="toggle-btn"
                >
                    {panel_open ? 'Hide' : 'Show'}
                </button>
            </div>





            {panel_open && (
                <div className="passive-content">
                    <div className="passive-income-display">
                        <p className="income-rate">
                            Empire Production: <span className="income-value">
                                {total_coins_per_sec.toFixed(1)} gold/sec
                            </span>
                        </p>
                    </div>

                    <div className="generator-list">
                        {generators.map(generator => {
                            const can_afford = coin_count >= generator.cost;
                            
                            return (
                                <div 
                                    key={generator.id}
                                    className="generator-item"
                                >
                                    <div className="generator-content">
                                        <div className="generator-info">
                                            <h4 className="generator-item-title">
                                                {generator.name}
                                                {generator.owned > 0 && (
                                                    <span className="generator-owned">
                                                        x{generator.owned}
                                                    </span>
                                                )}
                                            </h4>
                                            <p className="generator-item-description">
                                                {generator.description}
                                            </p>
                                            <p className={`generator-cost ${can_afford ? 'affordable' : 'expensive'}`}>
                                                Cost: {generator.cost.toLocaleString()} coins
                                            </p>
                                            {generator.owned > 0 && (
                                                <p className="generator-earnings">
                                                    Production: {(generator.coins_per_second * generator.owned).toFixed(1)}/sec
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleBuyGeneratorWithChecks(generator)}
                                            disabled={!can_afford}
                                            className="buy-btn"
                                        >
                                            Buy
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}





            {/* debug passive info */}
            <p className="debug-info">
                Debug: total generators owned = {generators.reduce((sum, g) => sum + g.owned, 0)}
            </p>
        </div>
    );
};

export default PassiveIncome;