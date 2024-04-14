import {Button, Form, Input, Row, message} from 'antd';
import { useContext, useState } from 'react';
import { signIn } from '../backend/auth/signIn';
import AppContext from './context/AppContext';
import { Link, useNavigate } from 'react-router-dom';


const SignIn = ()=>{
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);

    const onFinish = ()=>{
        form.validateFields().then(async (values) => {
            setLoading(true);
            
            signIn(values.email,values.password)
            .then((res:any)=>{
                if ( res==null|| res===undefined){
                    message.error("Try Again!")

                }else if(res !==null || res !== undefined){
                    context.login(res)
                    navigate('navbar/home')

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
                                        Sign In
                                    </Button>
                                </Form.Item>
                            </Row>

                            <Row align={"middle"} justify={"end"}>
                               Don't have an Account?<Link style={{marginLeft:'7px'}} to={'/signUp'}>Sign Up</Link>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn;