import type { WorkflowTag } from '../types/workflow.types';

const AVAILABLE_TAGS: WorkflowTag[] = [
  { name: 'automation', color: '#FF5733' },
  { name: 'AI', color: '#FF33A5' },
  { name: 'analytics', color: '#FF9500' },
  { name: 'marketing', color: '#00FF7F' },
];

export async function fetchAvailableTags(): Promise<WorkflowTag[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return AVAILABLE_TAGS;
}
