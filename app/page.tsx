'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';

const mockWhoisData = {
  domain: 'example.com',
  registrant: {
    name: 'John Doe',
    organization: 'Example Corp',
  },
  registration: {
    creationDate: '2020-01-01',
    expirationDate: '2025-01-01',
    registrar: 'Example Registrar, LLC',
  },
  nameServers: ['ns1.example.com', 'ns2.example.com'],
  privacyProtection: true,
};

export default function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<typeof mockWhoisData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay
    if (domain.toLowerCase() === 'error.com') {
      setError('Failed to lookup domain. Please try again.');
    } else {
      setResult({ ...mockWhoisData, domain });
    }
    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden'>
      {/* Grid background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:50px_50px]'></div>
      </div>

      <Card className='max-w-4xl mx-auto bg-gray-800/80 border-gray-700 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center text-gray-100'>
            WHOIS Domain Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-2 mb-6'>
            <Input
              type='text'
              placeholder='Enter domain name'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className='flex-grow bg-gray-700/80 border-gray-600 text-gray-100'
              aria-label='Domain name input'
            />
            <Button
              onClick={handleLookup}
              disabled={loading}
              className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transform transition duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
              aria-label='Lookup domain'
            >
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Search className='mr-2 h-4 w-4' />
              )}
              {loading ? 'Searching...' : 'Lookup'}
            </Button>
          </div>

          {error && (
            <div
              className='text-red-400 mb-4 text-center animate-fade-in'
              role='alert'
            >
              {error}
            </div>
          )}

          {result && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in'>
              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Domain Info
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className='font-medium'>Domain:</span> {result.domain}
                  </p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Registrant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className='font-medium'>Name:</span>{' '}
                    {result.registrant.name}
                  </p>
                  <p>
                    <span className='font-medium'>Organization:</span>{' '}
                    {result.registrant.organization}
                  </p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Creation Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.registration.creationDate}</p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Expiration Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.registration.expirationDate}</p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Registrar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.registration.registrar}</p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Name Servers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className='list-disc list-inside'>
                    {result.nameServers.map((ns, index) => (
                      <li key={index}>{ns}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Privacy Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.privacyProtection ? 'Enabled' : 'Disabled'}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {loading && (
            <div className='flex justify-center items-center h-40 animate-fade-in'>
              <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
