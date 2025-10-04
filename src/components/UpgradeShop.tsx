//to up-grade shop componetn


import React, { useState } from "react";

//prob will  need balance adjustment later ig


interface Upgrade {
    id: number;
    // bro check what i found lmaoooo i was js writing number and saw this so cool id: DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES

    name: string;
    description: string;
    cost: number;
    level: number;
    max_level: number;
    bonus_per_level: number;
}

interface UpgradeShopProps {

    coin_count: number;
    onPurchase: (cost: number, upgrade_id: number) => void;

    current_coin_per_click: number;


}





const UpgradeShop: React.FC<UpgradeShopProps> = ({ coin_count, onPurchase, current_coin_per_click }) => {
    console.log("UpgradeShop loaded");
    console.log("player coins:", coin_count);

    const [upgrades, setUpgrades] = useState<Upgrade[]>([






        {
            id: 1,
            name: "Better Coins",
            description: "Collect 2 coins per click",
            cost: 20,
            level: 0,
            max_level: 1,
            bonus_per_level: 1
        },
        {
            id: 2,
            name: "Golden Touch",
            description: "+1 coin per click (can stack)",
            cost: 50,
            level: 0,
            max_level: 5,
            bonus_per_level: 1
        },
        {
            id: 3,
            name: "Mega Clicker",
            description: "+3 coins per click (expensive af)",
            cost: 200,
            level: 0,
            max_level: 3,
            bonus_per_level: 3
        }



] );



        const [shop_open, setShopOpen] = useState(true);





        const handleUpgradePurchaseWithValidation = (upgrade: Upgrade) => {
                   console.log("Tring to buy an upgrade: ", upgrade.name);
                   
                   



                   //first sanity check with afford


                   if(coin_count < upgrade.cost) {
                    console.log("Not enough coins broski");
                    alert("Not enough coins!!!! Need: " + upgrade.cost + " coins");

            

                            return;
                            //check level

 }
                   
                                   if (upgrade.level >= upgrade.max_level) {
                                          console.log("upgrade already maxed out");
                                             alert("This upgrade is already maxed!");
                                                 return;
        }




                           //buy pgrade

                           console.log("purchasing upgrade........")
                           onPurchase(upgrade.cost, upgrade.id);



                            // update upgrade level
        setUpgrades(prevUpgrades => 
            prevUpgrades.map(u => {
                if (u.id === upgrade.id) {
                    const new_level = u.level + 1;
                    const new_cost = Math.floor(u.cost * 1.5); // cost increases by 50%
                    
                    console.log("upgrade level:", u.level, "->", new_level);
                    
                    return {
                        ...u,
                        level: new_level,
                        cost: new_cost
                    };
                }
                return u;
            })
        );

        console.log("upgrade purchased successfully");
    };




    return (

        <div className="upgrade-shop" style={{
            border: '2px solid #ff6b6b',
            padding: "15px",
            margin: '20px 0',
            backgroundColor: '#FFF4F4',
            borderRadius: '8px'
        }}>
                        <div className = "shop-content">

                            <div className="shop-header">
                                <h3>Upgrade Shop 🛒</h3>
                                <button 
                                    onClick={() => setShopOpen(!shop_open)}
                                    style={{ 
                                        fontSize: '12px',
                                        padding: '5px 10px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    {shop_open ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {shop_open && (
                                <>


                            <p style={{ fontSize: '13px', marginBottom: '10px', color: "#666"}}>

                                Current: <strong>{current_coin_per_click}</strong> coins per click
                            </p>


                            <div className="upgrade-list">
                                {
                                    upgrades.map(upgrade => {
                                        const can_afford = coin_count >= upgrade.cost;
                                        const is_maxed = upgrade.level >= upgrade.max_level;

                                        return (
                                            <div 
                                                    key={upgrade.id}
                                                    className="upgrade-item"
                                                    style={{
                                                        border: '1px solid #fff',
                                                        padding: '12px',
                                                        margin: '8px 0',
                                                        borderRadius: '5px',
                                                        backgroundColor: is_maxed ? '#f0f0f0' : '#fff',
                                                        opacity: is_maxed ? 0.6 : 1
                                                    }}
                                                    >

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ margin: '0 0 5px 0' }}>
                                                {upgrade.name} 
                                                <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
                                                    Lv. {upgrade.level}/{upgrade.max_level}
                                                </span>
                                            </h4>
                                            <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                                                {upgrade.description}
                                            </p>
                                            <p style={{ 
                                                margin: '0',
                                                fontSize: '14px',
                                                fontWeight: 'bold',
                                                color: can_afford ? '#2ecc71' : '#e74c3c'
                                            }}>
                                                Cost: {upgrade.cost} 🪙
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => handleUpgradePurchaseWithValidation(upgrade)}
                                            disabled={!can_afford || is_maxed}
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: is_maxed ? '#ccc' : (can_afford ? '#3498db' : '#95a5a6'),
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: is_maxed || !can_afford ? 'not-allowed' : 'pointer',
                                                fontSize: '14px'
                                            }}
                                        >
                                            {is_maxed ? 'Maxed' : 'Buy'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </>
                    )}
                </div>
        </div>
    );
};

export default UpgradeShop;