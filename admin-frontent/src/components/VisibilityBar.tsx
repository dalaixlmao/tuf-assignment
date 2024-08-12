export default function VisibilityBar({visible, setVisible}:{visible:boolean, setVisible:(a:boolean)=>void}){
    return <div className="z-0 flex-col flex items-center w-full mt-5 pb-3 border-b-white/10 border-b">
    <div className="flex-row flex w-full md:w-1/4 justify-around md:justify-between md:text-2xl font-semibold">
    <div className={visible?'border-b-white border-b-2 font-bold pb-3 cursor-pointer':'text-white/50 cursor-pointer'} onClick={()=>{setVisible(true)}}>Visible</div>
    <div className={!visible?'border-b-white border-b-2 font-bold pb-3 cursor-pointer':'text-white/50 cursor-pointer'} onClick={()=>{setVisible(false)}}>Not visible</div>
    </div>
  </div>
}