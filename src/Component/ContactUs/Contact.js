import React, { useState } from 'react';
import '../style.css';
import { NavLink } from 'react-router-dom';
import Menu from '../Home/Menu';
import Footer from '../Home/Footer';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Subject: '',
    Message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.Name) tempErrors.Name = 'Name is required.';
    if (!formData.Email) {
      tempErrors.Email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      tempErrors.Email = 'Email is not valid.';
    }
    if (!formData.Phone) tempErrors.Phone = 'Phone is required.';
    if (!formData.Subject) tempErrors.Subject = 'Subject is required.';
    if (!formData.Message) tempErrors.Message = 'Message is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const currentDate = new Date().toISOString();
      const dataToSend = {
        ...formData,
        created_date: currentDate,
        updated_date: currentDate
      };
      axios.post('http://localhost:3010/products/contactus', dataToSend)
        .then(response => {
          toast.success("Sent success");
          setFormData({
            Name: '',
            Email: '',
            Phone: '',
            Subject: '',
            Message: ''
          });
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          toast.error("Error submitting form. Please try again later.");
        });
    }
  };

  return (
    <div>
      <Menu />
      <nav className="bg-light py-2" aria-label="breadcrumb">
        <div className="container">
          <ol className="breadcrumb breadcrumb-light d-flex justify-content-center m-0">
            <li className="breadcrumb-item small">
              <NavLink className="text-dark" to="/"><i className="bi bi-house-door"> </i>Home</NavLink>
            </li>
            <li className="breadcrumb-item small active text-start text-primary" aria-current="page">Contact Us</li>
          </ol>
        </div>
      </nav>
      <div className="bg-light py-5 text-start">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="bg-white p-3 py-4 rounded-3 shadow-sm">
                <form className="row" onSubmit={handleSubmit}>
                  <h5 className="mb-3">Send Your Message</h5>
                  <p className="text-gray mb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu feugiat, sit amet blandit nisl iaculis. Donec lacus odio, malesuada eu libero sit amet, congue aliquam leo. In hac habitasse platea dictumst.
                  </p>
                  <div className="col-lg-6 mb-3">
                    <input
                      className="form-control form-control-primary rounded-2 mb-1 p-3"
                      type="text"
                      placeholder="Your Name"
                      name="Name"
                      value={formData.Name}
                      onChange={handleChange}
                    />
                    {errors.Name && <div className="text-danger">{errors.Name}</div>}
                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      className="form-control form-control-primary rounded-2 mb-1 p-3"
                      type="text"
                      placeholder="Your Email"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                    />
                    {errors.Email && <div className="text-danger">{errors.Email}</div>}
                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      className="form-control form-control-primary rounded-2 mb-1 p-3"
                      type="text"
                      placeholder="Your Phone"
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                    />
                    {errors.Phone && <div className="text-danger">{errors.Phone}</div>}
                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      className="form-control form-control-primary rounded-2 mb-1 p-3"
                      type="text"
                      placeholder="Subject"
                      name="Subject"
                      value={formData.Subject}
                      onChange={handleChange}
                    />
                    {errors.Subject && <div className="text-danger">{errors.Subject}</div>}
                  </div>
                  <div className="col-lg-12 mb-3">
                    <textarea
                      className="form-control form-control-primary rounded-2 mb-1 p-3"
                      placeholder="Message"
                      rows={5}
                      name="Message"
                      value={formData.Message}
                      onChange={handleChange}
                    />
                    {errors.Message && <div className="text-danger">{errors.Message}</div>}
                  </div>
                  
                  <div className="col-lg-4">
                    <button className="btn btn-primary rounded-3 mt-3 px-4 py-2 w-auto" type="submit" >
                      <i className="bi bi-send" /> Send Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="bg-white shadow-sm p-3 pt-4 pb-4 rounded-3">
                <h5 className="mb-3">Contact Us</h5>
                <p className="small text-gray mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida quis libero eleifend ornare. Habitasse platea dictumst.
                </p>
                <div>
                  <div className="info-icon-biger gap-3 p-0 mt-4">
                    <i className="bi bi-telephone-inbound" />
                    <div className="info-content">
                      <span className="title">Contact Us</span>
                      <NavLink className="action" to="#"> (123) 123-456</NavLink>
                    </div>
                  </div>
                  <div className="info-icon-biger gap-3 p-0 mt-4">
                    <i className="bi bi-envelope-open" />
                    <div className="info-content">
                      <span className="title">Email Support</span>
                      <NavLink className="action" to="#"> info@examplesite.com</NavLink>
                    </div>
                  </div>
                  <div className="info-icon-biger gap-3 p-0 mt-4">
                    <i className="bi bi-geo-alt"/>
                    <div className="info-content">
                      <span className="title"> Our Location</span>
                      <NavLink className="action" to="#"> 45 Park Avenue, NY</NavLink>
                    </div>
                  </div>
                  <h5 className="mt-4 mb-3">Follow Us</h5>
                  <ul className="d-flex gap-3 mt-3">
                    <li>
                      <NavLink className="x-icon bg-facebook shadow-sm bg-white" to="#">
                        <i className="bi bi-facebook"></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="x-icon bg-twitter shadow-sm bg-white" to="#">
                        <i className="bi bi-twitter"></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="x-icon bg-instagram shadow-sm bg-white" to="#">
                        <i className="bi bi-instagram"></i>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="x-icon hover-primary shadow-sm bg-white" to="#">
                        <i className="bi bi-youtube"></i>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <iframe
        className='w-100'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14897.406381951063!2d105.77451525541991!3d21.01861330000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab574d3f3753%3A0x698ff1d91945468e!2zVGjhur8gR2nhu5tpIERpIMSQ4buZbmc!5e0!3m2!1svi!2s!4v1715758148703!5m2!1svi!2s"
        width={600}
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <Footer />
      <ToastContainer />
    </div>
  );
}

