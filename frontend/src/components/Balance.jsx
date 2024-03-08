export function Balance({value}) {    
    return <div className="flex h-14 items-center justify-start shadow-md rounded-md">
        <div className="text-xl font-bold mr-3 ml-12">
            Your Balance
        </div>
        <div className="text-xl font-semibold">
            ₹{value}
        </div>
    </div>
}