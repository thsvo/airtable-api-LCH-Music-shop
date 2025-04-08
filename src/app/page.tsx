

'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Container, Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
import { Button } from '@/components/ui/button';

// Define types for our records
interface AirtableRecord {
  id: string;
  fields: {
    [key: string]: any;
    'Product Name'?: string;
    Composer?: string;
    Ensesmble?: string;
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
    'Concert Band', 'Full Orchestra', 'String Orchestra',
    'Strings', 'Horn Music', 'Brass Music', 'Woodwinds',
    'Vocal', 'Piano', 'Holiday', 'Other', 'About',
    'Contact Us', 'Services', 'Opera'
  ];

  // Add function to handle category selection
  const handleCategoryClick = (category: string) => {
    if (category === "Home") {
      setIsSearching(false);
      return;
    }

    // Set search term to the category name
    setSearchTerm(category);
    setSearchCategory("all");

    // Call the search function to filter records
    handleSearch(category);
  };

  // Add search function
  const handleSearch = (categoryOverride?: string) => {
    const term = categoryOverride || searchTerm.trim();

    if (!term) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const searchText = term.toLowerCase();

    // Filter records to only include those with Status "Done"
    const results = records.filter(record => {
      // First check if status is "Done"
      if (!record.fields.Status || record.fields.Status !== "Done") {
        return false;
      }

      // If searching in a specific category
      if (searchCategory !== "all") {
        // Map field names to their Airtable counterparts
        const fieldMapping: { [key: string]: string } = {
          "Title": "Product Name",
          "Style": "Style 1"
        };

        const fieldName = fieldMapping[searchCategory] || searchCategory;
        const fieldValue = record.fields[fieldName];
        return fieldValue && String(fieldValue).toLowerCase().includes(searchText);
      }

      // When searching across all fields
      return Object.entries(record.fields).some(([key, value]) => {
        return value && String(value).toLowerCase().includes(searchText);
      });
    });

    setSearchResults(results);
    console.log(`Search for "${term}" found ${results.length} results`);
  };

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

  // Filter records by Ensesmble type
  const getRecordsByCategory = (category: string) => {
    // First filter for records with status "Done"
    const doneRecords = records.filter(record => record.fields.Status === "Done");
    console.log(`Total records with Status "Done": ${doneRecords.length}`);

    if (category === 'Holiday') {
      // Check both Style and Ensesmble fields for Holiday
      const holidayRecords = doneRecords.filter(record =>
        (record.fields.Style && String(record.fields.Style).toLowerCase().includes('holiday')) ||
        (record.fields.Ensesmble && String(record.fields.Ensesmble).toLowerCase().includes('holiday'))
      );
      console.log(`Found ${holidayRecords.length} Holiday records`);
      return holidayRecords;
    }

    // For other categories, match with Ensesmble field - case insensitive
    const filteredRecords = doneRecords.filter(record => {
      const Ensesmble = record.fields.Ensesmble ? String(record.fields.Ensesmble).toLowerCase() : '';

      if (category === 'Concert Band') return Ensesmble.toLowerCase().includes('concert band');
      if (category === 'Full Orchestra') return Ensesmble.toLowerCase().includes('full orchestra');
      if (category === 'String Orchestra') return Ensesmble.toLowerCase().includes('string orchestra');
      if (category === 'Strings') return Ensesmble.toLowerCase().includes('string');
      if (category === 'Horn Music') return Ensesmble.toLowerCase().includes('horn');
      if (category === 'Brass Music') return Ensesmble.toLowerCase().includes('brass');
      if (category === 'Woodwinds') return Ensesmble.toLowerCase().includes('woodwind');
      if (category === 'Vocal') return Ensesmble.toLowerCase().includes('vocal');
      if (category === 'Piano') return Ensesmble.toLowerCase().includes('piano');
      if (category === 'Opera') return Ensesmble.toLowerCase().includes('opera');
      if (category === 'Other') return true; // Show all for Other category
      if (category === 'About' || category === 'Contact Us' || category === 'Services' || category === 'Classical Music Is…') {
        // These are likely navigation items, not filter categories
        return false;
      }
      return false;
    });

    console.log(`Found ${filteredRecords.length} records for category ${category}`);
    return filteredRecords;
  };

  // Get featured records (for example, first 5 records)
  const getFeaturedRecords = () => {
    // Filter for records with status "Done" first
    const doneRecords = records.filter(record => record.fields.Status === "Done");
    return doneRecords.slice(0, 5);
  };

