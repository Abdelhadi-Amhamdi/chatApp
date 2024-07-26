import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider,Form, json, useLoaderData, useActionData} from 'react-router-dom'

import './index.css'

import webSocketService from './socket'

import Index, {loader as roomLoader} from './routes'

async function action({request, params}) {
	const formData = await request.formData()
	const data = Object.fromEntries(formData)
	const context = {
		"message" : data.message,
		"command" : "new_message",
		"from" : "aamhamdi",
	}
	webSocketService.sendMessage(context)
	console.log(webSocketService.data)
	return null
}

async function loader({params}) {
	console.log("trigred again")
	webSocketService.connect('ws://localhost:8000/ws/chat/abc/')
	webSocketService.sendMessage({'command': 'fetch_messages'})
	await webSocketService.waitForSocketConnection()
	return {"data" : webSocketService.data}
}

function Room() {
	let {data} = useLoaderData()
	return (
		<div className='relative h-full'>
			<ul>
				{
					data.messages.map(item => {
						return <h1 key={item.timestamp}>{item.author} : {item.content}</h1>
					})
				}
			</ul>
			<Form method="post" id="message-data"  className='w-full flex justify-center'>
				<input type="text" name="message" placeholder='message...' className='border-[1px] px-2 rounded-lg absolute bottom-2 w-[50%] h-[40px]' />
			</Form>
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
				loader : loader,
				action : action
			},
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	 <RouterProvider router={router} />
	</React.StrictMode>,
)
