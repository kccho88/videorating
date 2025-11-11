import axios from 'axios';

export interface SearchParams {
  pageNo?: string;
  numOfRows?: string;
  title?: string;
  corpNm?: string;
  stDate?: string;
  edDate?: string;
}

export interface RatingItem {
  oriwkTtl: string;      // 제목
  corpNm: string;         // 사업자명
  grdNm: string;          // 등급명
  rtYmd: string;          // 분류일
  plotCn?: string;        // 줄거리
  contInfoDtl?: string;   // 내용정보표시항목
  dirtNm?: string;        // 감독명
  mainActNm?: string;     // 주연
  prodYear?: string;      // 제작년도
  filmTpNm?: string;      // 영상물 유형
  [key: string]: any;
}

export interface ApiResponse {
  resultCode: string;
  resultMsg: string;
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  items: RatingItem[];
}

export async function fetchRatingData(params: SearchParams): Promise<ApiResponse> {
  // Next.js API Route를 통해 호출 (CORS 문제 해결)
  const queryParams = new URLSearchParams({
    pageNo: params.pageNo || '1',
    numOfRows: params.numOfRows || '10',
  });
  
  if (params.title) queryParams.append('title', params.title);
  if (params.corpNm) queryParams.append('corpNm', params.corpNm);
  if (params.stDate) queryParams.append('stDate', params.stDate);
  if (params.edDate) queryParams.append('edDate', params.edDate);
  
  const url = `/api/rating?${queryParams.toString()}`;

  try {
    const response = await axios.get(url);
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('API 호출 중 오류가 발생했습니다: ' + error.message);
  }
}
