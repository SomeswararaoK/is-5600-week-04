const path = require('path')
const products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
*/
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
}


async function getProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)
  if (!product) {
    // next() is a callback that will pass the request to the next available route in the stack
    return next()
  }
  return res.json(product)

}


/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  // Extract the limit and offset query parameters
  const { offset = 0, limit = 25, tag } = req.query

  res.json(await products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  })) // user products service/model

}

async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.status(200).send();
}
async function deleteProduct(req, res) {
  console.log('request body:', req.body)
  res.status(202).send();
}


module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  deleteProduct,
});