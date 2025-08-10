import { Button } from '@/components/ui/button';
import { Company } from '@/types';
import { Link, router } from '@inertiajs/react';

type Props = {
    company: Company;
};

const ShowCompany = ({ company }: Props) => {
    return (
        <div className="flex flex-col gap-10 p-10">
            {' '}
            <div className="flex gap-5">
                <Link className="w-fit" href={route('companies.edit', company)}>
                    <Button size={'lg'}>Edit</Button>
                </Link>
            </div>
            {company.deactivated ? (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.post(route('companies.activate', company));
                    }}
                >
                    <Button size={'lg'} type="submit">
                        Activate
                    </Button>
                </form>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.post(route('companies.deactivate', company));
                    }}
                >
                    <Button size={'lg'} type="submit">
                        Deactivate
                    </Button>
                </form>
            )}
            <h1 className="text-3xl">Company Name: {company.name}</h1>
            <div className="">
                <pre className="border p-10">Company data: {JSON.stringify(company, null, 2)}</pre>
                <pre className="border p-10">Products data: {JSON.stringify(company.products, null, 2)}</pre>
            </div>
        </div>
    );
};

export default ShowCompany;
