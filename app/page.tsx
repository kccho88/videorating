'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import RatingTable from '@/components/RatingTable';
import DetailModal from '@/components/DetailModal';
import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { fetchRatingData, RatingItem, ApiResponse } from '@/lib/fetchRating';
import { AlertCircle, Film } from 'lucide-react';

export default function Home() {
  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<RatingItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchParams, setCurrentSearchParams] = useState<{
    title: string;
    corpNm: string;
  }>({ title: '', corpNm: '' });

  const handleSearch = async (params: { title: string; corpNm: string }, pageNo: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchRatingData({
        title: params.title,
        corpNm: params.corpNm,
        pageNo: pageNo.toString(),
        numOfRows: '10',
      });

      setSearchResults(result);
      setCurrentSearchParams(params);
    } catch (err: any) {
      setError(err.message || '검색 중 오류가 발생했습니다.');
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    handleSearch(currentSearchParams, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRowClick = (item: RatingItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              영상물 자체등급분류 검색 서비스
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            넷플릭스, 티빙, 쿠팡플레이, 디즈니+ 등의 등급분류 정보를 검색하세요
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={(params) => handleSearch(params, 1)} isLoading={isLoading} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <Spinner />}

        {/* Results */}
        {!isLoading && searchResults && (
          <div className="space-y-6">
            {/* Results Info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                총 <span className="font-semibold text-primary">{searchResults.totalCount}</span>개의
                결과
              </span>
              <span>
                {searchResults.pageNo} / {Math.ceil(searchResults.totalCount / searchResults.numOfRows)} 페이지
              </span>
            </div>

            {/* Table */}
            <RatingTable data={searchResults.items} onRowClick={handleRowClick} />

            {/* Pagination */}
            <Pagination
              currentPage={searchResults.pageNo}
              totalCount={searchResults.totalCount}
              itemsPerPage={searchResults.numOfRows}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !searchResults && !error && (
          <div className="text-center py-16">
            <Film className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              작품을 검색해보세요
            </h3>
            <p className="text-gray-500">
              제목이나 사업자명을 입력하여 등급분류 정보를 찾을 수 있습니다
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal item={selectedItem} onClose={handleCloseModal} />
    </main>
  );
}


