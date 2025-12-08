
import { Lesson, UserStats, DashboardItem } from './types';

export const LEVEL_THRESHOLDS = [
  { title: "Novice", minStars: 0 },
  { title: "Home Cook", minStars: 50 },
  { title: "Prep Cook", minStars: 100 },
  { title: "Line Cook", minStars: 200 },
  { title: "Sous Chef", minStars: 350 },
  { title: "Executive Chef", minStars: 500 },
  { title: "Culinary Legend", minStars: 1000 }
];

export const INITIAL_STATS: UserStats = {
  title: "Prep Cook",
  stars: 120,
  completedLessons: [],
  uploadedPhotos: [] // Start empty
};

export const DASHBOARD_DATA: Record<string, DashboardItem[]> = {
  lesson1: [
    {
      id: "safety-101",
      title: "Key Terminology: Safety",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800",
      duration: "5 min",
      level: "Beginner",
      tags: ["Terms", "Hygiene"]
    },
    {
      id: "equipment-101",
      title: "Key Terminology: Equipment",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      duration: "8 min",
      level: "Beginner",
      tags: ["Terms", "Tools"]
    },
    {
      id: "market-101",
      title: "Key Terminology: Produce",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      duration: "10 min",
      level: "Beginner",
      tags: ["Terms", "Selection"]
    }
  ],
  lesson2: [
    {
      id: "tech-cutting",
      title: "Knife Skills: Chopping",
      type: "technique",
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800",
      duration: "12 min",
      level: "Beginner",
      tags: ["Cutting", "Prep"]
    },
    {
      id: "tech-heat",
      title: "Heat Mastery: Sear vs Stir-Fry",
      type: "technique",
      image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
      duration: "15 min",
      level: "Intermediate",
      tags: ["Heat Control", "Methods"]
    },
    {
      id: "tech-boiling",
      title: "Boiling & Blanching",
      type: "technique",
      image: "https://images.unsplash.com/photo-1553163147-621957516919?auto=format&fit=crop&q=80&w=800",
      duration: "7 min",
      level: "Beginner",
      tags: ["Heat", "Water"]
    },
    {
      id: "tech-saute",
      title: "Sautéing Fundamentals",
      type: "technique",
      image: "https://images.unsplash.com/photo-1522037576655-7a93ce0f4d93?auto=format&fit=crop&q=80&w=800",
      duration: "15 min",
      level: "Intermediate",
      tags: ["Pan Fry", "Heat"]
    }
  ],
  lesson3: [
    {
      id: "scrambled-eggs-101",
      title: "Perfect Scrambled Eggs",
      type: "recipe",
      image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=800",
      duration: "10 min",
      level: "Beginner",
      tags: ["Breakfast", "Eggs"]
    },
    {
      id: "pasta-carbonara",
      title: "Classic Carbonara",
      type: "recipe",
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800",
      duration: "25 min",
      level: "Intermediate",
      tags: ["Italian", "Pasta"]
    },
    {
      id: "steak-mashed",
      title: "Steak & Mashed Potatoes",
      type: "recipe",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
      duration: "45 min",
      level: "Advanced",
      tags: ["Dinner", "Meat"]
    }
  ]
};

// --- RECIPES (LESSON 3) ---

const SCRAMBLED_EGGS_LESSON: Lesson = {
  id: "scrambled-eggs-101",
  title: "Mastering Soft Scrambled Eggs",
  description: "Learn the art of heat control and continuous movement for custard-like texture. A perfect breakfast staple.",
  image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=1200",
  heroVideoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", // Placeholder using working link
  metadata: {
    rating: 4.8,
    reviewCount: 342,
    calories: 210,
    carbs: 2,
    fat: 16,
    protein: 14,
    cost: "", // Removed Free
    difficulty: "Easy",
    servings: 2
  },
  tools: [], ingredients: [],
  ingredientList: [
    { name: "Large Eggs", amount: "4 pcs", group: "Main" },
    { name: "Unsalted Butter", amount: "1 tbsp", group: "Main" },
    { name: "Whole Milk", amount: "1 tbsp", group: "Seasoning" },
    { name: "Salt", amount: "1/4 tsp", group: "Seasoning" },
    { name: "Chives", amount: "chopped", group: "Garnish" }
  ],
  steps: [
    {
      id: 1,
      title: "Crack & Whisk",
      videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS",
      duration: 10,
      instruction: "Whisk eggs vigorously until *frothy* and uniform in color. Add a pinch of *salt* now.",
      challenge: "When should you add the salt, and why?",
      recallConcept: "Lesson 1: Seasoning early helps break down proteins."
    },
    {
      id: 2,
      title: "Heat Control",
      videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS",
      duration: 15,
      instruction: "Set burner to *Medium-Low*. Melt butter until it *foams*, but does not brown.",
      challenge: "Which heat level prevents rubbery eggs?",
      recallConcept: "Heat Mastery: Low heat enables slow coagulation.",
    },
    {
      id: 3,
      title: "The Push Technique",
      videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS",
      duration: 20,
      instruction: "Pour eggs in. Wait *5 seconds*, then gently *push* curds from edge to center.",
      challenge: "What motion creates the 'Large Curd' texture?",
      recallConcept: "Technique: The 'Push' vs 'Scramble' motion."
    },
    {
      id: 4,
      title: "Finish Off Heat",
      videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS",
      duration: 10,
      instruction: "Remove from heat while slightly *runny*. Residual heat will finish cooking them.",
      challenge: "Why remove the pan while the eggs are still wet?",
      recallConcept: "Physics: Carry-over cooking continues after heat source is removed."
    }
  ]
};

