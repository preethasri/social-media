import {useState,useRef} from'react'
import {useSelector,useDispatch} from 'react-redux'
import { setActiveSort } from '../../features/post'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

export const SortBar=()=>{
    const [showSortModal,setShowSortModal]=useState(false)
   const {activeSort}=useSelector((state)=>state.post)
   const dispatch=useDispatch()

   const modalRef=useRef();

   useOnClickOutside(modalRef,setShowSortModal)


   return(
       <div className='w-full px-4 py-2 flex justify-between items-center border-b border-primarybg'>
           <div>{activeSort} Posts</div>
            <div className='relative' ref={modalRef}>
                <button className='hover:bg-primarybg rounded-full p-1 px-2'
                onClick={()=>setShowSortModal((prev)=>!prev)}
                >
                 <i className='fa-solid fa-sliders'></i>
                </button>
                {showSortModal ?(
                    <div className='absolute right-0 w-max text-sm flex flex-col gap-1.5 items-start py-2 px-3 rounded z-10 border border=primarybg'>
                        <button onClick={()=>{dispatch(setActiveSort("Trending"))
                        setShowSortModal(false)
                    }}>
                        <i className="fa-solid fa-arrow-trend-up pr-2"></i>Trending

                        </button>
                        <button onClick={()=>{
                            dispatch(setActiveSort("Latest"))
                            setShowSortModal(false)
                            
                            }}>
                           <i className='fa-solid fa-arrow-up pr-2'></i>Latest
                        </button>
                        <button onClick={()=>
                            {dispatch(setActiveSort("Oldest"))
                             setShowSortModal(false)
                            
                            }}>
                           <i className='fa-solid fa-arrow-down pr-2'></i>Oldest
                        </button>

                    </div>
                ):null}

            </div>
       </div>
   )






} 