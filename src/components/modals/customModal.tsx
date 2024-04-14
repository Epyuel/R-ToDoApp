import { Modal } from 'antd';


export default function CustomModal(
    {
        modalTitle,
        open,
        setOpen,
        children,
        width,
        onOk,
        okText,
        height,
    }: {
        modalTitle: string,
        open: boolean,
        setOpen: any,
        children: any,
        width?: string,
        onOk?: () => void,
        okText?: string,
        height?: string,
    }
) {
    return (
        <>
            <Modal
                open={open}
                title={modalTitle}
                width={width ?? "fit-content"}
                className='antd-modal-container'
                onOk={() => onOk}
                footer={onOk === undefined ? null : <></>}
                okText={okText ?? "Save"}
                onCancel={() => {
                    setOpen(false);
                }}
                style={{
                    position: 'relative',
                    zIndex: 2000,
                    height: height ?? "auto"
                }}
                centered={true}
                destroyOnClose={true}
            >
                {children}
            </Modal>
        </>
    );
}
