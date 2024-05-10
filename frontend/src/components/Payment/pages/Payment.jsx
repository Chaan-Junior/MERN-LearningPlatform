import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";

export default function Payments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/payment') // Update this URL with your actual API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPayments(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching payments:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10 text-lg"><HashLoader size={60} className='mx-auto'/>Loading....</div>;
    if (error) return <div className="text-center mt-10 text-lg text-red-500">Error: {error}</div>;

    return (
        <div className="container ml-24 mt-10">
            <h1 className="text-2xl font-bold text-center mb-6">Payments</h1>
            {payments.length > 0 ? (
                <div className="overflow-x-auto relative">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3 px-6"> ID</th>
                                <th scope="col" className="py-3 px-6">User ID</th>
                                <th scope="col" className="py-3 px-6">Course ID</th>
                                <th scope="col" className="py-3 px-6">Amount $</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.paymentid} className="bg-white border-b">
                                    <td className="py-4 px-6">{payment.paymentid}</td>
                                    <td className="py-4 px-6">{payment.userid}</td>
                                    <td className="py-4 px-6">{payment.courseid}</td>
                                    <td className="py-4 px-6">{payment.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center mt-10 text-lg">No payments found</div>
            )}
        </div>
    );
}
