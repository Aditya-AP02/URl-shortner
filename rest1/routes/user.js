const express = require("express")

const router = express.Router();

// GET /api/users - All MongoDB users JSON
// deleted parts

// GET /api/users/:id - Single MongoDB user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json({ status: 'success', data: user });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    
    // Support both snake_case (form-urlencoded) and camelCase (JSON)
    const firstName = body['first-name'] || body.firstName || body.first_name;
    const lastName = body['last-name'] || body.lastName || body.last_name;
    const email = body.email;
    const gender = body.gender;
    const jobTitle = body['job-title'] || body.jobTitle || body.job_title;

    if (!firstName || !email) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required fields: firstName and email' 
      });
    }

    const result = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle
    });

    console.log('✅ User created:', result);
    res.status(201).json({ status: 'success', data: result });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Email already exists' 
      });
    }
    console.error('❌ Create error:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PATCH /api/users/:id - Update user
router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const firstName = body['first-name'] || body.firstName || body.first_name;
    const lastName = body['last-name'] || body.lastName || body.last_name;
    const email = body.email;
    const gender = body.gender;
    const jobTitle = body['job-title'] || body.jobTitle || body.job_title;

    const result = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, gender, jobTitle },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ status: 'success', data: result });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ status: 'error', message: 'Email already exists' });
    }
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    res.json({ status: 'success', message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});


module.exports = router;