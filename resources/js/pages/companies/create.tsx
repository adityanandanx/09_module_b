import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Company } from '@/types';
import { useForm } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { ChangeEvent } from 'react';

const CreateCompany = () => {
    const { data, setData, post, errors, processing } = useForm<Omit<Company, 'deactivated'>>();

    const h = (key: keyof Omit<Company, 'deactivated'>) => ({
        value: data[key],
        onChange: (e: ChangeEvent<HTMLInputElement>) => setData(key, e.target.value),
    });

    return (
        <div className="mx-auto flex max-w-xl flex-col gap-10 p-10">
            <h1 className="text-5xl font-bold">Create Company</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('companies.store'));
                }}
            >
                <h2 className="text-xl">Company info</h2>
                <Label>Company Name</Label>
                <Input {...h('name')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.name}</p>
                <Label>Company Address</Label>
                <Input {...h('address')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.address}</p>
                <Label>Company tele</Label>
                <Input {...h('telephone')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.telephone}</p>
                <Label>Company email</Label>
                <Input {...h('email')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.email}</p>

                <h2 className="mt-10 text-xl">Owner info</h2>
                <Label>Name</Label>
                <Input {...h('owner_name')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.owner_name}</p>
                <Label>Mobile</Label>
                <Input {...h('owner_mobile')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.owner_mobile}</p>
                <Label>Email</Label>
                <Input {...h('owner_email')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.owner_email}</p>

                <h2 className="mt-10 text-xl">Contact info</h2>
                <Label>Name</Label>
                <Input {...h('contact_name')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.contact_name}</p>
                <Label>Mobile</Label>
                <Input {...h('contact_mobile')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.contact_mobile}</p>
                <Label>Email</Label>
                <Input {...h('contact_email')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.contact_email}</p>

                <Button className="mt-10" type="submit" disabled={processing}>
                    <SaveIcon />
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CreateCompany;
