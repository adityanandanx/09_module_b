import { Button } from '@/components/ui/button';
import { Company } from '@/types';
import { Link, router } from '@inertiajs/react';

type Props = {
    company: Company;
};

const ShowCompany = ({ company }: Props) => {
    return (
        <div className="flex flex-col gap-10 p-10">
            <h1 className="text-3xl">Company Name: {company.name}</h1>
            <pre>Data: {JSON.stringify(company, null, 2)}</pre>
            <div className="flex gap-5">
                <Link className="w-fit" href={route('companies.edit', company)}>
                    <Button size={'lg'}>Edit</Button>
                </Link>
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
            </div>
        </div>
    );
};

export default ShowCompany;
