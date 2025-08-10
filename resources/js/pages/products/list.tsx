import { Button } from '@/components/ui/button';
import { type Product } from '@/types';
import { Link } from '@inertiajs/react';

type Props = {
    products: Product[];
};

const ProductsList = ({ products }: Props) => {
    const params = new URLSearchParams(window.location.search);
    const showDeleted = params.get('showDeleted') === '1';

    return (
        <div className="mx-auto space-x-5 p-10">
            <h1 className="mb-10 text-5xl font-bold">List of All products</h1>
            <table className="w-full max-w-3xl">
                <thead>
                    <tr className="text-left uppercase">
                        <th>gtin</th>
                        <th>name</th>
                        <th>brand</th>
                        <th>origin</th>
                        <th>view</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products.map((p) => (
                        <tr
                            key={p.gtin}
                            // onClick={() => {
                            //     router.visit();
                            // }}
                            className=""
                        >
                            <td>{p.gtin}</td>
                            <td>{p.name}</td>
                            <td>{p.brand}</td>
                            <td>{p.country_of_origin}</td>
                            <td className="py-2">
                                <Link href={`/09_module_b/01/${p.gtin}`}>
                                    <Button>Show</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="my-5 text-center">{products.length === 0 && 'No products found'}</p>

            {showDeleted ? (
                <Link href={route('companies.index')}>
                    <Button>Show all non deleted records</Button>
                </Link>
            ) : (
                <Link
                    href={route('companies.index', {
                        showDeleted: true,
                    })}
                >
                    <Button>Show deleted records</Button>
                </Link>
            )}

            <Link href={route('products.create')}>
                <Button>Create</Button>
            </Link>
        </div>
    );
};

export default ProductsList;
