// API functions for fetching data from Airtable

// Define interfaces for Airtable data structure
interface AirtableField {
  'Web Ensemble Type 1'?: string;
  'Web Ensemble Type 2'?: string;
  'Web Ensemble Type 3'?: string;
  'Status'?: string;
  'Product Name'?: string;
  'Composer'?: string;
  'Ensemble'?: string;
  'Grade Level'?: string;
  'Price'?: string;
  'Cover Scan'?: Array<{
    url: string;
  }>;
  [key: string]: any; // For other fields that might exist
}

interface AirtableRecord {
  id: string;
  fields: AirtableField;
}

interface AirtableResponse {
  records: AirtableRecord[];
}

export async function fetchCategoryData(categoryName: string): Promise<AirtableRecord[]> {
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

  const data: AirtableResponse = await response.json();
  
  // Filter records for the specific category and Status = "Done"
  const filteredRecords = data.records.filter((record: AirtableRecord) => {
    const fields = record.fields;
    const ensembleTypes = [
      fields['Web Ensemble Type 1'], 
      fields['Web Ensemble Type 2'], 
      fields['Web Ensemble Type 3']
    ];
    
    return (
      ensembleTypes.includes(categoryName) && 
      fields['Status'] === 'Done'
    );
  });
  
  return filteredRecords;
}