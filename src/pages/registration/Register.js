import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomInput from '../../components/custom-input/Custom-input';
import {toast} from "react-toastify"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from '../../firebase/firebase.config';
import { Spinner } from 'react-bootstrap';
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { setUser } from '../register-login/UserSlice';
import { useDispatch } from 'react-redux';

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [frmDt, setFrmDt] = useState({})
    const [error, setError] = useState("")
    const[isLoading, setIsLoading]= useState(false)

    const handleOnChange = e =>{
        const {name, value} = e.target

        if (name ==='password'){
            setError("")
            value.length < 6 && setError("Password is too short")
            !/[0-9]/.test(value) && setError("Must include number")
            !/[A-Z]/.test(value) && setError("Must include Uppercase")
            !/[a-z]/.test(value) && setError("Must include Lowercase")
        }
        setFrmDt({
            ...frmDt,
            [name]:value
        })

    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()

        const {confirmPassword, password, email} = frmDt;
        if (confirmPassword !== password){
           return  toast.error("Password do not match!")
        } 
        setIsLoading(true)

        createUserWithEmailAndPassword(auth, email, password).then(async(userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    setIsLoading(false)
    updateProfile(user, {displayName:  frmDt.fname})

    // Add a new document in collection "cities"
      await setDoc(doc(db, "users", user.uid), {
        fName: frmDt.fname,
        lName: frmDt.lname,
        email: user.email,
      });

      //set data to redux store
      dispatch(setUser(user))

    toast.success("Registration Successful")
    navigate("/dashboard")

  })
  .catch((error) => {
    setIsLoading(false)
    let message
    if (error.message.includes("auth/email-already-in-use")){
      message = "User already exits"
    }
    toast.error(message)
  });

    }
    

    const inputField = [
        {label:"First Name", 
        name:"fname",
        placeholder:"Sam",
        required:true},

        {label:"Last Name", 
        name:"lname",
        placeholder:"Smith",
        required:true},

        {label:"Email",
        type: "email", 
        name:"email",
        placeholder:"abc@email.com",
        required:true},

        {label:"Password", 
        type: "password",
        name:"password",
        placeholder:"*******",
        required:true},

        {label:"Confirm password", 
        type: "password",
        name:"confirmPassword",
        placeholder:"*******",
        required:true},

    ]
  return (
    <div className='form-container'>

<Form className='border p-5 rounded shadow-lg' onSubmit={handleOnSubmit}>

    <h3 className='text-center'>Join our Community</h3>
    <hr/>

    {inputField.map((item, i) => (
        <CustomInput key={i} {...item} onChange ={handleOnChange}/>

    ))}

    <div className='p-1 mb-4'>
        <Form.Text>
            Password should be longer that 6 charachters and should contain at least one number, one lowercase and one uppercase.
            {error && (
                <ul>
                    <li className='text-danger fw-dolder'>{error}</li>
                </ul>
            )}
        </Form.Text>
    </div>
      
      

    
      <Button variant="success" type="submit" disabled={error}>
        {isLoading ? <Spinner animation='border'/> :"Submit"}
      </Button>
    </Form>
      
    </div>
  )
}

export default Register;