// FETURE 5: passive income / auto clicker componet
// earn coinsz automatically over time lol


import React, { useState, useEffect } from 'react';




//might need to tweak the timings and stuff

interface PassiveGenerator {
    id: number;
    name: string;
    description: string;
    cost: number;
    coins_per_second: number;
    owned: number;
    //icon?: string; add later maybe
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
    
    const [generators, setGenerators] = useState<PassiveGenerator[]>([



        {
            id: 1,
            name: "Coin Finder",
            description: "Finds 0.5 coins per second",
            cost: 30,
            coins_per_second: 0.5,
            owned: 0
        },
        {
            id: 2,
            name: "Lucky Charm",
            description: "Generates 2 coins per second",
            cost: 100,
            coins_per_second: 2,
            owned: 0
        },
        {
            id: 3,
            name: "Coin Machine",
            description: "Produces 5 coins per second",
            cost: 500,
            coins_per_second: 5,
            owned: 0
        },
        {
            id: 4,
            name: "Magic Wallet",
            description: "Makes 15 coins per second (op af)",
            cost: 2000,
            coins_per_second: 15,
            owned: 0
        }



    ]);

    const [panel_open, setPanelOpen] = useState(true);
    const [total_coins_per_sec, setTotalCoinsPerSec] = useState(0);



    // calcualte total coins pr second
    useEffect(() => {
        console.log("recalculating passive income...");
        
        let total = 0;
        generators.forEach(gen => {
            total += gen.coins_per_second * gen.owned;
        });
        
        setTotalCoinsPerSec(total);
        console.log("total coins per second:", total);
    }, [generators]);



    // pasive income tick every second
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
            console.log("cant afford this generator");
            alert("Not enough coins! Need " + generator.cost + " coins");
            return;
        }




        // buy it
        console.log("purchasing generator...");
        onGeneratorPurchase(generator.cost, generator.id);
        


        // update owned count
        setGenerators(prevGens => 
            prevGens.map(g => {
                if (g.id===generator.id) {
                    const new_owned = g.owned + 1;
                    const new_cost = Math.floor(g.cost * 1.3); // 30% increase
                    
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

        console.log("generator purchased!!");
    };




    return (
        <div className="passive-income-panel" style={{
            border: '2px solid #9b59b6',
            padding: '15px',
            margin: '20px 0',
            backgroundColor: '#f5f0ff',
            borderRadius: '8px'
        }}>
            <div className="passive-header">
                <h3>Passive Income 💰</h3>
                <button 
                    onClick={() => setPanelOpen(!panel_open)}
                    style={{ 
                        fontSize: '12px',
                        padding: '5px 10px',
                        marginLeft: '10px'
                    }}
                >
                    {panel_open ? 'Hide' : 'Show'}
                </button>
            </div>






            {panel_open && (
                <div className="passive-content">
                    <div style={{ 
                        marginBottom: '15px', 
                        padding: '10px',
                        backgroundColor: '#e8d4ff',
                        borderRadius: '5px'
                    }}>
                        <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>
                            Total Income: <span style={{ color: '#9b59b6' }}>
                                {total_coins_per_sec.toFixed(1)} coins/sec
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
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '12px',
                                        margin: '8px 0',
                                        borderRadius: '5px',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center' 
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 5px 0' }}>
                                                {generator.name}
                                                {generator.owned > 0 && (
                                                    <span style={{ 
                                                        fontSize: '12px', 
                                                        color: '#9b59b6', 
                                                        marginLeft: '8px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        x{generator.owned}
                                                    </span>
                                                )}
                                            </h4>
                                            <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                                                {generator.description}
                                            </p>
                                            <p style={{ 
                                                margin: '0',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: can_afford ? '#27ae60' : '#e74c3c'
                                            }}>
                                                Cost: {generator.cost} 🪙
                                            </p>
                                            {generator.owned > 0 && (
                                                <p style={{ 
                                                    margin: '3px 0 0 0',
                                                    fontSize: '11px',
                                                    color: '#7f8c8d'
                                                }}>
                                                    Earning: {(generator.coins_per_second * generator.owned).toFixed(1)}/sec
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleBuyGeneratorWithChecks(generator)}
                                            disabled={!can_afford}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: can_afford ? '#9b59b6' : '#bdc3c7',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: can_afford ? 'pointer' : 'not-allowed',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}
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
            <p style={{ fontSize: '10px', color: 'gray', marginTop: '10px' }}>
                Debug: total generators owned = {generators.reduce((sum, g) => sum + g.owned, 0)}
            </p>
        </div>
    );
};

export default PassiveIncome;