const SlideImage = require('../models/SlideImage');

exports.getAllSlides = async (req, res) => {
  try {
    const slides = await SlideImage.findAll({ order: [['order', 'ASC']] });
    res.json(slides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSlideById = async (req, res) => {
  try {
    const slide = await SlideImage.findByPk(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createSlide = async (req, res) => {
  try {
    const { imageUrl, caption, order } = req.body;
    const slide = await SlideImage.create({ imageUrl, caption, order });
    res.status(201).json(slide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const slide = await SlideImage.findByPk(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    const { imageUrl, caption, order } = req.body;
    slide.imageUrl = imageUrl || slide.imageUrl;
    slide.caption = caption || slide.caption;
    slide.order = order !== undefined ? order : slide.order;
    await slide.save();
    res.json(slide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const slide = await SlideImage.findByPk(req.params.id);
    if (!slide) {
      return res.status(404).json({ message: 'Slide not found' });
    }
    await slide.destroy();
    res.json({ message: 'Slide deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