const CARBONARA_LESSON: Lesson = {
    id: "pasta-carbonara",
    title: "Classic Carbonara",
    description: "Authentic Roman pasta. No cream, just egg yolks and pecorino.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800",
    heroVideoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS",
    metadata: { rating: 4.9, reviewCount: 520, calories: 650, carbs: 80, fat: 25, protein: 22, cost: "", difficulty: "Intermediate", servings: 2 },
    tools: [], ingredients: [],
    ingredientList: [
        { name: "Spaghetti", amount: "200g", group: "Main" },
        { name: "Guanciale", amount: "100g", group: "Main" },
        { name: "Egg Yolks", amount: "3", group: "Main" },
        { name: "Pecorino Romano", amount: "50g", group: "Seasoning" },
        { name: "Black Pepper", amount: "plenty", group: "Seasoning" }
    ],
    steps: [
      { 
        id: 1, 
        title: "Crisp the Guanciale", 
        videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", 
        duration: 20, 
        instruction: "Cook guanciale in a cold pan until fat *renders* and it becomes crispy.",
        challenge: "Why start with a cold pan?",
        recallConcept: "Physics: Fat rendering requires gradual heat."
      },
      { 
        id: 2, 
        title: "Temper the Eggs", 
        videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", 
        duration: 15, 
        instruction: "Whisk yolks with cheese. Add a splash of *pasta water* to prevent scrambling.",
        challenge: "What does the starchy pasta water do?",
        recallConcept: "Chemistry: Emulsification binds fat and water."
      },
      { 
        id: 3, 
        title: "Toss and Emulsify", 
        videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", 
        duration: 20, 
        instruction: "Toss pasta with fat off heat. Add egg mixture and stir *vigorously* to create sauce.",
        challenge: "Why must this happen 'Off Heat'?",
        recallConcept: "Temperature: Eggs scramble at 150°F+ (Direct heat is too hot)."
      }
    ]
};

