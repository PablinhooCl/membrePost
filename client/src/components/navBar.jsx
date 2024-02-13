import viteLogo from '/vite.svg'

const NavBar = ({ info }) => {

    
    return (
        <div className='top-0 flex flex-row justify-between items-center m-auto z-10 border-b-2 rounded-none px-14 border-indigo-500/100 '  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="flex flex-row align-middle	content-center mx-10 my-5">
                <img src= { viteLogo } alt="Page Logo" />
                <p className='mx-8 flex justify-center items-center text-white	font-extrabold text-xl'>Home</p>
            </div>
            <div className="flex flex-row align-middle	content-center mx-10 my-5">
                <p className='mx-8 flex justify-center items-center text-white	font-extrabold text-xl'>{ info }</p>
            </div>
        </div>
    )
}

export default NavBar