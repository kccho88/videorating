'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RatingItem } from '@/lib/fetchRating';

interface RatingTableProps {
  data: RatingItem[];
  onRowClick: (item: RatingItem) => void;
}

export default function RatingTable({ data, onRowClick }: RatingTableProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">제목</TableHead>
            <TableHead className="font-semibold">사업자</TableHead>
            <TableHead className="font-semibold">등급</TableHead>
            <TableHead className="font-semibold">분류일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => onRowClick(item)}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <TableCell className="font-medium">{item.oriwkTtl}</TableCell>
              <TableCell>{item.corpNm}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      item.grdNm.includes('전체')
                        ? 'bg-green-100 text-green-800'
                        : item.grdNm.includes('12')
                        ? 'bg-blue-100 text-blue-800'
                        : item.grdNm.includes('15')
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.grdNm.includes('청소년')
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                >
                  {item.grdNm}
                </span>
              </TableCell>
              <TableCell>{formatDate(item.rtYmd)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


