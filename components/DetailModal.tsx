'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Film, User, Calendar, AlertCircle } from 'lucide-react';
import { RatingItem } from '@/lib/fetchRating';

interface DetailModalProps {
  item: RatingItem | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  if (!item) return null;

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <CardHeader className="pb-4">
            <CardTitle className="text-2xl pr-10">{item.oriwkTtl}</CardTitle>
            <CardDescription className="text-base">
              {item.corpNm}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 등급 정보 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">등급</span>
                  </div>
                  <p
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
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
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">분류일</span>
                  </div>
                  <p className="text-base">{formatDate(item.rtYmd)}</p>
                </div>
              </div>
            </div>

            {/* 제작 정보 */}
            {(item.prodYear || item.filmTpNm) && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  제작 정보
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {item.prodYear && (
                    <div>
                      <span className="font-medium text-gray-600">제작년도: </span>
                      <span>{item.prodYear}</span>
                    </div>
                  )}
                  {item.filmTpNm && (
                    <div>
                      <span className="font-medium text-gray-600">유형: </span>
                      <span>{item.filmTpNm}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 스태프 정보 */}
            {(item.dirtNm || item.mainActNm) && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5" />
                  스태프 정보
                </h3>
                <div className="space-y-2 text-sm">
                  {item.dirtNm && (
                    <div>
                      <span className="font-medium text-gray-600">감독: </span>
                      <span>{item.dirtNm}</span>
                    </div>
                  )}
                  {item.mainActNm && (
                    <div>
                      <span className="font-medium text-gray-600">주연: </span>
                      <span>{item.mainActNm}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 내용정보표시항목 */}
            {item.contInfoDtl && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">내용정보표시항목</h3>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-sm text-amber-900">{item.contInfoDtl}</p>
                </div>
              </div>
            )}

            {/* 줄거리 */}
            {item.plotCn && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">줄거리</h3>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-wrap">
                    {item.plotCn}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

