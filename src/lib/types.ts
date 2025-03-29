export interface AirtableField {
  'Product Name'?: string;
  'Composer'?: string;
  'Arranger'?: string;
  'Ensemble'?: string;
  'Grade Level'?: string;
  'Price'?: string;
  'LCH Item #'?: string;
  'SMP Item Link'?: string;
  'Description (Long)'?: string;
  'Duration'?: string;
  'Audio Sample'?: string;
  'Video'?: string;
  'Instrumentation'?: string;
  'SMP Genres'?: string;
  '# of Pgs'?: string;
  'Publisher'?: string;
  'Cover Scan'?: Array<{
    url: string;
    filename?: string;
    size?: number;
    type?: string;
  }>;
  'Status'?: string;
  'Web Ensemble Type 1'?: string;
  'Web Ensemble Type 2'?: string;
  'Web Ensemble Type 3'?: string;
  'Style 1'?: string;
  [key: string]: any; // For other fields that might exist
}

export interface AirtableRecord {
  id: string;
  fields: AirtableField;
  createdTime?: string;
}

export interface AirtableResponse {
  records: AirtableRecord[];
}