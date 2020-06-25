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
      const pushArr = (await response.json()).filter(async (pos) => {
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
          console.warn('res status: ', res.status)
          if (res.status === 200) return true;
          return false;
        } catch (error) {
          return false;
        }
      })
      console.warn('pushArr: ', pushArr.length);
      posLists = posLists.concat(pushArr);
    }
    console.warn(posLists);
    return posLists;
  } catch (error) {
    console.warn('request error', error);
  } 
}

export default pointsOfSale;