import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Company, Product } from '@/types';
import { useForm } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';
import { ChangeEvent } from 'react';

type Props = {
    companies: Company[];
};

const CreateProduct = ({ companies }: Props) => {
    const { data, setData, post, errors, processing } = useForm<Product>();

    const h = (key: keyof Product) => ({
        value: data[key],
        onChange: (e: ChangeEvent<HTMLInputElement>) => setData(key, e.target.value),
    });

    return (
        <div className="mx-auto flex max-w-xl flex-col gap-10 p-10">
            <h1 className="text-5xl font-bold">Create Product</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    post(route('products.store'));
                }}
            >
                <Label>Product Name</Label>
                <Input {...h('name')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.name}</p>

                <Label>Product Name Fr</Label>
                <Input {...h('name_fr')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.name_fr}</p>

                <Label>Product Description</Label>
                <Input {...h('description')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.description}</p>

                <Label>Product Description Fr</Label>
                <Input {...h('description_fr')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.description_fr}</p>

                <Label>Product Brand</Label>
                <Input {...h('brand')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.brand}</p>

                <Label>Product Country of Origin</Label>
                <Input {...h('country_of_origin')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.country_of_origin}</p>

                <Label>Product Gross Weight</Label>
                <Input {...h('gross_weight')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.gross_weight}</p>

                <Label>Product Net Content Weight</Label>
                <Input {...h('net_content_weight')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.net_content_weight}</p>

                <Label>Product Weight Unit</Label>
                <Input {...h('weight_unit')} />
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.weight_unit}</p>

                <Label>Company</Label>
                <Select value={data['company_id'] ? data['company_id'].toString() : undefined} onValueChange={(v) => setData('company_id', v)}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <p className="mt-1 mb-4 text-sm text-destructive">{errors.company_id}</p>

                <Button className="mt-10" type="submit" disabled={processing}>
                    <SaveIcon />
                    Save
                </Button>
            </form>
        </div>
    );
};

export default CreateProduct;
