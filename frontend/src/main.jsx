import React, {useContext, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import ReactDOM from 'react-dom/client'
import {Route, Routes, BrowserRouter, useParams, Link} from 'react-router-dom'
import './index.css'
import webSocketService from './socket'
import Index from './routes'
import { PrivateRoute } from './utils/privateRoutes'
import AuthContextProvider, {AuthContext} from './contexts/AuthContext'

import Login from './auth/login'
import Signup from './auth/signup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function UserMessage({item}) {
	return (
		<>
			<div key={item.timestamp} className='mt-4 right-2 flex justify-end w-full'>
				<div className='flex items-center'>
					<h1 className='bg-slate-600 text-white p-2 rounded-lg'>{item.content}</h1>
					<img className='w-[40px] border-[1px] ml-4 rounded-full' src="https://robohash.org/i55s8p3.png?size=200x200" alt="" />
				</div>
			</div>
		</>
	)
}
function OtherMessage({item}) {
	return (
		<>
			<div key={item.timestamp} className='flex justify-start mt-4 w-full'>
				<div className='flex items-center'>
					<img className='w-[40px] border-[1px] mr-4 rounded-full' src="https://robohash.org/i55s8p3.png?size=200x200" alt="" />
					<h1 className='bg-slate-600 text-white p-2 rounded-lg'>{item.content}</h1>
				</div>
			</div>
		</>
	)
}

function Room() {
	const [ messages, setMessages ] = useState([])
	const [ text, setText ] = useState('')
	const { roomId, userId } = useParams()
	const { user } = useContext(AuthContext)
	const areaRef = useRef(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			webSocketService.connect(`ws://localhost:8000/ws/chat/${roomId}/`);
		}, 200)
		return () => clearTimeout(timer)
	}, [roomId])

	webSocketService.addCallbacks(setMessages)
	
	useEffect(() => {
		const timer = setTimeout(async () => {
			webSocketService.sendMessage({'command':"fetch_messages", 'roomId': roomId})
		}, 300)
		return () => clearTimeout(timer)
	}, [roomId])

	function sendMessage() {
		webSocketService.sendMessage({
			'command':"new_message",
			'from' : user.username,
			'message' : text,
			'roomId' : roomId
		})
		areaRef.current.scroll({top: areaRef.current.scrollHeight, behavior:'instant'});
	}

	return (
		<div className='relative h-full'>
			<div className="header h-[70px] w-full rounded-lg bg-[#f7f7f7] py-2 px-4 border-[1px] flex items-center">
				<Link to="/"><FontAwesomeIcon className='mr-4 cursor-pointer' icon={faArrowLeft} /></Link>
				<img src="https://robohash.org/i55s8p3.png?size=200x200" className='mr-4 w-[40px] bg-white rounded-lg border-[1px]' alt="avatar" />
				<div>
					<h1 className='capitalize'>{userId}</h1>
					<p className='text-[10px]'>active</p>
				</div>
			</div>
			<ul ref={areaRef} className='p-4 relative h-[80vh] overflow-y-scroll'>
				{
					messages.map(item => {
						const is_min = item.author == user.username
						return is_min ? <UserMessage key={item.timestamp} item={item} /> : <OtherMessage key={item.timestamp} item={item} />
					})
				} 
			</ul>
			<div className='w-full flex justify-center'>
				<input 
					type="text" 
					name="message" 
					placeholder='message...' 
					className='border-[1px] px-2 rounded-lg absolute bottom-2 w-[50%] h-[40px]'
					onChange={(e) => setText(e.target.value)}
					value={text}
					onKeyUp={(e) => {
						if (e.key == 'Enter') {
							sendMessage()
							setText('')
						}
					}}
				/>
			</div>
		</div>
	)
}

function App() {
	return (
		<Routes>
			<Route exact path='/' element={<PrivateRoute />} >
				<Route exact path='/' element={<Index/>}>
					<Route path="/room/:roomId/:userId/" element={<Room />} />
				</Route>
			</Route>
			<Route path="/auth/login" element={<Login />} />
			<Route path="/auth/signup" element={<Signup />} />
		</Routes>
	)
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
)
