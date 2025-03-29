'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';

// Define the record type
interface AirtableRecord {
  id: string;
  fields: {
    'Product Name'?: string;
    'Composer'?: string;
    'Ensemble'?: string;
    'Grade Level'?: string;
    'Price'?: string;
    'Status'?: string;
    'Web Ensemble Type 1'?: string;
    'Web Ensemble Type 2'?: string;
    'Web Ensemble Type 3'?: string;
    'Cover Scan'?: Array<{
      url: string;
    }>;
  };
}

export default function OtherPage() {
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOtherData = async () => {
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

        const data = await response.json();

        // Define all the specific categories we already have
        const specificCategories = [
          'Concert Band', 'Full Orchestra', 'String Orchestra',
          'Strings', 'Horn Music', 'Brass Music', 'Woodwinds',
          'Vocal', 'Piano'
        ];

        // Filter records that don't match any specific category and have Status = "Done"
        const filteredRecords = data.records.filter((record: { fields: any; }) => {
          const fields = record.fields;
          const ensembleTypes = [
            fields['Web Ensemble Type 1'],
            fields['Web Ensemble Type 2'],
            fields['Web Ensemble Type 3']
          ].filter(Boolean); // Remove null/undefined values

          // Check if none of the ensemble types match our specific categories
          const isOtherCategory = ensembleTypes.length === 0 ||
            !ensembleTypes.some(type => specificCategories.includes(type));

          return isOtherCategory && fields['Status'] === 'Done';
        });

        setRecords(filteredRecords);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchOtherData();
  }, []);

  return (
    <div>
      <Header records={records} />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Other Music</h1>

        {loading && <p className="text-center py-8">Loading other music...</p>}

        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}

        {!loading && !error && records.length === 0 && (
          <p className="text-center py-8">No other music found with status "Done".</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <Card key={record.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] && (
                    <Image
                      src={record.fields['Cover Scan'][0].url}
                      alt={record.fields['Product Name'] || 'Cover image'}
                      fill
                      className="object-cover"
                    />
                  )}
                  {(!record.fields['Cover Scan'] || !record.fields['Cover Scan'][0]) && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No cover image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{record.fields['Product Name'] || 'Untitled'}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Composer:</span> {record.fields['Composer'] || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Ensemble:</span> {record.fields['Ensemble'] || 'Other'}
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
          ))}
        </div>
      </div>
    </div>
  );
}