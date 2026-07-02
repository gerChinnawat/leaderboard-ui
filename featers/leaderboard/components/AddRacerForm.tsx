"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ColorPicker } from "@/components/ui/color-picker"; 
import { Input } from "@/components/ui/input";

import { Racer } from "../types/racer.interface";

interface AddRacerFormProps {
    onAddRacer: (racer: Racer) => void;
    disable?: boolean
};

const AddRacerFrom = ({
    onAddRacer,
    disable=false,
}: AddRacerFormProps) => {
    const formSchema = z.object({
        name: z.string().max(32, "Name is too long.").min(1, "Input your racer name"),
        timeStamp: z.string().length(6, "Time has to be fullfil."),
        colorTag: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, "Invalid hex color"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
            defaultValues: {
                name: "",
                timeStamp: "",
                colorTag: "#6366f1",
            },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        onAddRacer(values);
    };

    return (
        <Form {...form}>
            <form>
                <h1 className="text-center text-2xl mb-2">F1 Leaderboard</h1>
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle>Simulate Your Racer</CardTitle>
                        <CardDescription>
                            Input your racer name, time, and pick a color tag.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="timeStamp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="timeStamp">Time:</FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            value={field.value}
                                            onChange={field.onChange}
                                        >
                                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                                <InputOTPSlot index={0} />
                                            </InputOTPGroup>
                                            <div className="text-4xl">:</div>
                                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                            </InputOTPGroup>
                                            <div className="text-4xl">.</div>
                                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="colorTag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="colorTag">Color Tag:</FormLabel>
                                    <FormControl>
                                        <ColorPicker
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            onClick={form.handleSubmit(onSubmit)}
                            disabled={disable}
                        >
                            Add new Racer
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
};

export default AddRacerFrom;