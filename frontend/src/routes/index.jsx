import { Outlet, Link } from "react-router-dom"
import webSocketService from "../socket"
import { useEffect } from 'react'


export default function Index() {
	useEffect(() => {
		webSocketService.connect();
	})
	return (
		<>
			<div className='flex h-[100vh] border-[#e3e3e3]'>
				<div className='w-[25vw] bg-[#f7f7f7] border-r-[1px]'>
					<div className='h-[80px] border-b-[1px] flex justify-center py-4'>
						
						<input type="text" placeholder='join room ...' className='border-[1px] w-[16vw] rounded-lg p-2' />
						<Link to="/room/abc">
							<button className='bg-white h-full ml-2 border-[1px] flex justify-center items-center rounded-lg px-2 py-1 w-[60px]'>new</button>
						</Link>
					</div>
				</div>
				<div className='w-[75vw] p-2'>
					<Outlet />
				</div>
			</div>
		</>
	)
}