  // Get new releases (for example, latest 5 records)
  const getNewReleases = () => {
    // Filter for records with status "Done" first
    const doneRecords = records.filter(record => record.fields.Status === "Done");

    return [...doneRecords].sort((a, b) => {
      const dateA = a.fields.ReleaseDate ? new Date(a.fields.ReleaseDate) : new Date(0);
      const dateB = b.fields.ReleaseDate ? new Date(b.fields.ReleaseDate) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    }).slice(0, 5);
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
          <Typography variant="h4" component="h2" className="mb-4 text-center font-bold ">
            Search Music
          </Typography>

          <div className="flex flex-wrap -mx-2 pt-3">
            <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
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
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
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
                  <MenuItem value="Ensesmble">Ensesmble</MenuItem>
                  <MenuItem value="Style">Style</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-1/2 md:w-1/8 px-2 mb-4 md:mb-0">
              <Button
                variant="default"
                color="primary"
                className="w-40 h-13"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </div>
            <div className="w-1/2 md:w-1/8 px-2">
              <Button
                variant="outline"
                color="secondary"
                className="w-40 h-13"
                onClick={clearSearch}
              >
                Clear
              </Button>
            </div>
          </div>
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
                {/* Group results by Ensesmble */}
                {Array.from(new Set(searchResults.map(record => record.fields.Ensesmble || 'Other'))).map(Ensesmble => (
                  <Box key={Ensesmble} sx={{ mb: 4 }}>
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
                      {Ensesmble}
                    </Typography>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {searchResults
                        .filter(record => (record.fields.Ensesmble || 'Other') === Ensesmble)
                        .map((record) => (
                          <Link href={`/product/${record.id}`} key={record.id}>
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                              <CardContent className="p-0">
                                <div className="aspect-square relative">
                                  {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                                    <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%', backgroundColor: 'white' }}>
                                      <img
                                        src={record.fields['Cover Scan'][0].url}
                                        alt={record.fields['Product Name'] || 'Cover image'}
                                        style={{
                                          position: 'absolute',
                                          width: '95%',
                                          height: '95%',
                                          objectFit: 'contain',
                                          backgroundColor: 'white',
                                          borderRadius: '4px'
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
<br></br>
            <div className="flex flex-wrap -mx-2 justify-center">
              {categories.map((category, index) => (
                <div key={index} className="px-2 mb-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 category-item">
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
                      width: '100%',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      }
                    }}
                    onClick={() => handleCategoryClick(category)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Only show these sections when not searching */}
        {!isSearching && !loading && records.length > 0 && (
          <>
            {/* Featured Section */}
            <div ref={featuredRef} className="mb-12">
              <Typography variant="h4" component="h2" className="mb-6 featured-title text-center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '8px' }}>
                Featured Music
              </Typography>

              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {getFeaturedRecords().map((record) => (
                    <Link href={`/product/${record.id}`} key={record.id}>
                      <Card className="featured-item overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <CardContent className="p-0">
                          <div className="aspect-square relative">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%', backgroundColor: 'white' }}>
                                <img
                                  src={record.fields['Cover Scan'][0].url}
                                  alt={record.fields['Product Name'] || 'Cover image'}
                                  style={{
                                    position: 'absolute',

                                    width: '95%',
                                    height: '95%',
                                    objectFit: 'contain',
                                    backgroundColor: 'white',
                                    borderRadius: '4px'
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
              )}
            </div>

            {/* New Releases Section */}
            <div ref={newReleasesRef} className="mb-12">
              <Typography variant="h4" component="h2" className="mb-6 new-release-title text-center" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '8px' }}>
                New Releases
              </Typography>

              {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {getNewReleases().map((record) => (
                    <Link href={`/product/${record.id}`} key={record.id}>
                      <Card className="new-release-item overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                        <CardContent className="p-0">
                          <div className="aspect-square relative">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%', backgroundColor: 'white' }}>
                                <img
                                  src={record.fields['Cover Scan'][0].url}
                                  alt={record.fields['Product Name'] || 'Cover image'}
                                  style={{
                                    position: 'absolute',

                                    width: '95%',
                                    height: '95%',
                                    objectFit: 'contain',
                                    backgroundColor: 'white',
                                    borderRadius: '4px'
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
