export function Button({ label, onClick }) {
    return (
        <button
            type="button"
            className="flex flex-1 justify-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={onClick}
        >
            {label}
        </button>
    );
}
