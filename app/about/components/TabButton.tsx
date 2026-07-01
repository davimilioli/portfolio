interface TabButtonProps {
    id: number;
    title: string;
    shortDescription: string;
    isSelected: boolean;
    progress: number;
    onClick: () => void;
}

export default function TabButton({
    title,
    shortDescription,
    isSelected,
    progress,
    onClick
}: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className="text-left group focus:outline-none relative block w-full transition-all duration-300"
        >
            <div className="absolute -left-7 top-1.5 flex flex-col items-center">
                <div className={`w-2 h-2 transition-all duration-300 rounded-sm z-10 ${isSelected ? 'bg-white scale-125' : 'bg-zinc-800 group-hover:bg-zinc-600'
                    }`} />

                {isSelected && (
                    <div className="w-px h-24 bg-zinc-900 absolute top-2">
                        <div
                            className="w-px bg-white"
                            style={{ height: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <h3 className={`cursor-pointer text-lg font-semibold transition-colors duration-300 ${isSelected ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}>
                    {title}
                </h3>
                {isSelected && (
                    <p className="text-sm text-neutral-400">
                        {shortDescription}
                    </p>
                )}
            </div>
        </button>
    );
}
