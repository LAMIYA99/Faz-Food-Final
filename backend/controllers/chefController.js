const Chef = require('../models/Chef');

exports.getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find().sort({ createdAt: -1 });
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createChef = async (req, res) => {
  const chef = new Chef(req.body);
  try {
    const newChef = await chef.save();
    res.status(201).json(newChef);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateChef = async (req, res) => {
  try {
    const updatedChef = await Chef.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedChef);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteChef = async (req, res) => {
  try {
    await Chef.findByIdAndDelete(req.params.id);
    res.json({ message: 'Chef deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
