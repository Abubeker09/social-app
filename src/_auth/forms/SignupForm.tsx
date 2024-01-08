import { signupValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserContext } from "@/context/AuthContext";
import { useCreateUserAccount, useSigninAcount } from "@/lib/react-query/queriesAndMutations";
import { Link, useNavigate } from 'react-router-dom'
import Loader from "@/components/shared/Loader";

const SignupForm = () => {
  const { toast } = useToast()
  const {checkAuthUser, isLoading: isUserLoding} = useUserContext()

  const navigate = useNavigate();

  const {mutateAsync: creatUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSigninAcount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signupValidation>) {
    const newUser = await creatUserAccount(values)

    if(!newUser){
      toast({title: "Sign Up failed. please try again.",})
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session){
      toast({title: "Sign In failed. please try again.",})
    }

    const isLoggedIn = await checkAuthUser()

    if(isLoggedIn){
      form.reset();

      navigate('/')
    }else{
     return toast({title: "Sign In failed. please try again.",})
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="" />
        <h1 className="text-center h2-bold">Creat A New Acount</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="bg-slate-600">
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading . . .
                </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?{" "}
            <Link
            to='/sign-in' className="text-primary-500"
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </Form>
  );
};

export default SignupForm;

