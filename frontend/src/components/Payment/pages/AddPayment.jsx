import { Alert, Button, Label, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PayPal from '../components/PayPal';
import axios from 'axios';


export default function AddPayment() {

    const [pay, setPay] = useState(false);
    const [uname, setUname] = useState('');
    const [uId, setUid] = useState('');
    const [cid, setCid] = useState('');
    const [amt, setAmt] = useState('');
    const [courseData, setCourseData] = useState({});
    const { courseCode, price } = useParams();

    const tokenString = localStorage.getItem('token');

    const tokenPayload = JSON.parse(atob(tokenString.split(".")[1]));
    
    const uName = tokenPayload.name;
    const uid = tokenPayload.userId;

    const email = tokenPayload.email;
    console.log(tokenPayload);

    console.log(uName, uid);
    
    useEffect(() => {
      if (courseCode) setCid(courseCode);
      if (uName) setUname(uName);
      if (price) setAmt(price);
      if (uid) setUid(uid);

      axios.get(`http://localhost:8070/api/${courseCode}`)
    .then(response => {
      if (response && response.data && response.data.course) {
        const { _id, courseCode } = response.data.course;
        
        console.log('Course ID:', _id);
        console.log('Course Code:', courseCode);
        
        setCourseData(_id);
      }
    })
    .catch(error => {
     
      console.error('Error fetching course data:', error);
    });

      

  }, [courseCode,uName, price, uid]);
  
  const paymentData = { uname, courseCode, amt, uId, courseData, email};
  console.log(uname, cid, amt, uId);
  console.log(courseData);
   

  return (
    <>
    <div className='text-3xl font-bold text-center mt-8'><h2>Make Payment</h2></div>
    <div className="min-h-screen mt-6">
      <div className=" p-3 w-80 mx-auto flex-col md:flex-row md:items-center ">
        <div className="flex-1">
            <form className="flex flex-col gap-4">
                <div >
                    <Label  value="Username"/>
                    <TextInput type="text" placeholder="Username" id="uname" value={uname} onChange={(e)=>setUname(e.target.value)}/>
                </div>
                <div >
                    <Label  value='Course ID'/>
                    <TextInput type="text" placeholder="CourseID" id="cid" value={courseCode} onChange={(e)=>setCid(e.target.value)}/>
                </div>
                <div >
                    <Label  value="Price"/>
                    <TextInput type="text" placeholder="Amount" id="amt" value={price} onChange={(e)=>setAmt(e.target.value)}/>
                </div>
                <div>
                    {pay ? (
                        <PayPal paymentData={paymentData} />
                    ):(
                        <Button className="mt-2 w-40 mx-auto bg-blue-700" onClick={() => {setPay(true)}}>Pay</Button>
                    )}
                </div>
            </form>
        </div>
        <div className="flex-1 mt-4 text-center">
        <p className="text-sm mb-5">
            Pay with Paypal
          </p>
          <Link onClick={() => {setPay(true)}} className=" text-4xl font-bold">
            <span className="px-2 py-1 italic text-blue-800 rounded-lg">
              Pay
            </span>
            <span className='text-cyan-500 italic'>
            Pal
            </span>
          </Link>
          
        </div>
      </div>
    </div>
    </>
  )
}