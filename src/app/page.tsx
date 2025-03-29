

'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Container, Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import router from 'next/router';

// Define types for our records
interface AirtableRecord {
  id: string;
  fields: {
    [key: string]: any;
    'Product Name'?: string;
    Composer?: string;
    Ensemble?: string;
    Style?: string;
    Video?: string;
    'Cover Scan'?: Array<{ url: string }>;
  };
}

export default function Home() {
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const newReleasesRef = useRef<HTMLDivElement>(null);

  // Add search state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [searchResults, setSearchResults] = useState<AirtableRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Categories list
  const categories = [
    'Home', 'Concert Band', 'Full Orchestra', 'String Orchestra',
    'Strings', 'Horn Music', 'Brass Music', 'Woodwinds',
    'Vocal', 'Piano', 'Holiday', 'Other', 'About',
    'Contact Us', 'Services', 'Opera', 'Classical Music Is…'
  ];

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
        console.log(data.records);




      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirtableData();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (categoriesRef.current && !loading) {
      gsap.fromTo(
        '.category-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" }
      );
    }

    if (featuredRef.current && !loading) {
      gsap.fromTo(
        '.featured-title',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        '.featured-item',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );
    }

    if (newReleasesRef.current && !loading) {
      gsap.fromTo(
        '.new-release-title',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        '.new-release-item',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [loading, records]);

  // Filter records by ensemble type
  const getRecordsByCategory = (category: string) => {
    if (category === 'Holiday') {
      return records.filter(record => record.fields.Style?.includes('Holiday'));
    }

    // For other categories, match with Ensemble field
    return records.filter(record => {
      const ensemble = record.fields.Ensemble || '';
      if (category === 'Home') return true; // All records for Home
      if (category === 'Concert Band') return ensemble.includes('Concert Band');
      if (category === 'Full Orchestra') return ensemble.includes('Full Orchestra');
      if (category === 'String Orchestra') return ensemble.includes('String Orchestra');
      if (category === 'Strings') return ensemble.includes('String');
      if (category === 'Horn Music') return ensemble.includes('Horn');
      if (category === 'Brass Music') return ensemble.includes('Brass');
      if (category === 'Woodwinds') return ensemble.includes('Woodwind');
      if (category === 'Vocal') return ensemble.includes('Vocal');
      if (category === 'Piano') return ensemble.includes('Piano');
      if (category === 'Opera') return ensemble.includes('Opera');
      return false;
    });
  };

  // Get featured records (for example, first 5 records)
  const getFeaturedRecords = () => {
    return records.slice(0, 5);
  };

  // Get new releases (for example, latest 5 records)
  const getNewReleases = () => {
    return [...records].sort((a, b) => {
      const dateA = a.fields.ReleaseDate ? new Date(a.fields.ReleaseDate) : new Date(0);
      const dateB = b.fields.ReleaseDate ? new Date(b.fields.ReleaseDate) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    }).slice(0, 5);
  };

  // Add search function
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const term = searchTerm.toLowerCase();

    const results = records.filter(record => {
      // If a specific category is selected, filter by that field
      if (searchCategory !== "all") {
        const fieldValue = record.fields[searchCategory];
        return fieldValue && String(fieldValue).toLowerCase().includes(term);
      }

      // Otherwise search across all fields
      return Object.values(record.fields).some(value =>
        value && String(value).toLowerCase().includes(term)
      );
    });

    setSearchResults(results);
  };

  // Reset search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchCategory("all");
    setIsSearching(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header records={records} />

      {/* Search Section */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 6, p: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h4" component="h2" className="mb-4 text-center font-bold">
            Search Music
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Search In</InputLabel>
                <Select
                  value={searchCategory}
                  label="Search In"
                  onChange={(e) => setSearchCategory(e.target.value as string)}
                >
                  <MenuItem value="all">All Fields</MenuItem>
                  <MenuItem value="Title">Title</MenuItem>
                  <MenuItem value="Composer">Composer</MenuItem>
                  <MenuItem value="Ensemble">Ensemble</MenuItem>
                  <MenuItem value="Style">Style</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={1.5}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={6} md={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={clearSearch}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Search Results */}
        {isSearching && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h3" className="mb-4">
              Search Results ({searchResults.length})
            </Typography>

            {searchResults.length === 0 ? (
              <Typography>No results found for "{searchTerm}"</Typography>
            ) : (
              <>
                {/* Group results by ensemble */}
                {Array.from(new Set(searchResults.map(record => record.fields.Ensemble || 'Other'))).map(ensemble => (
                  <Box key={ensemble} sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      component="h4" 
                      sx={{ 
                        mb: 2, 
                        pb: 1, 
                        borderBottom: '2px solid #3f51b5',
                        display: 'inline-block'
                      }}
                    >
                      {ensemble}
                    </Typography>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {searchResults
                        .filter(record => (record.fields.Ensemble || 'Other') === ensemble)
                        .map((record) => (
                          <Link href={`/product/${record.id}`} key={record.id}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                              <CardContent className="p-0">
                                <div className="aspect-square relative">
                                  {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                                    <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%' }}>
                                      <img
                                        src={record.fields['Cover Scan'][0].url}
                                        alt={record.fields['Product Name'] || 'Cover image'}
                                        style={{ 
                                          position: 'absolute', 
                                          top: 0, 
                                          left: 0, 
                                          width: '100%', 
                                          height: '100%', 
                                          objectFit: 'cover' 
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center" 
                                         style={{ aspectRatio: '1/1' }}>
                                      <span className="text-gray-500">No cover image</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-4">
                                  <h3 className="font-bold text-lg mb-1 truncate">{record.fields['Product Name'] || 'Untitled'}</h3>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Composer:</span> {record.fields['Composer'] || 'Unknown'}
                                  </p>
                                  <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Ensemble:</span> {record.fields['Ensemble'] || 'N/A'}
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
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}

        {/* Categories Section - Only show when not searching */}
        {!isSearching && (
          <div ref={categoriesRef} className="mb-12">
            <Typography variant="h4" component="h2" className="mb-6 text-center font-bold">
              Music Categories
            </Typography>

            <Grid container spacing={2} justifyContent="center">
              {categories.map((category, index) => (
                <Grid component="div" item key={index} className="category-item">
                  <Chip
                    label={category}
                    clickable
                    color="primary"
                    variant="outlined"
                    sx={{
                      fontSize: '0.9rem',
                      padding: '20px 10px',
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      }
                    }}
                    onClick={() => {
                      if (category === "Home") {
                        setIsSearching(false);
                        return;
                      }
                      
                      // Filter records based on the selected category
                      const filteredRecords = getRecordsByCategory(category);
                      
                      // Set the search results to the filtered records
                      setSearchResults(filteredRecords);
                      
                      // Update search term and category for display purposes
                      setSearchTerm(category);
                      setSearchCategory("all");
                      
                      // Show the search results
                      setIsSearching(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}

        {/* Only show these sections when not searching */}
        {!isSearching && !loading && records.length > 0 && (
          <>
            {/* Featured Section */}
            <div ref={featuredRef} className="mb-12">
              <Typography variant="h4" component="h2" className="mb-6 featured-title">
                Featured Music
              </Typography>

              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {getFeaturedRecords().map((record) => (
                    <Link href={`/product/${record.id}`} key={record.id}>
                      <Card className="featured-item overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <CardContent className="p-0">
                          <div className="aspect-square relative">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%' }}>
                                <img
                                  src={record.fields['Cover Scan'][0].url}
                                  alt={record.fields['Product Name'] || 'Cover image'}
                                  style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover' 
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center" 
                                   style={{ aspectRatio: '1/1' }}>
                                <span className="text-gray-500">No cover image</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 truncate">{record.fields['Product Name'] || 'Untitled'}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Composer:</span> {record.fields['Composer'] || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Ensemble:</span> {record.fields['Ensemble'] || 'N/A'}
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
              )}
            </div>

            {/* New Releases Section */}
            <div ref={newReleasesRef} className="mb-12">
              <Typography variant="h4" component="h2" className="mb-6 new-release-title">
                New Releases
              </Typography>

              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {getNewReleases().map((record) => (
                    <Link href={`/product/${record.id}`} key={record.id}>
                      <Card className="new-release-item overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <CardContent className="p-0">
                          <div className="aspect-square relative">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%' }}>
                                <img
                                  src={record.fields['Cover Scan'][0].url}
                                  alt={record.fields['Product Name'] || 'Cover image'}
                                  style={{ 
                                    position: 'absolute', 
                                    top: 0, 
                                    left: 0, 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover' 
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center" 
                                   style={{ aspectRatio: '1/1' }}>
                                <span className="text-gray-500">No cover image</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-bold text-lg mb-1 truncate">{record.fields['Product Name'] || 'Untitled'}</h3>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Composer:</span> {record.fields['Composer'] || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Ensemble:</span> {record.fields['Ensemble'] || 'N/A'}
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
              )}
            </div>
          </>
        )}

        {/* Display YouTube video if available */}
        {videoUrl && !isSearching && (
          <Box className="mb-12">
            <Typography variant="h4" component="h2" className="mb-6">
              Featured Video
            </Typography>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
              <iframe
                src={videoUrl}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Featured Video"
              />
            </Box>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography>Loading data...</Typography>
          </Box>
        )}

        {error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}


// Add function to handle product click
const handleProductClick = (productId: string) => {
  router.push(`/product/${productId}`);
};
