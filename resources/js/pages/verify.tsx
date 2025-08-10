import axios from 'axios';
import { useState } from 'react';

const Verify = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<Array<{ gtin: string; valid: boolean }> | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const gtins = input
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter(Boolean);
        try {
            const response = await axios.post('/09_module_b/verify', { gtins });
            setResults(response.data.results);
        } catch (err) {
            setResults([]);
        }
        setLoading(false);
    };

    const allValid = results && results.length > 0 && results.every((r) => r.valid);

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2>Bulk GTIN Verification</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={8}
                    style={{ width: '100%', marginBottom: 16 }}
                    placeholder="Enter GTINs, one per line"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
            {results && (
                <div style={{ marginTop: 24 }}>
                    {allValid && (
                        <div style={{ color: 'green', fontWeight: 'bold', marginBottom: 16 }}>
                            <span style={{ fontSize: 24 }}>✔</span> All valid
                        </div>
                    )}
                    <ul>
                        {results.map((r) => (
                            <li key={r.gtin} style={{ color: r.valid ? 'green' : 'red' }}>
                                {r.gtin}: {r.valid ? 'Valid' : 'Invalid'} {r.valid}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Verify;
