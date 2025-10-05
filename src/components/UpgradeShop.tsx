//upgrade shop component


import React, { useState } from "react";

//will need balance adjustment later


interface Upgrade {
    id: number;
    name: string;
    description: string;
    cost: number;
    level: number;
    max_level: number;
    bonus_per_level: number;
}

interface UpgradeShopProps {
    coin_count: number;
    onPurchase: (cost: number, upgrade_id: number, bonus_amount: number) => void;
    current_coin_per_click: number;
}





const UpgradeShop: React.FC<UpgradeShopProps> = ({ coin_count, onPurchase, current_coin_per_click }) => {
    console.log("UpgradeShop loaded");
    console.log("player coins:", coin_count);

    const [upgrades, setUpgrades] = useState<Upgrade[]>([






        {
            id: 1,
            name: "Bronze Pickaxe",
            description: "Upgrade your mining tool to earn 2 coins per click",
            cost: 20,
            level: 0,
            max_level: 1,
            bonus_per_level: 1
        },
        {
            id: 2,
            name: "Golden Touch",
            description: "Enchant your hands with magic for +1 coin per click",
            cost: 50,
            level: 0,
            max_level: 5,
            bonus_per_level: 1
        },
        {
            id: 3,
            name: "Master's Technique",
            description: "Learn ancient mining secrets for +3 coins per click",
            cost: 200,
            level: 0,
            max_level: 3,
            bonus_per_level: 3
        }



] );



        const [shop_open, setShopOpen] = useState(true);





    const handleUpgradePurchaseWithValidation = (upgrade: Upgrade) => {
        console.log("Trying to buy upgrade: ", upgrade.name);
        
        


        //afford check
        if(coin_count < upgrade.cost) {
            console.log("Not enough coins");
            alert("Not enough coins! Need: " + upgrade.cost + " coins");
            return;
        }
        
        //level check
        if (upgrade.level >= upgrade.max_level) {
            console.log("upgrade already maxed out");
            alert("This upgrade is already maxed!");
            return;
        }



        //buy upgrade
        console.log("purchasing upgrade...");
        onPurchase(upgrade.cost, upgrade.id, upgrade.bonus_per_level);



        // update upgrade level
        setUpgrades(prevUpgrades => 
            prevUpgrades.map(u => {
                if (u.id === upgrade.id) {
                    const new_level = u.level + 1;
                    const new_cost = Math.floor(u.cost * 1.5);
                    
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
        <div className="upgrade-shop">
            <div className="shop-header">
                <h3 className="section-title">Upgrade Shop</h3>
                <button 
                    onClick={() => setShopOpen(!shop_open)}
                    className="toggle-btn"
                >
                    {shop_open ? 'Hide' : 'Show'}
                </button>
            </div>

            {shop_open && (
                <div className="shop-content">
                    <p className="current-stats">
                        Your Mining Power: <strong>{current_coin_per_click}</strong> gold per strike
                    </p>


                    <div className="upgrade-list">
                        {
                            upgrades.map(upgrade => {
                                const can_afford = coin_count >= upgrade.cost;
                                const is_maxed = upgrade.level >= upgrade.max_level;

                                return (
                                    <div 
                                        key={upgrade.id}
                                        className={`upgrade-item ${is_maxed ? 'maxed' : ''}`}
                                    >
                                        <div className="upgrade-content">
                                            <div className="upgrade-info">
                                                <h4 className="upgrade-item-title">
                                                    {upgrade.name}
                                                    <span className="upgrade-level">
                                                        Level {upgrade.level}/{upgrade.max_level}
                                                    </span>
                                                </h4>
                                                <p className="upgrade-item-description">
                                                    {upgrade.description}
                                                </p>
                                                <p className={`upgrade-cost ${can_afford ? 'affordable' : 'expensive'}`}>
                                                    Cost: {upgrade.cost.toLocaleString()} coins
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleUpgradePurchaseWithValidation(upgrade)}
                                                disabled={!can_afford || is_maxed}
                                                className="buy-btn"
                                            >
                                                {is_maxed ? 'Maxed' : 'Buy'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpgradeShop;