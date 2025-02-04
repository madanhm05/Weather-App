import { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    
    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const signUpWithGoogle = async () => {
        setAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signUpWithEmail = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setAuthing(true);
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
                setAuthing(false);
            });
    };

    return (
        <div className='container-fluid vh-100 d-flex'>
            <div className='col-md-6 bg-success text-white d-flex align-items-center justify-content-center'>
                <h2></h2>
            <h2 className='text-white text-center mb-4 m-5'>Welcome! Please enter your information in SignUp Page. </h2>
            </div>

            <div className='col-md-6 d-flex align-items-center justify-content-center bg-dark'>
                <div className='w-100' style={{ maxWidth: '400px' }}>
                    <h3 className='text-white text-center mb-4'>Sign Up</h3>
                  
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
                    <div className='mb-3'>
                        <input 
                            type='password' 
                            className='form-control' 
                            placeholder='Re-enter Password' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className='alert alert-danger'>{error}</div>}
                    
                    <button 
                        className='btn btn-primary w-100 mb-3' 
                        onClick={signUpWithEmail} 
                        disabled={authing}>
                        Sign Up with Email
                    </button>
                    
                    <div className='text-center my-3 text-white'>OR</div>
                    
                    <button 
                        className='btn btn-danger w-100' 
                        onClick={signUpWithGoogle} 
                        disabled={authing}>
                        Sign Up with Google
                    </button>
                    
                    <p className='text-center text-white mt-3'>
                        Already have an account? <a href='/login' className='text-warning'>Log In</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
