export interface Item {
  id: number;
  name: string;
  current: boolean;
  category: string;
  exclude: boolean;
}

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const ItemList: Array<Item> = [
  {
    id: generateUniqueId(),
    name: "M",
    current: false,
    category: "main",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "A",
    current: false,
    category: "main",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "S",
    current: false,
    category: "main",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "H",
    current: false,
    category: "main",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Superhero",
    current: false,
    category: "job",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Software Developer",
    current: false,
    category: "job",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Skydiving instructor",
    current: false,
    category: "job",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Toilet Licker",
    current: false,
    category: "job",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Tesla",
    current: false,
    category: "car",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Range Rover",
    current: false,
    category: "car",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Toyota",
    current: false,
    category: "car",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Pinto",
    current: false,
    category: "car",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Black Widow",
    current: false,
    category: "marriage",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Wonder Woman",
    current: false,
    category: "marriage",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Scarlett Witch",
    current: false,
    category: "marriage",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Wicked Witch of the West",
    current: false,
    category: "marriage",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Azgard",
    current: false,
    category: "place",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Nottingham",
    current: false,
    category: "place",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Bali",
    current: false,
    category: "place",
    exclude: false,
  },
  {
    id: generateUniqueId(),
    name: "Poop Town",
    current: false,
    category: "place",
    exclude: false,
  },
];
