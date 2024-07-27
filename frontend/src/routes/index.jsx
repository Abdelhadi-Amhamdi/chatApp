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
				<div className='w-[25vw] bg-[#f7f7f7] border-r-[1px] relative'>
					<div className='h-[80px] border-b-[1px] flex justify-center py-4'>
						
						<input type="text" placeholder='join room ...' className='border-[1px] w-[16vw] rounded-lg p-2' />
						<Link to="/room/abc">
							<button disabled={true} className='bg-white h-full ml-2 border-[1px] flex justify-center items-center rounded-lg px-2 py-1 w-[60px]'>new</button>
						</Link>
					</div>
					<div className="h-[60px] w-full absolute bottom-0 p-2 border-t-[1px] flex items-center">
						<ul className="flex w-full px-2">
							<li className="bg-white p-2 rounded-lg border-[1px] mr-2 cursor-pointer">
								<Link to="/auth/login">
									login
								</Link>
							</li>
							<li className="bg-white p-2 rounded-lg border-[1px]">
								<Link to="/auth/signup">
									signup
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='w-[75vw] p-2'>
					<Outlet />
				</div>
			</div>
		</>
	)
}