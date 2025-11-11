import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageNo = searchParams.get('pageNo') || '1';
    const numOfRows = searchParams.get('numOfRows') || '10';
    const title = searchParams.get('title') || '';
    const corpNm = searchParams.get('corpNm') || '';
    const stDate = searchParams.get('stDate') || '';
    const edDate = searchParams.get('edDate') || '';

    // API 키는 서버 환경변수에서 가져옴 (NEXT_PUBLIC_ 없이)
    const serviceKey = process.env.API_KEY;
    
    console.log('Environment check:', {
      hasApiKey: !!serviceKey,
      apiKeyLength: serviceKey?.length,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('API'))
    });
    
    if (!serviceKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다. 환경변수를 확인하세요.' },
        { status: 500 }
      );
    }

    // URL 파라미터 구성
    const params = new URLSearchParams({
      pageNo,
      numOfRows,
    });

    if (title) params.append('title', title);
    if (corpNm) params.append('corpNm', corpNm);
    if (stDate) params.append('stDate', stDate);
    if (edDate) params.append('edDate', edDate);

    // serviceKey는 인코딩하지 않고 직접 추가
    const url = `https://apis.data.go.kr/B551008/irating_v1/ir_search?serviceKey=${serviceKey}&${params.toString()}`;

    console.log('API URL:', url);

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/xml',
      },
      timeout: 10000,
    });

    const xml = response.data;
    const json = await parseStringPromise(xml, {
      explicitArray: false,
      trim: true,
      normalizeTags: false,
      explicitRoot: false,
    });

    // API 응답 구조 파싱
    const header = json.header || {};
    const body = json.body || {};

    const resultCode = header.resultCode || '00';
    const resultMsg = header.resultMsg || 'SUCCESS';

    // 에러 코드 확인
    if (resultCode !== '00') {
      return NextResponse.json(
        { error: `API Error [${resultCode}]: ${resultMsg}` },
        { status: 400 }
      );
    }

    const totalCount = parseInt(body.totalCount || '0');
    const pageNoResult = parseInt(body.pageNo || '1');
    const numOfRowsResult = parseInt(body.numOfRows || '10');

    let items = [];

    if (body.items && body.items.item) {
      const itemData = Array.isArray(body.items.item)
        ? body.items.item
        : [body.items.item];

      items = itemData.map((item: any) => ({
        oriwkTtl: item.oriwkTtl || '',
        corpNm: item.corpNm || '',
        grdNm: item.grdNm || '',
        rtYmd: item.rtYmd || '',
        plotCn: item.plotCn || '',
        contInfoDtl: item.contInfoDtl || '',
        dirtNm: item.dirtNm || '',
        mainActNm: item.mainActNm || '',
        prodYear: item.prodYear || '',
        filmTpNm: item.filmTpNm || '',
      }));
    }

    return NextResponse.json({
      resultCode,
      resultMsg,
      totalCount,
      pageNo: pageNoResult,
      numOfRows: numOfRowsResult,
      items,
    });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json(
      { error: 'API 호출 중 오류가 발생했습니다: ' + error.message },
      { status: 500 }
    );
  }
}

