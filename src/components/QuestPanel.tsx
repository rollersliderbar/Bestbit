// FEATURE 3: Quest panel component 
// quest system with rewards
// expanded this to 10 quests with progressive difficulty
// auto-removes completed quests cuz why keep them around

import React, { useState, useEffect } from 'react';


//will need better quest logic later
// maybe add daily quests or something idk

interface Quest {
    id: number;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: number;
    completed: boolean;
}

interface QuestPanelProps {
    coin_count: number;
    total_clicks: number;
    onRewardClaimed: (reward: number) => void;
}




 

const QuestPanel: React.FC<QuestPanelProps> = ({ coin_count, total_clicks, onRewardClaimed }) => {
    console.log("QuestPanel component loaded");
    console.log("current coin count:", coin_count);
    console.log("total clicks:", total_clicks);
    
    const [quests, setQuests] = useState<Quest[]>([]);
    const [panel_open, setPanelOpen] = useState(true);

    // quest system with progressive difficulty
    // initial quests list
    // made these with fantasy theme descriptions
    // progression goes from 10 coins to 10 million lol
    const initial_quests: Quest[] = [
        {
            id: 1,
            title: "Beginner's Fortune",
            description: "Collect your first 10 coins to start your journey",
            target: 10,
            current: 0,
            reward: 15,
            completed: false
        },
        {
            id: 2, 
            title: "Click Apprentice",
            description: "Click the coin button 20 times to prove your dedication",
            target: 20,
            current: 0,
            reward: 30,
            completed: false
        },
        {
            id: 3,
            title: "Coin Collector",
            description: "Accumulate 75 coins in your treasury",
            target: 75,
            current: 0,
            reward: 50,
            completed: false
        },
        {
            id: 4,
            title: "Dedicated Clicker",
            description: "Reach 50 total clicks to show your persistence",
            target: 50,
            current: 0,
            reward: 75,
            completed: false
        },
        {
            id: 5,
            title: "Wealth Builder",
            description: "Build your fortune to 200 coins",
            target: 200,
            current: 0,
            reward: 150,
            completed: false
        },
        {
            id: 6,
            title: "Century Clicker",
            description: "Achieve the milestone of 100 clicks",
            target: 100,
            current: 0,
            reward: 200,
            completed: false
        },
        {
            id: 7,
            title: "Treasure Hunter",
            description: "Amass a legendary hoard of 500 coins",
            target: 500,
            current: 0,
            reward: 300,
            completed: false
        },
        {
            id: 8,
            title: "Elite Clicker",
            description: "Master the art with 250 total clicks",
            target: 250,
            current: 0,
            reward: 400,
            completed: false
        },
        {
            id: 9,
            title: "Coin Magnate",
            description: "Build an empire worth 1,000 coins",
            target: 1000,
            current: 0,
            reward: 750,
            completed: false
        },
        {
            id: 10,
            title: "Legendary Clicker",
            description: "Reach legendary status with 500 clicks",
            target: 500,
            current: 0,
            reward: 1000,
            completed: false
        }
    ];

    useEffect(() => {
        console.log("initializing quests...");
        setQuests(initial_quests);
    }, []);

    // update quest progress
    useEffect(() => {
        console.log("updating quest progress based on stats");
        console.log("coins: ", coin_count, "clicks: ", total_clicks);




        setQuests(prevQuests => 
            prevQuests.map(quest => {
                let newCurrent = quest.current;
                
                // check quest type by description
                // click-based quests check total_clicks, coin-based check coin_count
                if (quest.description.includes("clicks") || quest.description.includes("Click")) {
                    newCurrent = total_clicks;
                } else if (quest.description.includes("coins") || quest.description.includes("Coin") || quest.description.includes("Collect") || quest.description.includes("Accumulate") || quest.description.includes("fortune") || quest.description.includes("wealth") || quest.description.includes("hoard") || quest.description.includes("empire")) {
                    newCurrent = coin_count;
                }

                const isCompleted = newCurrent >= quest.target && !quest.completed;
                
                if (isCompleted) {
                    console.log("Quest completed!", quest.title);
                }

                return {
                    ...quest,
                    current: newCurrent,
                    completed: quest.completed || isCompleted
                };
            })
        );
    }, [coin_count, total_clicks]);








    const handleClaimReward = (quest: Quest) => {
        console.log("claiming reward for quest:", quest.title);
        


        onRewardClaimed(quest.reward);
        




        // mark as claimed and remove from list
        setQuests(prevQuests => 
            prevQuests.filter(q => q.id !== quest.id)
        );

        console.log("reward claimed:", quest.reward);
    };



    return (
        <div className="quest-panel">
            <div className="quest-header">
                <h3 className="section-title">Epic Challenges</h3>
                <button 
                    onClick={() => setPanelOpen(!panel_open)}
                    className="toggle-btn"
                >
                    {panel_open ? 'Hide' : 'Show'}
                </button>
            </div>







            {panel_open && (
                <div className="quest-list">
                    {quests.length === 0 ? (
                        <p className="empty-message">
                            No quests available right now
                        </p>
                    ) : (
                        quests.map(quest => (
                            <div 
                                key={quest.id} 
                                className={`quest-item ${quest.completed ? 'completed' : ''}`}
                            >
                                <h4 className="quest-item-title">{quest.title}</h4>
                                <p className="quest-item-description">
                                    {quest.description}
                                </p>
                                
                                <div className="quest-progress">
                                    <div className="progress-bar-container">
                                        <div 
                                            className="progress-bar-fill"
                                            style={{
                                                width: `${Math.min((quest.current / quest.target) * 100, 100)}%`
                                            }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">
                                        {quest.current}/{quest.target}
                                    </span>
                                    
                                    {quest.completed && (
                                        <button
                                            onClick={() => handleClaimReward(quest)}
                                            className="claim-btn"
                                        >
                                            Claim {quest.reward.toLocaleString()} coins
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}





            {/* debug quest info */}
            <p className="debug-info">
                Debug: Active quests = {quests.length}
            </p>
        </div>
    );
};



export default QuestPanel;