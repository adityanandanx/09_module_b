import { Button } from '@/components/ui/button';
import { Company } from '@/types';
import { Link } from '@inertiajs/react';

const CompaniesList = ({ companies }: { companies: Company[] }) => {
    return (
        <div className="flex flex-col gap-10 p-10">
            <div className="flex flex-wrap gap-5">
                {companies.map((c) => (
                    <Link href={route('companies.show', c)} className="rounded-md border border-white p-10">
                        <h2>Company Name: {c.name}</h2>
                        <p>Address: {c.address}</p>
                    </Link>
                ))}
            </div>

            <Link href={route('companies.create')}>
                <Button>Create</Button>
            </Link>
        </div>
    );
};

export default CompaniesList;
