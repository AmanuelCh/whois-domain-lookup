'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { WhoisResponse } from '../lib/type';

export default function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<WhoisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const fetchWhoisData = async () => {
    setLoading(true);
    setResult(null);
    // setDomain('');
    setError(null);

    // API config
    const myHeaders = new Headers();
    myHeaders.append('apikey', process.env.NEXT_PUBLIC_API_KEY || '');

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `https://api.apilayer.com/whois/query?domain=${domain}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: WhoisResponse = await response.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error fetching data. Make sure you typed the domain too');
      setResult(null); // Clear any previous results
    } finally {
      setLoading(false); // Set loading to false after fetch completes
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      fetchWhoisData();
    }
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
              onKeyDown={handleKeyDown}
              className='flex-grow bg-gray-700/80 border-gray-600 text-gray-100'
              aria-label='Domain name input'
            />
            <Button
              onClick={fetchWhoisData}
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
                    <span className='font-medium'>Domain:</span>{' '}
                    {result.result.domain_name}
                  </p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Registrar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <span className='font-medium'>Name:</span>{' '}
                    {result.result.registrar}
                  </p>
                  <p>
                    <span className='font-medium'>Email:</span>{' '}
                    {result.result.emails}
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
                  <p>{result.result.creation_date}</p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Expiration Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.result.expiration_date}</p>
                </CardContent>
              </Card>

              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Registrar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Example Registrar, LLC</p>
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
                    {result.result.name_servers.map((server) => (
                      <li key={server}>{server}</li>
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
                  <p>Enabled</p>
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
