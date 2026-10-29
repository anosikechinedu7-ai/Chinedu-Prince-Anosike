export type ProjectCategory = 'all' | 'motion' | 'brand' | 'titles' | 'kinetic';

export interface RenderPass {
  name: string;
  label: string;
  image: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  categoryLabel: string;
  aspectRatio: '16:9' | '4:5';
  thumbnail: string;
  heroImage: string;
  gallery: string[];
  headline: string;
  synopsis: string;
  role: string[];
  tools: string[];
  renderPasses?: RenderPass[];
  awards?: string[];
  metrics?: { label: string; value: string }[];
  duration?: string;
  videoUrl?: string;
}

export interface ReelChapter {
  id: string;
  timestamp: string;
  seconds: number;
  title: string;
  client: string;
  thumbnail: string;
}
