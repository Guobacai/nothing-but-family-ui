import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../../api/auth';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { InputPassword, Input, Button } from 'simpleact-ui';

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 flex flex-col gap-4">
        <h1 className="text-3xl text-center font-bold">Welcome!</h1>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="User Name"
                type="text"
                name="username"
                label="User Name:"
              />
            </div>
            <div className="flex flex-col gap-2">
              <InputPassword label="Password:" name="password" />
            </div>
            <Button type="submit">Sign In</Button>
          </form>
        </div>
        <div className="flex justify-end">
          <Link to="/register" className="text-blue-500 text-center">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
