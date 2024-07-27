'use client'

import {Dialog, 
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle
        } from "@/components/ui/dialog";

import {Form,
        FormControl,
        FormField,
        FormLabel,
        FormItem,
        FormMessage
        } from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "@/media/ava-darkBG-logo.png"
import { signIn, signUp } from "@/lib/services/authService";
export default function SignInModal(){
    const router= useRouter();
    const [isMounted, setIsMounted] =useState(false);

    useEffect(() => {
        setIsMounted(true);
    },[])

    const loginSchema =z.object({
        email: z.string().email('Invalid email address').min(1,'Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
      });
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver:zodResolver(loginSchema),
        defaultValues:{
            email:"",
            password:""
        }
    })

    const isLoading= form.formState.isSubmitting;

    const onSubmit = async (values:z.infer<typeof loginSchema>) => {
        try{
            await signIn(values)
            form.reset()
            router.push('/');
            // window.location.reload();

        }catch(error){
            await console.log(error)
        }
    }

    if(!isMounted) return null;     

    return(
       <Dialog open={true}>
            <DialogContent className="flex flex-col items-center justify-center bg-transparent border-none outline-none text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6 flex flex-col justify-center items-center gap-5 ">
                <div className=" relative w-[50px] h-[50px] bg-[#000] rounded-md shadow-[0_0px_60px_0.5px_rgba(256,256,256,0.3)] ">
                    <Image src={logo} alt={"logo"}/>
                    </div>
                    <DialogTitle className="text-[30px] text-center text-white font-bold">
                        Welcome back
                    </DialogTitle>

                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                    className="flex flex-col items-center justify-center gap-6 w-[440px]">
                            <FormField
                                control={form.control}
                                name="email"
                                render={ ({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        type="email"
                                        disabled={isLoading}
                                        className="bg-[#ffffffd2] border-0 focus-visible:ring-0 
                                        text-black text-[16px] font-medium focus-visible:ring-offset-0 w-[440px] h-[40px]"
                                        placeholder="Email"
                                        {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={ ({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                        type="password"
                                        disabled={isLoading}
                                        className="bg-[#ffffffd2] border-0 focus-visible:ring-0 
                                        text-black text-[16px] font-medium focus-visible:ring-offset-0 w-[440px] h-[40px]"
                                        placeholder="Password"
                                        {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                                )}
                            />

                            <Button
                            className="w-full text-white bg-[#9747FF] hover:bg-[#0366ff]" 
                            disabled={isLoading}
                            variant="default">
                                Login
                            </Button>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}