
import { Lesson, UserStats, DashboardItem } from './types';

export const INITIAL_STATS: UserStats = {
  title: "Prep Cook",
  stars: 120,
  completedLessons: [],
  uploadedPhotos: ["https://picsum.photos/id/1080/200/200", "https://picsum.photos/id/835/200/200"]
};

export const DASHBOARD_DATA: Record<string, DashboardItem[]> = {
  lesson1: [
    {
      id: "safety-101",
      title: "Kitchen Safety & Hygiene",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=800",
      duration: "5 min",
      level: "Beginner",
      tags: ["Safety", "Hygiene"]
    },
    {
      id: "equipment-101",
      title: "Essential Equipment",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
      duration: "8 min",
      level: "Beginner",
      tags: ["Tools", "Setup"]
    },
    {
      id: "market-101",
      title: "Going to the Store",
      type: "foundation",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
      duration: "10 min",
      level: "Beginner",
      tags: ["Shopping", "Produce"]
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

const SCRAMBLED_EGGS_LESSON: Lesson = {
  id: "scrambled-eggs-101",
  title: "Mastering Soft Scrambled Eggs",
  description: "Learn the art of heat control and continuous movement for custard-like texture. A perfect breakfast staple.",
  metadata: {
    rating: 4.8,
    reviewCount: 342,
    calories: 210,
    carbs: 2,
    fat: 16,
    protein: 14,
    cost: "Low (< $3)",
    difficulty: "Easy",
    servings: 2
  },
  tools: [
    {
      id: "spatula",
      name: "Silicone Spatula",
      image: "https://images.unsplash.com/photo-1588612663969-96860368c5b5?auto=format&fit=crop&q=80&w=800",
      labels: [
        { text: "Flexible Head", position: { top: "30%", left: "65%" } },
        { text: "Heat Resistant Grip", position: { top: "65%", left: "35%" } }
      ]
    }
  ],
  ingredients: [
    {
      id: "eggs",
      name: "Large Eggs",
      goodImage: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400",
      badImage: "https://images.unsplash.com/photo-1598965628757-5e135246714c?auto=format&fit=crop&q=80&w=400",
      tips: "Fresh eggs have a high, firm yolk."
    }
  ],
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
      videoUrl: "https://player.vimeo.com/external/464870335.sd.mp4?s=25f4648937989938641979317515664155694200&profile_id=164&oauth2_token_id=57447761",
      duration: 10,
      instruction: "Whisk eggs vigorously until *frothy* and uniform in color. Add a pinch of *salt* now."
    },
    {
      id: 2,
      title: "Heat Control",
      videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83&profile_id=164&oauth2_token_id=57447761",
      duration: 15,
      instruction: "Set burner to *Medium-Low*. Melt butter until it *foams*, but does not brown.",
      quiz: {
        question: "Why do we use Medium-Low heat?",
        options: ["Cook faster", "Prevent rubbery texture", "Burn butter"],
        correctAnswerIndex: 1,
        explanation: "High heat coagulates proteins too quickly, creating a rubbery texture."
      }
    },
    {
      id: 3,
      title: "The Push Technique",
      videoUrl: "https://player.vimeo.com/external/410464227.sd.mp4?s=21382405d45207c4581452a3250e2920257e8412&profile_id=164&oauth2_token_id=57447761",
      duration: 20,
      instruction: "Pour eggs in. Wait *5 seconds*, then gently *push* curds from edge to center."
    },
    {
      id: 4,
      title: "Finish Off Heat",
      videoUrl: "https://player.vimeo.com/external/372332147.sd.mp4?s=01726a7605d3923a1a382c442468d6c757c91350&profile_id=164&oauth2_token_id=57447761",
      duration: 10,
      instruction: "Remove from heat while slightly *runny*. Residual heat will finish cooking them."
    }
  ]
};

export const SAMPLE_LESSON = SCRAMBLED_EGGS_LESSON; // For backward compatibility

export const LESSON_DATA: Record<string, Lesson> = {
  "scrambled-eggs-101": SCRAMBLED_EGGS_LESSON,
  
  "safety-101": {
    id: "safety-101",
    title: "Kitchen Safety 101",
    description: "The foundation of all cooking. Learn proper hand washing and cross-contamination prevention.",
    metadata: { rating: 5.0, reviewCount: 120, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "Free", difficulty: "Beginner", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { id: 1, title: "Hand Washing", videoUrl: "https://player.vimeo.com/external/372332147.sd.mp4?s=01726a7605d3923a1a382c442468d6c757c91350&profile_id=164", duration: 20, instruction: "Wash hands with warm soapy water for at least *20 seconds*." },
      { id: 2, title: "Cross Contamination", videoUrl: "https://player.vimeo.com/external/464870335.sd.mp4?s=25f4648937989938641979317515664155694200", duration: 15, instruction: "Never use the same board for *raw meat* and vegetables." }
    ]
  },
  "equipment-101": {
    id: "equipment-101",
    title: "Essential Equipment",
    description: "Identify and use the core tools of a professional kitchen.",
    metadata: { rating: 4.7, reviewCount: 85, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "Free", difficulty: "Beginner", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { id: 1, title: "The Chef's Knife", videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83", duration: 15, instruction: "The most versatile tool. Hold it by the *bolster*, not just the handle." },
      { id: 2, title: "The Skillet", videoUrl: "https://player.vimeo.com/external/410464227.sd.mp4?s=21382405d45207c4581452a3250e2920257e8412", duration: 15, instruction: "A heavy-bottomed pan ensures *even heat* distribution." }
    ]
  },
  "market-101": {
    id: "market-101",
    title: "Market Strategy",
    description: "How to select the freshest produce and read labels like a pro.",
    metadata: { rating: 4.5, reviewCount: 40, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "Free", difficulty: "Beginner", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { id: 1, title: "Selecting Produce", videoUrl: "https://player.vimeo.com/external/372332147.sd.mp4?s=01726a7605d3923a1a382c442468d6c757c91350", duration: 15, instruction: "Look for firm textures and vibrant colors. *Avoid* bruised items." }
    ]
  },
  "tech-cutting": {
    id: "tech-cutting",
    title: "Knife Skills: Chopping",
    description: "Master the 'Claw Grip' and 'Rocking Motion' to chop safely and efficiently.",
    metadata: { rating: 4.9, reviewCount: 200, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "Free", difficulty: "Intermediate", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
      { id: 1, title: "The Claw Grip", videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83", duration: 15, instruction: "Tuck your fingertips *in* to protect them from the blade." },
      { id: 2, title: "Rocking Motion", videoUrl: "https://player.vimeo.com/external/464870335.sd.mp4?s=25f4648937989938641979317515664155694200", duration: 20, instruction: "Keep the tip of the knife *on the board* while rocking the handle up and down." }
    ]
  },
  "tech-boiling": {
    id: "tech-boiling",
    title: "Boiling & Blanching",
    description: "Learn to preserve color and texture in vegetables.",
    metadata: { rating: 4.6, reviewCount: 90, calories: 0, carbs: 0, fat: 0, protein: 0, cost: "Low", difficulty: "Beginner", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { id: 1, title: "Rolling Boil", videoUrl: "https://player.vimeo.com/external/410464227.sd.mp4?s=21382405d45207c4581452a3250e2920257e8412", duration: 10, instruction: "Wait for big, *rapid* bubbles before adding food." },
        { id: 2, title: "Shocking", videoUrl: "https://player.vimeo.com/external/372332147.sd.mp4?s=01726a7605d3923a1a382c442468d6c757c91350", duration: 15, instruction: "Immediately transfer to *ice water* to stop cooking." }
    ]
  },
  "tech-saute": {
    id: "tech-saute",
    title: "Sautéing Fundamentals",
    description: "High heat, small amount of fat, and movement.",
    metadata: { rating: 4.7, reviewCount: 110, calories: 50, carbs: 0, fat: 5, protein: 0, cost: "Low", difficulty: "Intermediate", servings: 1 },
    tools: [], ingredients: [], ingredientList: [],
    steps: [
        { id: 1, title: "Preheat Pan", videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83", duration: 15, instruction: "The pan must be hot *before* adding oil." }
    ]
  },
  "pasta-carbonara": {
    id: "pasta-carbonara",
    title: "Classic Carbonara",
    description: "Authentic Roman pasta. No cream, just egg yolks and pecorino.",
    metadata: { rating: 4.9, reviewCount: 520, calories: 650, carbs: 80, fat: 25, protein: 22, cost: "Medium", difficulty: "Intermediate", servings: 2 },
    tools: [], ingredients: [],
    ingredientList: [
        { name: "Spaghetti", amount: "200g", group: "Main" },
        { name: "Guanciale", amount: "100g", group: "Main" },
        { name: "Egg Yolks", amount: "3", group: "Main" },
        { name: "Pecorino Romano", amount: "50g", group: "Seasoning" },
        { name: "Black Pepper", amount: "plenty", group: "Seasoning" }
    ],
    steps: [
      { id: 1, title: "Crisp the Guanciale", videoUrl: "https://player.vimeo.com/external/464870335.sd.mp4?s=25f4648937989938641979317515664155694200", duration: 20, instruction: "Cook guanciale in a cold pan until fat *renders* and it becomes crispy." },
      { id: 2, title: "Temper the Eggs", videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83", duration: 15, instruction: "Whisk yolks with cheese. Add a splash of *pasta water* to prevent scrambling." },
      { id: 3, title: "Toss and Emulsify", videoUrl: "https://player.vimeo.com/external/410464227.sd.mp4?s=21382405d45207c4581452a3250e2920257e8412", duration: 20, instruction: "Toss pasta with fat off heat. Add egg mixture and stir *vigorously* to create sauce." }
    ]
  },
  "steak-mashed": {
    id: "steak-mashed",
    title: "Steak & Mashed Potatoes",
    description: "The perfect sear meets creamy, buttery potatoes.",
    metadata: { rating: 4.9, reviewCount: 890, calories: 850, carbs: 45, fat: 55, protein: 60, cost: "High", difficulty: "Advanced", servings: 2 },
    tools: [], ingredients: [],
    ingredientList: [
        { name: "Ribeye Steak", amount: "2", group: "Main" },
        { name: "Potatoes", amount: "3 large", group: "Main" },
        { name: "Butter", amount: "100g", group: "Seasoning" },
        { name: "Rosemary", amount: "2 sprigs", group: "Garnish" }
    ],
    steps: [
      { id: 1, title: "The Sear", videoUrl: "https://player.vimeo.com/external/517090025.sd.mp4?s=d44865e90d3d528f45532506e680252c78572b83", duration: 25, instruction: "Place steak in smoking hot pan. Do not touch for *2 minutes* to form crust." },
      { id: 2, title: "Butter Baste", videoUrl: "https://player.vimeo.com/external/464870335.sd.mp4?s=25f4648937989938641979317515664155694200", duration: 20, instruction: "Add butter and herbs. Tilt pan and *spoon* hot butter over the steak repeatedly." },
      { id: 3, title: "Resting", videoUrl: "https://player.vimeo.com/external/372332147.sd.mp4?s=01726a7605d3923a1a382c442468d6c757c91350", duration: 10, instruction: "Let steak rest for *10 minutes* before slicing to retain juices." }
    ]
  }
};
