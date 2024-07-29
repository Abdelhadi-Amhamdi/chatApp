import { Outlet, Link } from "react-router-dom"
import webSocketService from "../socket"
import { useContext, useEffect, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../contexts/AuthContext"


export default function Index() {

	const [users, setUsers] = useState([])

	useEffect(() => {
		const timer = setTimeout(async () => {
			const response = await fetch("http://localhost:8000/api/auth/users/", {
				method : 'GET',
				headers : {
					'Content-Type':'application/json'
				}
			})
			if (response.status === 200) {
				const data = await response.json()
				setUsers(data)
			}
		}, 300)
		return () => clearTimeout(timer)
	}, [])
	const {logout, user} = useContext(AuthContext)
	return (
		<>
			<div className='flex h-[100vh] border-[#e3e3e3]'>
				<div className='w-[25vw] bg-[#f7f7f7] border-r-[1px] relative'>
					<div className='h-[80px] border-b-[1px] flex justify-center py-4'>
						<input type="text" placeholder='search' className='border-[1px] w-[20vw] rounded-lg p-2' />
					</div>
					<div className="p-4">
						<ul>
							{
								users.map(item => {
									if (item.username != user.username) {
										let init = 0;
										let id = item.username.split('').reduce(
											(a, c) => a + c.charCodeAt(0), init)
										+ user.username.split('').reduce(
											(a, c) => a + c.charCodeAt(0), init)
										return <li key={item.id} className="mt-2">
											<Link to={`/room/${id}/${item.username}`}>{item.username}</Link>
										</li>
									}
								})
							}
						</ul>
					</div>
					<div className="h-[60px] w-full absolute bottom-0 p-2 border-t-[1px] flex items-center">
						<button onClick={logout} className="flex items-center justify-between px-4 bg-white border-[1px] w-full h-[40px] rounded-lg">
							<p>logout</p>
							<FontAwesomeIcon icon={faRightFromBracket} />
						</button>
					</div>
				</div>
				<div className='w-[75vw] px-4 py-2'>
					<Outlet />
				</div>
			</div>
		</>
	)
}