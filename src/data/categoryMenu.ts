export interface SubLevel {
  name: string;
  tags: string[];
}

export interface CategoryTopLevel {
  name: string;
  subLevels: SubLevel[];
}

export const categoryMenu: CategoryTopLevel[] = [
  {
    name: "Dog",
    subLevels: [
      { name: "Dry Food", tags: ["Dry Food", "dog"] },
      { name: "Wet Food", tags: ["Wet Food", "dog"] },
      { name: "From The freezer", tags: ["From The freezer", "Dog"] },
      { name: "Wormers", tags: ["Dog", "Wormer"] },
      { name: "Toys", tags: ["Dog", "Toy"] },
      { name: "Leads and Collars", tags: ["Leads", "collar", "Dog"] },
      { name: "Harnessess", tags: ["Harnes", "Dog"] },
      { name: "Grooming", tags: ["Dog", "Grooming"] },
      { name: "Coats", tags: ["Dog", "Coat"] },
      { name: "Health Products", tags: ["Dog Health Products"] },
    ],
  },
  {
    name: "Cat",
    subLevels: [
      { name: "Dry Food", tags: ["Dry Food", "Cat"] },
      { name: "Wet Food", tags: ["Wet Food", "Cat"] },
      { name: "From The freezer", tags: ["From The freezer"] },
      { name: "Wormers", tags: ["Cat", "Wormer"] },
      { name: "Toys", tags: ["Cat", "Toy"] },
      { name: "Leads and Collars", tags: ["Leads", "collar", "cat"] },
      { name: "Harnessess", tags: ["Harnes", "Cat"] },
      { name: "Grooming", tags: ["Cat"] },
      { name: "Litter", tags: ["Cat", "Litter"] },
      { name: "Accessories", tags: ["Cat"] },
      { name: "Health Products", tags: ["Cat", "Health Products"] },
    ],
  },
  {
    name: "Horse",
    subLevels: [
      { name: "Horse feed", tags: ["Horse", "Feed"] },
      { name: "Wormers", tags: ["Horse", "Wormers"] },
      { name: "Grooming", tags: ["Horse"] },
      { name: "Winter Rugs", tags: ["Horse", "Rugs", "Winter"] },
      { name: "Summer Rugs", tags: ["Horse", "Rugs", "Summer"] },
      { name: "Leads and Harnesses", tags: ["Horse", "Lead", "Harness"] },
      { name: "Accessories", tags: ["Horse", "Access"] },
    ],
  },
  {
    name: "Livestock",
    subLevels: [
      { name: "Cattle", tags: ["Cattle", "Feed"] },
      { name: "Sheep", tags: ["Sheep", "Feed"] },
      { name: "Goats", tags: ["Goat Feed"] },
      { name: "Misc Feed", tags: ["Pig", "Alpaca", "kangarro", "Feed"] },
      { name: "Mineral Block", tags: ["Blocks"] },
    ],
  },
  {
    name: "Grain",
    subLevels: [{ name: "Grain", tags: ["Grain"] }],
  },
  {
    name: "Poultry",
    subLevels: [
      { name: "Chicken Feed", tags: ["Chicken Feed"] },
      { name: "Gamebird", tags: ["Gamebird"] },
      { name: "Duck and Goose", tags: ["Duck", "Goose"] },
      { name: "Feeders", tags: ["Feeder", "Chicken"] },
      { name: "Drinkers", tags: ["Drinker", "chicken"] },
      { name: "Incubators and Brooding boxes", tags: ["Brooding", "Incubators"] },
      { name: "Accessories", tags: ["Chicken", "Access"] },
    ],
  },
  {
    name: "Small Creatures",
    subLevels: [
      { name: "Bird feed", tags: ["Bird", "feed"] },
      { name: "Rabbit and Guinea Pig", tags: ["Rabbit", "Guinea Pig"] },
    ],
  },
  {
    name: "Electric Fence",
    subLevels: [
      { name: "energisers", tags: ["Solar", "Energisers"] },
      { name: "Offsets", tags: ["Offsets"] },
      { name: "insullators", tags: ["insullators"] },
      { name: "Pigtails", tags: ["Pigtails"] },
      { name: "Braid and Rope", tags: ["Braid", "Tape", "Rope"] },
      { name: "Joiners", tags: ["Joiner", "Electric"] },
    ],
  },
  {
    name: "Fencing",
    subLevels: [
      { name: "Netting", tags: ["Fencing", "Nett"] },
      { name: "Wire", tags: ["Fencing", "Wire"] },
      { name: "Tools", tags: ["Fencing tool"] },
      { name: "Accessories", tags: ["Fencing access"] },
      { name: "Pine Posts", tags: ["Pine"] },
      { name: "Wood shield", tags: ["Wood Shield"] },
    ],
  },
  {
    name: "Irrigation",
    subLevels: [
      { name: "Rural Fittings", tags: ["Rural", "Fit"] },
      { name: "Pressure Fittings", tags: ["Pres Fit"] },
      { name: "Hose Clips", tags: ["Hose Clips"] },
      { name: "Accessories", tags: ["Access"] },
    ],
  },
];
