import { memo } from "react"

function TimerBox({content}:{content:string})
{
    return <div className="text-xl font-light mr-2 border h-12 w-12 flex justify-center items-center rounded-md">{content}</div>

}

export default memo(TimerBox);