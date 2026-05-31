export type ProjectStatus = 'planned' | 'in_progress' | 'research';
export type ProjectCategory = 'ml' | 'nlp' | 'dataviz' | 'dashboard' | 'automation';
export type ThumbnailVariant = 'scatter' | 'line' | 'bars' | 'heatmap';

export interface PlannedProject {
  id: string;
  slug: string;
  i18nKey: string;
  status: ProjectStatus;
  category: ProjectCategory;
  stack: string[];
  github?: string;
  thumbnailVariant: ThumbnailVariant;
}

export const PLANNED_PROJECTS: PlannedProject[] = [
  {
    id: 'churn',
    slug: 'customer-churn',
    i18nKey: 'future.items.churn',
    status: 'planned',
    category: 'ml',
    stack: ['Python', 'scikit-learn', 'pandas', 'XGBoost'],
    thumbnailVariant: 'scatter',
  },
  {
    id: 'nlp_news',
    slug: 'nlp-news-es',
    i18nKey: 'future.items.nlp_news',
    status: 'research',
    category: 'nlp',
    stack: ['Python', 'spaCy', 'Hugging Face', 'PyTorch'],
    thumbnailVariant: 'heatmap',
  },
  {
    id: 'dashboard_nomina',
    slug: 'payroll-dashboard',
    i18nKey: 'future.items.dashboard_nomina',
    status: 'in_progress',
    category: 'dashboard',
    stack: ['Power BI', 'DAX', 'SQL Server'],
    thumbnailVariant: 'bars',
  },
  {
    id: 'viz_demografia',
    slug: 'mexico-demographics',
    i18nKey: 'future.items.viz_demografia',
    status: 'planned',
    category: 'dataviz',
    stack: ['D3.js', 'TypeScript', 'TopoJSON'],
    thumbnailVariant: 'line',
  },
  {
    id: 'automation_cfdi',
    slug: 'cfdi-pipeline',
    i18nKey: 'future.items.automation_cfdi',
    status: 'in_progress',
    category: 'automation',
    stack: ['Python', 'pandas', 'SMTP', 'pytest'],
    thumbnailVariant: 'line',
  },
  {
    id: 'rec_books',
    slug: 'book-recommender',
    i18nKey: 'future.items.rec_books',
    status: 'planned',
    category: 'ml',
    stack: ['Python', 'Surprise', 'pandas', 'NumPy'],
    thumbnailVariant: 'scatter',
  },
];

export const findProjectBySlug = (slug: string): PlannedProject | undefined =>
  PLANNED_PROJECTS.find((p) => p.slug === slug);

export interface StackItem {
  name: string;
  level: 'learning' | 'intermediate' | 'solid';
  category: 'lang' | 'data' | 'bi' | 'tools';
}

export const STACK: StackItem[] = [
  { name: 'Python', level: 'intermediate', category: 'lang' },
  { name: 'TypeScript', level: 'learning', category: 'lang' },
  { name: 'JavaScript', level: 'intermediate', category: 'lang' },
  { name: 'SQL', level: 'solid', category: 'lang' },
  { name: 'VBA', level: 'solid', category: 'lang' },
  { name: 'pandas', level: 'intermediate', category: 'data' },
  { name: 'NumPy', level: 'intermediate', category: 'data' },
  { name: 'scikit-learn', level: 'learning', category: 'data' },
  { name: 'PyTorch', level: 'learning', category: 'data' },
  { name: 'Power BI', level: 'solid', category: 'bi' },
  { name: 'Excel / M365', level: 'solid', category: 'bi' },
  { name: 'matplotlib', level: 'intermediate', category: 'bi' },
  { name: 'Git', level: 'intermediate', category: 'tools' },
  { name: 'Linux', level: 'learning', category: 'tools' },
];
