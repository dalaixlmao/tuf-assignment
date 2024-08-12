export default function AddButton({createNew}:{createNew:(a:boolean)=>void}){


    
    return <div className="cursor-pointer" onClick={()=>{createNew(true)}}>
        <Add/>
    </div>
}


function Add(){
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
    
}