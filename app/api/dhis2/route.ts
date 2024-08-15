import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.DHIS2_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: 'DHIS2_API_URL is not set' }, { status: 500 });
  }

  const endpoint = '/dataElements.json';
  const params = {
    fields: 'id,name,formName,valueType,domainType',
    filter: 'domainType:eq:AGGREGATE',
  };

  const queryParams = new URLSearchParams(params).toString();
  const fullUrl = `${apiUrl}${endpoint}?${queryParams}`;

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data from DHIS2:', error);

    // Narrowing the error type
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({ error: 'Error fetching data from DHIS2', details: errorMessage }, { status: 500 });
  }
}
