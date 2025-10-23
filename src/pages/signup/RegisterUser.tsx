import { useState } from 'react';
import { useSignupUserMutation } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

function RegisterUser({}) {
  const [isConfirmedPasswordError, setIsConfirmedPasswordError] =
    useState(false);
  const [signupUser] = useSignupUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setIsConfirmedPasswordError(true);
      return;
    }

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    console.log('User Registration:', {
      username,
      email,
      phone,
      password,
      confirmPassword,
    });

    await signupUser({
      username,
      email,
      phone,
      password,
      confirmPassword,
    }).unwrap();
    // Here you would typically send the data to your backend for registration
    navigate('/home');
  };

  return (
    <div>
      <div className="mm-flex mm-justify-center mm-items-center mm-h-screen">
        <div className="mm-w-96 mm-flex mm-flex-col mm-gap-4">
          <div>
            <form
              className="mm-flex mm-flex-col mm-gap-4"
              onSubmit={handleRegister}
            >
              <div className="mm-flex mm-flex-col mm-gap-2">
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  name="username"
                  className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
                />
              </div>
              <div className="mm-flex mm-flex-col mm-gap-2">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
                />
              </div>
              <div className="mm-flex mm-flex-col mm-gap-2">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
                />
              </div>
              <div className="mm-flex mm-flex-col mm-gap-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
                />
              </div>
              <div className="mm-flex mm-flex-col mm-gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mm-outline-none mm-border mm-rounded-md mm-px-2 mm-py-1"
                />
                {isConfirmedPasswordError && (
                  <div className="mm-text-red-500 mm-text-sm">
                    Password and Confirm Password do not match
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="mm-bg-blue-500 mm-text-white mm-rounded-md mm-px-4 mm-py-2"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
