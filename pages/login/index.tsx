import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ILogin, loginSchema } from '@/lib/schemas/auth';
import { cn } from '@/lib/utils';
import dashboard from '@/public/Dashboard.png';
import binance from '@/public/binance.png';
import google from '@/public/google.png';
import mimiro from '@/public/mimiro-black.svg';
import stripe from '@/public/stripe.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface AuthFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AuthForm = ({ className, ...props }: AuthFormProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    setIsLoading(true);
    signIn('credentials', {
      redirect: false,
      ...data,
    }).then((res) => {
      if (res?.ok) {
        setIsLoading(false);
        console.log(res);
        router.push('/');
        toast.success('Successfully logged in.');
      } else {
        setIsLoading(false);
        console.error(res);
        toast.error('Something went wrong.');
      }
    });
  };

  const onError = (errors: any) => console.error(errors);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
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
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCorrect="off"
              autoComplete="current-password"
              disabled={isLoading}
              required
              {...register('password')}
            />
          </div>
          <div className="flex flex-row items-center gap-2 pb-2">
            <Input
              id="password"
              placeholder="Password"
              type="checkbox"
              className="h-fit w-fit"
            />
            <p className="text-xs text-muted-foreground">
              Rembember me
            </p>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <Button
            disabled={isLoading}
            loading={isLoading}
            className="bg-primary"
          >
            Continue with email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        className="flex items-center"
      >
        <svg
          className="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
        >
          <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
        </svg>{' '}
        Google
      </Button>
    </div>
  );
};

const Login = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex h-screen w-full flex-col">
          <Link href="/" className="flex flex-row gap-4 p-6 sm:p-8">
            <Image src={mimiro} alt="logo" width={160} height={100} />
            {/* <Square strokeWidth={10} size={40} />
            <h1 className="flex h-full items-center pb-1 text-3xl font-bold">
              Mimiro
            </h1> */}
          </Link>
          <div className="flex h-screen w-full flex-col items-center justify-center p-4 sm:p-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Sign in
                </h1>
              </div>
              <AuthForm />
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
        <div className="flex w-full flex-col gap-10 bg-[#1A202E] py-0 text-white sm:h-screen sm:py-8">
          <div className="flex flex-col gap-10 p-6 sm:p-20">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold">
                Simplify workforce management
              </h1>
              <h1 className="text-lg font-normal">
                Enter your credentials to access your account
              </h1>
            </div>
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
                <Image src={google} alt="google" />
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

export default Login;
