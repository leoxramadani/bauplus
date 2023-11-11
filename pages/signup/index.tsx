import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { REGISTER } from '@/lib/constants/endpoints';
import { ISignUp, registerSchema } from '@/lib/schemas/auth';
import { cn } from '@/lib/utils';
import dashboard from '@/public/Dashboard.png';
import azure from '@/public/azure.png';
import binance from '@/public/binance.png';
import google from '@/public/google.png';
import mimiro from '@/public/mimiro-black.svg';
import stripe from '@/public/stripe.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface SignupFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const SignupForm = ({ className, ...props }: SignupFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutateAsync: signup, isLoading: isSignupLoading } =
    useMutation({
      mutationFn: async (data: ISignUp) =>
        await axios.post(REGISTER, data),
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<ISignUp> = async (data) => {
    await signup(data)
      .then((res) => {
        signIn('credentials', {
          redirect: false,
          ...data,
        }).then((res) => {
          if (res?.ok) {
            setIsLoading(false);
            router.push('/');
          } else {
            setIsLoading(false);
            console.error("Couldn't log in automatically.", res);
            router.push('/login');
          }
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Something went wrong.', error);
        toast.error('Something went wrong, please try again later.');
      });
  };

  const onError = (errors: any) => console.error(errors);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="firstName">
              First name
            </label>
            <Input
              id="firstName"
              placeholder="First name"
              type="text"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              required
              {...register('firstName')}
            />
            {errors.firstName && (
              <p className="error">{errors.firstName.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="lastName">
              Last name
            </label>
            <Input
              id="lastName"
              placeholder="Last name"
              type="text"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              required
              {...register('lastName')}
            />
            {errors.lastName && (
              <p className="error">{errors.lastName.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              required
              {...register('email')}
            />
            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              required
              {...register('username')}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="phone">
              Phone
            </label>
            <Input
              id="phone"
              placeholder="Phone number"
              type="phone"
              autoCapitalize="none"
              autoComplete="on"
              autoCorrect="off"
              disabled={isLoading}
              required
              {...register('phone')}
            />
            {errors.phone && (
              <p className="error">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCorrect="off"
              autoComplete="on"
              disabled={isLoading}
              required
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="confirm">
              Confirm password
            </label>
            <Input
              id="password"
              placeholder="Confirm password"
              type="password"
              autoCorrect="off"
              autoComplete="on"
              disabled={isLoading}
              required
              {...register('confirmPassword')}
            />
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
          <Button
            disabled={isLoading}
            loading={isLoading}
            className="bg-primary"
            type="submit"
          >
            Continue with email
          </Button>
        </div>
      </form>
    </div>
  );
};

const Signup = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex h-screen w-full flex-col">
          <Link href="/" className="flex flex-row gap-4 p-6 sm:p-8">
            <Image src={mimiro} alt="logo" width={110} height={100} />
            {/* <Square strokeWidth={10} size={40} />
              <h1 className="flex h-full items-center pb-1 text-3xl font-bold">
                Mimiro
              </h1> */}
          </Link>
          <div className="mt-[15dvh] flex w-full flex-col items-center justify-center p-4 sm:p-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create Your Mimiro Account
                </h1>
              </div>
              <SignupForm />
              <p>
                Already have an account?{' '}
                <Link className="text-primary" href={'/login'}>
                  Sign in
                </Link>
              </p>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{' '}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-center gap-10 bg-[#1A202E] py-0 text-white sm:h-screen sm:py-8">
          <div className="flex flex-col gap-10 p-6 sm:p-20">
            {/* <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold">
                Simplify workforce management
              </h1>
            </div> */}
            <div className="">
              <Image
                src={dashboard}
                alt="dashboard"
                width={1200}
                height={1200}
              />
            </div>
            <div className="flex flex-row items-center justify-center gap-4 pt-0 sm:gap-10 sm:pt-6">
              <div className="w-[500px] sm:w-[100px]">
                <Image src={google} alt="google" />
              </div>
              <div className="w-[500px] sm:w-[100px]">
                <Image src={stripe} alt="stripe" />
              </div>
              <div className="w-[300px] sm:w-[50px]">
                <Image src={binance} alt="binance" />
              </div>
              <div className="w-[500px] sm:w-[100px]">
                <Image src={azure} alt="google" />
              </div>
              <div className="w-[500px] sm:w-[100px]">
                <Image src={stripe} alt="stripe" />
              </div>
              <div className="w-[300px] sm:w-[50px]">
                <Image src={binance} alt="binance" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
