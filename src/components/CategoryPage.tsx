'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import { fetchCategoryData } from '@/lib/api';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

interface CategoryPageProps {
  categoryName: string;
}

// Define the record type
interface AirtableRecord {
  id: string;
  fields: {
    'Product Name'?: string;
    'Composer'?: string;
    'Ensesmble'?: string;
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

export default function CategoryPage({ categoryName }: CategoryPageProps) {
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const sliderImages = [
    '/ConcertBand/ConcertBand.jpg',
    '/ConcertBand/ConcertBand1.jpg',
    '/ConcertBand/ConcertBand2.jpg',
    '/ConcertBand/ConcertBand3.jpg'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategoryData(categoryName);
        setRecords(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div>
      <Header records={records} />

      <div className="container mx-auto p-4 min-h-screen ">
        <Box sx={{ mb: 4 }}>
          <Carousel
            animation="fade"
            navButtonsAlwaysVisible
            indicators
            sx={{
              width: '100%',
              height: isMobile ? '200px' : '400px',
              '& .MuiButtonBase-root': {
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
              },
            }}
          >
            {sliderImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: isMobile ? '200px' : '400px',
                  borderRadius: '0.75rem', // Adding rounded-xl equivalent (12px)
                  overflow: 'hidden', // Ensure the image doesn't overflow the rounded corners
                }}
              >
                <Image
                  src={image}
                  alt={`Concert Band ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              </Box>
            ))}
          </Carousel>
        </Box>

        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

        {loading && <p className="text-center py-8">Loading {categoryName.toLowerCase()} music...</p>}

        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}

        {!loading && !error && records.length === 0 && (
          <p className="text-center py-8">No {categoryName.toLowerCase()} music found with status "Done".</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {records.map((record) => (
            <Link href={`/product/${record.id}`} key={record.id}>
              <Card className="featured-item overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
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