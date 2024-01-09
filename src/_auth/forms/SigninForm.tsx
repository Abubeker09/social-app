import { useSigninAcount } from "@/lib/react-query/queriesAndMutations";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from "@/context/AuthContext";
import { signinValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";

const SigninForm = () => {
  const { toast } = useToast()
  const {checkAuthUser} = useUserContext()

  const navigate = useNavigate();

  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSigninAcount()

  // 1. Define your form.
  const form = useForm<z.infer<typeof signinValidation>>({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signinValidation>) {

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
        <h1 className="text-center h2-bold">Log In To Your Account</h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >

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
            {isSigningIn ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading . . .
                </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don't have an account?{" "}
            <Link
            to='/sign-up' className="text-primary-500"
            >
              Sign Up
            </Link>
          </p>

        </form>
      </div>
    </Form>
  );
};

export default SigninForm;

