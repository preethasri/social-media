import "./Loader.css"


export const Loader=()=>{
    return(
    <>
    <div className="loader-wrapper flex items-center justify-center w-2/4 md:w-full md:mx-4">
        <img src={"./assets/images/Loader.svg"} className="loader"></img>

    </div>
    </>
    )
}