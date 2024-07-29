
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
	const navigate = useNavigate()
	const register = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8000/api/auth/signup/", {
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify({
				username : e.target.username.value,
				password : e.target.password.value,
				email : e.target.email.value,
			})
		})
		console.log(response.status)
		if (response.status === 200) {
			navigate('/auth/login')
		}
	}

	return (
		<>
			<div className='h-[100vh] flex justify-center items-center'>
				<div className='p-10 w-[50%] max-w-[500px] h-[580px] rounded-lg border-[1px]'>
					<div className="header block text-center">
						<h1 className='text-2xl uppercase'>Hello </h1>
					</div>
					<form className='mt-10' onSubmit={register}>
						<label className='block w-full' htmlFor="username">username *</label>
						<input 
							className='block bg-[#f7f7f7] px-4 mt-2 border-[1px] rounded-lg h-[40px] w-full' 
							type="text" 
							name='username'
							placeholder='joe'
						/>
						<label className='block w-full mt-4' htmlFor="username">email *</label>
						<input 
							className='block bg-[#f7f7f7] px-4 mt-2 border-[1px] rounded-lg h-[40px] w-full' 
							type="email" 
							name='email'
							placeholder='joe@email.com'
						/>
						<label className='block mt-4' htmlFor="password">password * </label>
						<input 
							className='block mt-2 bg-[#f7f7f7] border-[1px] px-4 rounded-lg h-[40px] w-full'
							type="password" 
							name='password'
							placeholder='*********'
						/>
						<button type='submit' className='mt-4 block bg-[#f7f7f7] w-full h-[40px] rounded-lg border-[1px] uppercase'>register</button>
						<p className='mt-4 text-[12px]'>you already have an account ? <Link to="/auth/login">login</Link></p>
					</form>
				</div>
			</div>
		</>
	)
}