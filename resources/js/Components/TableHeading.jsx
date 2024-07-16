import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'

export default function TableHeading({sort_field = null, sort_direction = null, sortable = true, name, sortChange = ()=>{}, children}){
    return (
        <th onClick={(e)=> sortChange(name)}>
                <div className="px-3 py-5 flex justify-between items-center cursor-pointer ">
                {children}
               {
                sortable && (
                    <div>
                        <ChevronUpIcon className={"w-4 " + (sort_field === "id" && sort_direction === "asc" ? "text-white" : " ")} />
                        <ChevronDownIcon className={"w-4 -mt-2 " + (sort_field === "id" && sort_direction === "desc" ? "text-white" : " ")} />
                    </div>
                )
               }
                </div>
        </th>
    )
}