
export interface Position {
  top: string;
  left: string;
}

export interface Tool {
  id: string;
  name: string;
  image: string;
  labels: { text: string; position: Position }[];
}

export interface Ingredient {
  id: string;
  name: string;
  goodImage: string;
  badImage: string;
  tips: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ComparisonItem {
  label: string;
  heatLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  motion: 'Static' | 'Constant';
  cookware: string;
}

export interface ComparisonData {
  title: string;
  itemA: ComparisonItem;
  itemB: ComparisonItem;
}

export interface Step {
  id: number;
  title: string;
  videoUrl: string; // Placeholder URL
  duration: number; // Seconds
  instruction: string; // Text with markdown-style highlights like *text*
  quiz?: QuizQuestion; // Optional interruption
  comparison?: ComparisonData; // New field for Concept Comparison
  
  // Scaffolded Learning Fields
  challenge?: string; // The Active Recall question (e.g., "Which part of the knife?")
  recallConcept?: string; // The AO/Hint (e.g., "Recall the Leverage Model")
}

export interface RecipeMetadata {
  rating: number;
  reviewCount: number;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  cost: string;
  difficulty: string;
  servings: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  metadata: RecipeMetadata; // New field
  tools: Tool[];
  ingredients: Ingredient[]; // Used for pre-training visual
  ingredientList: { name: string; amount: string; group?: string }[]; // Used for list view
  steps: Step[];
}

export interface UserStats {
  title: string;
  stars: number;
  completedLessons: string[];
  uploadedPhotos: string[];
}

export interface DashboardItem {
  id: string;
  title: string;
  type: 'foundation' | 'technique' | 'recipe';
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}
