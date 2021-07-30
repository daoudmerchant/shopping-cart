function importAll(r) {
  let images = {};
  r.keys().forEach((item) => (images[item.slice(2, -4)] = r(item)));
  return images;
}

const images = importAll(require.context("./images/", false, /\.jpg$/));

// TODO: Worth mapping image urls to inventory array functionally?

const inventory = [
  {
    product: "Nintendo Switch",
    description:
      "Nintendo Switch is a breakthrough home video game console. For the first time, players can enjoy a full home-console experience anytime, anywhere",
    category: "console",
    options: [
      {
        color: "Neon Red and Blue",
        imageUrl: images.switch_neon_red_blue.default,
        price: 274.99,
        inStock: true,
      },
      {
        color: "Grey",
        imageUrl: images.switch_grey.default,
        price: 274.99,
        inStock: true,
      },
    ],
  },
  {
    product: "Joy Con Pair",
    description:
      "The versatile joy-con offer multiple surprising ways for players to have fun",
    category: "accessory",
    options: [
      {
        color: "Neon Red and Blue",
        imageUrl: images.joy_con_neon_red_blue.default,
        price: 54.99,
        inStock: false,
      },
      {
        color: "Grey",
        imageUrl: images.joy_con_grey.default,
        price: 57.99,
        inStock: true,
      },
    ],
  },
  {
    product: "Nintendo Switch Lite",
    description:
      "The console for gamers on the go, Nintendo Switch Lite is a compact, lightweight addition to the Nintendo Switch family with integrated controls",
    category: "console",
    options: [
      {
        color: "Blue",
        imageUrl: images.switch_lite_blue.default,
        price: 197.5,
        inStock: true,
      },
      {
        color: "Coral",
        imageUrl: images.switch_lite_coral.default,
        price: 195,
        inStock: true,
      },
      {
        color: "Grey",
        imageUrl: images.switch_lite_grey.default,
        price: 195,
        inStock: false,
      },
      {
        color: "Turquoise",
        imageUrl: images.switch_lite_turquoise.default,
        price: 195,
        inStock: false,
      },
      {
        color: "Yellow",
        imageUrl: images.switch_lite_yellow.default,
        price: 195,
        inStock: true,
      },
    ],
  },
  {
    product: "The Legend of Zelda: Breath of the Wild",
    description:
      "Step into a world of discovery, exploration and adventure in The Legend of Zelda: Breath of the Wild",
    category: "game",
    imageUrl: images.breath_of_the_wild.default,
    price: 49.99,
    inStock: true,
  },
  {
    product: "Super Mario Odyssey",
    description:
      "Mario embarks on a new journey through the unknown, running and jumping through huge 3D worlds in the first sandbox-style Mario game since Super Mario 64 and Super Mario Sunshine",
    category: "game",
    imageUrl: images.mario_odyssey.default,
    price: 47.99,
    inStock: true,
  },
  {
    product: "Super Smash Bros. Ultimate",
    description:
      "3…2…1…GO! Have a blast trying to launch your opponents off the stage in the ultimate action game",
    category: "game",
    imageUrl: images.super_smash_bros.default,
    price: 59.99,
    inStock: true,
  },
  {
    product: "New Super Mario Bros. U Deluxe",
    description:
      "Luigi’s first starring role in a platforming adventure, New Super Luigi U, is getting the deluxe treatment too, and comes packed in!",
    category: "game",
    imageUrl: images.new_super_mario_bros_u.default,
    price: 49.99,
    inStock: true,
  },
  {
    product: "Animal Crossing",
    description:
      "If the hustle and bustle of modern life’s got you down, Tom Nook has a business venture up his sleeve that he knows you’ll adore: his brand-new, ultra-exclusive Nook Inc. Deserted Island Getaway Package!",
    category: "game",
    imageUrl: images.animal_crossing.default,
    price: 44.99,
    inStock: true,
  },
  {
    product: "Luigi's Mansion 3",
    description:
      "He may still be cowardly, but Luigi has more tools and abilities at his disposal than ever before. Master Luigi’s new powerful moves of Slam, Suction Shot and Burst",
    category: "game",
    imageUrl: images.luigi_s_mansion_3.default,
    price: 42.99,
    inStock: false,
  },
  {
    product: "Pikmin 3 Deluxe",
    description:
      "Grow a squad of adorable, plant-like Pikmin to traverse a strange world and save your planet",
    category: "game",
    imageUrl: images.pikmin_3.default,
    price: 39.99,
    inStock: true,
  },
];

export default inventory;
