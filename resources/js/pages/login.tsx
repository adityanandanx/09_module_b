import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    passphrase: string;
};

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        passphrase: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('passphrase'),
        });
    };

    return (
        <main className="mx-auto flex min-h-screen min-w-screen items-center justify-center">
            <Head title="Log in" />

            <form className="flex w-full max-w-md flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="passphrase">Passphrase</Label>
                        <Input
                            id="passphrase"
                            type="password"
                            required
                            autoFocus
                            value={data.passphrase}
                            onChange={(e) => setData('passphrase', e.target.value)}
                        />
                        <InputError message={errors.passphrase} />
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>
            </form>

            {/* {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>} */}
        </main>
    );
}
