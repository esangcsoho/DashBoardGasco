import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, idx) => (
          <li key={item.label} className="flex items-center">
            {item.href && idx !== items.length - 1 ? (
              <Link href={item.href} className="hover:underline text-[#0B54A3]">{item.label}</Link>
            ) : (
              <span className="font-semibold text-gray-700">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2">&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
} 