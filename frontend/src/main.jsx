import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
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

const router = createBrowserRouter([
	{
		path : '/',
		element: <Index />,
		children : [
			{
				path : '/room/:roomId',
				element : <Room />,
			},
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	 <RouterProvider router={router} />
	</React.StrictMode>,
)
