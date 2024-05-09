import React, { useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function PayPal(props) {

    const  { uname, cid, amt, uId, courseData, email } = props.paymentData;
    const navigate = useNavigate();
    const paypal = useRef();



    useEffect(() => {
 
        const sendSMSNotification = async () => {
            try {
                const twilioClient = Twilio('AC4245cec3f2efca9d3d4a90e679ce3e73', 'd2eea6a0d3ef9df95957969b7365d0bf');
                await twilioClient.messages.create({
                    body: `Your payment was successful for amount Rs.${amt} !`,
                    from: '+12072630676',
                    to: '+94767765722' // Replace with user's actual mobile number
                });
            } catch (error) {
                console.error('Error sending SMS notification:', error);
            }
        }

        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "Course Payment",
                            amount: {
                                currency_code: "USD",
                                value: amt,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log("Successful Order: ", order);
                  try {
                    await axios.post('/api/payment/add', { userid:uname, courseid:cid, amount:amt });
                    await sendSMSNotification();
                    Swal.fire({
                        title: "Payment Successful!",
                        icon: "success"
                    });
                    await axios.put('http://localhost:7000/api/users/addEnrolledCourses' , { courseId: courseData, userId: uId });
                    await axios.post('http://localhost:3002/api/enroll/enroll', { courseId: courseData, userId: uId, email: email});
                 navigate(`/coursedetails/${cid}`)
                } catch (error) {
                    console.error('Error sending payment data to the server:', error);
                }
            

            },
            onError: (err) => {
                console.log(err);
            },
        }).render(paypal.current);
    })

  return (
    <div>
        <div ref={paypal}></div>
    </div>
  )
}
