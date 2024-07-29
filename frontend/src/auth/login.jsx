
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'


export default function Login() {
	const {loginUser} = useContext(AuthContext)
	return (
		<>
			<div className='h-[100vh] flex justify-center items-center'>
				<div className='p-10 w-[50%] max-w-[500px] h-[450px] rounded-lg border-[1px]'>
					<div className="header block text-center">
						<h1 className='text-2xl uppercase'>Welcome Back </h1>
					</div>
					<form onSubmit={loginUser} className='mt-10'>
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
						<button type='submit' className='mt-4 block bg-[#f7f7f7] w-full h-[40px] rounded-lg border-[1px] uppercase'>login</button>
						<p className='mt-4 text-[12px]'>you dont have account ? <Link to="/auth/signup">signup</Link></p>
					</form>
				</div>
			</div>
		</>
	)
}