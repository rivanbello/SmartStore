const pointsOfSale = async ({ tokens = [] }) => {
  try {
    let posLists = [];
    for await (let token of tokens) {
      const response = await fetch(`https://touchpay-api.amlabs.com.br/api/public/pointsOfSale`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      let pushArr = [];
      for await (let pos of (await response.json())) {
        try {
          const res = await fetch(`https://touchpay-api.amlabs.com.br/api/public/MicroMarket/${pos.id}/Inventory`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          })
          // if (res.status !== 500)
          pos.token = token;
          if (res.status === 400) {
          }
          if (res.status === 200) pushArr.push(pos);
        } catch (error) {
          return false;
        }
      }
      posLists = posLists.concat(pushArr);
    }
    return posLists;
  } catch (error) {
    console.warn('request error', error);
  } 
}

export default pointsOfSale;