'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';

interface CategoryPageProps {
  categoryName: string;
}

export default function CategoryPage({ categoryName }: CategoryPageProps) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
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
        
        // Filter records for the specific category and Status = "Done"
        const filteredRecords = data.records.filter(record => {
          const fields = record.fields;
          const ensembleTypes = [
            fields['Web Ensemble Type 1'], 
            fields['Web Ensemble Type 2'], 
            fields['Web Ensemble Type 3']
          ].filter(Boolean); // Remove null/undefined values
          
          return (
            ensembleTypes.includes(categoryName) && 
            fields['Status'] === 'Done'
          );
        });
        
        setRecords(filteredRecords);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  return (
    <div>
      <Header records={records} />
      
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      
        {loading && <p className="text-center py-8">Loading {categoryName.toLowerCase()} music...</p>}
        
        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}
        
        {!loading && !error && records.length === 0 && (
          <p className="text-center py-8">No {categoryName.toLowerCase()} music found with status "Done".</p>
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
                    <span className="font-medium">Ensemble:</span> {record.fields['Ensemble'] || categoryName}
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