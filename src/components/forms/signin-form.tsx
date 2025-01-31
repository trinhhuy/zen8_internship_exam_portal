'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { loginUserAction } from '@/actions/signin-action';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages';

const formSchema = z.object({
  identifier: z
    .string()
    .min(3, {
      message: 'Identifier must have at least 3 or more characters',
    })
    .max(20, {
      message: 'Please enter a valid username or email address',
    }),
  password: z
    .string()
    .min(6, {
      message: 'Password must have at least 6 or more characters',
    })
    .max(100, {
      message: 'Password must be between 6 and 100 characters',
    }),
});

type FormSchema = z.infer<typeof formSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async ({ identifier, password }: FormSchema) => {
    try {
      const response = await loginUserAction({ identifier, password });
      if (response.message) {
        toast({ variant: 'destructive', description: response.message });
      }
    } catch {
      toast({
        variant: 'destructive',
        description: 'Some thing went wrong, please try again',
      });
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{m.sign_in()}</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{m.identifier()}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={m.identifier_placeholder()}
                        className={cn(
                          form.formState.errors.identifier && 'border-destructive'
                        )}
                        {...field}
                      />
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
                    <FormLabel>{m.password()}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={m.password_placeholder()}
                        className={cn(
                          form.formState.errors.password && 'border-destructive'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {m.sign_in()}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
