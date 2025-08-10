import { Button } from '@/components/ui/button';
import { Company, Product } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';

type Props = {
    product: Product;
    company: Company;
};

const ShowProduct = ({ product, company }: Props) => {
    const [en, setEn] = useState(true);
    return (
        <div className="flex flex-col gap-10 p-10">
            <div className="relative max-w-md rounded border border-white p-10 text-center">
                <h2>{company.name}</h2>
                <h1>{en ? product.name : product.name_fr}</h1>
                <p>{product.gtin}</p>
                <p className="text-left">{en ? product.description : product.description_fr}</p>
                <p>
                    weight: {product.gross_weight}
                    {product.weight_unit}
                </p>
                <p>
                    net content weight: {product.net_content_weight}
                    {product.weight_unit}
                </p>
                <Button variant={'outline'} className="absolute top-0 right-0" onClick={() => setEn((en) => !en)}>
                    EN/FR
                </Button>
            </div>
            <div className="flex gap-5">
                <Link className="w-fit" href={route('products.edit', product.gtin)}>
                    <Button size={'lg'}>Edit</Button>
                </Link>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.post(route('products.deactivate', product));
                    }}
                >
                    <Button size={'lg'} type="submit">
                        <Trash2Icon />
                        Deactivate
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ShowProduct;
