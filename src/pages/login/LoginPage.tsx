import React from 'react';
import PasswordInput from '../../components/input/PasswordInput';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../api/auth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [, setCookie] = useCookies(['token']);
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    try {
      const { authToken, userID } = await login({
        username,
        password,
      }).unwrap();

      setCookie('token', authToken, { path: '/' });

      // Go to user home page.
      navigate(`/users/${userID}`);
    } catch (error) {
      // TODO: Add UI for login failed.
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="mm-flex mm-justify-center mm-items-center mm-h-screen mm-bg-gray-100">
      <div className="mm-w-96 mm-flex mm-flex-col mm-gap-4">
        <h1 className="mm-text-3xl mm-text-center mm-font-bold">Welcome!</h1>
        <div>
          <form className="mm-flex mm-flex-col mm-gap-4" onSubmit={handleLogin}>
            <div className="mm-flex mm-flex-col mm-gap-2">
              <input
                placeholder="username"
                type="text"
                name="username"
                className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
              />
            </div>
            <div className="mm-flex mm-flex-col mm-gap-2">
              <PasswordInput />
            </div>
            <button
              type="submit"
              className="mm-bg-blue-500 mm-text-white mm-rounded-md mm-px-4 mm-py-2"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="mm-flex mm-justify-end">
          <Link to="/register" className="mm-text-blue-500 mm-text-center">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
