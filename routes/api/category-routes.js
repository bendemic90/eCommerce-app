const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCat = await Category.findAll();
    res.status(200).json(allCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const oneCat = await Category.findByPk(req.params.id);
  res.status(200).json(oneCat);
  
  if (!oneCat) {
    res.status(404).json({ message: 'No ID found.' });
    return;
  }

  res.status(200).json(oneCat);

  } catch (err) {
  res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
