import {Button, Form, Input, Row, message} from 'antd';
import addUser from '../backend/requests/User/add';
import generateID from '../backend/functions/generateID';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignUp = ()=>{
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);


    const onFinish = ()=>{
        form.validateFields().then(async (values) => {
            setLoading(true);

            values.userID = generateID();

            await addUser(values)
            .then((res:boolean)=>{
                if (res){
                    message.success("Successfully Signed Up");
                    navigate('/');
                }else{
                    message.error("Some thing went wrong, Please Try Again!");
                }
            })

            setLoading(false);
        });
    }

    const validateEmail = (_: any, value: any) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!value || emailRegex.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject('Please enter a valid email address!');
    };

    return (
        <>
            <div className="container">
                <div className="signIn-container">
                    <div className="form-container">
                        <Form
                            form={form}
                            onFinish={onFinish}    
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: ""},{validator:validateEmail}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="FirstName"
                                name="firstName"
                                rules={[{ required: true, message: ""}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: "" }]}
                            >
                                <Input/>
                            </Form.Item>

                            <Row align={"middle"} justify={"center"}>
                                <Form.Item>
                                    <Button
                                        type='primary'
                                        loading={loading}
                                        htmlType='submit'
                                    >
                                        Sign up
                                    </Button>
                                </Form.Item>
                            </Row>

                            <Row align={"middle"} justify={"end"}>
                               Already have an Account?<Link style={{marginLeft:'7px'}} to={'/'}>Sign In</Link>
                            </Row>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;