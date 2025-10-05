// FEATURE 3: Quest panel component 
// basic quest sytem with rewards and stuff

import React, { useState, useEffect } from 'react';


//will need better quest logic later idk

interface Quest {
    id: number;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: number;
    completed: boolean;
    //type: string; maybe later
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

    // hardcoded quests for now lol
    const initial_quests: Quest[] = [
        {
            id: 1,
            title: "First Steps",
            description: "Collect 5 coins",
            target: 5,
            current: 0,
            reward: 10,
            completed: false
        },
        {
            id: 2, 
            title: "Click Master",
            description: "Make 15 clicks",
            target: 15,
            current: 0,
            reward: 25,
            completed: false
        },
        {
            id: 3,
            title: "Coin Hoarder",
            description: "Reach 50 coins",
            target: 50,
            current: 0,
            reward: 100,
            completed: false
        }
    ];

    useEffect(() => {
        console.log("initializing quests...");
        setQuests(initial_quests);
    }, []);

    // update quest progress
     useEffect(() => {
        console.log("upfatinh quest progress based on stats");
        console.log("coins: ", coin_count, "clicks: ", total_clicks);





        setQuests(prevQuests => 
            prevQuests.map(quest => {


                let newCurrent = quest.current;
                
                // check questtype by desc (hacky lol)
                if (quest.description.includes("clicks") || quest.description.includes("Click")) {
                    newCurrent = total_clicks;
                } 
                
                
                else {



                    newCurrent = coin_count;
                }

                const isCompleted = newCurrent >= quest.target && !quest.completed;
                
                if (isCompleted) {




                    console.log("Quest completed!!!", quest.title);
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
        







                                 // mark as claimed (remove from list for now)
        setQuests(prevQuests => 
            prevQuests.filter(q => q.id !== quest.id)
        );

        console.log("reward claimed:", quest.reward);
    };



    return (
        <div className="quest-panel" style={{
            border: '2px solid #333',
            padding: '15px',
            margin: '20px 0',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
        }}>
            <div className="quest-header">
                <h3>Quests 📋</h3>
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
                <div className="quest-list">
                    {quests.length === 0 ? (
                        <p style={{ color: 'gray', fontStyle: 'italic' }}>
                            No quests available right now
                        </p>
                    ) : (
                        quests.map(quest => (
                            <div 
                                key={quest.id} 
                                className="quest-item"
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '10px',
                                    margin: '8px 0',
                                    borderRadius: '5px',
                                    backgroundColor: quest.completed ? '#e8f5e8' : '#fff'
                                }}
                            >
                                <h4 style={{ margin: '0 0 5px 0' }}>{quest.title}</h4>
                                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
                                    {quest.description}
                                </p>
                                
                                <div className="quest-progress">
                                    <span style={{ fontSize: '12px' }}>
                                        Progress: {quest.current}/{quest.target}
                                    </span>
                                    
                                    {quest.completed && (
                                        <button
                                            onClick={() => handleClaimReward(quest)}
                                            style={{
                                                marginLeft: '10px',
                                                padding: '5px 15px',
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Claim {quest.reward} coins! 🎉
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}







            {/* debug quest info */}
            <p style={{ fontSize: '10px', color: 'gray', marginTop: '10px' }}>
                Debug: Active quests = {quests.length}
            </p>
        </div>







    );






};



export default QuestPanel;