import { useMediaQuery } from "@mui/material";
import { ToDoModel } from "../../backend/models/toDo";
import CustomModal from "./customModal";
import { Col, Descriptions, Row } from "antd";

export default function ViewToDo(
    {
        open,
        setOpen,
        data,
    }: {
        open: boolean,
        setOpen: any,
        data: ToDoModel,
    }
) {

    const matches = useMediaQuery('(min-width:900px)');

    return (
        <>
            <CustomModal
                open={open}
                setOpen={setOpen}
                modalTitle={`Detail`}
                width={matches ? "75%" : "100%"}
            >

                <Row
                    style={{
                        width: "100%",
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-around',
                    }}
                >
                    <Col xs={22} xl={11} xxl={11} className={"m-1"} >
                        <Descriptions layout="horizontal" bordered>
                            <Descriptions.Item label="Timestamp" span={5}>{data?.timestamp}</Descriptions.Item>

                            <Descriptions.Item label="ToDo ID" span={5}>{data?.toDoID}</Descriptions.Item>

                            <Descriptions.Item label="Title" span={5}>{data?.title}</Descriptions.Item>

                            <Descriptions.Item label="Stage" span={5}>{data?.stage}</Descriptions.Item>

                            <Descriptions.Item label="Difficulty" span={5}>{data?.difficulty}</Descriptions.Item>

                            <Descriptions.Item label="Description" span={5}>{data?.description}</Descriptions.Item>

                        </Descriptions>
                    </Col>
                </Row>

            </CustomModal>
        </>
    );
}
