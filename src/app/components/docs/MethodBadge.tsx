interface MethodBadgeProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  className?: string;
}

export function MethodBadge({ method, className = '' }: MethodBadgeProps) {
  const colors = {
    GET: 'bg-blue-100 text-blue-700 border-blue-200',
    POST: 'bg-green-100 text-green-700 border-green-200',
    PUT: 'bg-orange-100 text-orange-700 border-orange-200',
    DELETE: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${colors[method]} ${className}`}
    >
      {method}
    </span>
  );
}
