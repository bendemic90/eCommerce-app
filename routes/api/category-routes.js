const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCat = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
  const oneCat = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(newCat);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const updateCat = await Category.update(req.body, {
    category_name: req.body.category_name,
      where: {
        id: req.params.id,
      }
  });
  res.status(200).json(updateCat);
  if (!updateCat) {
    res.status(404).json({ message: `Wrong ID` })
  }
} catch (err) {
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(delCat)
  } 
  catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
