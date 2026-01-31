import type { TagBadgeProps } from '../../types/workflow.types';


const baseStyles = 'inline-flex items-center gap-2 px-2.5 py-1.5 border border-gray-200 rounded-full';
const tagStyles = 'w-2 h-2 rounded-[30%]';

export function TagBadge({ tags }: TagBadgeProps) {
  if (tags.length === 0) {
    return (
      <button
        className={`${baseStyles} text-gray-400 hover:bg-gray-50`}
      >
        <span className="font-semibold text-sm">+ Add Tag</span>
      </button>
    );
  }

  if (tags.length === 1) {
    const tag = tags[0];
    return (
      <span className={baseStyles}>
        <span className={tagStyles}
          style={{ backgroundColor: tag.color }}
        />
        <span className="text-sm font-medium">{tag.name}</span>
      </span>
    );
  }

  return (
    <span className={baseStyles}>
      <span className="flex gap-1">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={tagStyles}
            style={{ backgroundColor: tag.color }}
          />
        ))}
      </span>
      <span className="text-sm font-medium">{tags.length} tags</span>
    </span>
  );
}
