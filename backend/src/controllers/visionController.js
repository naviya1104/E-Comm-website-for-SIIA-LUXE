const Vision = require('../models/Vision');

exports.getVision = async (req, res) => {
  try {
    const vision = await Vision.findOne();
    if (!vision) {
      return res.status(404).json({ message: 'Vision not found' });
    }
    res.json(vision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateVision = async (req, res) => {
  try {
    let vision = await Vision.findOne();
    if (!vision) {
      vision = await Vision.create({ content: req.body.content });
    } else {
      vision.content = req.body.content || vision.content;
      await vision.save();
    }
    res.json(vision);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
