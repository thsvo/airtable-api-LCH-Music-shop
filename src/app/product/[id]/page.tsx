'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const AIRTABLE_API_KEY = 'patf1vnhT1RfpwO4U.0ef5714b5afced41aafc58a915138d487ead6b3b28314d910cbb3c77b7c5ff9b';
        const AIRTABLE_BASE_ID = 'appI6ppEE89y1iiS9';
        const TABLE_NAME = 'LCH Music Catalog Database 07222024';

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}/${productId}`,
          {
            headers: {
              'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }

        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  return (
    <div>
      <Header records={[]} />
      
      <div className="container mx-auto p-4">
        {loading && <p className="text-center py-8">Loading product details...</p>}
        
        {error && <p className="text-red-500 text-center py-8">Error: {error}</p>}
        
        {!loading && !error && !product && (
          <p className="text-center py-8">Product not found.</p>
        )}
        
        {!loading && !error && product && (
          <ProductDetail product={product} />
        )}
      </div>
    </div>
  );
}