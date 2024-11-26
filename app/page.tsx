'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import WhoisInfoItem from '@/components/WhoisInfoItem';
import { WhoisResponse } from '../lib/type';

export default function WhoisLookup() {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<WhoisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWhoisData = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    if (!domain) {
      setError('Please enter a domain name');
      setLoading(false);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('apikey', process.env.NEXT_PUBLIC_API_KEY || '');

    const requestOptions: RequestInit = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `https://api.apilayer.com/whois/query?domain=${encodeURIComponent(
          domain
        )}`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData.error ||
          response.statusText ||
          'Network response was not ok';
        throw new Error(errorMessage);
      }

      const data: WhoisResponse = await response.json();
      setResult(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error:', err);
      setError(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
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

      <Card className='max-w-5xl mx-auto bg-gray-800/80 border-gray-700 backdrop-blur-sm'>
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
              {loading ? 'Looking up...' : 'Lookup'}
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
              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm max-w-full'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    WHOIS Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-gray-200'>
                  <WhoisInfoItem
                    label='Domain'
                    value={result.result.domain_name}
                  />
                  <WhoisInfoItem
                    label='Registrar'
                    value={result.result.registrar}
                  />
                  <WhoisInfoItem
                    label='Created At'
                    value={result.result.creation_date}
                  />
                  <WhoisInfoItem
                    label='Updated At'
                    value={result.result.updated_date}
                  />
                  <WhoisInfoItem
                    label='Expires At'
                    value={result.result.expiration_date}
                  />
                </CardContent>
              </Card>
              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm max-w-full'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Additional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-gray-200'>
                  <WhoisInfoItem
                    label='Emails'
                    value={result.result.emails}
                  />
                  <WhoisInfoItem
                    label='WHOIS Server'
                    value={result.result.whois_server}
                  />
                  <WhoisInfoItem
                    label='DNSSEC'
                    value={result.result.dnssec}
                  />
                </CardContent>
              </Card>
              <Card className='bg-gray-700/80 border-gray-600 backdrop-blur-sm max-w-full'>
                <CardHeader>
                  <CardTitle className='text-lg font-semibold text-gray-100'>
                    Name Servers
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-gray-200'>
                  <WhoisInfoItem
                    label='Name Servers'
                    value={result.result.name_servers}
                  />
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
