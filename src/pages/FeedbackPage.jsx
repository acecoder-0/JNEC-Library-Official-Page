import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    regNo: '',
    section: '',
    purpose: '',
    frequency: '',
    staffBehavior: '',
    staffKnowledge: '',
    staffEfficiency: '',
    staffEffectiveness: '',
    envCleanliness: '',
    envLighting: '',
    envEquipment: '',
    opac: '',
    internet: '',
    circulation: '',
    reference: '',
    magazine: '',
    readingHall: '',
    sufficiency: '',
    condition: '',
    suggestions: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    if (!formData.department) newErrors.department = 'Required';
    if (!formData.regNo) newErrors.regNo = 'Required';
    if (!formData.section) newErrors.section = 'Required';
    if (!formData.purpose) newErrors.purpose = 'Required';
    if (!formData.frequency) newErrors.frequency = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Feedback submitted:', data);
        setShowSuccess(true);
        setShowError(false);
        
        // Reset form
        setFormData({
          name: '',
          department: '',
          regNo: '',
          section: '',
          purpose: '',
          frequency: '',
          staffBehavior: '',
          staffKnowledge: '',
          staffEfficiency: '',
          staffEffectiveness: '',
          envCleanliness: '',
          envLighting: '',
          envEquipment: '',
          opac: '',
          internet: '',
          circulation: '',
          reference: '',
          magazine: '',
          readingHall: '',
          sufficiency: '',
          condition: '',
          suggestions: '',
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setShowError(true);
        setErrorMessage(data.message || 'Failed to submit feedback');
        console.error('❌ Error:', data);
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      setShowError(true);
      setErrorMessage('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const ratings = ['Excellent', 'Very Good', 'Good', 'Fair'];

  const sectionStyle = {
    marginBottom: '2rem',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: '#703c19',
    marginBottom: '0.75rem',
  };

  const radioGroupStyle = {
    marginBottom: '1rem',
  };

  return (
    <>
      <Header />
      <NavbarComp />
      <Container fluid style={{ boxShadow: '2px 2px 12px #606060', padding: '2rem 0' }}>
        <Row>
          <Col lg={12}>
            <h1 className="text-center mb-5" style={{ color: '#703c19', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
              LIBRARY FEEDBACK FORM
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Form onSubmit={handleSubmit}>
              {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible className="mb-4" style={{ borderRadius: '10px' }}>
                  <strong>✅ Thank You!</strong> Your feedback has been successfully submitted to our database.
                </Alert>
              )}
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible className="mb-4" style={{ borderRadius: '10px' }}>
                  <strong>❌ Error:</strong> {errorMessage}
                </Alert>
              )}
              <div style={sectionStyle}>
                <h5 style={{ color: '#703c19', borderBottom: '2px solid #703c19', paddingBottom: '0.5rem' }}>SECTION A: VISITOR DETAILS</h5>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>1. Name of Staff/Student <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Control name="name" value={formData.name} onChange={handleChange} isInvalid={!!errors.name} style={{ borderRadius: '5px' }} />
                      <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>2. Department <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Control name="department" value={formData.department} onChange={handleChange} isInvalid={!!errors.department} style={{ borderRadius: '5px' }} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>3. Library Registration No <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Control name="regNo" value={formData.regNo} onChange={handleChange} isInvalid={!!errors.regNo} style={{ borderRadius: '5px' }} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>4. Section Visited <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Select name="section" value={formData.section} onChange={handleChange} isInvalid={!!errors.section} style={{ borderRadius: '5px' }}>
                        <option value="">Select Section</option>
                        <option>Circulation Section</option>
                        <option>Reading Section</option>
                        <option>Reference Section/Journals</option>
                        <option>Internet/E-Library</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={labelStyle}>5. Purpose of Library Visit <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Select name="purpose" value={formData.purpose} onChange={handleChange} isInvalid={!!errors.purpose} style={{ borderRadius: '5px' }}>
                        <option value="">Select Purpose</option>
                        <option>To Issue Books</option>
                        <option>For Reference Material</option>
                        <option>Research Purpose</option>
                        <option>To Access E-Resources</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label style={labelStyle}>6. Frequency of Library Visit <span style={{color: 'red'}}>*</span></Form.Label>
                      <Form.Select name="frequency" value={formData.frequency} onChange={handleChange} isInvalid={!!errors.frequency} style={{ borderRadius: '5px' }}>
                        <option value="">Select Frequency</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Once in Two Months</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div style={sectionStyle}>
                <h5 style={{ color: '#703c19', borderBottom: '2px solid #703c19', paddingBottom: '0.5rem' }}>SECTION B: FEEDBACK (Help us evaluate our services)</h5>
                <h6 style={labelStyle}>A) STAFF:</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>1. Behavior of Library Staff</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="staffBehavior" value={r} label={r} checked={formData.staffBehavior === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>2. Knowledge of Library Staff</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="staffKnowledge" value={r} label={r} checked={formData.staffKnowledge === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>3. Efficiency and Promptness of Library Staff</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="staffEfficiency" value={r} label={r} checked={formData.staffEfficiency === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>4. Effectiveness of Library Staff</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="staffEffectiveness" value={r} label={r} checked={formData.staffEffectiveness === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>

                <h6 style={labelStyle}>B) ENVIRONMENT:</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>1. Cleanliness & Ambiance of Library</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="envCleanliness" value={r} label={r} checked={formData.envCleanliness === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>2. Lighting & Ventilation of Library</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="envLighting" value={r} label={r} checked={formData.envLighting === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>3. Equipment & Facilities of Library</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="envEquipment" value={r} label={r} checked={formData.envEquipment === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>

                <h6 style={labelStyle}>C) SERVICES:</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>1. OPAC/Search Module Facility</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="opac" value={r} label={r} checked={formData.opac === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>2. Internet & Multimedia Services</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="internet" value={r} label={r} checked={formData.internet === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>3. Circulation Services (Weekly)</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="circulation" value={r} label={r} checked={formData.circulation === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>4. Reference Services</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="reference" value={r} label={r} checked={formData.reference === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>5. Magazine/Journal Services</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="magazine" value={r} label={r} checked={formData.magazine === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>6. Reading Hall & 24 Hours Library Service in PL</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="readingHall" value={r} label={r} checked={formData.readingHall === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>

                <h6 style={labelStyle}>D) COLLECTION OF BOOKS, JOURNALS:</h6>
                <Row>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>1. Sufficiency & Availability of Library Books</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="sufficiency" value={r} label={r} checked={formData.sufficiency === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group style={radioGroupStyle}>
                      <Form.Label style={labelStyle}>2. Physical Condition of Library Books</Form.Label>
                      {ratings.map((r) => (
                        <Form.Check key={r} type="radio" name="condition" value={r} label={r} checked={formData.condition === r} onChange={handleRadioChange} />
                      ))}
                    </Form.Group>
                  </Col>
                </Row>

                <h6 style={labelStyle}>E) Suggestions:</h6>
                <Form.Group className="mb-4">
                  <Form.Label style={labelStyle}>Do you have any suggestion on how we can serve you better?</Form.Label>
                  <Form.Control as="textarea" rows={5} name="suggestions" value={formData.suggestions} onChange={handleChange} style={{ borderRadius: '5px', resize: 'vertical' }} />
                </Form.Group>
              </div>

              <p className="text-center mb-4" style={{ fontSize: '0.95rem', color: '#666', fontStyle: 'italic' }}>
                You may also send your questions, Comments & Suggestion to <a href="mailto:jneclibrary@gmail.com" style={{ color: '#703c19', fontWeight: 'bold' }}>jneclibrary@gmail.com</a>
              </p>

              <Button type="submit" disabled={loading} className="w-100 btn-lg" style={{ 
                backgroundColor: '#703c19', 
                borderColor: '#703c19', 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                padding: '1rem', 
                borderRadius: '10px',
                textTransform: 'uppercase',
                opacity: loading ? 0.7 : 1
              }}>
                {loading ? '⏳ Submitting...' : 'Submit Feedback'}
              </Button>
            </Form>
          </Col>
        </Row>
        <div style={{ height: '100px' }} /> {/* spacing */}
      </Container>
      <Footer />
    </>
  );
};

export default FeedbackPage;
