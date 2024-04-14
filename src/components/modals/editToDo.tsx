import { useMediaQuery } from "@mui/material";
import CustomModal from "./customModal";
import AppContext from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import { UserModel } from "../../backend/models/user";
import { Button, Form, Input, Row, Select, message } from "antd";
import generateID from "../../backend/functions/generateID";
import dayjs from "dayjs";
import { ToDoModel } from "../../backend/models/toDo";
import { updateToDo } from "../../backend/requests/To Do/update";

export default function EditToDo(
    {
        open,
        setOpen,
        data
    }: {
        open: boolean,
        setOpen: any,
        data:ToDoModel
    }
) {
    const matches = useMediaQuery('(min-width:900px)');

    return (
        <>
            <CustomModal
                open={open}
                setOpen={setOpen}
                modalTitle='Edit'
                width={matches ? "50%" : "100%"}
            >
                <ModalContent setOpen={setOpen} data={data} />
            </CustomModal>
        </>
    );
}

function ModalContent(
    {
        setOpen,
        data
    }: {
        setOpen: any,
        data:ToDoModel
    }
) {
    const [loading, setLoading] = useState<boolean>(false);

    const [form] = Form.useForm();

    const context = useContext(AppContext);
    const userData: UserModel = context.user;


    const success = () => {
        message.success('Success.');
    };

    const error = () => {
        message.error('Something went wrong. Please Try Again.');
    };

    const formFailed = () => {
        message.error('Please Make Sure All Fields Are Filled');
    };

    const onFinish = () => {
        form.validateFields().then(async (values:any) => {
            setLoading(true);

            const keys: string[] = Object.keys(values);
            keys.forEach((key) => {
                if (values[key] === undefined) values[key] = null;
            });

            // console.log("values: ", values);
            values.id = data.id??"";
            await updateToDo(values)
                .then((res: boolean) => {

                    if (res === true) {
                        success();
                        setLoading(false);
                        setOpen(false);
                        form.resetFields();
                    }

                    if (res === false) {
                        error();
                        setLoading(false);
                    }
                })

            setLoading(false);
        }).catch((err:any) => {
            formFailed();
            setLoading(false);
            console.log("Validation Error: ", err);
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        formFailed();
    };

    // auto-populate
    useEffect(()=>{
        const keys = Object.keys(data);
        keys.map((key:string)=>{
            form.setFieldValue(key,(data as any)[key]);
        });
    },[data, form]);


    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Timestamp"
                    name="timestamp"
                    rules={[{ required: true, message: "" }]}
                    initialValue={dayjs().format("MMMM DD, YYYY hh:mm A")}
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="ToDo ID"
                    name="toDoID"
                    rules={[{ required: true, message: "" }]}
                    initialValue={generateID()}
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "" }]}
                >
                    <Input />
                </Form.Item>

                {/* <Form.Item
                    label="Stage"
                    name="stage"
                    rules={[{ required: true, message: "" }]}
                >
                    <Select
                        style={{ width: "100%", }}
                        options={['To Do','In Progress','Done'].map(val => ({ label: val, value: val }))}
                    />
                </Form.Item> */}

                <Form.Item
                    label="Difficulty"
                    name="difficulty"
                    rules={[{ required: true, message: "" }]}
                >
                    <Select
                        style={{ width: "100%", }}
                        options={['Easy','Medium','Hard'].map(value => ({ label: value, value: value, }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "" }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>


                <Row align={"middle"} justify={"center"}>
                    <Form.Item>
                        <Button
                            className="card-button"
                            loading={loading}
                            htmlType='submit'
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </>
    );
}