export default function Pagination({
  page,
  lastPage,
  onChange,
}: {
  page: number;
  lastPage: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: lastPage }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`px-3 py-1 border rounded
            ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
