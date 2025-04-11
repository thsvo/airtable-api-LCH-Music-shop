'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Link from 'next/link';

export default function HolidayPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const AIRTABLE_API_KEY = 'patf1vnhT1RfpwO4U.0ef5714b5afced41aafc58a915138d487ead6b3b28314d910cbb3c77b7c5ff9b';
        const AIRTABLE_BASE_ID = 'appI6ppEE89y1iiS9';
        const TABLE_NAME = 'LCH Music Catalog Database 07222024';

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
          {
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data from Airtable');
        }

        const data: any = await response.json();

        // Filter records for Holiday (Style 1) and Status = "Done"
        const filteredRecords = data.records.filter((record: any) => {
          const fields = record.fields;
          return fields['Style 1'] === 'Holiday' && fields['Status'] === 'Done';
        });

        setRecords(filteredRecords);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHolidayData();
  }, []);

  return (
    <div>
      <Header records={records} />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Holiday</h1>

        {loading && <p className="text-center py-8">Loading holiday music...</p>}

        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}

        {!loading && !error && records.length === 0 && (
          <p className="text-center py-8">No holiday music found with status "Done".</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {records.map((record: any) => (
            <Link href={`/product/${record.id}`} key={record.id}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                                    <Image
                                      src={record.fields['Cover Scan'][0].url}
                                      alt={record.fields['Product Name'] || 'Cover image'}
                                      width={180}
                                      height={180}
                                      className="absolute inset-0 m-auto w-[90%] h-[90%] object-contain"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                      No image
                                    </div>
                                  )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate">{record.fields['Product Name'] || 'Untitled'}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Composer:</span> {record.fields['Composer'] || 'Unknown'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Ensesmble:</span> {record.fields['Ensesmble'] || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Grade Level:</span> {record.fields['Grade Level'] || 'N/A'}
                    </p>
                    <p className="text-sm font-bold text-green-600">
                      ${record.fields['Price'] || 'Price not available'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}