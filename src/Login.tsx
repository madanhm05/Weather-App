import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const auth = getAuth();
    const navigate = useNavigate();
    
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signInWithGoogle = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/home');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signInWithEmail = async () => {
        setAuthing(true);
        setError('');
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/home');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className='container-fluid vh-100 d-flex'>
            {/* Left side */}
            <div className='col-md-6 bg-dark text-white d-flex align-items-center justify-content-center'>
                <h2>Welcome Back!</h2>
            </div>

            {/* Right side - Login form */}
            <div className='col-md-6 d-flex align-items-center justify-content-center bg-success'>
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <h3 className='text-white text-center mb-4'>Login</h3>
                    
                    {/* Email and Password Inputs */}
                    <div className='mb-3'>
                        <input 
                            type='email' 
                            className='form-control' 
                            placeholder='Email' 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <input 
                            type='password' 
                            className='form-control' 
                            placeholder='Password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {/* Login Buttons */}
                    <button 
                        className='btn btn-primary w-100 mb-3' 
                        onClick={signInWithEmail} 
                        disabled={authing}>
                        Log In with Email
                    </button>
                    
                    {/* Display Error Message */}
                    {error && <div className='alert alert-danger'>{error}</div>}
                    
                    {/* OR Divider */}
                    <div className='text-center my-3 text-white'>OR</div>
                    
                    {/* Google Sign-in Button */}
                    <button 
                        className='btn btn-danger w-100' 
                        onClick={signInWithGoogle} 
                        disabled={authing}>
                        Log In with Google
                    </button>
                    
                    {/* Sign Up Link */}
                    <p className='text-center text-white mt-3'>
                        Don't have an account? <a href='/signup' className='text-warning'>Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
