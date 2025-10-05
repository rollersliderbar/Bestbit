# Coin Quest Empire 🎮

yo wassup, this is my coin clicker game lol. made it with react and typescript cuz why not

## what is this thing?

Basically its a coin clicking game where u click to get coins and buy upgrades and stuff. pretty simple

### Features and stuff

- **Click to earn coins** - just click the button and watch ur coins go brrrr
- **Quests system** - complete challenges to get bonus coins, got like 10 quests rn
- **Upgrade shop** - buy upgrades to make ur clicks worth more coins per click
- **Passive income generators** - buy these and they make coins for u automatically even when ur not clicking
- **Save system** - ur progress gets auto-saved every 5 seconds so u dont lose anything when u reload
- **Modern ui** - revamped the whole thing with glassmorphism and gradients, looks pretty sick ngl
- **Cute review popup** - after 30 seconds a little star appears asking for a good review lol

## how to run this

```bash
# install dependencies first
npm install

# run the dev server
npm run dev

# should open on localhost:5174 or something like that
```

## tech stack i made it up on

- **react 19.1.1** - for the ui components and stuff
- **typescript** - cuz types are cool i guess
- **vite** - super fast build tool, love it
- **localStorage** - for saving ur game progress locally

## project structure

```
src/
  App.tsx              - main game logic, handles everything basically
  App.css              - all the styling with gradients and animations
  components/
    QuestPanel.tsx     - quest system with 10 challenges
    UpgradeShop.tsx    - upgrades for clicking power
    PassiveIncome.tsx  - auto coin generators
```

## how it works

1. enter ur name when u start
2. click the "mine gold" button to earn coins
3. complete quests for bonus rewards
4. buy upgrades to make each click worth more
5. buy generators for passive income
6. watch ur empire grow lol

.

## features breakdown

### quest system
got 10 quests with progressive difficulty:
- starts at 10 coins, goes up to 10,000,000
- rewards scale from 50 to 5,000,000 coins
- auto-removes when u claim the reward

### upgrade shop
3 upgrade tiers:
- bronze pickaxe - starter upgrade
- golden touch - mid tier boost
- master's technique - endgame power

### passive income
4 generator types:
- apprentice miner - basic income
- lucky talisman - better income
- coin forge - even better
- dragon's hoard - best passive income

### save/load system
- auto-saves every 5 seconds
- saves to localStorage
- loads automatically when u open the page
- remembers ur name, coins, clicks, everything



## license

idk do whatever u want with it lol

---

made with ❤️ and lots of coffee ☕

btw if u like this give it a good review pls : )
