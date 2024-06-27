import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PayPalSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handlePayPalSuccess = async () => {
            try {
                // Gọi endpoint từ back end để xử lý thanh toán thành công
                const response = await axios.get('http://localhost:3010/pkdd/paypal_success');
                console.log('Response from backend:', response.data);

                // Hiển thị thông báo và điều hướng người dùng đến trang chủ sau khi xử lý thành công
                toast.success('Payment successful! Thank you for your order.');
                navigate('/'); // Điều hướng người dùng đến trang chủ
            } catch (error) {
                console.error('Error handling PayPal success:', error);
                toast.error('Failed to handle PayPal success. Please try again later.');
                navigate('/'); // Điều hướng người dùng đến trang chủ trong trường hợp lỗi
            }
        };

        handlePayPalSuccess();
    }, [navigate]);

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Payment Successful</h2>
                <p className="lead">Thank you for your order! Your payment has been successfully processed.</p>
                <a href="/" className="btn btn-primary">Continue Shopping</a>
            </div>
        </div>
    );
}

export default PayPalSuccess;
