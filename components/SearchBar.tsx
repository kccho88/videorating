'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (params: { title: string; corpNm: string }) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [title, setTitle] = useState('');
  const [corpNm, setCorpNm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ title, corpNm });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              작품 제목
            </label>
            <Input
              id="title"
              type="text"
              placeholder="예: 오징어게임"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="corpNm" className="text-sm font-medium text-gray-700">
              사업자명
            </label>
            <Input
              id="corpNm"
              type="text"
              placeholder="예: 넷플릭스, 티빙, 쿠팡플레이"
              value={corpNm}
              onChange={(e) => setCorpNm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button 
            type="submit" 
            disabled={isLoading || (!title && !corpNm)}
            className="w-full md:w-auto px-8"
            size="lg"
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? '검색 중...' : '검색'}
          </Button>
        </div>
      </form>
    </div>
  );
}

