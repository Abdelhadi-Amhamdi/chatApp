import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom'
import './index.css'
import webSocketService from './socket'
import Index from './routes'

function Room() {
	const [ messages, setMessages ] = useState([])
	const [ text, setText ] = useState('')
	webSocketService.addCallbacks(setMessages)

	useEffect(() => {
		const timer = setTimeout(() => {
			webSocketService.sendMessage({'command':"fetch_messages"})
		}, 300)
		return () => {
			clearTimeout(timer)
		}
	}, [])

	function sendMessage() {
		webSocketService.sendMessage({'command':"new_message", 'from' : "aamhamdi", 'message' : text})
	}
	
	return (
		<div className='relative h-full'>
			<ul>
				{
					messages.map(item => {
						return <h1 key={item.timestamp}>{item.author} : {item.content}</h1>
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

function Login() {
	return (
		<>
			<div className='h-full flex justify-center items-center'>
				<div className='p-10 w-[50%] h-[32vh] rounded-lg border-[1px]'>
					<div className="header block text-center">
						<h1 className='text-2xl'>Welcome Back</h1>
					</div>
					<div className='mt-10'>
						<label className='block w-full' htmlFor="username">username :</label>
						<input 
							className='block bg-[#f7f7f7] px-4 mt-2 border-[1px] rounded-lg h-[40px] w-full' 
							type="text" 
							name='username'
							placeholder='joe'
						/>
						<label className='block mt-4' htmlFor="password">password : </label>
						<input 
							className='block mt-2 bg-[#f7f7f7] border-[1px] px-4 rounded-lg h-[40px] w-full'
							type="password" 
							name='password'
							placeholder='*********'
						/>
						<p className='mt-4 text-[12px]'>forget Password ?</p>
						<button className='mt-4 block bg-[#f7f7f7] w-full h-[40px] rounded-lg border-[1px] uppercase'>login</button>
						<p className='mt-4 text-[12px]'>you dont have account ? <Link to="/auth/signup">signup</Link></p>
		
					</div>
				</div>
			</div>
		</>
	)
}

const router = createBrowserRouter([
	{
		path : '/',
		element: <Index />,
		children : [
			{
				path : '/room/:roomId',
				element : <Room />,
			},
			{
				path : '/auth/login',
				element : <Login />
			},
			{
				path : '/auth/signup',
				element : <div>signup</div>
			},
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	 <RouterProvider router={router} />
	</React.StrictMode>,
)
