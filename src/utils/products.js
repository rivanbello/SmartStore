import all from '../client/list';

const getProductsAndCategories = async ({ pointOfSaleId, token }) => {
  const products = await all({ pointOfSaleId: userInfo.condo.id, token: userInfo.condo.token })
      let categories = [];
      products.map(({ categoryId, categoryName }) => {
        if (!categoryName) {
          if (!categories.includes(`Categoria ${categoryId}`)) categories.push(`Categoria ${categoryId}`)
        } else {
          if (!categories.includes(categoryName)) categories.push(categoryName)
        }
      })
    return { products, categories };
}

export { getProductsAndCategories };