const STEAK_LESSON: Lesson = {
    id: "steak-mashed",
    title: "Steak & Mashed Potatoes",
    description: "The perfect sear meets creamy, buttery potatoes.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
    heroVideoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", // Placeholder
    metadata: { rating: 4.9, reviewCount: 890, calories: 850, carbs: 45, fat: 55, protein: 60, cost: "", difficulty: "Advanced", servings: 2 },
    tools: [], ingredients: [],
    ingredientList: [
        { name: "Ribeye Steak", amount: "2", group: "Main" },
        { name: "Potatoes", amount: "3 large", group: "Main" },
        { name: "Butter", amount: "100g", group: "Seasoning" },
        { name: "Rosemary", amount: "2 sprigs", group: "Garnish" }
    ],
    steps: [
      { id: 1, title: "The Sear", videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", duration: 25, instruction: "Place steak in smoking hot pan. Do not touch for *2 minutes* to form crust." },
      { id: 2, title: "Butter Baste", videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", duration: 20, instruction: "Add butter and herbs. Tilt pan and *spoon* hot butter over the steak repeatedly." },
      { id: 3, title: "Resting", videoUrl: "https://youtube.com/shorts/RKu6COo8Pxs?si=K2NIhQXRT1I5pFCS", duration: 10, instruction: "Let steak rest for *10 minutes* before slicing to retain juices." }
    ]
};

// --- LESSON 1 & 2 (PHOTO MODULES - NO INGREDIENTS) ---

export const LESSON_DATA: Record<string, Lesson> = {
  "scrambled-eggs-101": SCRAMBLED_EGGS_LESSON,
  "pasta-carbonara": CARBONARA_LESSON,
  "steak-mashed": STEAK_LESSON,
  
  "safety-101": {
    id: "safety-101",
    title: "Key Terminology: Safety",
    description: "Essential concepts for maintaining a safe and professional kitchen environment.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 5.0, reviewCount: 120, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Beginner", servings: 0 },
    tools: [], ingredients: [], ingredientList: [], // Empty Ingredients
    steps: [
      { 
        id: 1, 
        title: "Mise en Place", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1556912165-3472769c9dca?auto=format&fit=crop&q=80&w=800",
        duration: 30, 
        instruction: "*Mise en place* (French for 'putting in place') means gathering and arranging all ingredients and tools *before* cooking starts." 
      },
      { 
        id: 2, 
        title: "The Danger Zone", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800",
        duration: 30, 
        instruction: "Bacteria grow rapidly between *40°F and 140°F* (4°C - 60°C). Keep hot foods hot and cold foods cold." 
      },
      { 
        id: 3, 
        title: "Cross-Contamination", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1606851682859-99e829dc79f7?auto=format&fit=crop&q=80&w=800",
        duration: 30, 
        instruction: "The transfer of harmful bacteria from raw foods (like chicken) to ready-to-eat foods. Always use *separate cutting boards*." 
      }
    ]
  },
  "equipment-101": {
    id: "equipment-101",
    title: "Key Terminology: Equipment",
    description: "Identifying the correct tools for the job.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.7, reviewCount: 85, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Beginner", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { 
        id: 1, 
        title: "The Chef's Knife", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800",
        duration: 20, 
        instruction: "The primary tool for chopping, slicing, and dicing. The *blade* should be curved to allow a rocking motion." 
      },
      { 
        id: 2, 
        title: "Cast Iron Skillet", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
        duration: 20, 
        instruction: "Excellent for heat retention and searing. Requires *seasoning* to maintain a non-stick surface." 
      }
    ]
  },
  "market-101": {
    id: "market-101",
    title: "Key Terminology: Produce",
    description: "Terms for selecting quality ingredients.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.5, reviewCount: 40, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Beginner", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { 
          id: 1, 
          title: "Ripe vs. Overripe", 
          videoUrl: "", 
          image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
          duration: 20, 
          instruction: "Ripe produce yields slightly to pressure. *Overripe* produce is mushy and may have a fermented smell." 
        }
    ]
  },
  "tech-cutting": {
    id: "tech-cutting",
    title: "Knife Skills: Chopping",
    description: "Master the 'Claw Grip' and 'Rocking Motion'. View our 3D Knife Anatomy model to understand leverage.",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.9, reviewCount: 200, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Intermediate", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { 
        id: 1, 
        title: "The Claw Grip", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1615486511484-92e172cc416d?auto=format&fit=crop&q=80&w=800",
        duration: 15, 
        instruction: "Tuck your fingertips *in* to protect them from the blade. Use your knuckles as a guide." 
      },
      { 
        id: 2, 
        title: "Rocking Motion", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=800",
        duration: 20, 
        instruction: "Keep the tip of the knife *on the board* while rocking the handle up and down for efficient chopping." 
      }
    ]
  },
  "tech-heat": {
    id: "tech-heat",
    title: "Heat Mastery: Sear vs Stir-Fry",
    description: "Understand how temperature and motion change the outcome of your dish using the Comparison Model.",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.8, reviewCount: 150, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Intermediate", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { 
        id: 1, 
        title: "Comparison: Sear vs Stir-Fry", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=800",
        duration: 30, 
        instruction: "Use *High Static Heat* for searing to create a crust. Use *High Motion Heat* for stir-fry to cook evenly without burning.",
        comparison: {
          title: "Cooking Methods",
          itemA: { label: "Pan-Sear", heatLevel: "High", motion: "Static", cookware: "Cast Iron" },
          itemB: { label: "Stir-Fry", heatLevel: "Extreme", motion: "Constant", cookware: "Wok" }
        }
      },
      { 
        id: 2, 
        title: "The Maillard Reaction", 
        videoUrl: "", 
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800",
        duration: 20, 
        instruction: "Browning creates flavor. This chemical reaction happens between amino acids and reducing sugars above *300°F*." 
      }
    ]
  },
  "tech-boiling": {
    id: "tech-boiling",
    title: "Boiling & Blanching",
    description: "Learn to preserve color and texture in vegetables.",
    image: "https://images.unsplash.com/photo-1553163147-621957516919?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.6, reviewCount: 90, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "", difficulty: "Beginner", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { id: 1, title: "Rolling Boil", videoUrl: "", image: "https://images.unsplash.com/photo-1553163147-621957516919?auto=format&fit=crop&q=80&w=800", duration: 10, instruction: "Wait for big, *rapid* bubbles before adding food." },
        { id: 2, title: "Shocking", videoUrl: "", image: "https://images.unsplash.com/photo-1563599175-d6af243aa2e6?auto=format&fit=crop&q=80&w=800", duration: 15, instruction: "Immediately transfer to *ice water* to stop cooking." }
    ]
  },
  "tech-saute": {
    id: "tech-saute",
    title: "Sautéing Fundamentals",
    description: "High heat, small amount of fat, and movement.",
    image: "https://images.unsplash.com/photo-1522037576655-7a93ce0f4d93?auto=format&fit=crop&q=80&w=800",
    metadata: { rating: 4.7, reviewCount: 110, calories: 50, carbs: 0, fat: 5, protein: 0, cost: "", difficulty: "Intermediate", servings: 0 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { id: 1, title: "Preheat Pan", videoUrl: "", image: "https://images.unsplash.com/photo-1522037576655-7a93ce0f4d93?auto=format&fit=crop&q=80&w=800", duration: 15, instruction: "The pan must be hot *before* adding oil to prevent sticking." }
    ]
  }
};

export const SAMPLE_LESSON = SCRAMBLED_EGGS_LESSON;
