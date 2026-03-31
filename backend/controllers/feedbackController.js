import pool from '../config/db.js';

// Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const {
      name,
      department,
      regNo,
      section,
      purpose,
      frequency,
      staffBehavior,
      staffKnowledge,
      staffEfficiency,
      staffEffectiveness,
      envCleanliness,
      envLighting,
      envEquipment,
      opac,
      internet,
      circulation,
      reference,
      magazine,
      readingHall,
      sufficiency,
      condition,
      suggestions
    } = req.body;

    // Validate required fields
    if (!name || !department || !regNo || !section || !purpose || !frequency) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields'
      });
    }

    // Insert feedback into database
    const query = `
      INSERT INTO feedback (
        name, department, reg_no, section, purpose, frequency,
        staff_behavior, staff_knowledge, staff_efficiency, staff_effectiveness,
        env_cleanliness, env_lighting, env_equipment, opac, internet, circulation,
        reference, magazine, reading_hall, sufficiency, condition, suggestions
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
        $17, $18, $19, $20, $21, $22
      ) RETURNING id, created_at
    `;

    const result = await pool.query(query, [
      name, department, regNo, section, purpose, frequency,
      staffBehavior || null, staffKnowledge || null, staffEfficiency || null, staffEffectiveness || null,
      envCleanliness || null, envLighting || null, envEquipment || null, opac || null, internet || null, circulation || null,
      reference || null, magazine || null, readingHall || null, sufficiency || null, condition || null, suggestions || null
    ]);

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
      feedbackId: result.rows[0].id,
      timestamp: result.rows[0].created_at
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting feedback'
    });
  }
};

// Get all feedback (for admin)
export const getAllFeedback = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM feedback ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      count: result.rows.length,
      feedback: result.rows
    });

  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback'
    });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM feedback WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      feedback: result.rows[0]
    });

  } catch (error) {
    console.error('Get feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback'
    });
  }
};

// Delete feedback (admin only)
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM feedback WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Delete feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting feedback'
    });
  }
};
