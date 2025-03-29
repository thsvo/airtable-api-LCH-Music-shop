

'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function Home() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchAirtableData = async () => {
      try {
        // Replace with your Airtable API key and base ID
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
        setRecords(data.records);
        setLoading(false);
        
        // Fix: Access fields from a specific record
        if (data.records.length > 0) {
          console.log(data.records[0].fields['Ensemble']);
        }
        
        // Extract YouTube video URL and convert to embed format
        if (data.records.length > 0 && data.records[0].fields.Video) {
          const videoLink = data.records[0].fields.Video;
          // Extract video ID from various possible YouTube URL formats
          let videoId = '';
          
          if (videoLink.includes('youtube.com/watch?v=')) {
            const vParam = new URL(videoLink).searchParams.get('v');
            videoId = vParam || '';
          } else if (videoLink.includes('youtu.be/')) {
            videoId = videoLink.split('youtu.be/')[1].split('?')[0];
          } else if (videoLink.includes('youtube.com/embed/')) {
            videoId = videoLink.split('youtube.com/embed/')[1].split('?')[0];
          }
          
          if (videoId) {
            setVideoUrl(`https://www.youtube.com/embed/${videoId}`);
          }
        }
        
        console.log(data.records[0].fields.Video);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirtableData();
  }, []);

  return (
    <div>
      <Header records={records} />
      
      <div className="container mx-auto p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Airtable Data</h1>
        
        {videoUrl ? (
          <iframe 
            width="560" 
            height="315" 
            src={videoUrl} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        ) : (
          <p>Loading video...</p>
        )}
        
        {/* {loading && <p>Loading data...</p>}
        
        {error && <p className="text-red-500">Error: {error}</p>}
        
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {records.length > 0 && 
                    Object.keys(records[0].fields).map((field) => (
                      <th key={field} className="py-2 px-4 border-b text-left">
                        {field}
                      </th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    {Object.values(record.fields).map((value, index) => (
                      <td key={index} className="py-2 px-4 border-b">
                        {typeof value === 'object' ? JSON.stringify(value) : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
      </div>
    </div>
  );
}
