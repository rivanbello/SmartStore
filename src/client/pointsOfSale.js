const pointsOfSale = async () => {
  try {
    const response = await fetch(`https://touchpay-api.amlabs.com.br/api/public/pointsOfSale`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiMTg5YTFiMDgtYWVjMi00OGUzLWIxZjItMjE2NjMzMGE4M2RkIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUHVibGljIEFQSSIsImV4cCI6MTg5MzQ2NjgwMCwiaXNzIjoiTWVyY3VyaW8iLCJhdWQiOiIyNjgifQ.nOYlTCgeXX18kwje7aRkuISd7qBXhOBr0YB0h3SHr3g'
      },
    });
    const response2 = await fetch(`https://touchpay-api.amlabs.com.br/api/public/pointsOfSale`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwianRpIjoiYWI5YTk5NzMtZGU3ZS00MTgyLTlkNWUtY2QxYzA5OTRjMzA1IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUHVibGljIEFQSSIsImV4cCI6MTg5MzQ2NjgwMCwiaXNzIjoiTWVyY3VyaW8iLCJhdWQiOiI2MzYifQ.lcErrBQUzXWLq9nHe11KiXH3W-T3_hDEdjYdfZ2W-YU'
      },
    });

    const res = (await response.json()).concat(await response2.json());
    return res;
  } catch (error) {
    console.warn('request error', error);
  } 
}

export default pointsOfSale;