import { Link } from "react-router-dom";
export function BottomWarning({ label, to, buttonText }) {
    return (
        <div className="flex justify-center pb-6 pt-2">
            <div className="text-sm font-semibold">{label}</div>
            <Link className="underline text-sm pl-1 font-semibold" to={to}>
                {buttonText}
            </Link>
        </div>
    );
}
