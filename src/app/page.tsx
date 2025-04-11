'use client'
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
import CardSection from '@/components/card';

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
    'Services', 'Opera'
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
    <div className="bg-[rgba(104, 121, 159, 1)] min-h-screen">
      <Header records={records} />

      {/* Search Section */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 6, p: 2, backgroundColor: '#F5F5F0', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h5" component="h2" className="mb-3 text-center font-bold text-[#2c2c2c]">
            Search Music
          </Typography>

          <div className="flex flex-wrap -mx-2 pt-2">
            <div className="w-full md:w-1/2 px-2 mb-3 md:mb-0">
              <TextField
                size="small"
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#A89F91',
                    },
                    '&:hover fieldset': {
                      borderColor: '#355E3B',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#355E3B',
                    },
                  },
                }}
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-3 md:mb-0">
              <FormControl fullWidth size="small">
                <InputLabel>Search In</InputLabel>
                <Select
                  value={searchCategory}
                  label="Search In"
                  onChange={(e) => setSearchCategory(e.target.value as string)}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#A89F91',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#355E3B',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#355E3B',
                    },
                  }}
                >
                  <MenuItem value="all">All Fields</MenuItem>
                  <MenuItem value="Title">Title</MenuItem>
                  <MenuItem value="Composer">Composer</MenuItem>
                  <MenuItem value="Ensesmble">Ensesmble</MenuItem>
                  <MenuItem value="Style">Style</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-1/2 md:w-1/8 px-2 mb-3 md:mb-0">
              <Button
                variant="default"
                className="w-full h-10 bg-[#355E3B] hover:bg-[#2c4e31] text-white"
                onClick={() => handleSearch()}
              >
                Search
              </Button>
            </div>
            <div className="w-1/2 md:w-1/8 px-2">
              <Button
                variant="outline"
                className="w-full h-10 border-[#A89F91] text-[#2c2c2c] hover:bg-[#F5F5F0] hover:text-[#800000]"
                onClick={clearSearch}
              >
                Clear
              </Button>
            </div>
          </div>
        </Box>

        {/* Search Results */}
        {isSearching && (
          <div className="mb-12">
            <div className="w-full bg-[#F5F5F0] rounded-lg p-4 mb-6">
              <h3 className="text-2xl font-bold text-center text-[#2c2c2c]">
                Search Results ({searchResults.length})
              </h3>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-center text-white bg-white/30 p-4 rounded-lg">No results found for "{searchTerm}"</p>
            ) : (
              <>
                {/* Group results by Ensemble */}
                {Array.from(new Set(searchResults.map(record => record.fields.Ensesmble || 'Other'))).map(ensemble => (
                  <div key={ensemble} className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 px-4 py-2 bg-[#355E3B] text-white rounded-lg text-center w-auto mx-auto inline-block">
                      {ensemble}
                    </h4>

                    <div className="relative">
                      <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#2c4e31] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById(`slider-${ensemble.replace(/\s+/g, '-')}`)?.scrollBy(-300, 0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                      </button>

                      <div
                        id={`slider-${ensemble.replace(/\s+/g, '-')}`}
                        className="flex overflow-x-auto pb-6 pt-2 px-2 gap-4 hide-scrollbar snap-x"
                        style={{ scrollBehavior: 'smooth' }}
                      >
                        {searchResults
                          .filter(record => (record.fields.Ensesmble || 'Other') === ensemble)
                          .map((record) => (
                            <Link href={`/product/${record.id}`} key={record.id} className="snap-start">
                              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[200px] w-[200px]">
                                <div className="aspect-square relative bg-white">
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
                                <div className="p-3 text-center">
                                  <h3 className="font-bold text-base mb-2 truncate">
                                    {record.fields['Product Name'] || 'Untitled'}
                                  </h3>
                                  <p className="text-green-600 font-bold">
                                    ${record.fields['Price'] || 'Price not available'}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>

                      <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#2c4e31] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById(`slider-${ensemble.replace(/\s+/g, '-')}`)?.scrollBy(300, 0)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* Categories Section - Only show when not searching */}
        {!isSearching && (
          <div ref={categoriesRef} className="mb-12">
            <div className="w-full bg-[#F5F5F0] rounded-lg p-4 mb-6">
              <h3 className="text-2xl font-bold text-center text-[#2c2c2c]">
              Music Categories

              </h3>
            </div>
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
              <div className="w-full bg-[#F5F5F0] rounded-lg p-4 mb-6">
                <h3 className="text-2xl font-bold text-center text-[#2c2c2c]">
                  Featured Music
                </h3>
              </div>

              {!loading && !error && (
                <div className="relative">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#355E3B] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById('featured-slider')?.scrollBy(-300, 0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>

                  <div
                    id="featured-slider"
                    className="flex overflow-x-auto pb-6 pt-2 px-2 gap-4 hide-scrollbar snap-x"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {getFeaturedRecords().map((record) => (
                      <Link href={`/product/${record.id}`} key={record.id} className="snap-start">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[200px] w-[200px] featured-item">
                          <div className="aspect-square relative bg-white">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <img
                                src={record.fields['Cover Scan'][0].url}
                                alt={record.fields['Product Name'] || 'Cover image'}
                                className="absolute inset-0 m-auto w-[90%] h-[90%] object-contain"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-500">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="p-3 text-center">
                            <h3 className="font-bold text-base mb-2 truncate">
                              {record.fields['Product Name'] || 'Untitled'}
                            </h3>
                            <p className="text-green-600 font-bold">
                              ${record.fields['Price'] || 'Price not available'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#355E3B] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById('featured-slider')?.scrollBy(300, 0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              )}
            </div>

            {/* New Releases Section */}
            <div ref={newReleasesRef} className="mb-12">
              <div className="w-full bg-[#F5F5F0] rounded-lg p-4 mb-6">
                <h3 className="text-2xl font-bold text-center text-[#2c2c2c]">
                  New Releases
                </h3>
              </div>

              {!loading && !error && (
                <div className="relative">
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#355E3B] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById('new-releases-slider')?.scrollBy(-300, 0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>

                  <div
                    id="new-releases-slider"
                    className="flex overflow-x-auto pb-6 pt-2 px-2 gap-4 hide-scrollbar snap-x"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    {getNewReleases().map((record) => (
                      <Link href={`/product/${record.id}`} key={record.id} className="snap-start">
                        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[200px] w-[200px] new-release-item">
                          <div className="aspect-square relative bg-white">
                            {record.fields['Cover Scan'] && record.fields['Cover Scan'][0] ? (
                              <img
                                src={record.fields['Cover Scan'][0].url}
                                alt={record.fields['Product Name'] || 'Cover image'}
                                className="absolute inset-0 m-auto w-[90%] h-[90%] object-contain"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-gray-500">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="p-3 text-center">
                            <h3 className="font-bold text-base mb-2 truncate">
                              {record.fields['Product Name'] || 'Untitled'}
                            </h3>
                            <p className="text-green-600 font-bold">
                              ${record.fields['Price'] || 'Price not available'}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#355E3B] hover:bg-[#355E3B] text-white rounded-full p-2 z-10 shadow-md" onClick={() => document.getElementById('new-releases-slider')?.scrollBy(300, 0)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
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

      <div>
        {/* <CardSection></CardSection> */}
      </div>

    </div>
  );
}


// Add function to handle product click
const handleProductClick = (productId: string) => {
  router.push(`/product/${productId}`);
};
