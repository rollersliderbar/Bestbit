import React, { useState, useEffect } from 'react';

// will make better quests later, but doin this now

interface Quest {
    id: number;
    title: string;
    description: string;
    target: number;
    current: number;
    reward: number;
    completed: boolean;
    //typ : string

}

interface QuestPanelProps {
    coin_count: number;
    total_clicks: number;


            onRewardClaimed: (reward: number) => void;



}





const QuestPanel: React.FC<QuestPanelProps> = ({ coin_count, total_clicks, onRewardClaimed }) => {
    console.log("QuestPanel component loaded");

    const [quests, setQuests] = useState<Quest[]>([]);
    


    const [panel_open, setPanelOpen ] = useState(true);


    //hardcoding quest value for now

    const initial_quests: Quest[] = [
        {
            id: 1,
            title: "First Steps",
            description: "Collect 5 coing",
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
            target: 50
            current: 0,
            reward: 100,
            completed: false
        }

    ];


    


    useEffect(() => {
        console.log("Initializing quests..........");
        setQuests(initial_quests);
    }, []);


    //update quest progress


     useEffect(() => {
        console.log("updating quest progress");
        console.log("current coins:", coin_count, "clicks:", total_clicks);

        setQuests(prevQuests => 
            prevQuests.map(quest => {


                let newCurrent = quest.current;
                
                // check quest type by target ranges (hacky but works)
                if (quest.target <= 20) { // click-based quests
                    newCurrent = total_clicks;
                } else { // coin-based quests  
                    newCurrent = coin_count;
                }

                const isCompleted = newCurrent >= quest.target && !quest.completed;
                
                if (isCompleted) {
                    console.log("Quest completed:", quest.title);
                }

                return {
                    ...quest,
                    current: newCurrent,
                    completed: quest.completed || isCompleted
                };
            })
        );
    }, [coin_count, total_clicks]);

            const handleClaimReward = (quest: Quest) =. {
                kdsdsdsdsssdsdsdsdsdsdsdscdsdsdsmmm      mmndjcns             cl     
            }


