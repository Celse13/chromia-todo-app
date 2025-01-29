const funnyAnimalNames = [
    "SneakyLlama",
    "CheekyMonkey",
    "LaughingPenguin",
    "JellybeanGiraffe",
    "CrazyKangaroo",
    "GigglingHedgehog",
    "WackyWalrus",
    "ChucklingChameleon",
    "BouncingBunny",
    "MischievousMeerkat",
    "DancingDolphin",
    "SillySloth",
    "GrouchyGrizzly",
    "ChirpyCheetah",
    "BumblingBee",
    "JovialJellyfish",
    "HoppingHare",
    "MerryManatee",
    "SingingSeagull",
    "WhimsicalWombat",
  ];
  
  export function getRandomUserName() {
    const randomIndex = Math.floor(Math.random() * funnyAnimalNames.length);
    return funnyAnimalNames[randomIndex];
  }
  
  export type UserDto = {
    name: string,
    id: Buffer,
  };
  