export function InputBox({ label, placeholder, type, onchange }){
    return <div>
        <div className="text-left text-sm font-medium py-2 w-full pl-2">
            {label}
        </div>
        <input onChange={onchange} type={type} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200 outline-none focus:ring-1 focus:ring-gray-400"></input>
    </div>
}